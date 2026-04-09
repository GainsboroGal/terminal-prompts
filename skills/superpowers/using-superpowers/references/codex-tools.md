# Codex Tool Mapping

Reference for translating Claude Code skill tool names to their Codex equivalents.

## Core Tool Mappings

| Claude Code (skills use) | Codex equivalent |
|--------------------------|-----------------|
| `Task` (dispatch subagent) | `spawn_agent` |
| `Task` (parallel) | Multiple `spawn_agent` calls |
| Task result retrieval | `wait` |
| Task completion | `close_agent` |
| `TodoWrite` | `update_plan` |
| File / shell operations | Native platform tools |

## Multi-Agent Configuration

Subagent dispatch requires enabling multi-agent support in the Codex configuration file. This unlocks `spawn_agent`, `wait`, and slot management for parallel agent workflows.

## Named Agent Dispatch Strategy

Since Codex lacks a named agent registry, dispatch named agents by:

1. Locating the agent's prompt file
2. Populating template variables
3. Spawning a worker agent with the filled prompt content as the `message` parameter

Wrap the message in XML tags with task-delegation framing, concluding with explicit execution directives to maintain instruction fidelity.

## Environmental Safeguards

Skills should detect git environment state using read-only commands before creating worktrees or finishing branches. Check for:
- Existing worktrees
- Detached HEAD state

## App Integration

When sandbox constraints prevent direct git operations:
- Agents can still execute tests and stage files
- Direct users to the App's native controls for branch creation and push operations
