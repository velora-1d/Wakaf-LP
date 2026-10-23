import postgres from 'postgres';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

const sql = postgres(connectionString);

async function runLabelsMigration() {
  console.log('[MIGRATION] Menyiapkan tabel labels & donor_labels...');

  try {
    // 1. Buat tabel labels
    await sql`
      CREATE TABLE IF NOT EXISTS labels (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(100) NOT NULL UNIQUE,
        warna VARCHAR(30) DEFAULT 'blue' NOT NULL,
        deskripsi TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    console.log('[MIGRATION] ✓ Tabel labels berhasil dibuat/diverifikasi.');

    // 2. Buat tabel junction donor_labels
    await sql`
      CREATE TABLE IF NOT EXISTS donor_labels (
        donor_id INTEGER NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
        label_id INTEGER NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (donor_id, label_id)
      );
    `;
    console.log('[MIGRATION] ✓ Tabel donor_labels berhasil dibuat/diverifikasi.');

    // 3. Seed label standar filantropi jika tabel masih kosong
    const countRes = await sql`SELECT COUNT(*)::int as cnt FROM labels`;
    const count = countRes[0]?.cnt || 0;

    if (count === 0) {
      console.log('[MIGRATION] Seeding label filantropi standar...');
      await sql`
        INSERT INTO labels (nama, warna, deskripsi) VALUES
        ('Donatur Rutin', 'blue', 'Donatur yang rutin berkontribusi setiap bulan'),
        ('Donatur VIP', 'amber', 'Donatur bernominal besar / prioritas kemitraan'),
        ('Calon Wakif', 'emerald', 'Prospek wakif lahan produktif & aset abadi'),
        ('Follow-up Khusus', 'rose', 'Perlu konfirmasi berkala atau silaturahmi amil'),
        ('Mitra Lembaga', 'cyan', 'Lembaga, yayasan, atau korporasi mitra dakwah'),
        ('Jamaah Masjid MKU', 'slate', 'Jamaah Masjid Khairu Ummah Jonggol')
        ON CONFLICT (nama) DO NOTHING;
      `;
      console.log('[MIGRATION] ✓ Seeding 6 label standar berhasil.');
    } else {
      console.log(`[MIGRATION] Tabel labels sudah berisi ${count} label.`);
    }

    console.log('[MIGRATION] Migrasi labels & donor_labels selesai 100%.');
    process.exit(0);
  } catch (err) {
    console.error('[MIGRATION ERROR]', err);
    process.exit(1);
  }
}

runLabelsMigration();
