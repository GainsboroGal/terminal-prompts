# Using Superpowers

## Core Rule

**If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.**

Skills must be invoked before responding to any task. Do not rationalize avoidance.

## Instruction Hierarchy

1. **User's explicit instructions** — highest priority, always
2. **Superpowers skills** — override default system behavior
3. **Default system prompt** — lowest priority

## How to Invoke Skills

| Platform | Tool |
|----------|------|
| Claude Code | `Skill` tool |
| Copilot CLI | `skill` tool |
| Gemini CLI | `activate_skill` tool |
| Other platforms | Consult platform documentation |

See `references/` for platform-specific tool mappings.

## Before Responding to Any Task

Ask: **"Might any skill apply?"**

If yes — invoke it before doing anything else.

## Red Flags for Rationalization

Stop and invoke the skill when you notice yourself thinking:
- "This is just a simple question"
- "Let me gather information first, then invoke"
- "This feels like overkill for this task"
- "I can handle this without a skill"

These thoughts indicate you should pause and invoke the skill.

## Skill Types

| Type | Behavior |
|------|----------|
| Rigid (TDD, debugging) | Follow exactly without adaptation |
| Flexible (patterns) | Adapt principles contextually |

## Workflow Order

1. Process skills first: brainstorming, debugging
2. Then implementation skills: design, building
