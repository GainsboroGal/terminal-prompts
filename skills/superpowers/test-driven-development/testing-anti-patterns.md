# Testing Anti-Patterns

**Core principle:** Test what the code does, not what the mocks do.

Mocks serve to isolate components, not to become the subject of testing.

## The Five Anti-Patterns

### 1. Testing Mock Behavior

**Problem:** Asserting that a mock was called rather than verifying real behavior.

**Fix:** Test actual component behavior, or remove the mock entirely if the dependency can run in tests.

**Gate function:** Before adding a mock assertion, ask: "Am I testing my code or testing that the mock works?"

### 2. Test-Only Methods in Production

**Problem:** Adding methods to production classes solely for test cleanup (e.g., `reset()`, `clearState()`).

**Fix:** Move cleanup logic to dedicated test utilities. Production classes should not have test-specific APIs.

### 3. Mocking Without Understanding

**Problem:** Creating mocks without grasping what the dependency actually does — its side effects, return values, and error states.

**Fix:** Understand the dependency completely before mocking it. Read its implementation or documentation first.

### 4. Incomplete Mocks

**Problem:** Partial mock objects that omit fields downstream code requires, causing tests to pass while hiding real failures.

**Fix:** Mirror complete real API responses. If the real API returns `{ id, name, status, metadata }`, the mock must include all fields.

### 5. Integration Tests as Afterthought

**Problem:** Treating integration tests as optional follow-up work done after units are complete.

**Fix:** TDD naturally prevents this. Write integration tests as part of the RED phase, not after GREEN.

## Gate Functions

Before mocking:
- Do I understand what this dependency does?
- Can I use the real implementation instead?
- Will my mock accurately reflect production behavior?

Before asserting:
- Am I asserting on real behavior or mock artifacts?
- Would this test catch an actual bug in my code?

Before changing production code for tests:
- Does this change belong in a test utility instead?
- Am I coupling production code to test concerns?
