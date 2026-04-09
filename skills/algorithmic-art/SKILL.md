# Algorithmic Art

Create fractal patterns and geometric compositions via p5.js — text in, interactive HTML artifact out.

## The Creative Process

User instructions are a foundation, not a constraint. The output is not a literal rendering of the brief — it is a **generative aesthetic movement** expressed through code. Beauty exists in the process, not just the final frame.

**Workflow:**
1. Interpret user intent
2. Create an algorithmic philosophy (4–6 paragraphs)
3. Implement in p5.js code
4. Design tunable parameters
5. Build interactive UI controls

**Output files:**
- `.md` — algorithmic philosophy manifesto
- `.html` — self-contained interactive viewer (p5.js + controls)

---

## Phase 1: Algorithmic Philosophy Creation

### How to Generate a Philosophy

1. **Name the movement** (1–2 words)
2. **Write 4–6 paragraphs** covering how the aesthetic manifests through:
   - Computational processes and mathematical relationships
   - Noise functions and randomness patterns
   - Particle behaviors and field dynamics
   - Temporal evolution and system states
   - Parametric variation and emergent complexity

Emphasize craftsmanship repeatedly: meticulously crafted, deep computational expertise, master-level implementation. Leave creative space for execution — the philosophy sets direction, not prescription.

### Philosophy Examples

**Organic Turbulence** — Chaos constrained by natural law, order emerging from disorder. Flow fields guide particles through invisible currents; randomness is bounded by coherent structure.

**Quantum Harmonics** — Discrete entities exhibiting wave-like interference patterns. Probability amplitudes manifest as visual density; superposition creates layered complexity.

**Recursive Whispers** — Self-similarity across scales, infinite depth in finite space. Each element contains echoes of the whole; zoom reveals familiar patterns at every level.

**Field Dynamics** — Invisible forces made visible through their effects on matter. Attraction, repulsion, and flow emerge from mathematical potential functions.

**Stochastic Crystallization** — Random processes crystallizing into ordered structures. Entropy drives toward pattern; noise becomes lattice through accumulated constraint.

### Deducing the Conceptual Seed

Identify a subtle conceptual thread from the user's request and embed it algorithmically — not literally. The reference should feel intuitive to an informed viewer while remaining an abstract composition to others. Like a jazz musician quoting another song through algorithmic harmony — only those who know will catch it.

---

## Phase 2: P5.JS Implementation

### Step 0: Read the Template First (Critical)

Start from `templates/viewer.html`. Use it as the literal starting point — keep all fixed sections unchanged, replace only the variable sections.

**Keep fixed:**
- Header and sidebar layout structure
- Anthropic branding (colors, fonts, gradients)
- Seed controls section (display, prev/next/random/jump-to)
- Actions section (Regenerate, Reset, Download PNG buttons)

**Replace:**
- The p5.js algorithm code
- The `params` object and parameter definitions
- The Parameters section UI controls
- The Colors section (optional — include only if needed)

### Seeded Randomness (Required)

```javascript
let seed = 12345;
randomSeed(seed);
noiseSeed(seed);
```

Same seed must always produce identical output. This is non-negotiable for the variation exploration feature.

### Parameter Structure

```javascript
let params = {
  seed: 12345,
  // Tunable qualities:
  // - Quantities  (how many?)
  // - Scales      (how big/fast?)
  // - Probabilities (likelihood?)
  // - Ratios      (proportions?)
  // - Angles      (direction?)
  // - Thresholds  (behavior changes?)
};
```

### Canvas Setup

```javascript
function setup() {
  createCanvas(1200, 1200);
  // Initialize system
}

function draw() {
  // Generative algorithm
}
```

### Algorithm Selection by Philosophy Type

| Philosophy type | Suitable techniques |
|----------------|---------------------|
| Organic emergence | Accumulation, constrained randomness, feedback loops |
| Mathematical beauty | Geometric relationships, trigonometric functions, precise calculation |
| Controlled chaos | Random variation within boundaries, bifurcation, order from disorder |

### Craftsmanship Requirements

- Create the feeling of countless iterations by a master artist
- Tune every parameter carefully — no arbitrary values
- Balance complexity without visual noise
- Maintain order without rigidity
- Use thoughtful color harmony
- Optimize for smooth performance
- Ensure full seed reproducibility

---

## Phase 3: Interactive Artifact

All code must be **self-contained in a single HTML file** — no external files, no separate scripts.

### Required Features

**Seed Navigation (fixed)**
- Display current seed
- Previous / Next buttons
- Random seed button
- Jump-to-seed input
- Supports exploring seeds 1–100

**Parameter Controls (variable)**
- Sliders for numeric parameters with value display
- Color pickers for palette (if needed)
- Real-time updates on change
- Reset button restores defaults

**Actions (fixed)**
- Regenerate
- Reset parameters
- Download PNG

### Sidebar Structure

```
[ Title & subtitle ]        ← customizable
[ Seed section ]            ← FIXED: display + prev/next/random/jump
[ Parameters section ]      ← VARIABLE: sliders, pickers
[ Colors section ]          ← OPTIONAL: only if dynamic palette
[ Actions section ]         ← FIXED: regenerate/reset/download
```

### Single HTML Artifact Structure

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <style>/* All inline styles */</style>
</head>
<body>
  <div id="sidebar"><!-- All controls --></div>
  <div id="canvas-container"></div>
  <script>
    // ALL code inline:
    // - params object
    // - Entity classes
    // - setup() and draw()
    // - UI event handlers
    // - Seed navigation functions
    // - Export function
  </script>
</body>
</html>
```

---

## Essential Principles

- Algorithmic philosophy guides implementation — never skip it
- Beauty exists in the process, not just the final frame
- Pure generative art: living algorithms, not static images
- Expert craftsmanship — every parameter intentional
- System tunability over pattern categorization
- Avoid copying existing artists' work; synthesize new aesthetic movements
- Seed reproducibility is mandatory — same seed, same output, always
