export const prerender = false;

import type { APIRoute } from 'astro';
import { updateTransparencyReport } from '../../../../lib/db';
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
      return new Response(JSON.stringify({ success: false, error: 'ID laporan tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatePayload: any = {};
    if (body.title !== undefined) updatePayload.title = String(body.title).trim();
    if (body.periodLabel !== undefined) updatePayload.periodLabel = String(body.periodLabel).trim();
    if (body.programScope !== undefined) updatePayload.programScope = String(body.programScope).trim();
    if (body.summary !== undefined) updatePayload.summary = String(body.summary).trim();
    if (body.fileUrl !== undefined) updatePayload.fileUrl = String(body.fileUrl).trim();
    if (body.fileSize !== undefined) updatePayload.fileSize = Number(body.fileSize) || 0;
    if (body.galleryImages !== undefined) {
      updatePayload.galleryImages = Array.isArray(body.galleryImages)
        ? body.galleryImages
            .filter((item: any) => item && typeof item.url === 'string' && item.url.trim().length > 0)
            .map((item: any) => ({
              url: String(item.url).trim(),
              caption: item.caption ? String(item.caption).trim() : '',
            }))
        : [];
    }
    if (body.isPublished !== undefined) updatePayload.isPublished = Boolean(body.isPublished);
    if (body.publishedAt !== undefined) updatePayload.publishedAt = String(body.publishedAt).trim();

    const ok = await updateTransparencyReport(id, updatePayload);
    if (!ok) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui laporan di database.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id, report: updatePayload }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-REPORTS-UPDATE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan server saat memperbarui laporan.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
