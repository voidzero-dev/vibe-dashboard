import { defineConfig } from "@voidzero-dev/vite-plus";

export default defineConfig({
  fmt: {
    printWidth: 120,
  },
  test: {
    projects: ["apps/dashboard"],
  },
});
