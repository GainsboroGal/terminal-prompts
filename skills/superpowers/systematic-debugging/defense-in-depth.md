# Defense-in-Depth Validation

Validate at every layer data passes through. Make the bug structurally impossible.

**Problem:** A single validation check can be circumvented through multiple code paths, refactoring, or test mocks.

**Solution:** Defensive checks across all four layers that data passes through.

## The Four-Layer Framework

### Layer 1: Entry Point Validation

First line of defense at API boundaries. Reject obviously problematic inputs before they progress deeper.

```typescript
function createProject(dir: string) {
  if (!dir || dir.trim() === '') {
    throw new Error('Project directory cannot be empty');
  }
  // ...
}
```

### Layer 2: Business Logic Validation

Ensure incoming data aligns with operation requirements, catching edge cases that entry-level checks miss.

```typescript
function initializeGit(projectDir: string) {
  if (!projectDir) {
    throw new Error('Cannot initialize git: projectDir is empty');
  }
  // ...
}
```

### Layer 3: Environment Guards

Prevent dangerous operations within specific contexts, such as refusing file operations outside expected directories.

```typescript
function runInTestEnvironment(dir: string) {
  if (!dir.startsWith('/tmp/') && !dir.includes('test-')) {
    throw new Error(`Refusing to operate outside test directory: ${dir}`);
  }
  // ...
}
```

### Layer 4: Debug Instrumentation

Capture contextual information — stack traces, working directories, environment variables — to diagnose failures when other safeguards prove insufficient.

```typescript
console.error('Unexpected empty dir', {
  stack: new Error().stack,
  cwd: process.cwd(),
  env: process.env.PROJECT_DIR,
});
```

## Why All Four Layers Are Necessary

In a real-world case, an empty `projectDir` caused unintended git initialization in the source directory. During testing, each layer caught bugs the others missed. All four were necessary.

**The crucial takeaway:** Layered validation — not individual checks — creates genuinely robust systems.
