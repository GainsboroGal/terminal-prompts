# Using Git Worktrees

Create isolated workspaces within a shared repository for parallel branch development.

## Directory Selection Priority

Follow this order — do not skip steps:

### Step 1: Check Existing Directories

Look for `.worktrees/` first (preferred), then `worktrees/`. If both exist, `.worktrees/` takes precedence.

### Step 2: Review CLAUDE.md

Search the project configuration file for documented worktree directory preferences. Honor them without asking additional questions.

### Step 3: Request User Input

When neither directory exists nor preferences are documented, ask the user to choose between:
- `.worktrees/` — project-local, hidden
- `~/.config/superpowers/worktrees/<project-name>/` — global

## Safety Verification

**Project-local locations:**

Verify the directory is gitignored:
```bash
git check-ignore .worktrees/
```

If not ignored, add it to `.gitignore` and commit before proceeding. This prevents accidentally tracking worktree contents.

**Global locations:** No gitignore verification needed.

## Setup Process

Five sequential phases:

1. **Detect project name** — extract from repository root
2. **Create worktree** — `git worktree add <path> -b <branch-name>`
3. **Run project setup** — auto-detect and install dependencies (Node, Rust, Python, Go)
4. **Verify baseline** — run the test suite to confirm a clean starting state
5. **Report status** — confirm readiness with test results and full path

## Never Skip

- Verify project-local directories are gitignored before use
- Run baseline test verification before beginning work
- Do not proceed if baseline tests fail without explicit user approval
- Do not assume directory locations — always check existing conventions first
