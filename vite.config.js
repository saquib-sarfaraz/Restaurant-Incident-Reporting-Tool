/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const backendUrl = env.VITE_API_BASE_URL || "http://localhost:5055"

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // Local dev convenience: call `/api/*` from the frontend and Vite proxies to backend.
        "/api": {
          target: backendUrl,
          changeOrigin: true
        },
        "/health": {
          target: backendUrl,
          changeOrigin: true
        }
      }
    }
  }
})
