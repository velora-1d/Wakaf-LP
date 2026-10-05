import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://globalvillagefund.org',
  output: 'static', // Beralih ke 'server' atau 'hybrid' saat adapter SSR dipasang
});
