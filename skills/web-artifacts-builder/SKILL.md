# Web Artifacts Builder

Build calculators, dashboards, and interactive tools from natural language — no frontend skills needed. Outputs a single self-contained HTML file ready to use as a Claude.ai artifact.

**Stack**: React 18 + TypeScript + Vite + Parcel + Tailwind CSS + shadcn/ui

---

## Process (5 Steps)

### Step 1: Initialize the project

```bash
bash scripts/init-artifact.sh <project-name>
```

This scaffolds a fully configured project with:
- React + TypeScript via Vite
- Tailwind CSS 3.4.1 with shadcn/ui theming
- Path aliases (`@/`)
- 40+ pre-installed shadcn/ui components
- All Radix UI dependencies
- Parcel bundler configuration
- Node 18+ compatibility

### Step 2: Develop the artifact

Edit the generated source files. See **Common Development Tasks** below.

### Step 3: Bundle to a single HTML file

Run from inside the project directory:

```bash
bash scripts/bundle-artifact.sh
```

Outputs `bundle.html` — a fully self-contained artifact with all dependencies inlined.

Requirements: `index.html` must exist in the project root.

### Step 4: Share the artifact

Provide `bundle.html` as a Claude.ai artifact in the conversation.

### Step 5: Test (optional)

Skip upfront testing to minimize latency. Test locally by opening `bundle.html` in a browser if the user requests verification.

---

## Design & Style Guidelines

To avoid generic "AI slop" aesthetics, **do not use**:
- Excessive centered layouts
- Purple gradients
- Uniform rounded corners everywhere
- Inter font as the default

Make intentional design choices that suit the artifact's purpose and audience.

---

## Common Development Tasks

### Importing shadcn/ui components

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
```

### Available components (40+)

```
accordion        alert           aspect-ratio     avatar
badge            breadcrumb      button           calendar
card             carousel        checkbox         collapsible
command          context-menu    dialog           drawer
dropdown-menu    form            hover-card       input
label            menubar         navigation-menu  popover
progress         radio-group     resizable        scroll-area
select           separator       sheet            skeleton
slider           sonner          switch           table
tabs             textarea        toast            toggle
toggle-group     tooltip
```

### Starting the dev server

```bash
cd <project-name>
pnpm dev
```

---

## Requirements

- Node.js 18 or higher
- `pnpm` (auto-installed by `init-artifact.sh` if missing)
- `shadcn-components.tar.gz` must be present alongside the scripts

---

## Reference

- [shadcn/ui components](https://ui.shadcn.com/docs/components)
