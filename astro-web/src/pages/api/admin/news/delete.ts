export const prerender = false;

import type { APIRoute } from 'astro';
import { deleteNewsArticle } from '../../../../lib/db';
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

    if (isNaN(id)) {
      return new Response(JSON.stringify({ success: false, error: 'ID artikel tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ok = await deleteNewsArticle(id);
    if (!ok) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal menghapus artikel dari database.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-NEWS-DELETE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan pada server saat menghapus artikel.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
