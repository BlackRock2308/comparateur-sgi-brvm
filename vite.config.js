import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' + HashRouter → l'app fonctionne hébergée n'importe où (statique, sous-dossier).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
