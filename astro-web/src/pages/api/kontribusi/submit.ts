import type { APIRoute } from 'astro';
import { createDonationWithDonor } from '../../../lib/db';
import { uploadFileToMinio } from '../../../lib/storage';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const namaLengkap = String(formData.get('namaLengkap') || '').trim();
    const namaTampilanRaw = String(formData.get('namaTampilan') || '').trim();
    const namaTampilan = namaTampilanRaw || 'Hamba Allah';
    const noWhatsapp = String(formData.get('noWhatsapp') || '').trim();
    const programTujuan = String(formData.get('programTujuan') || '').trim();
    const paketNama = String(formData.get('paketNama') || '').trim();
    const jumlahPaket = Math.max(1, Number(formData.get('jumlahPaket')) || 1);
    const nominal = Number(formData.get('nominal')) || 0;
    const doaDonatur = String(formData.get('doaDonatur') || '').trim();
    const file = formData.get('bukti');

    if (!namaLengkap) {
      return new Response(JSON.stringify({ error: 'Nama lengkap wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!noWhatsapp) {
      return new Response(JSON.stringify({ error: 'Nomor WhatsApp wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!programTujuan) {
      return new Response(JSON.stringify({ error: 'Program tujuan wajib dipilih.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (nominal <= 0) {
      return new Response(JSON.stringify({ error: 'Nominal kontribusi harus lebih dari 0.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!(file instanceof File) || file.size === 0) {
      return new Response(JSON.stringify({ error: 'Bukti transfer wajib diunggah.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: 'Format bukti transfer tidak didukung. Gunakan JPG, PNG, WEBP, atau PDF.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Ukuran bukti transfer maksimal 15MB.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadFileToMinio(buffer, file.name, file.type, 'donasi');
    if (!uploadResult.success || !uploadResult.url) {
      return new Response(
        JSON.stringify({ error: uploadResult.error || 'Gagal mengunggah bukti transfer ke penyimpanan.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
    const buktiTransferUrl = uploadResult.url;

    const akadPeruntukan = paketNama
      ? `${paketNama}${jumlahPaket > 1 ? ` (${jumlahPaket}x)` : ''}`
      : programTujuan;

    const result = await createDonationWithDonor({
      namaLengkap,
      namaTampilan,
      tipeDonatur: 'individu',
      noWhatsapp,
      programTujuan,
      nominal,
      kodeUnik: 0,
      akadPeruntukan,
      doaDonatur: doaDonatur || undefined,
      metodePembayaran: 'BSI Transfer',
      buktiTransferUrl,
      statusPembayaran: 'menunggu_verifikasi',
      sumberLeads: 'website_checkout',
      catatanTransaksi: paketNama
        ? `Checkout website: ${paketNama} x${jumlahPaket}`
        : 'Checkout website',
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          kodeTransaksi: result.kodeTransaksi,
          nominalTotal: result.nominalTotal,
          buktiTransferUrl,
        },
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err: any) {
    console.error('[api/kontribusi/submit] Error:', err);
    return new Response(
      JSON.stringify({ error: err?.message || 'Gagal memproses pengajuan kontribusi.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
