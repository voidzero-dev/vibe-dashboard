# Setup Node.js and pnpm Action

A reusable composite action that consolidates Node.js and pnpm installation steps for the Vibe Dashboard project.

## Features

- ✅ Sets up Node.js with configurable version (defaults to LTS)
- ✅ Sets up pnpm using the project's configured version
- ✅ Optional pnpm store caching for faster builds
- ✅ Automatic dependency installation with configurable lockfile mode
- ✅ Environment variable handling for GitHub tokens

## Usage

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v5

  - name: Setup Node.js and pnpm
    uses: ./.github/actions/setup-node-pnpm
    with:
      # Optional inputs
      node-version: 'lts/*'        # Default: 'lts/*'
      enable-cache: true           # Default: 'true'
      frozen-lockfile: true        # Default: 'true'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `node-version` | Node.js version to install | No | `'lts/*'` |
| `enable-cache` | Enable pnpm store caching | No | `'true'` |
| `frozen-lockfile` | Use frozen lockfile for pnpm install | No | `'true'` |

## What it does

1. **Setup Node.js**: Installs the specified Node.js version
2. **Setup pnpm**: Installs pnpm using the project's configured version (from `packageManager` field)
3. **Cache pnpm store** (optional): Sets up caching for pnpm store to speed up subsequent runs
4. **Install dependencies**: Runs `pnpm install` with optional `--frozen-lockfile` flag

## Examples

### CI/CD with caching and frozen lockfile
```yaml
- name: Setup Node.js and pnpm
  uses: ./.github/actions/setup-node-pnpm
  with:
    enable-cache: true
    frozen-lockfile: true
```

### Deployment without strict lockfile requirements
```yaml
- name: Setup Node.js and pnpm
  uses: ./.github/actions/setup-node-pnpm
  with:
    enable-cache: false
    frozen-lockfile: false
```

### Custom Node.js version
```yaml
- name: Setup Node.js and pnpm
  uses: ./.github/actions/setup-node-pnpm
  with:
    node-version: '20'
    enable-cache: true
    frozen-lockfile: true
```