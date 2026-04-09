# Academic Debugging Assessment

Six questions to verify understanding of the systematic debugging skill. Answer based solely on the skill content.

---

**Q1: What is the first phase of systematic debugging, and what does it prohibit?**

Phase 1 is Root Cause Investigation. It prohibits proposing or implementing any fix before tracing the root cause. No fixes without root cause investigation first.

---

**Q2: At what point does the skill mandate questioning the architecture?**

After three or more failed fix attempts. If three or more fixes fail to resolve the issue, stop patching symptoms and question the underlying architecture.

---

**Q3: What are the red flags that signal you should stop and restart the process?**

- Proposing solutions before tracing data flow
- Attempting multiple fixes simultaneously
- Continuing beyond 2–3 failed attempts without re-investigating

---

**Q4: What is the scientific method as applied in Phase 3?**

1. Form a specific hypothesis about the root cause
2. Test minimally — one change at a time
3. Verify results before proceeding to the next hypothesis

---

**Q5: What must be created before implementing a fix in Phase 4?**

A failing test case that reproduces the bug. Tests come before implementation, even during debugging.

---

**Q6: Why is systematic debugging described as faster than guess-and-check?**

Because guess-and-check produces fixes that don't address root causes, requiring rework. Systematic debugging takes more time upfront but eliminates rework cycles, resulting in lower total time — especially under time pressure when the temptation to shortcut is highest.
