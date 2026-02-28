# Vibe Dashboard

React 19 + TypeScript + Vite 7 dashboard. pnpm monorepo.

## Prerequisites

Install the global `vp` CLI first (see https://staging.viteplus.dev/vite/guide/):

```bash
# Linux / macOS
curl -fsSL https://staging.viteplus.dev/install.sh | bash

# Windows
irm https://staging.viteplus.dev/install.ps1 | iex
```

## Commands

```bash
vp install     # Install deps (~10s, timeout 60s+)
vp dev         # Dev server at localhost:5173
vp run build   # Production build (~7s)

# Check (lint + format)
vp run check
vp run check:fix
```

## Structure

- `apps/dashboard/src/App.tsx` - Main dashboard with metrics
- `apps/dashboard/src/App.css` - Styles
- Root `package.json` - Workspace scripts

## Adding Metrics

Edit `App.tsx`: Add data array + metric object with id/name/icon/data/color.

## Search

You run in an environment where `ast-grep` is available; whenever a search requires syntax-aware or structural matching, default to `ast-grep --lang rust -p '<pattern>'` (or set `--lang` appropriately) and avoid falling back to text-only tools like `rg` or `grep` unless I explicitly request a plain-text search.

## Always

- Run `vp run check && vp run build` before commits
- Prefer editing existing files over creating new ones
- Don't create docs unless explicitly requested
