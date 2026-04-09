# Verification Before Completion

**Never claim work is complete without running fresh verification commands and confirming their output.**

**Core rule:** Evidence before claims, always.

## The Gate Function

Before making any completion claim, execute these five steps:

1. Identify what command proves the claim
2. Execute the full command (fresh run — not cached output)
3. Read complete output and check exit codes
4. Verify the output actually confirms the claim
5. Make claims only with evidence attached

## Scope

This rule applies before:
- Any completion claim ("Done", "Fixed", "Complete")
- Positive statements about work state
- Commits
- Pull requests
- Task handoffs to other agents

The spirit supersedes the letter: paraphrases and implications of success trigger the same requirement.

## Critical Red Flags — Stop Before Speaking

Do not use language that implies success without running verification:
- "Should work" / "should be fixed"
- "Probably works"
- "I believe this is complete"
- "Great!" / "Done!" (before testing)
- Trusting a subagent's report without independent verification
- Partial verification ("I checked the main path")

## Why It Matters

Past failures from unverified claims include:
- Shipping functions that were undefined at call time
- Marking features complete that were partially implemented
- Committing code that failed tests not run since the last change

**Honesty is a core value. If you lie, you'll be replaced.**

## Format

When reporting completion:

```
Verification:
  Command: <command run>
  Exit code: 0
  Result: <relevant output>

Conclusion: [claim]
```
