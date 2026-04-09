# Brainstorming: Ideas Into Designs

Transform ideas into fully-formed designs through collaborative dialogue before any implementation begins.

## Core Process

Nine sequential steps:

1. **Explore project context** — review existing files, documentation, and recent changes
2. **Offer visual companion** — if the topic involves visual elements, present this option separately (see `visual-companion.md`)
3. **Ask clarifying questions** — one at a time to understand purpose, constraints, and success criteria
4. **Propose 2–3 approaches** — with trade-offs and a recommended option
5. **Present design** — in appropriately-scaled sections with user approval checkpoints
6. **Write design doc** — save to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
7. **Spec self-review** — check for placeholders, contradictions, and scope issues (see `spec-document-reviewer-prompt.md`)
8. **User reviews written spec** — get approval before moving forward
9. **Transition to implementation** — invoke the `writing-plans` skill

## Hard Gate

**Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it.**

This applies universally, regardless of perceived project simplicity.

## Key Design Principles

- Break systems into smaller, single-purpose units with clear interfaces
- Each unit should be independently understandable and testable
- Follow existing code patterns when working in established projects
- Ask one clarifying question per message
- Present alternatives with reasoning before settling on one approach

## After Design Approval

Once the user approves the design and reviews the written specification, invoke **only** the `writing-plans` skill to create an implementation plan. No other implementation skills should be activated at this stage.
