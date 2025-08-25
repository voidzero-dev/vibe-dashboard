# VP Command Integration Testing

This document describes the testing and integration of the `vp` (vite-plus) command into the vibe-dashboard project.

## Current Status

### Issues Discovered

1. **Native Binding Problem**: The `@voidzero-dev/global` package is missing Linux x64 native bindings
   - Package only includes `vite-plus.darwin-arm64.node` (macOS ARM64)
   - Running on Linux x64 requires `vite-plus.linux-x64-gnu.node` which is missing
   - This prevents the `pnpm vp` command from working

2. **Package Availability**: The package appears to be experimental/private
   - Not available on public npm registry
   - Uses commit hash version: `0.0.0-29f27bd710eb7aa75e16db0ba547db379543e148`

### What VP Should Provide

Based on the package documentation, `vp` (vite-plus) provides a unified CLI for:

- `vp new` - Scaffold new project
- `vp build [dir]` - Run vite build
- `vp optimize [dir]` - Run vite optimize  
- `vp preview [dir]` - Run vite preview
- `vp dev [dir]` - Run vite dev
- `vp lint [dir]` - Run oxlint
- `vp lib [dir]` - Run tsdown
- `vp test [dir]` - Run vitest
- `vp bench [dir]` - Run vitest bench
- `vp docs [dir]` - Run vitepress
- `vp task [name]` - Run script across workspace

## Testing Solution

Since the `vp` command cannot run due to missing native bindings, we created a **VP Simulator** (`tool/vp-simulator.js`) to:

1. **Demonstrate command mapping** - Shows how existing commands would be replaced
2. **Test functionality** - Verifies that the equivalent commands work
3. **Provide transition path** - Allows testing the concept before `vp` is fixed

### VP Simulator Commands

| Current Command | VP Equivalent | Simulator Command |
|----------------|---------------|-------------------|
| `pnpm dev` | `vp dev` | `pnpm vp:dev` |
| `pnpm build` | `vp build` | `pnpm vp:build` |
| `pnpm lint` | `vp lint` | `pnpm vp:lint` |
| `pnpm test` | `vp test` | `pnpm vp:test` |
| `pnpm --filter dashboard preview` | `vp preview` | `pnpm vp:preview` |

## Usage Examples

### Running VP Simulator

```bash
# Show help
pnpm vp:simulate --help

# Run specific commands
pnpm vp:build    # Simulates 'vp build'
pnpm vp:lint     # Simulates 'vp lint'
pnpm vp:dev      # Simulates 'vp dev'
pnpm vp:test     # Simulates 'vp test'
pnpm vp:preview  # Simulates 'vp preview'
```

### Direct Tool Usage

```bash
# Show available commands
node tool/vp-simulator.js --help

# Run specific command
node tool/vp-simulator.js build
node tool/vp-simulator.js lint
```

## Testing Results

✅ **VP Simulator Working**: All simulated commands execute successfully
✅ **Build Command**: `pnpm vp:build` completes without errors  
✅ **Lint Command**: `pnpm vp:lint` runs oxlint successfully
✅ **Help System**: Documentation and command listing works
❌ **Actual VP Command**: `pnpm vp` fails due to missing native bindings

## Future Implementation

Once the native binding issue is resolved:

1. **Replace simulator calls** with actual `vp` commands:
   ```json
   {
     "scripts": {
       "dev": "vp dev",
       "build": "vp build", 
       "lint": "vp lint",
       "test": "vp test",
       "preview": "vp preview"
     }
   }
   ```

2. **Remove simulator scripts** (vp:* commands)

3. **Update build-deploy** to use vp:
   ```json
   {
     "build-deploy": "vp lint && vp build"
   }
   ```

## Benefits of VP Integration

1. **Unified Interface**: Single command for all development tasks
2. **Simplified Scripts**: Shorter, more intuitive command names
3. **Workspace Awareness**: Automatic handling of monorepo structure
4. **Tool Integration**: Built-in support for modern toolchain
5. **Consistency**: Standardized interface across projects

## Recommendations

1. **Short-term**: Use VP simulator to test and validate the concept
2. **Medium-term**: Request Linux x64 native bindings from voidzero-dev team
3. **Long-term**: Migrate to actual `vp` commands once bindings are available

## Files Changed

- `package.json` - Added vp:* simulator commands
- `tool/vp-simulator.js` - Created VP command simulator
- `tool/VP_INTEGRATION.md` - This documentation file