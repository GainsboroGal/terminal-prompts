# Requesting Code Review

Request code reviews through the `superpowers:code-reviewer` subagent to catch issues early.

**Principle:** Review early, review often.

## When Reviews Are Required

**Mandatory:**
- After completing tasks in subagent-driven development
- Upon finishing major features
- Before merging to the main branch

**Beneficial:**
- When stuck and needing a fresh perspective
- Establishing a baseline before refactoring
- Validating complex bug fixes

## Request Process

1. Obtain the git SHA of the base commit (before your work)
2. Obtain the git SHA of the current commit (your work)
3. Dispatch a `superpowers:code-reviewer` subagent using the template in `code-reviewer.md`
4. Populate the template with: implementation details, requirements, commit hashes, description

## Handling Feedback

| Severity | Action |
|----------|--------|
| Critical | Fix immediately before proceeding |
| Important | Fix before proceeding |
| Minor | Schedule for later; acceptable to continue |

You may respectfully challenge feedback when supported by code evidence.

## Integration by Workflow

| Workflow | When to review |
|----------|---------------|
| Subagent-driven development | After each task |
| Plan execution | After task batches |
| Ad-hoc development | Before merging |

## Non-Negotiables

- Never skip reviews regardless of perceived simplicity
- Never proceed with unresolved critical or important issues
