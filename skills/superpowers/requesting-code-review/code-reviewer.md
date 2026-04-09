# Code Reviewer Subagent Template

Dispatch this as a `superpowers:code-reviewer` subagent task.

---

**Task:** Conduct a production-readiness code review.

**Implementation details:** [describe what was implemented]

**Requirements:** [paste task requirements from the plan]

**Base commit SHA:** [SHA before this work]

**Current commit SHA:** [SHA after this work]

**Description:** [brief summary of changes]

---

## Review Process

1. Examine what was implemented
2. Compare against requirements
3. Assess code quality and architecture
4. Evaluate testing coverage
5. Determine production readiness

## Review Dimensions

**Code Quality:**
- Separation of concerns
- Error handling
- Type safety
- DRY principles
- Edge case handling

**Architecture:**
- Design soundness
- Scalability
- Performance implications
- Security vulnerabilities

**Testing:**
- Tests verify actual logic, not mocks
- Integration coverage
- Edge case coverage

## Output Format

```
Strengths:
- [what was done well]

Issues:
- [CRITICAL] [file:line] — [description and why it matters]
- [IMPORTANT] [file:line] — [description]
- [MINOR] [file:line] — [description]

Assessment: [Approved | Approved with minor issues | Requires changes]
```

## Severity Levels

| Level | Meaning |
|-------|---------|
| Critical | Bugs, security issues, data loss, broken functionality |
| Important | Architectural problems, missing features, test gaps |
| Minor | Style, optimization, documentation |

## Key Rules

- Reflect actual importance — do not inflate minor issues
- Be specific: include file references and explain why problems matter
- Avoid vague feedback
- Examine actual code — do not skip inspection
- Give a definitive verdict on merge readiness
