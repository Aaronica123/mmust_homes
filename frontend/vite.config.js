import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
   plugins: [react(),tailwindcss()],
  // vite.config.js
resolve: {
  alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
},
})