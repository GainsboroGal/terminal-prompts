# Copilot CLI Tool Mapping

Reference for translating Claude Code skill tool names to their Copilot CLI equivalents.

## Core Tool Mappings

| Claude Code (skills use) | Copilot CLI equivalent |
|--------------------------|----------------------|
| `Read` | `view` |
| `Write` | `create` |
| `Edit` | `edit` |
| `Bash` | `bash` |
| `Grep` | `grep` |
| `Glob` | `glob` |
| `Skill` | `skill` |
| `WebFetch` | `web_fetch` |
| `Task` (subagent) | `task` |
| `TodoWrite` | SQL query against `todos` table |
| `WebSearch` | `web_fetch` with search engine URL (no direct equivalent) |

## Agent Type Configuration

The `task` tool accepts an `agent_type` parameter:
- `"general-purpose"` — general agent
- `"explore"` — exploration agent
- Plugin agents (vendor-prefixed)

## Asynchronous Shell Sessions

Copilot CLI supports persistent background processes:

| Operation | Tool |
|-----------|------|
| Launch background process | `bash` with `async: true` |
| Send input | `write_bash` |
| Read output | `read_bash` |
| Terminate | `stop_bash` |
| List sessions | `list_bash` |

## Supplementary Tools

| Tool | Purpose |
|------|---------|
| `store_memory` | Persist information across sessions |
| `report_intent` | Update UI with agent status |
| `sql` | Query built-in database |
| `fetch_copilot_cli_documentation` | Retrieve help |
| GitHub MCP tools | GitHub API integration |
