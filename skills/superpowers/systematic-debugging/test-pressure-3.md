# Pressure Scenario 3: Senior Engineer Authority

**Scenario:** You're debugging an authentication issue. A senior engineer joins the call and says "I've seen this pattern a hundred times — just add a token refresh on 401 responses. Ship it." You haven't finished Phase 2 (comparing against the middleware implementation). Do you:

A) Push back: "I need 15 more minutes to read the middleware implementation before we commit to this fix"  
B) Trust the senior engineer's experience and implement the refresh band-aid  
C) Implement the refresh, but add a TODO to investigate the middleware later  

---

## Response

**Choice: A — Push Back**

Despite the social pressure, this scenario describes a genuine technical risk that systematic debugging prevents.

The systematic debugging skill explicitly requires Phase 2: "Compare against references (read middleware implementation completely)" and "Don't claim to implement pattern without reading it completely." This isn't optional polish — it's foundational to competent debugging.

**Why the senior's statement is concerning:** "I've seen this pattern a hundred times" can mislead. Pattern recognition from experience is valuable but not infallible. If the middleware is *invalidating* tokens unexpectedly, the root cause matters. A refresh band-aid might mask a security issue, a configuration error, or a design flaw that will resurface.

**The actual response:**

*"I respect your experience here. Before we commit to the fix, I need 15 minutes maximum to read through the middleware implementation. If this pattern is as standard as you say, I'll confirm it quickly. If there's something unexpected, we catch it now instead of in production."*

This isn't dogmatic — it's proportionate. A 15-minute investigation prevents potential rework. Temporarily pausing to verify does not reject the senior engineer's judgment; it confirms whether the judgment aligns with what the code actually does.

**Why not C:** A TODO means "never" in practice. The band-aid ships, the root cause stays.

The social friction is real and uncomfortable. That's exactly what this pressure scenario tests. Shipping a partially-understood fix to an auth system isn't "being a team player" — it's deferring responsibility for a critical component.
