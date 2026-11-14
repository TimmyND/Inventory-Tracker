import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:8000',
      '/logout': 'http://localhost:8000',
      '/product': 'http://localhost:8000'
    },
  }
})
