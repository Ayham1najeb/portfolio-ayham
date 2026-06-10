import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-ayham/',
  root: 'src',
  build: {
    outDir: '../',
    emptyOutDir: false,
  }
})
