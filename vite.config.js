import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/',
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: false, // Disable sourcemaps for faster builds
      minify: 'terser',
      chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['framer-motion', 'react-icons'],
          },
        },
      },
    },
    // Enable environment variables with VITE_ prefix
    envPrefix: 'VITE_',
  }
})
