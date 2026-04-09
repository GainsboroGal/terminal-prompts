# Root Cause Tracing

Trace errors backward through the call stack to find the original trigger, then fix at the source.

**Core principle:** Do not fix where the error manifests. Find what initially caused the problematic state.

## The Tracing Process

1. Observe the symptom
2. Identify what code directly causes it
3. Determine what called that code
4. Track values passed through the chain
5. Locate the original trigger

Repeat steps 2–4 until you reach the true root.

## Instrumentation Techniques

Add diagnostic logging before problematic operations:

```typescript
// Before the failing operation
console.error('About to call initializeGit', {
  projectDir,
  stack: new Error().stack,
  cwd: process.cwd(),
});
```

Capture:
- Stack traces via `new Error().stack`
- Contextual data: directories, environment variables, timestamps
- Values at each layer boundary

## Finding Test Pollution

When a test passes alone but fails in a suite, use bisection to find the polluter:

```bash
./find-polluter.sh '.git' 'src/**/*.test.ts'
```

See `find-polluter.sh` for the bisection script.

## Practical Example

An empty `projectDir` caused unintended git initialization in the source directory. Tracing backward:

```
git init called with empty dir
  ← initializeGit('') called
    ← createProject received empty projectDir
      ← test setup completed before variable assignment
        ← ROOT CAUSE: top-level variable read before test setup ran
```

Fix was applied at the root: ensuring test setup completed before any variable access.

## Key Principle

Avoid fixing symptoms. Implement validation at each layer of the call chain to make the underlying bug impossible to occur (see `defense-in-depth.md`).
