export const prerender = false;

import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';
import { verifySessionToken } from '../../../../lib/auth';
import { uploadFileToMinio } from '../../../../lib/storage';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
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

    const formData = await request.formData();
    const file = formData.get('image') || formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ success: false, message: 'Tidak ada berkas bukti transfer yang dipilih.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Format berkas tidak didukung. Harap unggah gambar JPG, PNG, WEBP, atau berkas PDF.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const MAX_SIZE = 15 * 1024 * 1024; // 15MB
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Ukuran berkas terlalu besar. Maksimal 15 MB.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split('.').pop() || (file.type === 'application/pdf' ? 'pdf' : 'jpg');
    const safeBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .toLowerCase()
      .substring(0, 30);
    const objectName = `donasi/${Date.now()}-${safeBaseName}.${ext}`;

    const publicUrl = await uploadFileToMinio(buffer, objectName, file.type);

    return new Response(JSON.stringify({
      success: true,
      url: publicUrl,
      objectName: objectName,
      message: 'Bukti transfer berhasil diunggah ke MinIO S3.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /api/admin/donatur/upload] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error?.message || 'Gagal mengunggah bukti transfer ke server S3.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
