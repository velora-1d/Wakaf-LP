export const prerender = false;

import type { APIRoute } from 'astro';
import { updateNewsArticle } from '../../../../lib/db';
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
    const id = Number(body.id);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ success: false, error: 'ID artikel tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatePayload: any = {};
    if (body.title !== undefined) updatePayload.title = String(body.title).trim();
    if (body.category !== undefined) updatePayload.category = String(body.category).trim();
    if (body.summary !== undefined) updatePayload.summary = String(body.summary).trim();
    if (body.content !== undefined) updatePayload.content = String(body.content).trim();
    if (body.coverImage !== undefined) updatePayload.coverImage = String(body.coverImage).trim();
    if (body.author !== undefined) updatePayload.author = String(body.author).trim();
    if (body.isPublished !== undefined) updatePayload.isPublished = Boolean(body.isPublished);
    if (body.publishedAt !== undefined) updatePayload.publishedAt = String(body.publishedAt).trim();
    if (body.slug !== undefined && body.slug) {
      updatePayload.slug = generateSlug(body.slug);
    }

    const ok = await updateNewsArticle(id, updatePayload);
    if (!ok) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui artikel di database.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id, article: updatePayload }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-NEWS-UPDATE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan pada server saat memperbarui artikel.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
