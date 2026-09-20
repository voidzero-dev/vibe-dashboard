import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    plugins: ["unicorn", "typescript", "oxc", "react", "vitest", "jsx-a11y", "import"],
    categories: {
      correctness: "deny",
      suspicious: "warn",
      perf: "deny",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-debugger": "error",
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
    },
    ignorePatterns: ["dist"],
    options: {
      typeCheck: true,
      typeAware: true,
    },
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    projects: ["apps/dashboard"],
  },
});
