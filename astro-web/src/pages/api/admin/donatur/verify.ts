export const prerender = false;

import type { APIRoute } from 'astro';
import { verifyDonationStatus } from '../../../../lib/db';
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
    const { donationId, status } = body;

    if (!donationId || !status) {
      return new Response(JSON.stringify({ success: false, error: 'ID donasi dan status verifikasi wajib diberikan.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!['lunas', 'menunggu_verifikasi', 'dibatalkan'].includes(status)) {
      return new Response(JSON.stringify({ success: false, error: 'Status tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await verifyDonationStatus(Number(donationId), status, user.name);

    if (!success) {
      return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui status transaksi donasi.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Status donasi #${donationId} berhasil diubah menjadi '${status}'.`,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /api/admin/donatur/verify] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Terjadi kesalahan pada server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
