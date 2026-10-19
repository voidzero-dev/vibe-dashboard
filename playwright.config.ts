import { defineConfig } from "playwright/test";

const baseURL = "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "./tests/dev",
  outputDir: ".cache/playwright",
  forbidOnly: true,
  workers: 1,
  reporter: "list",
  use: {
    browserName: "chromium",
    baseURL,
  },
  webServer: {
    command: "vp dev apps/dashboard --host 127.0.0.1 --port 4173 --strictPort",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
    stdout: "pipe",
    env: { VITEST: "" },
  },
});
