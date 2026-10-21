export const prerender = false;

import type { APIRoute } from 'astro';
import { toggleNewsArticlePublish } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

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
    const isPublished = Boolean(body.isPublished);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ success: false, error: 'ID artikel tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ok = await toggleNewsArticlePublish(id, isPublished);
    if (!ok) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui status publikasi artikel.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id, isPublished }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-NEWS-TOGGLE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan pada server saat mengubah status publikasi.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
