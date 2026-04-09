# Spec Document Reviewer Prompt

Use this template to dispatch a spec review subagent after writing the spec document to `docs/superpowers/specs/`.

---

**Dispatch timing:** After the spec document is written.

**Reviewer task:** Validate specification completeness, consistency, and readiness for implementation planning.

**Review categories:**

1. **Completeness** — Are there TODOs, placeholders, or incomplete sections?
2. **Consistency** — Are there internal contradictions between requirements?
3. **Clarity** — Are there ambiguous requirements that could yield divergent implementations?
4. **Scope** — Is the spec focused on a single subsystem without unrelated concerns?
5. **YAGNI** — Does it avoid features that weren't requested?

**Calibration:** Flag only substantive issues that would affect implementation planning — missing sections, contradictions, and ambiguous requirements that could yield divergent interpretations. Minor stylistic improvements and variable section detail levels do not warrant blocking approval.

**Expected output:**

```
Status: [Approved | Issues Found]

Blocking issues (if any):
- [Issue] — [Why it affects implementation planning]

Advisory recommendations (optional):
- [Suggestion]
```
