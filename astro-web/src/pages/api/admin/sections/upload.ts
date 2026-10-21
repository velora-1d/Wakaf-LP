// src/pages/api/admin/sections/upload.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';
import { verifySessionToken } from '../../../../lib/auth';
import { uploadFileToMinio } from '../../../../lib/storage';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Verifikasi Sesi Admin
    const sessionCookie = cookies.get('gvf_admin_session')?.value;
    const session = sessionCookie ? verifySessionToken(sessionCookie) : null;
    if (!session) {
      return new Response(JSON.stringify({ success: false, error: 'Sesi kedaluwarsa atau tidak valid.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Baca Multipart Form Data
    const formData = await request.formData();
    const file = formData.get('file') || formData.get('image');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, error: 'Tidak ada berkas yang dipilih.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Validasi Tipe Berkas (image/jpeg, image/png, image/webp, image/svg+xml, video/mp4)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Format berkas tidak didukung. Harap unggah gambar JPG, PNG, WEBP, SVG, atau video MP4.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Validasi Ukuran (Maksimal 25 MB)
    const MAX_SIZE = 25 * 1024 * 1024; // 25MB
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Ukuran berkas terlalu besar. Maksimal ukuran berkas adalah 25 MB.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Upload ke MinIO S3 dalam folder 'sections'
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadRes = await uploadFileToMinio(buffer, file.name, file.type, 'sections');

    if (!uploadRes.success || !uploadRes.url) {
      return new Response(JSON.stringify({
        success: false,
        error: uploadRes.error || 'Gagal mengunggah berkas ke penyimpanan MinIO.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      url: uploadRes.url,
      key: uploadRes.key,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API Admin Sections Upload] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error?.message || 'Terjadi kesalahan sistem saat mengunggah berkas.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
