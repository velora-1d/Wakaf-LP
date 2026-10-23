import postgres from 'postgres';

interface RawDonation {
  no: number;
  nama: string;
  nominal: number;
  tanggal: string; // 'DD/MM/YYYY' or '-'
  keterangan: string;
  tipe?: 'individu' | 'lembaga';
}

const rawDonations: RawDonation[] = [
  { no: 1, nama: 'Hamba Allah', nominal: 4000000, tanggal: '-', keterangan: '-' },
  { no: 2, nama: 'Hamba Allah', nominal: 4000000, tanggal: '-', keterangan: '-' },
  { no: 3, nama: 'Hamba Allah', nominal: 3000000, tanggal: '-', keterangan: '-' },
  { no: 4, nama: 'Agustina', nominal: 10000000, tanggal: '-', keterangan: '-' },
  { no: 5, nama: 'Ahmad Kosim', nominal: 1000000, tanggal: '-', keterangan: '-' },
  { no: 6, nama: 'Indra Wardiana', nominal: 550000, tanggal: '-', keterangan: '10 Sak Semen' },
  { no: 7, nama: 'Bapak Azzam', nominal: 200000, tanggal: '-', keterangan: '-' },
  { no: 8, nama: 'Bapak Ruhdi', nominal: 300000, tanggal: '-', keterangan: '-' },
  { no: 9, nama: 'Nunik Sri Rahayuningsih', nominal: 1000000, tanggal: '-', keterangan: '-' },
  { no: 10, nama: 'Teti Ismi Riani', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 11, nama: 'Hamba Allah (Ortu Jojo)', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 12, nama: 'Abi Almun', nominal: 250000, tanggal: '-', keterangan: '-' },
  { no: 13, nama: 'Nova Sari Yanti', nominal: 400000, tanggal: '-', keterangan: '-' },
  { no: 14, nama: 'Dr Erwin', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 15, nama: 'Ummi Zuhdan', nominal: 200000, tanggal: '-', keterangan: '-' },
  { no: 16, nama: 'Bapak Syifa', nominal: 1650000, tanggal: '-', keterangan: '30 Sak semen' },
  { no: 17, nama: 'Nurhasanah', nominal: 50000, tanggal: '-', keterangan: '-' },
  { no: 18, nama: 'Wali santri angkatan 3', nominal: 172000, tanggal: '-', keterangan: '-', tipe: 'lembaga' },
  { no: 19, nama: 'Hamba Allah', nominal: 150000, tanggal: '-', keterangan: '-' },
  { no: 20, nama: 'Ahmad Romli', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 21, nama: 'Wali Ariqoh', nominal: 300000, tanggal: '-', keterangan: '-' },
  { no: 22, nama: 'Ummi Rajwa', nominal: 200000, tanggal: '-', keterangan: '-' },
  { no: 23, nama: 'Ummi Zhafran', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 24, nama: 'Senen Kromomedjo bin kromokarso', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 25, nama: 'Tiyem Siking binti Sowikromo', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 26, nama: 'Sukino Marsono bin Martosemito', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 27, nama: 'Kaniyem binti Sowikromo', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 28, nama: 'Sukarno bin Senen Kromomedjo', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 29, nama: 'Suparni binti Sukino Marsono', nominal: 2000000, tanggal: '-', keterangan: '-' },
  { no: 30, nama: 'PT. Isa Building Workshop', nominal: 1000000, tanggal: '-', keterangan: '-', tipe: 'lembaga' },
  { no: 31, nama: 'Firman Riansyah', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 32, nama: 'Abdul Rahman Syahputra', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 33, nama: 'Farid Wibisono', nominal: 500000, tanggal: '-', keterangan: '-' },
  { no: 34, nama: 'Abi Rudiansyah', nominal: 200000, tanggal: '04/09/2026', keterangan: '-' },
  { no: 35, nama: 'Ariqoh Walfitroh', nominal: 250000, tanggal: '11/09/2026', keterangan: '-' },
  { no: 36, nama: 'Anugrah Roffiq Ramadhan', nominal: 500000, tanggal: '20/09/2026', keterangan: '-' },
  { no: 37, nama: 'Puji Rahayu (ortu Nugi)', nominal: 500000, tanggal: '09/10/2026', keterangan: '-' },
  { no: 38, nama: 'Selaras', nominal: 100000, tanggal: '09/10/2026', keterangan: '-' },
  { no: 39, nama: 'Bu Yayasan', nominal: 50000, tanggal: '09/10/2026', keterangan: '-' },
  { no: 40, nama: 'Atikah Eds', nominal: 20000, tanggal: '09/10/2026', keterangan: '-' },
  { no: 41, nama: 'Siti Jamaliyah', nominal: 100000, tanggal: '10/10/2026', keterangan: '-' },
  { no: 42, nama: 'Khoerunnisa', nominal: 10000, tanggal: '11/10/2026', keterangan: '-' },
  { no: 43, nama: 'Dedah Kuratulain', nominal: 10000, tanggal: '11/10/2026', keterangan: '-' },
  { no: 44, nama: 'Salsa', nominal: 150000, tanggal: '11/10/2026', keterangan: '-' },
  { no: 45, nama: 'Marfu\'ah', nominal: 90000, tanggal: '12/10/2026', keterangan: '-' },
  { no: 46, nama: 'Siti Masyitoh', nominal: 100000, tanggal: '12/10/2026', keterangan: '-' },
  { no: 47, nama: 'Iik Ahmad Rifa\'i', nominal: 200000, tanggal: '12/10/2026', keterangan: '-' },
  { no: 48, nama: 'Fenia Hersi', nominal: 1000000, tanggal: '16/10/2026', keterangan: '-' },
  { no: 49, nama: 'Rismawati', nominal: 25000, tanggal: '14/10/2026', keterangan: '-' },
  { no: 50, nama: 'Tutik Utami', nominal: 100000, tanggal: '17/10/2026', keterangan: '-' },
  { no: 51, nama: 'Imroatul Azizah', nominal: 50000, tanggal: '17/10/2026', keterangan: '-' },
  { no: 52, nama: 'Abdillah Arif', nominal: 1000000, tanggal: '17/10/2026', keterangan: '-' },
  { no: 53, nama: 'NurPajrin', nominal: 250000, tanggal: '18/10/2026', keterangan: '-' },
  { no: 54, nama: 'Sri Nelwati', nominal: 100000, tanggal: '19/10/2026', keterangan: '-' },
  { no: 55, nama: 'Linda', nominal: 5000000, tanggal: '19/10/2026', keterangan: '-' },
  { no: 56, nama: 'Bude Pasar CI', nominal: 100000, tanggal: '20/10/2026', keterangan: '-' },
  { no: 57, nama: 'Bu Iroy', nominal: 100000, tanggal: '21/10/2026', keterangan: '-' },
];

