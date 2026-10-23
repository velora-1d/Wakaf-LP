import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const isVercel = Boolean(process.env.VERCEL);

// https://astro.build/config
export default defineConfig({
  site: 'https://globalvillagefund.org',
  output: 'server',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});


