# Rolldown Version Override Tool

This tool allows you to easily test the vibe-dashboard with different rolldown-vite versions.

## Features

- 🟢 **Stable Versions**: Test with the last 5 stable versions from npm
- 🚀 **Future Versions**: Test with experimental versions from pkg.pr.new (when available)
- 🔄 **Automatic Rebuild**: Automatically installs dependencies and rebuilds the app
- 📋 **Easy Selection**: Use version numbers or indices for quick switching

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
```

## Notes

- The tool modifies `apps/dashboard/package.json` directly
- Always commit your changes before using this tool if you want to preserve the current version
- The tool automatically runs `pnpm install` and `pnpm build` after version changes
- Build failures will be reported if the new version has compatibility issues