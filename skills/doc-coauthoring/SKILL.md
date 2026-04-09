# Doc Co-Authoring Workflow

A structured three-stage process for collaborative document creation.

## When to Activate

Offer this workflow when users mention writing documentation, drafting proposals, creating specs, or similar content creation tasks.

## Three-Stage Workflow

### Stage 1: Context Gathering

Establish shared understanding before drafting anything.

1. **Meta-context questions**: Ask about audience, desired impact, format requirements, and constraints
2. **Information dump**: Have the user share everything relevant — project background, team discussions, technical details, organizational constraints, prior art
3. **Clarifying questions**: Close remaining knowledge gaps so you can offer intelligent guidance throughout

Goal: Transfer enough context that you can make smart editorial decisions later without repeatedly asking for background.

### Stage 2: Refinement & Structure

Build the document section-by-section through an iterative loop:

1. **Clarify** the goal of each section
2. **Brainstorm** 5–20 options for key choices (structure, framing, key points)
3. **Curate** — let the user select and combine options
4. **Check for gaps** before drafting
5. **Draft** the section
6. **Iterate** based on feedback using surgical edits

Instead of editing the document directly, ask the user to indicate what to change. This helps you learn their stylistic preferences and keeps them in control.

Use `str_replace` for all edits — never reprint the entire document. Provide a reference to the updated artifact after each change.

### Stage 3: Reader Testing

Verify the document works for someone without author context.

1. **Predict reader questions**: What will a first-time reader be confused by?
2. **Test with a fresh instance**: Use a new Claude conversation (or claude.ai) to simulate a reader with no prior context — this avoids context bleed from the authoring session
3. **Identify gaps**: Note where the fresh reader struggles, makes wrong assumptions, or asks questions the document should have answered
4. **Iterate**: Fix the gaps and re-test until the reader consistently gets the right answers

The workflow concludes when Reader Claude consistently answers questions correctly and the user completes a final verification pass.

## Key Principles

- **User agency**: Allow skipping or reordering stages if the user prefers a more freeform approach
- **Surgical edits**: Never reprint entire documents; use targeted replacements
- **Artifacts**: Use document artifacts for full sections; use conversation for brainstorming and iteration
- **Quality over speed**: Each iteration should meaningfully improve the content
- **Proactive gap-filling**: Surface context gaps early rather than letting them silently degrade the output
- **Learn preferences**: Observe the user's edits and feedback to internalize their voice and style
