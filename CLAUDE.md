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
vp run dev     # Dev server at localhost:5173
vp run build   # Production build (~7s)
vp check       # Check (lint + format)
vp check --fix # Check and auto-fix
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

- Run `vp check && vp run build` before commits
- Prefer editing existing files over creating new ones
- Don't create docs unless explicitly requested

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
