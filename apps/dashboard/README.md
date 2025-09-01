# React + TypeScript + Vite

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and fast linting using oxlint.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Oxlint Configuration

This project uses [oxlint](https://oxc.rs) for linting, which provides significantly faster performance than ESLint while maintaining compatibility with most ESLint rules.

The configuration is in `.oxlintrc.json` and includes:

- TypeScript plugin for TypeScript-specific rules
- React plugin for React best practices
- Unicorn plugin for additional code quality rules
- OXC plugin for unique optimization rules

To run linting:

```bash
pnpm lint
```

To customize the configuration, edit `.oxlintrc.json`. Oxlint supports most ESLint configuration options.

## Rolldown Stats Integration

This dashboard displays build statistics from different rolldown versions, automatically updated via CI when changes are made to the dashboard code.
