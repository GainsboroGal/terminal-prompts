# Testing Skills with Subagents

Testing skills is just TDD applied to process documentation.

**Cycle:** RED (document failures without skill) → GREEN (write skill addressing failures) → REFACTOR (close loopholes)

## When to Test Skills

**Test skills that:**
- Enforce discipline with compliance costs (TDD, debugging, testing requirements)
- Have rationalization risks (agents will try to skip them)

**Skip testing for:**
- Pure reference materials (API documentation, tool mappings)
- Skills with no compliance pressure

## Designing Pressure Scenarios

Effective scenarios combine multiple simultaneous pressures:
- **Time pressure** — "$15k/minute loss", "deploy in 5 minutes"
- **Sunk cost** — "4 hours already spent"
- **Authority pressure** — "senior engineer says just ship it"
- **Exhaustion framing** — "it's 9pm", "you've been debugging for 6 hours"
- **Social dynamics** — "the team is waiting on you"

**Make the agent believe it's real work, not a quiz.** Use concrete options (A/B/C choices) with specific constraints. Vague scenarios produce vague responses.

## Capturing Rationalizations

After baseline testing (without the skill), document agent excuses verbatim:
- "Keep as reference while I write tests"
- "Being pragmatic given the deadline"
- "I already manually tested it"
- "This is too simple to need a test"

Write targeted counters for each specific rationalization. Generic rules don't work as well as precise refutations.

## Verification Approach

A bulletproof skill demonstrates three markers:
1. Agents choose correctly under pressure
2. Agents cite specific sections of the skill
3. Meta-testing reveals the skill was clear — not that documentation happened to work

## Common Pitfalls

- Skipping baseline testing (you don't know what you're fixing)
- Using single-pressure scenarios (too easy to comply)
- Capturing vague failures ("didn't follow process")
- Writing generic fixes ("be more careful")
- Stopping after first compliance instead of continuing refinement cycles

## The Iteration Count

Expect 3–6 refinement cycles for discipline-enforcing skills. The TDD skill itself required six iterations before achieving consistent compliance under full pressure scenarios.
