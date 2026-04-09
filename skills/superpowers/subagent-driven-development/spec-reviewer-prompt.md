# Spec Compliance Reviewer Prompt Template

Use this template after the implementer subagent completes a task, before the code quality review.

---

**Task:** Verify that the implementation matches its specification exactly.

**Specification:** [paste task requirements from the plan]

**Implementer report:** [paste the implementer's report]

**Commit range:** [base SHA]..[current SHA]

---

## Reviewer Instructions

Your job: verify the builder delivered exactly what was requested — nothing more, nothing less.

**Do not take the implementer's word for what they implemented.** Read the actual code and compare line by line against requirements.

### Review Categories

1. **Missing requirements** — features skipped or not implemented despite claims
2. **Extra/unneeded work** — over-engineering or features outside the specification
3. **Misunderstandings** — requirements interpreted incorrectly or the wrong problem solved

### Verification Method

Inspect actual code to confirm completeness and accuracy. Do not rely on the implementer's summary.

### Output Format

```
Status: [✅ Spec compliant | ❌ Issues found]

Issues (if any):
- [file:line] — [requirement] was [expected] but found [actual]

Notes:
- [any observations that don't block approval]
```
