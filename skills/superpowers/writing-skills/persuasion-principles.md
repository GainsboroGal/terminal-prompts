# Persuasion Principles for Skill Design

Research by Meincke et al. (2025) demonstrated that persuasion techniques more than doubled compliance rates in AI conversations: 33% → 72% (p < .001) across 28,000 conversations.

LLMs, trained on human text patterns, naturally respond to the same persuasion principles that influence humans.

## The Seven Principles

### 1. Authority — Use for discipline-enforcing skills

Imperative language eliminates decision fatigue in safety-critical contexts.

```
YOU MUST invoke this skill before writing any code.
NEVER skip the root cause investigation phase.
```

### 2. Commitment — Use for accountability

Require explicit announcements or choices. Agents remain consistent with prior statements.

```
Before starting: announce "I am using the systematic-debugging skill."
```

### 3. Scarcity — Use to prevent procrastination

Create urgency through time-bound requirements or sequential dependencies.

```
This must be completed before invoking any implementation skill.
```

### 4. Social Proof — Use to establish norms

Universal patterns signal expected behavior.

```
Every engineer on this team runs the test suite before merging.
Always verify before claiming completion.
```

### 5. Unity — Use in collaborative workflows

Shared identity and mutual goals in team-based contexts.

```
As part of this development team, we maintain these standards together.
```

### 6. Reciprocity — Generally discouraged

Rarely needed in skill design; can feel manipulative. Avoid unless clearly beneficial.

### 7. Liking — Explicitly avoided for compliance enforcement

Conflicts with honest feedback culture. Do not use to enforce discipline.

## Skill-Type Matrix

| Skill type | Best principles |
|------------|----------------|
| Discipline-enforcing (TDD, debugging) | Authority, Commitment, Scarcity |
| Collaborative workflow | Unity, Social Proof |
| Reference/pattern | Social Proof |
| Technique | Commitment |

## Ethical Application

Apply persuasion techniques only when they serve users' genuine interests.

**Legitimate:** Preventing predictable failures by enforcing proven practices.

**Illegitimate:** False urgency, guilt-based compliance, manipulating against the user's interests.

Test: "Does this technique help the agent serve the user better?" If no, don't use it.
