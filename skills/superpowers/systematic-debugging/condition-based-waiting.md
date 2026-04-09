# Condition-Based Waiting

Replace arbitrary delays with condition-based waiting to eliminate flaky tests.

**Core principle:** Wait for the actual condition you care about, not a guess about how long it takes.

## When to Use

Apply this pattern when tests:
- Contain arbitrary `setTimeout` or `sleep` calls
- Exhibit flakiness under normal or parallel execution
- Await async operations completing

**Exception:** Do not use when testing actual timing behavior (debounce, throttle intervals).

## The Core Pattern

**Poor approach:**
```javascript
await new Promise(r => setTimeout(r, 50));
const result = getResult();
```

**Better approach:**
```javascript
await waitFor(() => getResult() !== undefined);
const result = getResult();
```

## Generic Polling Implementation

```javascript
async function waitFor(condition, timeout = 5000, interval = 10) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await condition()) return;
    await new Promise(r => setTimeout(r, interval));
  }
  throw new Error(`Condition not met within ${timeout}ms`);
}
```

## Common Mistakes

- **Polling too frequently** — wastes CPU; 10ms is usually sufficient
- **Omitting timeouts** — causes infinite loops; always set a reasonable max
- **Using stale cached data** — retrieve fresh values inside the polling loop

## When Arbitrary Timeouts Are Acceptable

Only acceptable when:
1. Combined with condition-based waiting first
2. Based on documented, known system timing
3. Clearly commented with justification

## Real Results

Replacing arbitrary delays with condition-based waiting improved one test suite from 60% → 100% pass rate while reducing execution time by 40%.

See `condition-based-waiting-example.ts` for a TypeScript utility implementation.
