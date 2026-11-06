import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import cloudflare from '@astrojs/cloudflare';

const isVercel = Boolean(process.env.VERCEL);
const isCloudflare = Boolean(process.env.CLOUDFLARE) || Boolean(process.env.CF_PAGES);

function getAdapter() {
  if (isCloudflare) {
    return cloudflare({
      imageService: 'passthrough',
    });
  }
  if (isVercel) {
    return vercel();
  }
  return node({ mode: 'standalone' });
}

// https://astro.build/config
export default defineConfig({
  site: 'https://globalvillagefund.org',
  output: 'server',
  adapter: getAdapter(),
  session: false,
  image: {
    service: passthroughImageService(),
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
