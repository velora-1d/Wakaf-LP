export const prerender = false;

import type { APIRoute } from 'astro';
import { createCashAllocation } from '../../../../lib/db';
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
      program,
      posAnggaran,
      uraian,
      jenisTransaksi,
      nominal,
      buktiNotaUrl,
      pic,
      tanggalTransaksi,
    } = body;

    if (!program || !posAnggaran || !uraian || !nominal || !jenisTransaksi) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Program, Pos Anggaran, Uraian, Jenis Transaksi, dan Nominal wajib diisi lengkap.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const parsedNominal = Number(nominal);
    if (isNaN(parsedNominal) || parsedNominal <= 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Nominal transaksi harus berupa angka positif.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newRecord = await createCashAllocation({
      program: String(program).trim(),
      posAnggaran: String(posAnggaran).trim(),
      uraian: String(uraian).trim(),
      jenisTransaksi: jenisTransaksi === 'debit' ? 'debit' : 'kredit',
      nominal: parsedNominal,
      buktiNotaUrl: buktiNotaUrl ? String(buktiNotaUrl).trim() : undefined,
      pic: pic ? String(pic).trim() : user.name || 'Amil Lapangan GVF',
      tanggalTransaksi: tanggalTransaksi ? new Date(tanggalTransaksi) : new Date(),
    });

    if (!newRecord) {
      throw new Error('Gagal menyimpan transaksi ke database.');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Transaksi realisasi alokasi kas berhasil dicatat.',
        data: newRecord,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('[API-CREATE-ALOKASI] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Terjadi kesalahan sistem.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
