# Visual Companion Guide

A browser-based visual brainstorming tool for when visuals enhance understanding better than text.

## When to Use the Browser

Use browser rendering for:
- UI mockups and wireframes
- Architecture diagrams
- Side-by-side comparisons
- Design polish considerations
- Spatial relationships

Use the terminal instead for:
- Requirements discussions
- Conceptual choices
- Trade-off analysis
- Technical decisions
- Clarifying questions

**Decision rule:** "Would the user understand this better by seeing it than reading it?" Decide per-question, not per-session.

## Server Setup

```bash
bash scripts/start-server.sh --project-dir /path/to/project
```

Returns connection details including the screen URL and state directory path.

The system automatically wraps HTML content fragments in the frame template unless the file includes full document structure.

## The Working Loop

1. Verify server status via `$STATE_DIR/server-info`
2. Write semantic HTML files to `screen_dir` (unique filenames each time — never reuse)
3. Communicate the URL and content summary to the user
4. Read `$STATE_DIR/events` on subsequent turns to capture browser interactions
5. Iterate or advance based on feedback
6. Push a waiting screen when returning to terminal-only work

## Available CSS Components (from frame-template.html)

| Class | Purpose |
|-------|---------|
| `.options` / `.option` | A/B/C choice lists with letter badges |
| `.cards` / `.card` | Grid of selectable design cards |
| `.mockup` | Framed UI mockup container |
| `.split` | Two-column side-by-side comparison |
| `.pros-cons` | Pros and cons columns |
| `.placeholder` | Dashed placeholder area |
| `.mock-nav`, `.mock-sidebar`, `.mock-content` | Inline mockup elements |

## File Management

- Use semantic naming conventions (`login-options-v1.html`, `dashboard-layout-v2.html`)
- Never reuse filenames — append version suffixes for iterations
- The server automatically serves the newest file by modification time

## Stopping the Server

```bash
bash scripts/stop-server.sh <session_dir>
```
