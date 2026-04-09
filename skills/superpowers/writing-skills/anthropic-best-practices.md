# Anthropic Skill Authoring Best Practices

Official guidance for writing effective Skills for Claude agents.

## Core Principles

**Conciseness matters.** Context windows are shared resources. Keep skills lean.

Claude reads `SKILL.md` only when the skill becomes relevant, and reads additional files only as needed. Structure content accordingly.

**Match specificity to task complexity:**
- High freedom: flexible tasks with multiple valid approaches
- Medium freedom: patterned work with preferred approaches
- Low freedom: fragile operations requiring exact sequences

**Test across models.** Skills perform differently on Claude Haiku vs. Opus. Test with all target models.

## Structure Guidelines

**YAML frontmatter (required):**
```yaml
---
name: Processing PDFs  # max 64 chars, use gerund form
description: >
  Use when [activation trigger]. [What it does]. [Platform notes].
  # max 1,024 chars, third person, specific triggers
---
```

**File organization (progressive disclosure):**
- `SKILL.md`: entry point, loads first (under 500 lines)
- Supporting files: load on demand via references
- No deeply nested file references

## Content Best Practices

**Include:**
- Numbered steps for complex workflows
- Optional checklists for quality gates
- Templates for output formats
- Input/output examples

**Avoid:**
- Time-sensitive information
- Inconsistent terminology
- References to unavailable tools

## Workflow Design

- Break complex tasks into numbered steps
- Add validation loops where quality matters
- For executable scripts: handle errors explicitly, do not defer to Claude

## Advanced

- Use intermediate validation files for batch operations
- Reference MCP tools with fully qualified names: `ServerName:tool_name`
- Build evaluations first, refine instructions, test with fresh instances

## Development Process

1. Build evaluations (test cases) first
2. Work with Claude to refine instructions
3. Test with fresh Claude instances (no prior context)
4. Identify and close gaps iteratively
