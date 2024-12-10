import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors:true,
    proxy: {
      '/api/v1/token': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/token/, '/api/token'),
        secure: true, // Set to false if you're dealing with self-signed certificates
      },
    },
  },
})
