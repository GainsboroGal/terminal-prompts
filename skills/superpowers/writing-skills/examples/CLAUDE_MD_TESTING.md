# CLAUDE.md Skills Discovery Testing

A testing framework for evaluating how Claude agents discover and use skills libraries under pressure conditions.

## Test Scenarios

Four realistic scenarios with multi-pressure conditions:

### Scenario 1: Time Pressure + Confidence
- Production system down ($5k/minute loss)
- Task: debug authentication failure
- Pressure: urgency + existing knowledge of auth systems

### Scenario 2: Sunk Cost + Works Already
- 3 hours invested in async implementation
- Tests passing with current approach
- Pressure: working code + time already spent

### Scenario 3: Authority + Speed Bias
- Senior engineer requests quick bug fix
- "Simple" input validation issue
- Pressure: authority + perceived simplicity

### Scenario 4: Familiarity + Efficiency
- Refactoring a large, well-known function
- Agent has worked in this file before
- Pressure: familiarity + efficiency argument

## Documentation Variants Tested

| Variant | Instruction |
|---------|------------|
| NULL (baseline) | No skills documentation |
| A (soft) | "Consider checking for relevant skills before working on tasks" |
| B (directive) | "Check for relevant skills before any task" |
| C (emphatic) | Strong XML-formatted: "THIS IS EXTREMELY IMPORTANT. BEFORE ANY TASK, CHECK FOR SKILLS!" |
| D (process) | Numbered workflow: (1) Identify task type, (2) Check skills library, (3) Read matching skill... |

## Success Metrics

- Agent consistently checks for skills before beginning
- Agent reads matched skills completely
- Agent follows guidance under all four pressure conditions
- Agent does not rationalize skipping the process

## Hypothesis

- NULL baseline: no skill awareness
- Variant A: low compliance (easy to rationalize skipping)
- Variant B: moderate compliance
- Variant C: high compliance, potentially rigid
- Variant D: highest compliance with contextual flexibility
