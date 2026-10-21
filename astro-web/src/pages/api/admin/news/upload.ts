// src/pages/api/admin/news/upload.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';
import { verifySessionToken } from '../../../../lib/auth';
import { uploadFileToMinio } from '../../../../lib/storage';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Verifikasi Sesi Admin
    const sessionCookie = cookies.get('gvf_admin_session')?.value;
    if (!sessionCookie) {
      return new Response(JSON.stringify({ success: false, message: 'Sesi kedaluwarsa atau tidak valid.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const session = verifySessionToken(sessionCookie);
    if (!session) {
      return new Response(JSON.stringify({ success: false, message: 'Otorisasi ditolak. Silakan login kembali.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Baca Multipart Form Data
    const formData = await request.formData();
    const file = formData.get('image') || formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, message: 'Tidak ada berkas gambar yang dipilih.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Validasi Tipe Berkas (Gambar)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Format berkas tidak didukung. Harap unggah gambar JPG, PNG, WEBP, atau SVG.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Validasi Ukuran (Maksimal 10 MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Ukuran berkas terlalu besar. Maksimal ukuran gambar adalah 10 MB.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Upload ke MinIO S3
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadRes = await uploadFileToMinio(buffer, file.name, file.type, 'kabar');

    if (!uploadRes.success || !uploadRes.url) {
      return new Response(JSON.stringify({
        success: false,
        message: uploadRes.error || 'Gagal mengunggah gambar ke MinIO.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Gambar berhasil diunggah ke MinIO.',
      url: uploadRes.url,
      key: uploadRes.key,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API Admin Upload News Image] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error?.message || 'Terjadi kesalahan sistem saat mengunggah gambar.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
