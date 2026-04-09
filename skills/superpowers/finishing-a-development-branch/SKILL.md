# Finishing a Development Branch

Complete development work through a structured verification-and-merge process.

Announce at the start: **"I'm using the finishing-a-development-branch skill to complete this work."**

## Workflow

`verify tests → determine base branch → present options → execute choice → clean up`

## Step 1: Verify Tests

Run the project's full test suite. **If tests fail, stop and fix — do not advance to presenting options.**

## Step 2: Identify Base Branch

Determine the target branch (typically `main` or `master`) using git commands or by asking for confirmation.

## Step 3: Present Exactly Four Options

Present these choices without additional explanation:

1. Merge back to base branch locally
2. Push and create a Pull Request
3. Keep the branch as-is
4. Discard this work

## Step 4: Execute the Choice

| Option | Actions |
|--------|---------|
| 1 — Merge locally | Merge to base, run tests, clean up worktree |
| 2 — Push + PR | Push branch, create PR, leave worktree intact |
| 3 — Keep as-is | Preserve worktree, take no further action |
| 4 — Discard | Require typed `"discard"` confirmation, then delete |

## Critical Rules

- Always verify tests before offering options
- Present exactly 4 structured options — no additions or omissions
- Require explicit typed confirmation (`"discard"`) before destroying work
- Clean up worktrees only for options 1 and 4 — never for options 2 or 3

## Called By

- `subagent-driven-development` — upon task completion
- `executing-plans` — upon plan completion
