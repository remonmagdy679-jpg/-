import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    // Relative paths: the built site in dist/ works from any address or sub-folder
    // (GitHub Pages, Netlify, a hotel server, or opened from a folder).
    base: './',
    build: {
        // The product landing pages are one lazy chunk of long multilingual copy (loaded only when opened).
        chunkSizeWarningLimit: 650,
    },
});
