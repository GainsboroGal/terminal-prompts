# Tavily MCP Skill

Real-time web search, content extraction, site mapping, and web crawling for Claude Code via the Tavily MCP server.

**Source**: https://github.com/tavily-ai/tavily-mcp  
**API Key**: https://app.tavily.com/home

## When to use this skill

Use Tavily when you need:
- Current information beyond Claude's training cutoff
- Live web search results for research tasks
- Extracting structured data from specific URLs
- Mapping the structure of a website
- Crawling a site for comprehensive content

## Available Tools

| Tool | What it does |
|------|-------------|
| `search` | Real-time web search |
| `extract` | Pull structured data from a URL |
| `map` | Create a structural map of a website |
| `crawl` | Systematically explore a site |

## Installation

### Fastest: Remote server via Claude Code CLI

```bash
# With API key in URL (simplest)
claude mcp add --transport http tavily "https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY"

# Global (available in all projects)
claude mcp add --transport http --scope user tavily "https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY"

# OAuth (no key embedded in URL)
claude mcp add --transport http tavily https://mcp.tavily.com/mcp
# Then run: claude → /mcp → complete auth flow
```

### Manual config (mcp.json)

**Remote server** (no local install needed):
```json
{
  "mcpServers": {
    "tavily": {
      "type": "http",
      "url": "https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY"
    }
  }
}
```

**Local server** (Node.js v20+ required):
```json
{
  "mcpServers": {
    "tavily-mcp": {
      "command": "npx",
      "args": ["-y", "tavily-mcp@latest"],
      "env": {
        "TAVILY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Default Parameters (optional)

Add to your config to tune all searches:
```json
{
  "env": {
    "TAVILY_API_KEY": "your-key",
    "DEFAULT_PARAMETERS": "{\"search_depth\": \"advanced\", \"max_results\": 10, \"include_images\": false}"
  }
}
```

`search_depth`: `"basic"` (faster) or `"advanced"` (more thorough)

## Usage Patterns

Once connected, use naturally in Claude Code chat:

```
Search for the latest React 19 release notes
Extract the API documentation from https://docs.example.com/api
Map the structure of https://example.com
Research current best practices for WebSocket authentication
```

## Where to put the config

**User-global** (recommended for Tavily — API key stays private, works in all projects):
```
~/.claude/mcp.json
```

**Project-local** (if using OAuth so no keys are embedded):
```
your-project/.claude/mcp.json
```

Avoid committing your API key to a project config — use the global scope or OAuth instead.

## Reset OAuth credentials

```bash
rm -rf ~/.mcp-auth
```
