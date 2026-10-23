export const prerender = false;

import type { APIRoute } from 'astro';
import { getAllLabels, createLabel, updateLabel, deleteLabel } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const sessionCookie = cookies.get('gvf_admin_session')?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;
  if (!user) {
    return new Response(JSON.stringify({ success: false, error: 'Sesi tidak valid.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const labels = await getAllLabels();
    return new Response(JSON.stringify({ success: true, data: labels }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /api/admin/labels] GET Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Terjadi kesalahan server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

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
    const { action, id, nama, warna, deskripsi } = body;

    if (action === 'create') {
      if (!nama || !nama.trim()) {
        return new Response(JSON.stringify({ success: false, error: 'Nama label wajib diisi.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const created = await createLabel({
        nama: String(nama).trim(),
        warna: warna ? String(warna).trim() : 'blue',
        deskripsi: deskripsi ? String(deskripsi).trim() : undefined,
      });

      if (!created) {
        return new Response(JSON.stringify({ success: false, error: 'Gagal membuat label. Nama mungkin sudah ada.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const allLabels = await getAllLabels();
      return new Response(JSON.stringify({
        success: true,
        message: 'Label baru berhasil dibuat.',
        data: created,
        allLabels,
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update') {
      const numId = Number(id);
      if (!numId || isNaN(numId)) {
        return new Response(JSON.stringify({ success: false, error: 'ID label tidak valid.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!nama || !nama.trim()) {
        return new Response(JSON.stringify({ success: false, error: 'Nama label tidak boleh kosong.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const updated = await updateLabel(numId, {
        nama: String(nama).trim(),
        warna: warna ? String(warna).trim() : 'blue',
        deskripsi: deskripsi ? String(deskripsi).trim() : undefined,
      });

      if (!updated) {
        return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui label.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const allLabels = await getAllLabels();
      return new Response(JSON.stringify({
        success: true,
        message: 'Label berhasil diperbarui.',
        allLabels,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete') {
      const numId = Number(id);
      if (!numId || isNaN(numId)) {
        return new Response(JSON.stringify({ success: false, error: 'ID label tidak valid.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const deleted = await deleteLabel(numId);
      if (!deleted) {
        return new Response(JSON.stringify({ success: false, error: 'Gagal menghapus label.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const allLabels = await getAllLabels();
      return new Response(JSON.stringify({
        success: true,
        message: 'Label berhasil dihapus.',
        allLabels,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Action tidak dikenal.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /api/admin/labels] POST Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Terjadi kesalahan server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
