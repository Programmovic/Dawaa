import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    postcss({
      plugins: [tailwindcss],
    }),
  ],
});