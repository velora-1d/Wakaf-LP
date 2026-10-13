import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://globalvillagefund.org',
  output: 'static', // Beralih ke 'server' atau 'hybrid' saat adapter SSR dipasang
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});


