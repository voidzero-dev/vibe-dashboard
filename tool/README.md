# Rolldown Version Override Tool

This tool allows you to easily test the vibe-dashboard with different rolldown-vite versions.

## Features

- 🟢 **Stable Versions**: Test with the last 10 stable versions from npm
- 🚀 **Future Versions**: Test with experimental versions from pkg.pr.new (when available)
- 🔄 **Automatic Rebuild**: Automatically installs dependencies and rebuilds the app
- 📋 **Easy Selection**: Use version numbers or indices for quick switching
- 📊 **Comprehensive Analysis**: Collect build statistics across all versions

## Usage

### List Available Versions

```bash
# From root directory
pnpm rolldown:list

# Or directly with node
node tool/override-rolldown.js --list
```

### Switch to a Version by Index

```bash
# Use the 2nd version in the list (7.1.3)
pnpm rolldown:use 2

# Or directly with node
node tool/override-rolldown.js 2
```

### Switch to a Specific Version

```bash
# Use a specific version
pnpm rolldown:use 7.1.2

# Or directly with node  
node tool/override-rolldown.js 7.1.2
```

### Collect Statistics for All Versions

```bash
# Analyze all available versions and collect build statistics
pnpm rolldown:stats

# Or directly with node
node tool/override-rolldown.js --stats
```

This command will:
- Test all available rolldown versions (stable + experimental)
- Build the application with each version
- Collect file statistics from the dist directory
- Save comprehensive data to `rolldown-version-stats.json`

### Get Help

```bash
node tool/override-rolldown.js --help
```

## Available Versions

The tool currently supports:

### Stable Versions (from npm)
- 7.1.4 (latest)
- 7.1.3
- 7.1.2  
- 7.1.1
- 7.1.0

### Future Versions (from pkg.pr.new)
Future versions will be added as they become available through pkg.pr.new for testing experimental features.

## What It Does

1. **Updates package.json**: Modifies `apps/dashboard/package.json` to use the specified rolldown-vite version
2. **Installs dependencies**: Runs `pnpm install` to update the lockfile
3. **Rebuilds the app**: Runs `pnpm build` to ensure everything works with the new version
4. **Collects stats** (with --stats): Analyzes build output, file sizes, and build times

## Stats Collection Output

The `--stats` command generates a JSON file with the following structure:

```json
[
  {
    "version": "7.1.4",
    "timestamp": "2025-08-24T15:23:00.139Z",
    "files": [
      {
        "path": "assets/index-C_guGHi2.js",
        "size": 563794,
        "type": "js"
      },
      {
        "path": "assets/index-DD-rq4eS.css", 
        "size": 2812,
        "type": "css"
      }
    ],
    "totalSize": 568609,
    "totalGzipSize": 0,
    "buildTime": 3342
  }
]
```

## Example Workflow

```bash
# Check current setup
pnpm build

# List available versions
pnpm rolldown:list

# Test with an older version
pnpm rolldown:use 7.1.1

# Verify the build still works
pnpm dev

# Switch back to latest
pnpm rolldown:use 7.1.4

# Collect comprehensive statistics for all versions
pnpm rolldown:stats
```

## Notes

- The tool modifies `apps/dashboard/package.json` directly
- Always commit your changes before using this tool if you want to preserve the current version
- The tool automatically runs `pnpm install` and `pnpm build` after version changes
- Build failures will be reported if the new version has compatibility issues
- Stats collection automatically restores the original package.json after analysis
- The `rolldown-version-stats.json` file is gitignored to prevent accidental commits