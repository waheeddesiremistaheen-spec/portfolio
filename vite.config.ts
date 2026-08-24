import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Allow the sandbox preview host (and any future ones) to reach the dev server
    allowedHosts: ['.e2b.app', 'localhost'],
  },
})
