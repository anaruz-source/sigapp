import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Pour GitHub Pages: remplacer 'sigapp' par le nom de votre dépôt
    base: '/sigapp/',
    server: {
        port: 3000
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
})
