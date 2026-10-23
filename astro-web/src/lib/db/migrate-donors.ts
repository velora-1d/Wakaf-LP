import postgres from 'postgres';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

console.log('[MIGRATE-DONORS] Menghubungkan ke PostgreSQL di 100.77.202.57:5433...');

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 15,
  ssl: false,
});

async function run() {
  try {
    console.log('[MIGRATE-DONORS] 1. Membuat tabel donors...');
    await sql`
      CREATE TABLE IF NOT EXISTS donors (
        id SERIAL PRIMARY KEY,
        nama_lengkap VARCHAR(255) NOT NULL,
        nama_tampilan VARCHAR(255) DEFAULT 'Hamba Allah',
        tipe_donatur VARCHAR(50) DEFAULT 'individu' NOT NULL,
        no_whatsapp VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(150),
        kota_domisili VARCHAR(100),
        total_donasi_akumulasi BIGINT DEFAULT 0,
        frekuensi_donasi INT DEFAULT 0,
        catatan_admin TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_donors_no_whatsapp ON donors (no_whatsapp);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_donors_nama_lengkap ON donors (nama_lengkap);
    `;

    console.log('[MIGRATE-DONORS] 2. Membuat tabel donations...');
    await sql`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        kode_transaksi VARCHAR(50) UNIQUE NOT NULL,
        donor_id INT NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
        program_tujuan VARCHAR(100) NOT NULL,
        nominal BIGINT NOT NULL,
        kode_unik INT DEFAULT 0,
        nominal_total BIGINT NOT NULL,
        akad_peruntukan VARCHAR(100) DEFAULT 'Wakaf Muabbad (Abadi)',
        atas_nama_niat VARCHAR(255),
        doa_donatur TEXT,
        metode_pembayaran VARCHAR(50) DEFAULT 'BSI Transfer' NOT NULL,
        bukti_transfer_url TEXT,
        status_pembayaran VARCHAR(30) DEFAULT 'menunggu_verifikasi' NOT NULL,
        verified_by VARCHAR(100),
        verified_at TIMESTAMP,
        sumber_leads VARCHAR(50) DEFAULT 'relasi_langsung' NOT NULL,
        campaign_utm VARCHAR(150),
        catatan_transaksi TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_donations_kode_transaksi ON donations (kode_transaksi);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON donations (donor_id);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_donations_status ON donations (status_pembayaran);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_donations_sumber_leads ON donations (sumber_leads);
    `;

    console.log('[MIGRATE-DONORS] 3. Memeriksa keberadaan data awal donatur...');
    const donorCount = await sql`SELECT COUNT(*)::int as count FROM donors`;

    if (donorCount[0].count === 0) {
      console.log('[MIGRATE-DONORS] Mengisi seed data awal donatur percontohan...');

      // Seed 3 donatur
      const [d1] = await sql`
        INSERT INTO donors (nama_lengkap, nama_tampilan, tipe_donatur, no_whatsapp, email, kota_domisili, total_donasi_akumulasi, frekuensi_donasi, catatan_admin)
        VALUES (
          'H. Bambang Sulistyo',
          'Keluarga H. Bambang',
          'individu',
          '081234567890',
          'bambang.sulistyo@example.com',
          'Jakarta Selatan',
          25000000,
          2,
          'Donatur rutin wakaf pembangunan masjid dan vokasi agroteknologi.'
        ) RETURNING id;
      `;

      const [d2] = await sql`
        INSERT INTO donors (nama_lengkap, nama_tampilan, tipe_donatur, no_whatsapp, email, kota_domisili, total_donasi_akumulasi, frekuensi_donasi, catatan_admin)
        VALUES (
          'PT Sinergi Berkah Nusantara (CSR)',
          'PT Sinergi Berkah',
          'korporasi',
          '081198765432',
          'csr@sinergiberkah.co.id',
          'Bandung',
          50000000,
          1,
          'Kerjasama CSR program beasiswa santri agropreneur.'
        ) RETURNING id;
      `;

      const [d3] = await sql`
        INSERT INTO donors (nama_lengkap, nama_tampilan, tipe_donatur, no_whatsapp, email, kota_domisili, total_donasi_akumulasi, frekuensi_donasi, catatan_admin)
        VALUES (
          'Siti Rahmayanti, S.Pd',
          'Hamba Allah',
          'individu',
          '085712349988',
          'siti.rahmayanti@example.com',
          'Bogor',
          1500000,
          1,
          'Mendapat info dari kampanye Meta Ads wakaf pohon produktif.'
        ) RETURNING id;
      `;

      console.log('[MIGRATE-DONORS] Mengisi data transaksi percontohan dengan berbagai sumber leads...');

      // Seed 4 transaksi
      await sql`
        INSERT INTO donations (
          kode_transaksi, donor_id, program_tujuan, nominal, kode_unik, nominal_total,
          akad_peruntukan, atas_nama_niat, doa_donatur, metode_pembayaran,
          bukti_transfer_url, status_pembayaran, verified_by, verified_at,
          sumber_leads, campaign_utm, catatan_transaksi
        ) VALUES
        (
          'GVF-202610-0001', ${d1.id}, 'wakaf', 15000000, 125, 15000125,
          'Wakaf Muabbad (Abadi)', 'Alm. H. Sulistyo bin Kartowijoyo', 'Semoga menjadi amal jariyah untuk kedua orang tua kami tercinta.',
          'BSI Transfer', 'https://s3.skillage-mart.com/skillage-website/donasi/bukti-bsi-contoh1.jpg',
          'lunas', 'Admin Amil Utama', NOW(),
          'safari_dakwah', 'safari-bogor-okt26', 'Verifikasi via mutasi BSI Rek 7123456789'
        ),
        (
          'GVF-202610-0002', ${d1.id}, 'wakaf', 10000000, 340, 10000340,
          'Wakaf Muabbad (Abadi)', 'H. Bambang & Keluarga', 'Mohon doa agar anak-anak kami menjadi hafiz Quran yang istiqamah.',
          'BSI Transfer', 'https://s3.skillage-mart.com/skillage-website/donasi/bukti-bsi-contoh2.jpg',
          'lunas', 'Admin Amil Utama', NOW(),
          'relasi_langsung', 'founder-network', 'Transfer kedua bulan Oktober 2026'
        ),
        (
          'GVF-202610-0003', ${d2.id}, 'sedekah', 50000000, 0, 50000000,
          'Sedekah Pangan Santri', 'CSR PT Sinergi Berkah Nusantara', 'Pemberdayaan vokasi generasi muda mandiri pangan.',
          'BCA', 'https://s3.skillage-mart.com/skillage-website/donasi/bukti-bca-csr.jpg',
          'lunas', 'Admin Amil Utama', NOW(),
          'walk_in', 'visit-kawasan-jonggol', 'MoU Kemitraan CSR Vokasi 2026-2027'
        ),
        (
          'GVF-202610-0004', ${d3.id}, 'infaq', 1500000, 782, 1500782,
          'Infaq Pembangunan Fisik', 'Ibu Siti Rahmayanti', 'Bismillah untuk percepatan pembangunan fasilitas santri.',
          'QRIS Skillage', NULL,
          'menunggu_verifikasi', NULL, NULL,
          'meta_ads', 'fb-ig-wakaf-alpukat-okt', 'Menunggu amil mengecek screenshot QRIS'
        );
      `;
      console.log('[MIGRATE-DONORS] Data seed donatur & donasi berhasil ditambahkan!');
    } else {
      console.log(`[MIGRATE-DONORS] Ditemukan ${donorCount[0].count} donatur di database. Melewati proses seeding.`);
    }

    console.log('[MIGRATE-DONORS] Migrasi PostgreSQL Selesai!');
  } catch (error) {
    console.error('[MIGRATE-DONORS] Error saat migrasi:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

run();
