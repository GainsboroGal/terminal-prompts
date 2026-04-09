# Test-Driven Development

**Core rule: NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**

This ensures you actually observe tests catching bugs rather than writing code that happens to pass immediately-written tests. Tests written after implementation pass immediately, proving nothing. Passing immediately proves nothing.

## The Three-Phase Cycle

### RED

Write a minimal failing test demonstrating the desired behavior before any implementation exists. Verify it fails for the right reason.

### GREEN

Implement only the simplest code necessary to make the test pass. No over-engineering, no speculative features.

### REFACTOR

Improve code quality while keeping tests passing. Do not add behavior during this phase.

## Non-Negotiable Requirements

- Delete any code written before its test
- Never "keep as reference" while writing tests
- Verify each test fails for the right reason before implementing
- Confirm all tests pass before moving forward
- Use real code patterns; minimize mocks

## Completion Checklist

Before declaring a task complete, verify:
- [ ] Every function/behavior has a test
- [ ] Each test initially failed (you observed the failure)
- [ ] Implementations stayed minimal
- [ ] All tests now pass cleanly

## Common Rationalizations — Reject All of These

| Rationalization | Why it's wrong |
|----------------|----------------|
| "Tests after achieve the same goals" | They don't — you never observe the test catching the bug |
| "It's too simple to test" | Simple code has bugs too; the discipline matters |
| "I'll write tests later" | Later means never |
| "Manual testing is sufficient" | Manual testing is ad-hoc and unreproducible |
| "I'll refactor later" | REFACTOR is the third phase, not a future task |

See `testing-anti-patterns.md` for more patterns to avoid.
