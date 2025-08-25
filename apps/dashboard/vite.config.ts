import { defineConfig } from 'rolldown-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  base: '/vibe-dashboard/',
  experimental: {
    enableNativePlugin: true,
  },
  build: {
    rolldownOptions: {
      experimental: {
        strictExecutionOrder: false
      }
    }
  }
})
