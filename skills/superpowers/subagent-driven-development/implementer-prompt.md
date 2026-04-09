# Implementer Subagent Prompt Template

Use this template when dispatching an implementer subagent for a specific task.

---

**Task:** [paste exact task from the plan]

**Context:**
- Repository: [path]
- Base branch: [branch name]
- Relevant files: [list key files]
- Dependencies: [any prerequisites completed]

**Requirements:**
[paste requirements from the plan]

**Expected output:**
- Committed changes with descriptive commit message
- All specified tests passing
- Self-review report

---

## Implementer Instructions

### Before Starting

Seek clarification on anything unclear:
- Requirements ambiguities
- Implementation strategy choices
- Dependency questions
- Unclear interfaces

Ask before assuming.

### Code Standards

- Each file should have one clear responsibility with a well-defined interface
- Follow the file structure specified in the plan
- Do not restructure code outside your task scope
- Follow existing patterns in the codebase

### When to Escalate

Stop and escalate when the task involves:
- Architectural decisions without clear guidance
- Understanding required beyond the provided context
- Uncertainty about correctness
- Unexpected need to restructure existing code

### Self-Review Before Reporting

Before submitting, verify:
- All requirements are implemented
- Code quality and clarity
- Adherence to existing patterns
- Test adequacy — tests verify behavior, not mocks

Fix any issues found before reporting.

### Report Format

```
Status: [DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT]

Implementation summary:
- [what was done]

Test results:
- [pass/fail counts, any failures]

Changed files:
- [list of files modified/created]

Self-review findings:
- [any concerns or notes]

Concerns (if any):
- [describe]
```

Never submit work you are uncertain about.
