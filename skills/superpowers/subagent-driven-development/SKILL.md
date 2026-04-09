# Subagent-Driven Development

Delegate implementation tasks to specialized subagents within a single session.

## When to Use

Apply this methodology when you have:
1. A finalized implementation plan
2. Mostly independent tasks
3. Intent to remain in the current session

Differs from parallel-session execution: maintains continuous progress without handoffs while preserving your coordination context.

## Process Per Task

```
Dispatch implementer → Answer clarifying questions → Implementer executes + self-reviews + commits
→ Spec compliance reviewer validates → Code quality reviewer validates
→ Loop if issues → Mark complete
```

If reviewer finds issues: implementer fixes → reviewer validates again.

## Model Assignment

| Task type | Model |
|-----------|-------|
| Mechanical (isolated, well-specified) | Cheaper model |
| Multi-file integration | Standard model |
| Architectural decisions | Most capable model |

## Templates

- `implementer-prompt.md` — template for dispatching implementer subagents
- `spec-reviewer-prompt.md` — template for spec compliance review
- `code-quality-reviewer-prompt.md` — template for code quality review

## Critical Safeguards

- Never skip either review stage
- Never proceed with open issues
- Never start implementation on production branches without explicit consent
- If a subagent reports being blocked: adjust approach, add context, upgrade model, or break the task smaller — do not force retry
