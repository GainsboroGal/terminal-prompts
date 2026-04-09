# Plan Document Reviewer Prompt

Use this template to dispatch a plan review subagent after writing the plan to `docs/superpowers/plans/`.

---

**Dispatch timing:** After the complete plan is written.

**Reviewer task:** Verify the plan is complete, aligned with the spec, and executable without getting stuck.

**Review checklist:**

**Completeness:**
- [ ] No TODOs or placeholder content
- [ ] Every task has explicit implementation steps
- [ ] All file paths are literal

**Spec alignment:**
- [ ] Every requirement from the spec is covered by at least one task
- [ ] No tasks implement features not in the spec (YAGNI)

**Task decomposition:**
- [ ] Tasks are 2–5 minutes each
- [ ] Each task is independently understandable
- [ ] TDD flow is present (failing test → verify → implement → verify → commit)

**Buildability:**
- [ ] No forward references to undefined types or functions
- [ ] Type and function signatures are consistent across tasks
- [ ] Commands are literal and runnable

**Calibration:** Flag only serious implementation blockers: missing spec requirements, contradictory steps, placeholder content, or tasks so vague an engineer would get stuck. Minor stylistic or cosmetic issues do not warrant blocking approval.

**Key question:** "Could an engineer follow this plan without getting stuck?"

**Expected output:**

```
Status: [Approved | Issues Found]

Blocking issues (if any):
- [Task N] — [specific problem and its implementation impact]

Advisory recommendations (optional):
- [Suggestion]
```