function parseDate(tgl: string, index: number): Date {
  if (tgl && tgl !== '-') {
    const parts = tgl.split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      return new Date(y, m, d, 10, 0, 0);
    }
  }
  // Baseline untuk baris tanpa tanggal (31 Agustus 2026) dengan sekuensial menit
  const base = new Date(2026, 7, 31, 8, 0, 0); // 31 Aug 2026
  base.setMinutes(base.getMinutes() + index * 5);
  return base;
}

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

const sql = postgres(connectionString, {
  max: 2,
  connect_timeout: 8,
  idle_timeout: 10,
  prepare: false,
});

async function main() {
  console.log('====================================================');
  console.log('MEMULAI SEEDING 57 TRANSAKSI SHODAQOH / SEDEKAH');
  console.log('====================================================');

  let totalInserted = 0;
  let totalNominal = 0;

  for (const item of rawDonations) {
    totalNominal += item.nominal;
    const dummyPhone = `081000000${String(item.no).padStart(3, '0')}`;
    const kodeTransaksi = `GVF-MKU-2026-${String(item.no).padStart(3, '0')}`;
    const createdAt = parseDate(item.tanggal, item.no);
    const tipeDonatur = item.tipe || 'individu';
    const isMaterial = item.keterangan.toLowerCase().includes('semen');
    const metodePembayaran = isMaterial ? 'Konversi Material (Semen)' : 'BSI Transfer';
    const catatan = item.keterangan !== '-' ? item.keterangan : null;

    // 1. Find or create donor
    const existingDonor = await sql`
      SELECT id FROM donors WHERE no_whatsapp = ${dummyPhone} LIMIT 1;
    `;

    let donorId: number;
    if (existingDonor.length > 0) {
      donorId = existingDonor[0].id;
      await sql`
        UPDATE donors
        SET 
          nama_lengkap = ${item.nama},
          nama_tampilan = ${item.nama},
          tipe_donatur = ${tipeDonatur},
          catatan_admin = 'Data Rekapitulasi Fisik Masjid Khairu Ummah',
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${donorId};
      `;
    } else {
      const insertedDonor = await sql`
        INSERT INTO donors (
          nama_lengkap, nama_tampilan, tipe_donatur, no_whatsapp,
          catatan_admin, total_donasi_akumulasi, frekuensi_donasi, created_at, updated_at
        ) VALUES (
          ${item.nama}, ${item.nama}, ${tipeDonatur}, ${dummyPhone},
          'Data Rekapitulasi Fisik Masjid Khairu Ummah', 0, 0, ${createdAt}, CURRENT_TIMESTAMP
        )
        RETURNING id;
      `;
      donorId = insertedDonor[0].id;
    }

    // 2. Insert or update donation
    const existingDonation = await sql`
      SELECT id FROM donations WHERE kode_transaksi = ${kodeTransaksi} LIMIT 1;
    `;

    if (existingDonation.length > 0) {
      await sql`
        UPDATE donations
        SET
          donor_id = ${donorId},
          program_tujuan = 'sedekah',
          nominal = ${item.nominal},
          kode_unik = 0,
          nominal_total = ${item.nominal},
          akad_peruntukan = 'Sedekah Pembangunan Masjid Khairu Ummah',
          atas_nama_niat = ${item.nama},
          doa_donatur = 'Semoga menjadi amal shodaqoh jariyah yang kekal dan membawa keberkahan keluarga.',
          metode_pembayaran = ${metodePembayaran},
          status_pembayaran = 'lunas',
          verified_by = 'Admin GVF',
          verified_at = ${createdAt},
          sumber_leads = 'relasi_langsung',
          catatan_transaksi = ${catatan},
          created_at = ${createdAt}
        WHERE id = ${existingDonation[0].id};
      `;
      console.log(`[UPDATE] ${kodeTransaksi} - ${item.nama}: Rp ${item.nominal.toLocaleString('id-ID')}`);
    } else {
      await sql`
        INSERT INTO donations (
          kode_transaksi, donor_id, program_tujuan, nominal, kode_unik, nominal_total,
          akad_peruntukan, atas_nama_niat, doa_donatur, metode_pembayaran, status_pembayaran,
          verified_by, verified_at, sumber_leads, catatan_transaksi, created_at
        ) VALUES (
          ${kodeTransaksi}, ${donorId}, 'sedekah', ${item.nominal}, 0, ${item.nominal},
          'Sedekah Pembangunan Masjid Khairu Ummah', ${item.nama},
          'Semoga menjadi amal shodaqoh jariyah yang kekal dan membawa keberkahan keluarga.',
          ${metodePembayaran}, 'lunas', 'Admin GVF', ${createdAt},
          'relasi_langsung', ${catatan}, ${createdAt}
        );
      `;
      totalInserted++;
      console.log(`[INSERT] ${kodeTransaksi} - ${item.nama}: Rp ${item.nominal.toLocaleString('id-ID')}`);
    }

    // 3. Recalculate donor's total and frequency
    const stats = await sql`
      SELECT COALESCE(SUM(nominal_total), 0) as total, COUNT(*) as count
      FROM donations
      WHERE donor_id = ${donorId} AND status_pembayaran = 'lunas';
    `;
    await sql`
      UPDATE donors
      SET total_donasi_akumulasi = ${stats[0].total}, frekuensi_donasi = ${stats[0].count}
      WHERE id = ${donorId};
    `;
  }

  // Final verification query
  const check = await sql`
    SELECT COUNT(*) as count, SUM(nominal_total) as sum_total
    FROM donations
    WHERE program_tujuan = 'sedekah' AND status_pembayaran = 'lunas';
  `;

  console.log('====================================================');
  console.log('HASIL VERIFIKASI SEEDING POSTGRESQL:');
  console.log(`Jumlah Transaksi Sedekah Lunas: ${check[0].count} data`);
  console.log(`Total Nominal Terhimpun: Rp ${Number(check[0].sum_total).toLocaleString('id-ID')}`);
  console.log('====================================================');

  process.exit(0);
}

main().catch((e) => {
  console.error('SEED ERROR:', e);
  process.exit(1);
});
