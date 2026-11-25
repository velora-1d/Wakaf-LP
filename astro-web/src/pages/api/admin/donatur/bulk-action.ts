export const prerender = false;

import type { APIRoute } from 'astro';
import { deleteDonationRecord, verifyDonationStatus } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get('gvf_admin_session')?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: 'Sesi tidak valid atau telah kedaluwarsa.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const body = await request.json();
    const ids: number[] = Array.isArray(body?.ids)
      ? body.ids.map((v: unknown) => Number(v)).filter((n: number) => Number.isInteger(n) && n > 0)
      : [];
    const action = body?.action;

    if (ids.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Pilih minimal 1 transaksi terlebih dahulu.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (action !== 'reject' && action !== 'delete') {
      return new Response(
        JSON.stringify({ success: false, error: 'Aksi masal tidak valid.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    let processed = 0;
    for (const id of ids) {
      const ok =
        action === 'reject'
          ? await verifyDonationStatus(id, 'dibatalkan', user.name)
          : await deleteDonationRecord(id);
      if (ok) processed += 1;
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed,
        action,
        message:
          action === 'reject'
            ? `${processed} transaksi berhasil ditolak/dibatalkan.`
            : `${processed} transaksi berhasil dihapus.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error: any) {
    console.error('[API /api/admin/donatur/bulk-action] Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || 'Gagal memproses aksi masal.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
