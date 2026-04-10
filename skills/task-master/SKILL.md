# Task Master Skill

AI-driven task management for Claude Code. Parse PRDs into structured tasks, track progress, manage dependencies, and navigate complex development workflows.

**Source**: https://github.com/eyaltoledano/claude-task-master  
**Package**: `task-master-ai` (npm)

## When to use this skill

Apply when:
- Starting a new project from a PRD or requirements document
- Managing a backlog of development tasks with dependencies
- Breaking down complex features into subtasks
- Tracking progress across a multi-phase project
- Needing structured workflow guidance on what to implement next

## Installation

### Option A: MCP Server (recommended for Claude Code)

Add to your Claude Code MCP configuration (`~/.claude/mcp.json` or project `.claude/mcp.json`):

```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "npx",
      "args": ["-y", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "your-key-here"
      }
    }
  }
}
```

Restart Claude Code, then initialize in your project:
```
Initialize taskmaster-ai in my project
```

### Option B: CLI

```bash
npm install -g task-master-ai
task-master init
```

## Core Workflow

**Parse → List → Select → Implement → Verify → Complete → Repeat**

### 1. Parse a PRD into tasks
```
Can you parse my PRD at scripts/prd.txt?
```
```bash
task-master parse-prd scripts/prd.txt
```

### 2. See what to work on next
```
What's the next task I should work on?
```
```bash
task-master next
task-master list
```

### 3. View task details
```
Show me task 3 and its subtasks
```
```bash
task-master show 3
task-master show 1,3,5       # batch
```

### 4. Implement and mark done
```
Help me implement task 3
Mark task 3 as done
```
```bash
task-master set-status --id=3 --status=done
```

## Task Statuses

| Status | Meaning |
|--------|---------|
| `pending` | Not started |
| `in-progress` | Currently being worked on |
| `done` | Completed |
| `review` | Awaiting review |
| `deferred` | Postponed |
| `cancelled` | Will not be done |

```bash
task-master set-status --id=3 --status=in-progress
```

## Task Management

```bash
# Add a new task
task-master add-task --prompt="Add OAuth2 login support"

# Update a task
task-master update --id=3 --prompt="Also handle refresh tokens"

# Expand a task into subtasks
task-master expand --id=3

# Expand with research (uses web search for current best practices)
task-master expand --id=3 --research

# Remove a task
task-master remove-task --id=3
```

## Dependencies

```bash
# Add a dependency (task 5 depends on task 3)
task-master add-dependency --id=5 --depends-on=3

# Validate all dependencies
task-master validate-dependencies

# Auto-fix dependency conflicts
task-master fix-dependencies
```

## Complexity Analysis

```bash
# Analyze complexity of all tasks
task-master analyze-complexity

# Detailed complexity report
task-master complexity-report
```

## Research

Use research capabilities for tasks that benefit from current information:

```bash
task-master research "latest JWT authentication best practices"
task-master research "React 19 concurrent features best practices"
```

Or via MCP:
```
Research the best approach for implementing rate limiting in Express
```

## Tag Management (parallel development)

```bash
# Create isolated task context for a feature branch
task-master add-tag feature-auth

# Switch between tag contexts
task-master use-tag feature-auth
task-master use-tag main
```

## Configuration

Set the AI model for different operations:
```bash
task-master models --setup
```

Or in `.taskmaster/config.json`:
```json
{
  "models": {
    "main": "claude-opus-4-5",
    "research": "claude-sonnet-4-6",
    "fallback": "claude-haiku-4-5"
  }
}
```

## Natural Language via MCP

When using via MCP/Claude Code chat, natural language works:
- "mark 23 as done"
- "show me pending high priority tasks"
- "what depends on task 5?"
- "expand task 7 into subtasks"
- "what should I work on next?"

## Daily Workflow Pattern

```
Morning: "What's the next task I should work on?"
Working: "Can you help me implement task 4?"
Done:    "Mark task 4 as done and show me what's next"
```

## Subtask Execution Pattern

When working through subtasks:
1. `task-master show <id>` — review requirements
2. Implement subtask
3. Run tests/lint
4. `task-master set-status --id=<id> --status=done`
5. Commit changes
6. Move to next subtask
