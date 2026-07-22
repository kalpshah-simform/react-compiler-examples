import path from 'node:path'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// `compilationMode: 'all'` compiles every function in a matched file, not just
// ones that look like components/hooks — restrict matching to `.tsx` (where
// our components live) so plain `.ts` logic/data modules are never touched.
const compilerPreset = reactCompilerPreset({
  compilationMode: 'all',
})
compilerPreset.rolldown.filter ??= {}
compilerPreset.rolldown.filter.id = { include: [/\.tsx$/] }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [compilerPreset],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
