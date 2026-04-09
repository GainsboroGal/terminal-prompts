# Dispatching Parallel Agents

Efficiently handle multiple independent problems by assigning each to a specialized agent working concurrently.

**Core rule:** Dispatch one agent per independent problem domain. Let them work concurrently.

## When to Use

**Good fit:**
- Multiple unrelated failures across different test files or subsystems
- Problems that can be understood independently without shared context
- No interference between investigations

**Avoid when:**
- Failures are interconnected or require full system understanding
- Agents would compete for shared resources
- Problems require sequential context from each other

## The Four-Step Process

### 1. Identify Independent Domains

Group failures by what's broken. Example:
- Tool approval failures
- Batch completion failures
- Abort functionality failures

### 2. Create Focused Tasks

Each agent receives:
- Specific scope (one clear problem domain)
- Clear objectives
- Constraints
- Expected outputs

### 3. Dispatch Simultaneously

Launch all agents concurrently rather than sequentially.

### 4. Review and Integrate

- Verify agent summaries
- Check for conflicts between findings
- Run comprehensive tests after integration

## Writing Effective Agent Instructions

Good prompts are:
- **Focused** — one clear problem domain
- **Complete** — include all context needed to understand the problem
- **Specific** — define exactly what the agent should return

**Bad:** "Fix all the tests"

**Good:** "Fix agent-tool-abort.test.ts — the abort signal is not being propagated through the tool execution pipeline. The test expects `AbortError` but receives `TimeoutError`. Here are the relevant files: [...]. Return a summary of root cause and the fix applied."

## Real Impact

A documented debugging session resolved 6 failures across 3 files using three parallel agents, completing all investigations simultaneously with zero conflicts.
