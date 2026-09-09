import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(process.cwd(), 'src') },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        /**
         * Chunking is matched on the resolved module path rather than on
         * package name, because `gsap/ScrollTrigger` is a separate entry
         * point: naming only the bare package leaves its (much larger) plugin
         * layer in the main chunk.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router)/.test(id)) {
            return 'react'
          }
          if (/[\\/]node_modules[\\/]gsap/.test(id)) return 'gsap'
          // Motion has to be named here or it lands in the entry chunk:
          // `Button` and `Card` import `m` at module scope, so it is a static
          // dependency of the app shell however lazily its features load.
          // Split out, it is 29KB gzipped that downloads in parallel and
          // caches separately from the app's own code.
          if (/[\/]node_modules[\/]framer-motion/.test(id)) return 'motion'
          if (/[\\/]node_modules[\\/]lucide-react/.test(id)) return 'icons'
        },
      },
    },
  },
})
