# Systematic Debugging

Find root causes before attempting fixes.

**Core rule: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.**

Symptom fixes mask underlying problems. Systematic debugging is faster than guess-and-check, especially under time pressure. Rushing to implement fixes guarantees rework.

## Four-Phase Process

### Phase 1: Root Cause Investigation

- Read error messages carefully
- Reproduce the issue consistently
- Review recent changes
- Gather diagnostic evidence
- For multi-component systems: add instrumentation at each boundary to identify where failures occur

### Phase 2: Pattern Analysis

- Locate similar working code
- Compare implementations completely
- Identify differences
- Understand dependencies

### Phase 3: Hypothesis and Testing

Apply the scientific method:
1. Form a specific hypothesis
2. Test minimally — one change at a time
3. Verify results before proceeding

### Phase 4: Implementation

1. Create a failing test case first
2. Implement a focused fix that addresses the root cause
3. Verify success

**If three or more fixes fail: question the architecture.** Do not continue patching symptoms.

## Red Flags — Stop and Restart

- Proposing solutions before tracing data flow
- Attempting multiple fixes simultaneously
- Continuing beyond 2–3 failed attempts without re-investigating

## Supporting Guides

- `condition-based-waiting.md` — replacing flaky timeouts with condition polling
- `defense-in-depth.md` — multi-layer validation to make bugs structurally impossible
- `root-cause-tracing.md` — systematic backward tracing through call chains
- `find-polluter.sh` — binary search for test pollution
- `test-pressure-1.md`, `test-pressure-2.md`, `test-pressure-3.md` — pressure scenario responses
