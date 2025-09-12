import tailwindcss from '@tailwindcss/vite';
import { defineProject } from 'vitest/config';

export default defineProject({
  plugins: [tailwindcss()],
  base: '/vibe-dashboard/',
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    globals: true,
    environment: 'happy-dom',
  },
});
