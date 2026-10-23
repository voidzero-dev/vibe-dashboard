import tailwindcss from "@tailwindcss/vite";
import { playwright } from "vite-plus/test/browser-playwright";
import { defineConfig } from "vite-plus";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  experimental: {
    // Vitest does not support bundled dev mode: https://github.com/vitest-dev/vitest/issues/11052
    bundledDev: !process.env.VITEST,
  },
  build: {
    rolldownOptions: {
      output: {
        strictExecutionOrder: false,
      },
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
  },
});
