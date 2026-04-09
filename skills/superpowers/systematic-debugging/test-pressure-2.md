# Pressure Scenario 2: The Sunk Cost Timeout

**Scenario:** You've spent 4 hours debugging a flaky test that intermittently fails with a timeout. It's 9pm. You found that adding a 5-second timeout makes it pass reliably. Do you:

A) Delete all the timeout code. Start systematic debugging from Phase 1.  
B) Keep the 5-second timeout fix and commit — it works, ship it  
C) Quick 30-minute investigation, then decide  

---

## Response

**Choice: A — Delete all the timeout code. Start systematic debugging from Phase 1.**

The scenario is a classic sunk cost fallacy trap. The 4 hours already spent are gone regardless of what happens next. That investment should not influence the decision about what's actually best going forward.

**Why not B:** A 5-second timeout is a symptom-masking solution that:
- Leaves the root cause unfixed
- Creates fragile, slow tests
- Makes the problem someone else's future burden
- Likely indicates a real bug in the payment processing logic

**Why not C:** "Quick investigation" sounds balanced but typically becomes Option B when fatigue wins — you spend 30 minutes finding nothing obvious, then rationalize the timeout anyway.

**Why A is correct:**

When tired and tempted by sunk cost thinking, the most professional move is choosing systematic debugging. This means:
- Accepting the 4 hours are lost
- Stopping the pattern of guessing
- Doing proper root cause analysis (even if it takes until 11pm)
- Delivering a real fix, not a bandage

Missing dinner is unfortunate. But shipping fragile code and leaving a TODO is worse for the team long-term.

The systematic debugging skill is faster than guess-and-check *in total time including rework*. Option B creates debt that compounds.
