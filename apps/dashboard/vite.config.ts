import tailwindcss from "@tailwindcss/vite";
import { playwright } from "vite-plus/test/browser-playwright";
import { defineConfig } from "vite-plus";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  base: "/vibe-dashboard/",
  experimental: {
    enableNativePlugin: true,
  },
  build: {
    rolldownOptions: {
      experimental: {
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
