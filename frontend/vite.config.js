import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0',  // Important for Docker
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://backend_app:5000',  // Use container name!
        changeOrigin: true,
        secure: false,
      }
    }
  }
})