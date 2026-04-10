# Orchestrate — Agent Fleet Supervisor

Meta-agent supervisor system that manages multiple Claude Code agents operating in parallel across tmux windows and git worktrees. Automates spawning, monitoring, task coordination, and cleanup for large-scale parallel work.

**Source**: https://github.com/Significant-Gravitas/AutoGPT

## Core Architecture

Three layers:

1. **Supervisor (You)** — This Claude session maintains context, makes judgment calls, monitors agent progress every 2–3 minutes, and decides when work is complete
2. **Mechanical layer** (`run-loop.sh`) — Separate tmux window handling idle restarts, dialog approvals, and worktree recycling without consuming tokens
3. **Agent windows** — Each spawned agent runs in its own tmux window with a dedicated git worktree and Claude session

**Critical**: Do not spawn a separate supervisor Claude window — it loses context, is hard to observe, and compounds context compression problems. You stay in this conversation.

## Prerequisites

- git worktrees pre-created on `spare/N` branches (e.g. `spare/1`, `spare/2`, etc.)
- tmux session already running (never create from Claude — child processes die with the session)
- `gh` CLI authenticated
- Scripts installed at `$SKILLS_DIR` (path to this skill's `scripts/` directory)

## Key Scripts

| Script | Function |
|--------|---------|
| `find-spare.sh [REPO_ROOT]` | Lists available worktrees on spare/N branches |
| `spawn-agent.sh SESSION WORKTREE SPARE NEW OBJECTIVE [PR] [STEPS...]` | Creates agent window, checks out branch, launches Claude |
| `capacity.sh [REPO_ROOT]` | Shows fleet capacity: spare worktrees + in-use agents |
| `status.sh` | Displays all agent states from state file |
| `poll-cycle.sh` | Single monitoring cycle → JSON action array |
| `run-loop.sh` | Mechanical babysitter daemon (restarts, approvals, recycling) |
| `recycle-agent.sh WINDOW WORKTREE SPARE_BRANCH` | Kills window, restores worktree to spare branch |
| `classify-pane.sh TARGET` | Classifies tmux pane state → JSON |
| `verify-complete.sh` | Gates completion: checks checkpoints, CI, threads, reviews |
| `notify.sh MESSAGE` | Send notification (Discord webhook or macOS notification) |

## Workflow: Spawning Agents

### 1. Check existing tmux session
```bash
tmux list-sessions -F "#{session_name}: #{session_windows} windows"
```

### 2. Show available capacity
```bash
bash $SKILLS_DIR/capacity.sh $(git rev-parse --show-toplevel)
```

### 3. Collect task details
- Objective (what to implement/fix)
- Branch name (derive from objective if not specified)
- PR number (if working on existing PR)
- Required steps/checkpoints (e.g., `pr-address pr-test`)

### 4. Auto-assign worktrees and spawn
```bash
SPARE_LIST=$(bash $SKILLS_DIR/find-spare.sh $(git rev-parse --show-toplevel))
# For each task, extract WORKTREE_PATH and SPARE_BRANCH from SPARE_LIST
# then spawn:
WINDOW=$(bash $SKILLS_DIR/spawn-agent.sh "$SESSION" "$WORKTREE_PATH" "$SPARE_BRANCH" \
  "$NEW_BRANCH" "$OBJECTIVE" "$PR_NUMBER" "pr-address" "pr-test")
```

### 5. Initialize state file
```bash
jq -n --arg session "$SESSION" --arg repo "$REPO" \
  '{active:true, tmux_session:$session, idle_threshold_seconds:300,
    repo:$repo, loop_window:null, last_poll_at:0, agents:[]}' \
  > ~/.claude/orchestrator-state.json
```

### 6. Launch mechanical babysitter
```bash
LOOP_WIN=$(tmux new-window -t "$SESSION" -n "orchestrator" -P -F '#{window_index}')
LOOP_WINDOW="${SESSION}:${LOOP_WIN}"
tmux send-keys -t "$LOOP_WINDOW" "bash $SKILLS_DIR/run-loop.sh" Enter
jq --arg w "$LOOP_WINDOW" '.loop_window = $w' ~/.claude/orchestrator-state.json \
  > /tmp/orch.tmp && mv /tmp/orch.tmp ~/.claude/orchestrator-state.json
```

## Checkpoint Protocol

Agents output milestones as:
```
CHECKPOINT:<step-name>
```
Required steps passed to `spawn-agent.sh`. The mechanical layer won't recycle until all checkpoints appear.

## Your Supervision (Every 2–3 Minutes)

### Poll agents
```bash
jq -r '.agents[] | select(.state | test("running|idle|stuck|waiting_approval")) | .window' \
  ~/.claude/orchestrator-state.json
```

### Assess each agent

| Symptom | Action |
|---------|--------|
| Spinner/tools running | Do nothing |
| Idle prompt, no `ORCHESTRATOR:DONE` | Send targeted nudge |
| Error loop | Send specific fix |
| Blocked on question | Answer via `tmux send-keys` |
| CI red | Run `gh pr checks` → tell agent exact failure |
| Rate limit 403 | Wait 2 min, then nudge to resume with `sleep 3` between API calls |
| `ORCHESTRATOR:DONE` in output | Run `verify-complete.sh` before accepting |

### Re-briefing a stalled agent
Verify idle `❯` prompt first (no spinner), then:
```bash
tmux send-keys -t SESSION:WIN "Stalled. Your objective: [objective]. Check: gh pr view [PR] --json title,body,headRefName"
sleep 0.3
tmux send-keys -t SESSION:WIN Enter
```

### tmux send-keys pattern — always sleep between text and Enter
```bash
# Correct
tmux send-keys -t "$WINDOW" "your message"
sleep 0.3
tmux send-keys -t "$WINDOW" Enter

# Wrong — Enter fires before text buffers
tmux send-keys -t "$WINDOW" "your message" Enter
```

## Serial /pr-test Rule

**Only YOU run `/pr-test` — agents skip it.** Two simultaneous `/pr-test` jobs cause port conflicts and database corruption. Queue and execute it yourself serially after agents push code.

## Thread Resolution Integrity

Agents must NOT resolve threads without a real code fix first:
1. Read thread requirement
2. Make actual code change
3. Commit and push
4. Reply with commit SHA
5. THEN resolve

Verify unresolved thread counts yourself via GraphQL after any agent claims "0 unresolved":
```bash
gh api graphql -f query='{repository(owner:"ORG",name:"REPO"){pullRequest(number:PR){reviewThreads(first:100){nodes{isResolved}}}}}' \
  | jq '[.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved==false)] | length'
```

Include in every agent objective: "Do NOT resolve threads via GraphQL unless code is committed and pushed first."

## State File Structure

```json
{
  "active": true,
  "tmux_session": "work1",
  "idle_threshold_seconds": 300,
  "loop_window": "work1:5",
  "repo": "owner/repo",
  "discord_webhook": "https://discord.com/api/webhooks/...",
  "agents": [
    {
      "window": "work1:3",
      "worktree_path": "/path/to/worktree",
      "worktree": "/path/to/worktree",
      "branch": "feat/my-feature",
      "objective": "implement X and open PR",
      "pr_number": "12345",
      "session_id": "uuid-here",
      "steps": ["pr-address", "pr-test"],
      "checkpoints": ["pr-address"],
      "state": "running",
      "last_output_hash": "",
      "idle_since": 0,
      "revision_count": 0,
      "last_seen_at": 0
    }
  ]
}
```

Agent states: `running` | `idle` | `stuck` | `waiting_approval` | `complete` | `pending_evaluation` | `done` | `escalated`

## Final Evaluation (Your Decision)

Before approving done:
1. **Run `/pr-test` yourself** — if any scenario PARTIAL or FAIL, re-brief immediately
2. **Review the diff** — does code actually implement what was asked?
3. **Spot-check CI** — no suspicious retries

## When to Stop the Fleet

Set `active = false` only when ALL:
- All agents are `done` or `escalated`
- All PRs show 0 unresolved threads (verified via GraphQL)
- All PRs have green CI triggered after the agent's last push
- No fresh `CHANGES_REQUESTED` reviews

**`ORCHESTRATOR:DONE` is a signal to verify, not to stop.**

## Session Resumption

If a window closes or session crashes:
```bash
NEW_WIN=$(tmux new-window -t SESSION -n WORKTREE_NAME -P -F '#{window_index}')
tmux send-keys -t "SESSION:${NEW_WIN}" \
  "cd /path/to/worktree && claude --resume SESSION_ID --permission-mode bypassPermissions" Enter
```
Update state file with the new window address.

## Key Rules

1. Auto-assign worktrees from `find-spare.sh` — never ask the user to pick
2. Always use `--permission-mode bypassPermissions` on spawn
3. Never restart a running agent — only restart on idle kicks
4. Escalate after 3 idle kicks; mark `escalated`
5. Atomic state writes: always write to `.tmp` then `mv`
6. Never recycle without `verify-complete.sh` passing
7. Re-brief stalled agents with objective from state + `gh pr view` output
8. Graph all thread counts yourself before accepting zero claims
9. Only YOU run `/pr-test` — agents skip it, you queue and execute serially
10. Images to agents: save to `/tmp/orchestrator-context-<timestamp>.png`, pass path in objective
