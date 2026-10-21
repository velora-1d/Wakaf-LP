export const prerender = false;

import type { APIRoute } from 'astro';
import { deleteDonationRecord } from '../../../../lib/db';
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
    const { donationId } = body;

    if (!donationId) {
      return new Response(JSON.stringify({ success: false, error: 'ID donasi yang akan dihapus wajib diberikan.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await deleteDonationRecord(Number(donationId));

    if (!success) {
      return new Response(JSON.stringify({ success: false, error: 'Data transaksi donasi tidak ditemukan atau gagal dihapus.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Data transaksi donasi #${donationId} berhasil dihapus.`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /api/admin/donatur/delete] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Terjadi kesalahan pada server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
