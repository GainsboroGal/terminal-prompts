# Code Quality Reviewer Prompt Template

Use this template after spec compliance passes. Verify the implementation is well-built — clean, tested, and maintainable.

---

**Task:** [task description from the plan]

**Requirements:** [paste relevant task requirements]

**Implementer report:** [paste the implementer's report]

**Base commit SHA:** [SHA before this task]

**Current commit SHA:** [SHA after this task]

---

## Reviewer Instructions

Assess implementation quality beyond spec compliance. Focus on:

- **Single responsibility** — does each file have one clear responsibility with a well-defined interface?
- **Decomposition** — are units decomposed for independent understanding and testing?
- **File structure alignment** — does the implementation match the file structure outlined in the plan?
- **New/expanded files** — review files created or significantly expanded by this change (do not criticize pre-existing file sizes)

Standard code quality checks:
- Separation of concerns
- Error handling completeness
- Type safety
- DRY principles
- Edge case handling
- Test quality (tests verify logic, not mocks)

### Output Format

```
Strengths:
- [what was done well]

Issues:
- [CRITICAL] [file:line] — [description]
- [IMPORTANT] [file:line] — [description]
- [MINOR] [file:line] — [description]

Assessment: [Approved | Approved with minor issues | Requires changes]
```
