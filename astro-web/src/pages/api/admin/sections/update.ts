export const prerender = false;

import type { APIRoute } from 'astro';
import { updateSectionData } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('gvf_admin_session')?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;
  if (!user) {
    return new Response(JSON.stringify({ success: false, error: 'Sesi tidak valid.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const sectionId = Number(body.sectionId);
    if (isNaN(sectionId)) {
      return new Response(JSON.stringify({ success: false, error: 'ID section tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const title = body.title !== undefined ? String(body.title) : undefined;
    const content = body.content !== undefined ? body.content : undefined;
    const sortOrder = body.sortOrder !== undefined ? Number(body.sortOrder) : undefined;
    const isEnabled = body.isEnabled !== undefined ? Boolean(body.isEnabled) : undefined;

    const ok = await updateSectionData(sectionId, {
      title,
      content,
      sortOrder,
      isEnabled,
    });

    if (!ok) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui konten di database.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, sectionId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-UPDATE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Kesalahan internal server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
