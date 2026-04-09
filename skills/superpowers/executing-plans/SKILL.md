# Executing Plans

Implement a pre-written plan with structured checkpoints and verification at every step.

## Core Process

### Step 1: Load and Review

- Read the plan critically before starting
- Flag concerns or ambiguities before beginning implementation
- Create a todo list if no issues exist

### Step 2: Set Up Isolated Workspace

Use the `using-git-worktrees` skill to create an isolated branch before writing any code.

### Step 3: Execute Tasks

- Work through each task systematically
- Mark progress as you go
- Run all verifications specified in the plan — do not skip any

### Step 4: Complete Development

Use the `finishing-a-development-branch` skill to verify and finalize.

## When to Pause

Stop immediately when encountering:
- Missing dependencies
- Unexpected test failures
- Unclear or contradictory instructions

**Ask for clarification rather than guessing.**

## Critical Constraints

- Never start implementation on `main` or `master` without explicit user approval
- If the plan has gaps or needs rethinking, return to the review step rather than forcing forward
- Follow plan steps exactly — do not improvise around blockers

## Integrated Skills

This skill coordinates three others:
- `using-git-worktrees` — isolated workspace setup
- `writing-plans` — if the plan needs to be revised
- `finishing-a-development-branch` — completion and merge options
