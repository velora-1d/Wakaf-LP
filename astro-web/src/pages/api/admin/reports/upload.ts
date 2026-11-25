// src/pages/api/admin/reports/upload.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';
import { verifySessionToken } from '../../../../lib/auth';
import { uploadFileToMinio } from '../../../../lib/storage';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get('gvf_admin_session')?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;
    if (!session) {
      return new Response(JSON.stringify({ success: false, message: 'Sesi kedaluwarsa atau otorisasi ditolak.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await request.formData();
    const file = formData.get('file') || formData.get('pdf');
    const folderRaw = String(formData.get('folder') || 'laporan').trim().toLowerCase();
    const folder = folderRaw === 'edukasi' ? 'edukasi' : 'laporan';

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, message: 'Tidak ada berkas PDF yang dipilih.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Format berkas tidak didukung. Harap unggah dokumen PDF (.pdf).',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const MAX_SIZE = 25 * 1024 * 1024; // 25 MB
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Ukuran berkas melebihi batas maksimal 25 MB.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadRes = await uploadFileToMinio(buffer, file.name, 'application/pdf', folder);
    if (!uploadRes.success || !uploadRes.url) {
      return new Response(JSON.stringify({
        success: false,
        message: uploadRes.error || 'Gagal mengunggah dokumen PDF ke MinIO S3.',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Dokumen PDF berhasil diunggah ke MinIO S3.',
      url: uploadRes.url,
      key: uploadRes.key,
      fileSize: file.size,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-REPORTS-UPLOAD] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error?.message || 'Terjadi kesalahan saat mengunggah dokumen PDF.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
