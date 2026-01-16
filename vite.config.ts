import { defineConfig } from "vite-plus";

export default defineConfig({
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
  },
  test: {
    projects: ["apps/dashboard"],
  },
});
