import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// Proxy konfigurasjon for å omgå CORS ved lokal utvikling
// Kilde: https://stackoverflow.com/questions/64677212/how-to-configure-proxy-in-vite
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app.ticketmaster.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})



