import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 1. Load all env vars (including those without VITE_ prefix, if you really need them)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 2. Expose `process.env` in your code if you must use that syntax
    define: {
      'process.env': env
    },

    // 3. Plugins
    plugins: [react()],

    // 4. Build options
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'index.html'
      },
      base: '/'
    }
  }
})
