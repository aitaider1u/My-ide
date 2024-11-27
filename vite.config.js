import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  
  base: '/my-ide/', // Nom du dépôt GitHub
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
})
