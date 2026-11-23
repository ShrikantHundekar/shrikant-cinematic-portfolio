import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'framer-motion': ['framer-motion'],
          'lenis': ['lenis'],
          'lucide': ['lucide-react'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap', 'framer-motion', 'lenis', 'lucide-react'],
  },
})