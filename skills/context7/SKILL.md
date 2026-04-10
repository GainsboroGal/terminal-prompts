# Context7 Skill

Fetches up-to-date, version-specific library documentation and code examples directly into context — eliminating hallucinated APIs and outdated training data.

**Source**: https://github.com/upstash/context7  
**Stars**: 52k+ | **Package**: `ctx7` (npm)

## When to use this skill

Use Context7 when the question involves:
- Library/framework setup or configuration ("How do I set up Next.js middleware?")
- API syntax for a specific library ("Create a Prisma database query")
- Version-specific behavior ("React 19 concurrent features", "Next.js 15 App Router")
- Any named framework: React, Vue, Svelte, Express, Tailwind, Django, Spring Boot, Supabase, Prisma, etc.

**Do NOT use for**: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Setup

### Quickest: one command

```bash
npx ctx7 setup
# or target Claude Code specifically:
npx ctx7 setup --claude
```

Handles OAuth, generates an API key, and installs the integration automatically.

### Manual MCP config

Add to `~/.claude/mcp.json` (global, recommended):

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_CONTEXT7_API_KEY"
      }
    }
  }
}
```

Get a free API key at https://context7.com/dashboard

## Two modes

### Mode A: MCP (native tools)

Claude gets two tools: `resolve-library-id` and `query-docs`.

**Process:**
1. Call `resolve-library-id` with the library name and the user's question
2. Pick the best match (exact name > benchmark score > source reputation)
   - Try alternate names if results look wrong: "next.js" vs "nextjs"
   - Use version-specific IDs when user mentions a version: `/vercel/next.js/15`
3. Call `query-docs` with the library ID and the user's **complete question** (not single keywords)
4. Answer based solely on the fetched documentation

**In prompts**, trigger explicitly:
```
How do I set up Next.js 15 middleware? use context7
Implement Supabase auth. use library /supabase/supabase
```

### Mode B: CLI (no MCP required)

```bash
# Step 1: resolve the library ID
npx ctx7@latest library react "how do I use useTransition"

# Step 2: fetch docs with the ID from step 1
npx ctx7@latest docs /facebook/react "how do I use useTransition"
```

- Library IDs require a leading `/`: `/facebook/react`, `/vercel/next.js`
- Always run `library` first — `docs` fails without a valid ID
- Limit to 3 commands per question
- Use full questions, not single keywords
- For version-specific: `/vercel/next.js/15.0.0`

## Library ID format

```
/org/project           # latest version
/org/project/version   # specific version
```

Examples:
- `/facebook/react`
- `/vercel/next.js`
- `/prisma/prisma`
- `/supabase/supabase`
- `/tailwindlabs/tailwindcss`

If a user provides an ID in this format, skip `resolve-library-id` and go straight to `query-docs`.

## Authentication

```bash
npx ctx7 login          # browser OAuth
npx ctx7 login --no-browser

# Or via env var (no interactive prompts):
export CONTEXT7_API_KEY=your-key-here
```

Most read-only features work without auth. Skill generation requires login.

## Config placement

Context7 is a global tool — put it in `~/.claude/mcp.json`, not a project config. Documentation lookups are useful in every project and your API key should stay private.
