# Gemini CLI Tool Mapping

Reference for translating Claude Code skill tool names to their Gemini CLI equivalents.

## Core Tool Mappings

| Claude Code (skills use) | Gemini CLI equivalent |
|--------------------------|----------------------|
| `Read` | `read_file` |
| `Write` | `write_file` |
| `Edit` | `replace` |
| `Bash` | `run_shell_command` |
| `Grep` | `grep_search` |
| `Glob` | `glob` |
| `WebSearch` | `google_web_search` |
| `WebFetch` | `web_fetch` |
| `TodoWrite` | `write_todos` |
| `Skill` | `activate_skill` |

## Critical Limitation: No Subagents

**Gemini CLI does not support subagents.** The `Task` tool is unavailable.

Skills that require parallel agent dispatch (subagent-driven-development, dispatching-parallel-agents) will execute tasks sequentially instead.

## Gemini-Exclusive Tools

Tools available in Gemini CLI that have no Claude Code equivalent:

| Tool | Purpose |
|------|---------|
| Directory listing | List directory contents |
| Memory storage | Persist information across sessions |
| User input prompt | Request direct user input |
| Task tracking with visualization | Advanced todo management with visual output |
