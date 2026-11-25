export const prerender = false;

import type { APIRoute } from 'astro';
import { createTransparencyReport } from '../../../../lib/db';
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
    const { title, periodLabel, programScope, summary, fileUrl, fileSize, isPublished, publishedAt } = body;

    if (!title || !periodLabel || !summary || !fileUrl) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Judul, periode laporan, ringkasan, dan file PDF/tautan wajib diisi.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const report = await createTransparencyReport({
      title: String(title).trim(),
      periodLabel: String(periodLabel).trim(),
      programScope: String(programScope || 'all').trim(),
      summary: String(summary).trim(),
      fileUrl: String(fileUrl).trim(),
      fileSize: fileSize ? Number(fileSize) : 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      publishedAt: publishedAt
        ? String(publishedAt).trim()
        : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    });

    if (!report) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal menyimpan dokumen laporan ke database.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, report }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-REPORTS-CREATE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan server saat membuat laporan.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
