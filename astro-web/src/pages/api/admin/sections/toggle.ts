export const prerender = false;

import type { APIRoute } from 'astro';
import { toggleSectionVisibility } from '../../../../lib/db';
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
    const sectionId = Number(body.sectionId);
    const isEnabled = Boolean(body.isEnabled);

    if (isNaN(sectionId)) {
      return new Response(JSON.stringify({ success: false, error: 'ID section tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ok = await toggleSectionVisibility(sectionId, isEnabled);
    if (!ok) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui status section di database.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, sectionId, isEnabled }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-TOGGLE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Kesalahan internal server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
