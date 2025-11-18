import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/vibe-dashboard/",
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
