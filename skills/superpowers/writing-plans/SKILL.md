# Writing Plans

I'm using the writing-plans skill to create an implementation plan.

Transform specifications into detailed, bite-sized implementation guides.

**Target audience:** Skilled engineers who know how to code but are unfamiliar with this specific codebase.

## Plan Structure

**Save to:** `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`

**Mandatory header:**
```markdown
## Goal
[What this plan accomplishes]

## Architecture
[How the pieces fit together]

## Tech Stack
[Languages, frameworks, libraries involved]

## File Structure
[Map of files to create/modify before listing tasks]
```

## Task Granularity

Each task follows the TDD flow:

1. Write failing test
2. Verify it fails (run the test, confirm failure)
3. Implement the code
4. Verify it passes (run the test, confirm green)
5. Commit with descriptive message

Tasks should take **2–5 minutes** each. Break anything larger.

## Zero Tolerance for Vagueness

**Never include:**
- "TBD"
- "Handle edge cases"
- "Similar to Task N"
- "Add appropriate validation"
- Forward references to types or functions not yet defined

**Always include:**
- Complete, exact implementation for every code step
- Literal file paths (not "the config file")
- Literal commands (not "run the tests")
- All type/function signatures matching across tasks

## Quality Gates

Before finalizing the plan, verify:

1. **Spec coverage:** Every requirement maps to at least one task
2. **Placeholder scan:** No vague instructions anywhere
3. **Type consistency:** Function names and signatures are consistent across all tasks

## Execution Handoff

After saving the plan, offer two paths:

**Option 1 — Subagent-Driven (recommended):** Fresh agent per task, code review between steps. Use `subagent-driven-development` skill.

**Option 2 — Inline Execution:** Batch tasks in current session with checkpoints. Use `executing-plans` skill.

See `plan-document-reviewer-prompt.md` to dispatch a reviewer before execution.
