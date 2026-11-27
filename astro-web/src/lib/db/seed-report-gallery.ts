import postgres from 'postgres';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PG_DATABASE_URL ||
  DEFAULT_NEON_DATABASE_URL;

const useSsl = connectionString.includes('sslmode=require') || connectionString.includes('neon.tech');

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 20,
  ssl: useSsl ? 'require' : false,
});

const S3_BASE =
  'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten';

const candidateImages = [
  {
    url: `${S3_BASE}/masjid-dan-kelas/bahan-bangunan.jpeg`,
    caption: 'Pengadaan material bangunan Masjid Khairu Ummah Sugro',
  },
  {
    url: `${S3_BASE}/masjid-dan-kelas/masjid-lantai-2-belum-jadi.jpeg`,
    caption: 'Progres pembangunan lantai 2 Masjid Khairu Ummah Sugro',
  },
  {
    url: `${S3_BASE}/masjid-dan-kelas/mezanine-belum-jadi.jpeg`,
    caption: 'Pengerjaan struktur mezanin masjid',
  },
  {
    url: `${S3_BASE}/masjid-dan-kelas/pondasi-kelas-lt2.jpeg`,
    caption: 'Progres pondasi ruang kelas lantai 2',
  },
  {
    url: `${S3_BASE}/fasilitas-dan-infrastruktur/atap-rangka-baja-aula.webp`,
    caption: 'Pemasangan rangka baja atap aula',
  },
  {
    url: `${S3_BASE}/fasilitas-dan-infrastruktur/dinding-hebel-ventilasi-roster-1.webp`,
    caption: 'Pemasangan dinding hebel dan ventilasi roster',
  },
  {
    url: `${S3_BASE}/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp`,
    caption: 'Progres konstruksi gedung dan area wudhu',
  },
  {
    url: `${S3_BASE}/asrama-putra-baru/pembangunan-asrama-ikhwan-baru.jpeg`,
    caption: 'Progres pembangunan gedung asrama ikhwan baru',
  },
  {
    url: `${S3_BASE}/kegiatan-dan-prestasi-santri/pengajian-ramai-santri-aula-masjid.webp`,
    caption: 'Aktivitas pengajian santri GOTA SSM di aula masjid',
  },
  {
    url: `${S3_BASE}/beras-zakat-fitrah-mustahik.webp`,
    caption: 'Penyaluran beras zakat fitrah kepada mustahik',
  },
  {
    url: `${S3_BASE}/fasilitas-dan-infrastruktur/drone-pembangunan-gedung-asrama.webp`,
    caption: 'Pantauan udara progres pembangunan kawasan',
  },
  {
    url: `${S3_BASE}/fasilitas-dan-infrastruktur/greenhouse-pertanian.webp`,
    caption: 'Unit ketahanan pangan dan greenhouse santri',
  },
];

async function main() {
  const verifiedImages: Array<{ url: string; caption: string }> = [];

  for (const item of candidateImages) {
    try {
      const res = await fetch(item.url, { method: 'HEAD' });
      if (res.ok) {
        verifiedImages.push(item);
      } else {
        console.warn(`[SKIP] HTTP ${res.status}: ${item.url}`);
      }
    } catch (err) {
      console.warn(`[SKIP] Error checking ${item.url}:`, err);
    }
  }

  console.log(`[SEED-REPORT-GALLERY] ${verifiedImages.length}/${candidateImages.length} foto terverifikasi HTTP 200.`);

  const reports = await sql`SELECT id, title, gallery_images FROM transparency_reports ORDER BY created_at DESC LIMIT 5`;
  if (reports.length === 0) {
    console.log('[SEED-REPORT-GALLERY] Tidak ada laporan di transparency_reports.');
    await sql.end();
    return;
  }

  const target = reports[0];
  await sql`
    UPDATE transparency_reports
    SET gallery_images = ${sql.json(verifiedImages)}, updated_at = NOW()
    WHERE id = ${target.id}
  `;
  console.log(`[SEED-REPORT-GALLERY] Berhasil mengisi ${verifiedImages.length} foto ke laporan #${target.id} ("${target.title}").`);
  await sql.end();
}

main().catch((err) => {
  console.error('[SEED-REPORT-GALLERY] Gagal:', err);
  process.exit(1);
});
