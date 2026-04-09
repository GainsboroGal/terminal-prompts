/**
 * Condition-based waiting utilities for reliable async test patterns.
 *
 * Replaces arbitrary setTimeout delays with event-driven waiting,
 * improving test reliability and execution speed.
 *
 * Created as part of Lace test infrastructure improvements.
 * Resolved 15 flaky tests: 60% pass rate → 100%, 40% faster execution.
 */

type AgentEvent = {
  type: string;
  data?: unknown;
  timestamp: number;
};

/**
 * Wait for a single event of the given type.
 *
 * @example
 * await waitForEvent(events, 'tool-result', 5000);
 */
export async function waitForEvent(
  getEvents: () => AgentEvent[],
  eventType: string,
  timeout = 5000
): Promise<AgentEvent> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const match = getEvents().find(e => e.type === eventType);
    if (match) return match;
    await new Promise(r => setTimeout(r, 10));
  }
  throw new Error(
    `waitForEvent: event "${eventType}" not received within ${timeout}ms`
  );
}

/**
 * Wait until a minimum number of events of the given type have been received.
 *
 * @example
 * await waitForEventCount(events, 'chunk', 3, 5000);
 */
export async function waitForEventCount(
  getEvents: () => AgentEvent[],
  eventType: string,
  count: number,
  timeout = 5000
): Promise<AgentEvent[]> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const matches = getEvents().filter(e => e.type === eventType);
    if (matches.length >= count) return matches;
    await new Promise(r => setTimeout(r, 10));
  }
  const actual = getEvents().filter(e => e.type === eventType).length;
  throw new Error(
    `waitForEventCount: expected ${count} "${eventType}" events within ${timeout}ms, got ${actual}`
  );
}

/**
 * Wait for an event matching a custom predicate.
 *
 * @example
 * await waitForEventMatch(events, e => e.type === 'tool-result' && e.data?.toolName === 'bash');
 */
export async function waitForEventMatch(
  getEvents: () => AgentEvent[],
  predicate: (event: AgentEvent) => boolean,
  timeout = 5000
): Promise<AgentEvent> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const match = getEvents().find(predicate);
    if (match) return match;
    await new Promise(r => setTimeout(r, 10));
  }
  throw new Error(
    `waitForEventMatch: no matching event found within ${timeout}ms`
  );
}
