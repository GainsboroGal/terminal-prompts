# Writing Skills

Writing skills IS Test-Driven Development applied to process documentation.

**Rule: NO SKILL WITHOUT A FAILING TEST FIRST.**

## When to Create a Skill

Create skills for techniques that are:
- Not intuitively obvious
- Broadly applicable across projects

**Do not create skills for:**
- One-off solutions
- Standard practices already well-documented elsewhere
- Project-specific conventions

## Structure Requirements

Skills require YAML frontmatter:
```yaml
---
name: skill-name (max 64 characters)
description: >
  Use when [specific symptoms]. [What it does]. (max 1,024 characters)
---
```

**Description rules:**
- Focus exclusively on triggering conditions: "Use when [specific symptoms]"
- Do not summarize the skill's workflow in the description — this causes agents to follow the description instead of reading the full content
- Written in third person
- Include concrete keywords agents would search for: error messages, symptoms ("flaky", "race condition"), relevant tools

## File Organization

Progressive disclosure model:
- `SKILL.md` loads first, on demand
- Additional files load only as referenced
- Keep `SKILL.md` under 500 lines
- Avoid deeply nested file references

## The TDD Cycle for Skills

**RED:** Run pressure scenarios without the skill. Document agent failures and rationalizations verbatim.

**GREEN:** Write minimal skill content addressing those specific failures.

**REFACTOR:** Close loopholes by addressing new rationalizations discovered in testing.

Repeat until agents consistently comply under pressure.

## Skill Types and Testing

| Type | Test approach |
|------|--------------|
| Discipline-enforcing (TDD, debugging) | Multi-pressure scenarios with time, authority, sunk costs |
| Technique | Application scenarios + edge cases |
| Pattern | Recognition + counter-examples |
| Reference | Retrieval + gap testing |

## Quality Standards

- Keep frequently-loaded skills under 200 words total
- Cross-reference other skills rather than repeating content
- One excellent example beats multiple mediocre ones
- Build rationalization tables capturing specific excuses agents use

## Persuasion Principles

See `persuasion-principles.md` for evidence-based techniques that double compliance rates.
See `anthropic-best-practices.md` for Anthropic's official skill authoring guidelines.
See `testing-skills-with-subagents.md` for the full testing methodology.
