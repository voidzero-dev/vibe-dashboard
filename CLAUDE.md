# Vibe Dashboard

React 19 + TypeScript + Vite 7 dashboard. pnpm monorepo.

## Commands
```bash
pnpm install   # Install deps (~10s, timeout 60s+)
pnpm dev       # Dev server at localhost:5173
pnpm build     # Production build (~7s)
pnpm lint      # Run ESLint
pnpm fmt       # Format with dprint
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
- Run `pnpm lint && pnpm build` before commits
- Prefer editing existing files over creating new ones
- Don't create docs unless explicitly requested