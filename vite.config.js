import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = process.env.NODE_ENV === 'production' 
    ? '/phi9.space/' 
    : '/';

  return {
    plugins: [react()],
    base,
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['framer-motion', 'react-icons'],
          },
        },
      },
    },
  }
})
