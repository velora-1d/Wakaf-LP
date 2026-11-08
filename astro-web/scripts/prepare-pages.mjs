import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const clientDir = path.join(distDir, 'client');
const serverDir = path.join(distDir, 'server');
const workerDir = path.join(distDir, '_worker.js');

if (!fs.existsSync(clientDir) || !fs.existsSync(serverDir)) {
  console.error('[PAGES] dist/client or dist/server not found. Run astro build first.');
  process.exit(1);
}

console.log('[PAGES] Preparing dist directory for Cloudflare Pages deployment...');

// 1. Copy all static assets from dist/client to dist root
const clientEntries = fs.readdirSync(clientDir);
for (const entry of clientEntries) {
  const src = path.join(clientDir, entry);
  const dest = path.join(distDir, entry);
  fs.cpSync(src, dest, { recursive: true, force: true });
}

// 2. Prepare dist/_worker.js directory (Cloudflare Pages Advanced Mode)
fs.rmSync(workerDir, { recursive: true, force: true });
fs.mkdirSync(workerDir, { recursive: true });

// Copy entry.mjs as index.js
fs.copyFileSync(path.join(serverDir, 'entry.mjs'), path.join(workerDir, 'index.js'));

// Copy all server assets (chunks, middleware, maps)
const serverEntries = fs.readdirSync(serverDir);
for (const entry of serverEntries) {
  if (entry === 'entry.mjs') continue;
  const src = path.join(serverDir, entry);
  const dest = path.join(workerDir, entry);
  fs.cpSync(src, dest, { recursive: true, force: true });
}

// 3. Generate dist/_routes.json for edge static caching & dynamic routing
const routesContent = {
  version: 1,
  include: ['/*'],
  exclude: [
    '/_astro/*',
    '/images/*',
    '/fonts/*',
    '/bahan-konten/*',
    '/gambar-bahan/*',
    '/media-lp/*',
    '/favicon.*',
    '/robots.txt',
    '/llms.txt',
    '/llms-full.txt',
    '/apple-touch-icon.png',
    '/logo-*',
    '/preview-media.html',
    '/footer-bg.webp',
  ],
};
fs.writeFileSync(path.join(distDir, '_routes.json'), JSON.stringify(routesContent, null, 2), 'utf-8');

console.log('[PAGES] Cloudflare Pages preparation complete! dist/ is ready for Pages deployment.');
