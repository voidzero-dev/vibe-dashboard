# Vibe Dashboard

A modern frontend dashboard for displaying different metrics using bar charts. Built with React 19, TypeScript, Vite 7, and organized as a pnpm monorepo.

**ALWAYS follow these instructions first. Only fallback to additional search and context gathering if the information provided here is incomplete or found to be in error.**

## Working Effectively

### Prerequisites and Installation

- Install Node.js v20 or higher (verified working with v20.19.4)
- Install pnpm globally: `npm install -g pnpm` (requires pnpm v10 or higher)
- Bootstrap the repository:
  ```bash
  pnpm install
  ```
  - **Timing**: Takes approximately 10 seconds. NEVER CANCEL. Set timeout to 60+ seconds.

### Build and Development

- Build the project:
  ```bash
  pnpm build
  ```
  - **Timing**: Takes approximately 7 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
  - Builds TypeScript and creates production bundle with Vite
  - **Expected output**: Creates `dist/` directory in `apps/dashboard/` with minified assets

- Start development server:
  ```bash
  pnpm dev
  ```
  - Starts at `http://localhost:5173/`
  - **Timing**: Starts in under 1 second (192ms)
  - Uses Vite with hot module replacement (HMR)

- Lint the code:
  ```bash
  pnpm lint
  ```
  - **Timing**: Takes approximately 2 seconds
  - Runs ESLint across all packages
  - **ALWAYS run before committing** to avoid CI failures

- Format the code:
  ```bash
  pnpm fmt
  ```
  - **Timing**: Takes approximately 2 seconds
  - Runs dprint across all files
  - **ALWAYS run before committing** to avoid CI failures

- Clean build artifacts:
  ```bash
  pnpm clean
  ```
  - **Timing**: Takes under 1 second
  - Removes `dist/` directories

- Test command:
  ```bash
  pnpm test
  ```
  - **Note**: Currently no tests are configured, command runs but executes nothing
  - Takes under 1 second

- You run in an environment where `ast-grep` is available; whenever a search requires syntax-aware or structural matching, default to `ast-grep --lang rust -p '<pattern>'` (or set `--lang` appropriately) and avoid falling back to text-only tools like `rg` or `grep` unless I explicitly request a plain-text search.

### Repository Structure

```
vibe-dashboard/
├── .github/                # GitHub configuration
├── apps/
│   └── dashboard/          # Main React dashboard application
│       ├── src/
│       │   ├── App.tsx     # Main dashboard component with metrics data
│       │   ├── App.css     # Dashboard styles and responsive design
│       │   ├── main.tsx    # React entry point
│       │   └── ...
│       ├── package.json    # Dashboard-specific dependencies
│       ├── vite.config.ts  # Vite configuration
│       └── ...
├── packages/               # Shared packages (future use)
├── package.json           # Root package.json with workspace scripts
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── pnpm-lock.yaml        # Lock file
└── tsconfig.json         # Root TypeScript configuration
```

## Validation

### Manual Testing Scenarios

**ALWAYS test these scenarios after making changes:**

1. **Basic functionality**:
   - Run `pnpm dev` and navigate to `http://localhost:5173/`
   - Verify the dashboard loads with "Vibe Dashboard" header
   - Confirm Sales chart is displayed by default

2. **Interactive navigation**:
   - Click "User Activity" button → verify chart switches to stacked bars (Active/Inactive users)
   - Click "Revenue" button → verify chart switches to quarterly data (Q1, Q2, Q3, Q4)
   - Click "Sales" button → verify chart returns to monthly sales data

3. **Chart interactivity**:
   - Hover over chart bars → verify tooltips appear with data values
   - Test on different screen sizes for responsive behavior

4. **Statistics cards**:
   - Verify the stats grid below charts shows: Total Sales, Active Users, Revenue, Conversion Rate
   - Check that positive/negative change indicators are color-coded correctly

### Build Validation

- **ALWAYS run before committing**:
  ```bash
  pnpm lint && pnpm build
  ```
- Verify build completes without errors
- Check that no TypeScript compilation errors occur

## Common Tasks

### Adding New Metrics

1. Edit `apps/dashboard/src/App.tsx`
2. Add data array (follow pattern of `salesData`, `userActivityData`, `revenueData`)
3. Add metric object to `metrics` array with:
   - Unique `id`
   - Display `name`
   - Lucide React `icon`
   - Data array reference
   - Chart `color`
4. Customize chart rendering in the JSX if needed (current supports single bars and stacked bars)

### Key Files and Their Purpose

- `apps/dashboard/src/App.tsx` - **MOST IMPORTANT**: Contains all metrics data and chart logic
- `apps/dashboard/src/App.css` - Responsive dashboard styles with CSS Grid and Flexbox
- `package.json` (root) - Workspace scripts and shared dependencies
- `apps/dashboard/package.json` - App-specific dependencies (React, Recharts, Lucide icons)
- `pnpm-workspace.yaml` - Monorepo configuration

### Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7 (fast development and production builds)
- **Charts**: Recharts library for responsive bar charts
- **Icons**: Lucide React for UI icons
- **Styling**: Pure CSS with CSS Grid, Flexbox, and CSS variables
- **Package Management**: pnpm workspaces for monorepo structure

### Common Commands Reference

```bash
# Development workflow
pnpm install          # Install dependencies (~10s)
pnpm dev             # Start dev server (<1s startup)
pnpm build           # Production build (~7s)
pnpm lint            # Lint all packages (~2s)
pnpm clean           # Clean build artifacts (<1s)

# Monorepo-specific
pnpm --filter dashboard dev    # Run dev only for dashboard
pnpm -r build                  # Build all packages recursively
```

### Troubleshooting

- **Build fails**: Check TypeScript errors, run `pnpm lint` first
- **Dev server won't start**: Ensure port 5173 is available
- **Charts not rendering**: Verify Recharts data format matches expected structure
- **Styles broken**: Check CSS imports in `App.tsx` and `main.tsx`

### Development Notes

- Uses Vite's fast refresh for instant updates during development
- TypeScript strict mode enabled for better code quality
- ESLint configured with React and TypeScript rules
- No test framework currently configured (future enhancement opportunity)
- Responsive design supports mobile and desktop viewports
