import type { APIRoute } from 'astro';
import { getActiveNewsArticles } from '../lib/db';

export const prerender = false;

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.toString() : 'https://globalvillagefund.org').replace(/\/$/, '');
  const now = new Date().toISOString().split('T')[0];

  // Halaman Statis & Program Utama
  const staticUrls: SitemapUrl[] = [
    { loc: `${baseUrl}/`, lastmod: now, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/program/wakaf`, lastmod: now, changefreq: 'weekly', priority: '0.95' },
    { loc: `${baseUrl}/program/infaq`, lastmod: now, changefreq: 'weekly', priority: '0.90' },
    { loc: `${baseUrl}/program/sedekah`, lastmod: now, changefreq: 'weekly', priority: '0.90' },
    { loc: `${baseUrl}/program/zakat`, lastmod: now, changefreq: 'weekly', priority: '0.90' },
    { loc: `${baseUrl}/kabar`, lastmod: now, changefreq: 'daily', priority: '0.85' },
    { loc: `${baseUrl}/tentang-kami`, lastmod: now, changefreq: 'monthly', priority: '0.80' },
    { loc: `${baseUrl}/kemitraan`, lastmod: now, changefreq: 'monthly', priority: '0.80' },
    { loc: `${baseUrl}/contact`, lastmod: now, changefreq: 'monthly', priority: '0.80' },
  ];

  // Ambil artikel berita yang dipublikasikan dari database
  let articleUrls: SitemapUrl[] = [];
  try {
    const articles = await getActiveNewsArticles(500);
    articleUrls = articles.map((article) => {
      const dateSource = article.updatedAt || article.publishedAt || article.createdAt;
      const lastmod = dateSource ? new Date(dateSource).toISOString().split('T')[0] : now;
      return {
        loc: `${baseUrl}/kabar/${article.slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: '0.70',
      };
    });
  } catch (error) {
    console.error('[Sitemap] Gagal mengambil artikel dari DB:', error);
  }

  const allUrls = [...staticUrls, ...articleUrls];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ''}
    ${item.priority ? `<priority>${item.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
