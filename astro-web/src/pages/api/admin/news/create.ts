export const prerender = false;

import type { APIRoute } from 'astro';
import { createNewsArticle } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('gvf_admin_session')?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;
  if (!user) {
    return new Response(JSON.stringify({ success: false, error: 'Sesi tidak valid atau telah kedaluwarsa.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { title, category, summary, content, coverImage, author, isPublished, publishedAt } = body;

    if (!title || !category || !summary || !content) {
      return new Response(JSON.stringify({ success: false, error: 'Semua bidang wajib (judul, kategori, ringkasan, isi) harus diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let customSlug = body.slug ? generateSlug(body.slug) : generateSlug(title);
    if (!customSlug) {
      customSlug = `artikel-${Date.now()}`;
    }

    const newArticle = await createNewsArticle({
      slug: customSlug,
      title: title.trim(),
      category: category.trim(),
      summary: summary.trim(),
      content: content.trim(),
      coverImage: (coverImage || '/gambar design/interior masjid.jpg').trim(),
      author: (author || 'Tim GVF').trim(),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      publishedAt: publishedAt || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    });

    if (!newArticle) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal membuat artikel. Pastikan judul/slug belum pernah digunakan.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, article: newArticle }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-NEWS-CREATE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan pada server saat membuat artikel.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
