import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "rolldown-vite";

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
});
