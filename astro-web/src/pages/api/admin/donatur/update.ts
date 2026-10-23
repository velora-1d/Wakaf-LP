export const prerender = false;

import type { APIRoute } from 'astro';
import { updateDonationWithDonor } from '../../../../lib/db';
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
      donationId,
      kodeTransaksi,
      tanggalTransaksi,
      namaLengkap,
      namaTampilan,
      tipeDonatur,
      noWhatsapp,
      email,
      kotaDomisili,
      programTujuan,
      nominal,
      kodeUnik,
      akadPeruntukan,
      atasNamaNiat,
      doaDonatur,
      metodePembayaran,
      buktiTransferUrl,
      statusPembayaran,
      sumberLeads,
      campaignUtm,
      catatanTransaksi,
    } = body;

    if (!donationId) {
      return new Response(JSON.stringify({ success: false, error: 'ID transaksi donasi wajib disertakan.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!namaLengkap || !noWhatsapp || !programTujuan || !nominal) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Nama lengkap, nomor WhatsApp, program tujuan, dan nominal donasi wajib diisi.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const numNominal = Number(nominal);
    if (isNaN(numNominal) || numNominal <= 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Nominal donasi harus berupa angka positif.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await updateDonationWithDonor({
      donationId: Number(donationId),
      kodeTransaksi: kodeTransaksi ? String(kodeTransaksi).trim() : undefined,
      tanggalTransaksi: tanggalTransaksi ? String(tanggalTransaksi).trim() : undefined,
      namaLengkap: String(namaLengkap).trim(),
      namaTampilan: namaTampilan ? String(namaTampilan).trim() : 'Hamba Allah',
      tipeDonatur: tipeDonatur ? String(tipeDonatur).trim() : 'individu',
      noWhatsapp: String(noWhatsapp).trim(),
      email: email ? String(email).trim() : undefined,
      kotaDomisili: kotaDomisili ? String(kotaDomisili).trim() : undefined,
      programTujuan: String(programTujuan).trim(),
      nominal: numNominal,
      kodeUnik: kodeUnik ? Number(kodeUnik) : 0,
      akadPeruntukan: akadPeruntukan ? String(akadPeruntukan).trim() : 'Wakaf Muabbad (Abadi)',
      atasNamaNiat: atasNamaNiat ? String(atasNamaNiat).trim() : undefined,
      doaDonatur: doaDonatur ? String(doaDonatur).trim() : undefined,
      metodePembayaran: metodePembayaran ? String(metodePembayaran).trim() : 'BSI Transfer',
      buktiTransferUrl: buktiTransferUrl !== undefined ? String(buktiTransferUrl).trim() : undefined,
      statusPembayaran: statusPembayaran ? String(statusPembayaran).trim() : undefined,
      sumberLeads: sumberLeads ? String(sumberLeads).trim() : 'relasi_langsung',
      campaignUtm: campaignUtm ? String(campaignUtm).trim() : undefined,
      catatanTransaksi: catatanTransaksi ? String(catatanTransaksi).trim() : undefined,
      verifiedBy: user.name,
    });

    if (!success) {
      return new Response(JSON.stringify({ success: false, error: 'Data transaksi donasi tidak ditemukan atau gagal diperbarui.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Perubahan data transaksi donasi & profil donatur berhasil disimpan.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /api/admin/donatur/update] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Terjadi kesalahan pada server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
