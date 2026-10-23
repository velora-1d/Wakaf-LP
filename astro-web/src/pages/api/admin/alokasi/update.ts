export const prerender = false;

import type { APIRoute } from 'astro';
import { updateCashAllocation } from '../../../../lib/db';
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
    const {
      id,
      program,
      posAnggaran,
      uraian,
      jenisTransaksi,
      nominal,
      buktiNotaUrl,
      pic,
      tanggalTransaksi,
    } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: 'ID transaksi wajib disertakan.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const updated = await updateCashAllocation(Number(id), {
      program: program ? String(program).trim() : undefined,
      posAnggaran: posAnggaran ? String(posAnggaran).trim() : undefined,
      uraian: uraian ? String(uraian).trim() : undefined,
      jenisTransaksi: jenisTransaksi === 'debit' ? 'debit' : jenisTransaksi === 'kredit' ? 'kredit' : undefined,
      nominal: nominal ? Number(nominal) : undefined,
      buktiNotaUrl: buktiNotaUrl !== undefined ? (buktiNotaUrl ? String(buktiNotaUrl).trim() : '') : undefined,
      pic: pic ? String(pic).trim() : undefined,
      tanggalTransaksi: tanggalTransaksi ? new Date(tanggalTransaksi) : undefined,
    });

    if (!updated) {
      throw new Error('Gagal memperbarui transaksi alokasi kas.');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Transaksi realisasi alokasi kas berhasil diperbarui.',
        data: updated,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('[API-UPDATE-ALOKASI] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Terjadi kesalahan sistem.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
