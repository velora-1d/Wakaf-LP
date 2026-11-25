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

const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

async function main() {
  console.log('[MIGRATE-7-MENU] Memulai migrasi struktur 7 menu akhir...');

  // 1. Perluas tabel news_articles
  await sql`ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS content_type VARCHAR(30) DEFAULT 'kabar' NOT NULL;`;
  await sql`ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS video_url TEXT;`;
  await sql`ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS attachment_url TEXT;`;
  console.log('[MIGRATE-7-MENU] Kolom content_type, video_url, attachment_url pada news_articles siap.');

  // 2. Buat tabel transparency_reports
  await sql`
    CREATE TABLE IF NOT EXISTS transparency_reports (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      period_label VARCHAR(100) NOT NULL,
      program_scope VARCHAR(50) DEFAULT 'all' NOT NULL,
      summary TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_size INTEGER,
      is_published BOOLEAN DEFAULT TRUE NOT NULL,
      published_at VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;
  console.log('[MIGRATE-7-MENU] Tabel transparency_reports siap.');

  // 3. Registrasi & perbarui tabel pages
  const pagesToUpsert = [
    { slug: 'pembangunan-masjid', title: 'Program Pembangunan Masjid', description: 'Pembangunan Masjid Khairu Ummah Sugro & Fasilitas Ibadah Santri' },
    { slug: 'gota-ssm', title: 'Program GOTA SSM', description: 'Gerakan Orang Tua Asuh Santri Skill Village Islamic School' },
    { slug: 'infaq', title: 'Infak (Material Masjid)', description: 'Kontribusi Infak Katalog Material Pembangunan Masjid & Sarana Dakwah' },
    { slug: 'sedekah', title: 'Sedekah (Dukungan GOTA SSM)', description: 'Kontribusi Sedekah Pangan, Perlengkapan & Pembinaan Santri GOTA SSM' },
    { slug: 'wakaf', title: 'Wakaf (Objek & Peruntukan)', description: 'Objek dan Peruntukan Wakaf Tanah, Bangunan, Masjid & Produktif' },
    { slug: 'zakat', title: 'Zakat (Kampanye Ramadan & Idulfitri)', description: 'Kampanye Zakat Fitrah, Fidyah, Zakat Maal & Profesi Asnaf Berkelanjutan' },
  ];

  for (const p of pagesToUpsert) {
    await sql`
      INSERT INTO pages (slug, title, description, is_published, updated_at)
      VALUES (${p.slug}, ${p.title}, ${p.description}, true, CURRENT_TIMESTAMP)
      ON CONFLICT (slug) DO UPDATE
      SET title = EXCLUDED.title,
          description = EXCLUDED.description,
          updated_at = CURRENT_TIMESTAMP;
    `;
  }
  console.log('[MIGRATE-7-MENU] Halaman baru & pembaruan label kontribusi di tabel pages selesai.');

  // 4. Seed page_sections untuk pembangunan-masjid, gota-ssm, dan section terstruktur Bentuk Kontribusi
  const sectionsToSeed: Array<{
    pageSlug: string;
    sectionKey: string;
    title: string;
    sortOrder: number;
    content: Record<string, any>;
  }> = [
    // --- Halaman: pembangunan-masjid ---
    {
      pageSlug: 'pembangunan-masjid',
      sectionKey: 'masjid_hero',
      title: 'Hero Pembangunan Masjid',
      sortOrder: 1,
      content: {
        badge: 'PROGRAM UNGGULAN • FASILITAS IBADAH',
        heading: 'Pembangunan Masjid Khairu Ummah Sugro',
        subheading: 'Membangun pusat ibadah, majelis dzikir, dan halaqah tahfidz Al-Quran berarsitektur tropis di kawasan Sukasirna, Jonggol.',
        imageUrl: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp`,
        primaryCtaText: 'Salurkan Infak Masjid',
        primaryCtaUrl: '/kontribusi/infaq#paket-pilihan',
        secondaryCtaText: 'Tunaikan Wakaf Masjid',
        secondaryCtaUrl: '/kontribusi/wakaf',
      },
    },
    {
      pageSlug: 'pembangunan-masjid',
      sectionKey: 'masjid_progress',
      title: 'Progres Konstruksi & Milestone Masjid',
      sortOrder: 2,
      content: {
        badge: 'PROGRES FISIK LAPANGAN',
        heading: 'Perkembangan Pembangunan Saat Ini',
        subheading: 'Pantauan berkala realisasi penghimpunan dana terverifikasi dan tahapan penyelesaian Masjid Khairu Ummah Sugro.',
        targetAmount: 1310753350,
        targetLabel: 'Rp 1.310.753.350',
        milestones: [
          { title: 'Pondasi & Struktur Utama', status: 'Selesai 100%', detail: 'Pengecoran sloof, kolom beton bertulang, dan lantai utama ruang shalat.' },
          { title: 'Dinding Hebel & Ventilasi Roster', status: 'Selesai 85%', detail: 'Pemasangan bata ringan dan panel roster terakota untuk sirkulasi udara alami.' },
          { title: 'Mezanin Halaqah & Atap Permanen', status: 'Berjalan 55%', detail: 'Konstruksi lantai mezanin dua tingkat untuk halaqah tahfidz dan pemasangan rangka atap.' },
          { title: 'Area Wudhu, Sanitasi & Pelataran', status: 'Berjalan 45%', detail: 'Instalasi kran eco-wudhu, kamar mandi jamaah, dan pengecoran pelataran depan.' },
        ],
      },
    },
    {
      pageSlug: 'pembangunan-masjid',
      sectionKey: 'masjid_architecture',
      title: 'Konsep Garden Mosque & Kapasitas',
      sortOrder: 3,
      content: {
        badge: 'ARSITEKTUR TROPIS BERKELANJUTAN',
        heading: 'Garden Mosque Ramah Lingkungan untuk Santri & Warga',
        paragraph1: 'Masjid Khairu Ummah Sugro dirancang dengan pendekatan green building tropis yang memaksimalkan pencahayaan alami dan ventilasi silang melalui dinding roster terakota, sehingga ruang shalat tetap sejuk tanpa ketergantungan pendingin udara.',
        paragraph2: 'Selain menampung hingga 500 jamaah untuk shalat berjamaah lima waktu dan Jumat, lantai mezanin masjid difungsikan sebagai pusat halaqah Al-Quran, kajian adab subuh, dan pembinaan karakter santri SMK Skill Village.',
        imageUrl: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-tampak-dalam-2.jpeg`,
      },
    },
    {
      pageSlug: 'pembangunan-masjid',
      sectionKey: 'masjid_material_bridge',
      title: 'Jembatan ke Katalog Material Masjid (Infak)',
      sortOrder: 4,
      content: {
        badge: 'GOTONG ROYONG MATERIAL NYATA',
        heading: 'Ikut Membangun Lewat Katalog Material Masjid',
        desc: 'Setiap partisipasi infak Anda terkonversi langsung menjadi kebutuhan material bangunan di lapangan, mulai dari semen SNI, pasir cor, bata roster, hingga instalasi sanitasi wudhu.',
        primaryCtaText: 'Pilih Paket Infak Masjid',
        primaryCtaUrl: '/kontribusi/infaq#paket-pilihan',
      },
    },
    {
      pageSlug: 'pembangunan-masjid',
      sectionKey: 'masjid_gallery',
      title: 'Galeri Dokumentasi Lapangan Masjid',
      sortOrder: 5,
      content: {
        heading: 'Dokumentasi Fisik Kawasan Masjid',
        subheading: 'Potret kondisi aktual pembangunan di Desa Sukasirna, Kec. Jonggol, Kab. Bogor.',
        items: [
          { title: 'Pelataran Depan Masjid', category: 'Struktur & Lantai', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp` },
          { title: 'Ventilasi Roster Terakota', category: 'Green Building', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/dinding-hebel-ventilasi-roster-1.webp` },
          { title: 'Ruang Shalat Utama', category: 'Interior Ibadah', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-tampak-dalam-2.jpeg` },
          { title: 'Area Wudhu & Sanitasi', category: 'Fasilitas Jamaah', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kamar-mandi-wc-masjid.webp` },
        ],
      },
    },
    {
      pageSlug: 'pembangunan-masjid',
      sectionKey: 'masjid_faq',
      title: 'Tanya Jawab Pembangunan Masjid',
      sortOrder: 6,
      content: {
        heading: 'Pertanyaan Seputar Pembangunan Masjid',
        faqs: [
          { question: 'Apakah donasi pembangunan masjid bisa berupa material fisik langsung?', answer: 'Bisa. Anda dapat memilih item pada Katalog Material Masjid di menu Bentuk Kontribusi Infak atau berkoordinasi langsung dengan tim lapangan GVF untuk pengiriman material ke lokasi Jonggol.' },
          { question: 'Apa perbedaan menyalurkan lewat Infak Material dan Wakaf Masjid?', answer: 'Infak Material berfokus pada pengadaan bahan konstruksi dan penyelesaian fisik bangunan secara fleksibel, sedangkan Wakaf Masjid merupakan penyerahan harta benda abadi dengan akad ikrar wakaf resmi nazhir.' },
          { question: 'Bagaimana laporan perkembangan konstruksi disampaikan?', answer: 'Setiap laporan perkembangan fisik dan rekap belanja material dipublikasikan berkala pada halaman Kabar & Laporan serta dapat dipantau pada menu Daftar Donatur.' },
        ],
      },
    },

    // --- Halaman: gota-ssm ---
    {
      pageSlug: 'gota-ssm',
      sectionKey: 'gota_hero',
      title: 'Hero Program GOTA SSM',
      sortOrder: 1,
      content: {
        badge: 'PROGRAM UNGGULAN • PENDIDIKAN SANTRI',
        heading: 'GOTA SSM: Gerakan Orang Tua Asuh Santri Skill Village',
        subheading: 'Menjamin keberlanjutan pendidikan, gizi harian, asrama, dan pembinaan karakter santri yatim dan dhuafa agar tumbuh kompeten dan mandiri.',
        imageUrl: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kbm-santri-ikhwan-menulis.webp`,
        primaryCtaText: 'Salurkan Sedekah GOTA SSM',
        primaryCtaUrl: '/kontribusi/sedekah#paket-pilihan',
        secondaryCtaText: 'Konsultasi Orang Tua Asuh',
        secondaryCtaUrl: '/contact',
      },
    },
    {
      pageSlug: 'gota-ssm',
      sectionKey: 'gota_overview',
      title: 'Profil & Ekosistem Pembinaan Santri SSM',
      sortOrder: 2,
      content: {
        badge: 'PEMBINAAN HOLISTIK',
        heading: 'Membekali Santri dengan Adab, Tahfidz, dan Vokasi Industri',
        paragraph1: 'GOTA SSM (Gerakan Orang Tua Asuh — Santri Skill Village Islamic School) mempertemukan kepedulian para muhsinin dengan kebutuhan riil santri mukim yang menempuh pendidikan berasrama di Sukasirna, Jonggol.',
        paragraph2: 'Setiap santri mendapatkan pembinaan karakter FAST (Fathonah, Amanah, Shiddiq, Tabligh), tahfidz Al-Quran, konsumsi bergizi 3 kali sehari, serta praktik keterampilan vokasi agroteknologi, peternakan, dan teknologi digital.',
        imageUrl: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/ustadz-menulis-materi-di-whiteboard.webp`,
      },
    },
    {
      pageSlug: 'gota-ssm',
      sectionKey: 'gota_schemes',
      title: 'Skema Orang Tua Asuh Santri',
      sortOrder: 3,
      content: {
        badge: 'PILIHAN PARTISIPASI ASUH',
        heading: 'Skema Dukungan Orang Tua Asuh GOTA SSM',
        subheading: 'Anda dapat berkontribusi secara rutin bulanan maupun sesuai kemampuan melalui saluran Sedekah GOTA SSM.',
        schemes: [
          { title: 'Orang Tua Asuh Nutrisi Harian', amount: 'Rp 150.000', period: 'per bulan', desc: 'Menunjang kecukupan pangan sehat, lauk berprotein, dan air minum santri mukim.' },
          { title: 'Orang Tua Asuh Perlengkapan Belajar', amount: 'Rp 300.000', period: 'per bulan', desc: 'Mendukung pengadaan kitab, modul vokasi, seragam, serta peralatan praktik kejuruan.' },
          { title: 'Orang Tua Asuh Penuh (1 Santri)', amount: 'Rp 750.000', period: 'per bulan', desc: 'Mencakup biaya asrama, konsumsi 3x sehari, pembinaan tahfidz, dan pendidikan vokasi lengkap.' },
        ],
      },
    },
    {
      pageSlug: 'gota-ssm',
      sectionKey: 'gota_sedekah_bridge',
      title: 'Jembatan ke Sedekah Dukungan GOTA SSM',
      sortOrder: 4,
      content: {
        badge: 'TERHUBUNG DENGAN BENTUK KONTRIBUSI SEDEKAH',
        heading: 'Salurkan Dukungan Nyata Melalui Sedekah GOTA SSM',
        desc: 'Ingin langsung memilih paket konsumsi gizi, beras logistik, atau perlengkapan belajar santri? Lanjutkan ke halaman Bentuk Kontribusi Sedekah.',
        primaryCtaText: 'Pilih Paket Dukungan GOTA SSM',
        primaryCtaUrl: '/kontribusi/sedekah#paket-pilihan',
      },
    },
    {
      pageSlug: 'gota-ssm',
      sectionKey: 'gota_impact',
      title: 'Dampak & Dokumentasi Santri SSM',
      sortOrder: 5,
      content: {
        heading: 'Aktivitas & Capaian Santri Binaan',
        subheading: 'Potret pembinaan akademik, tahfidz, dan praktik kemandirian santri di kawasan pesantren.',
        items: [
          { title: 'Pembinaan Adab & Kitab', category: 'Karakter FAST', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/halaqah-santri-melingkar.webp` },
          { title: 'Prestasi Musabaqah Al-Quran', category: 'Tahfidz & Tilawah', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/tiga-santri-juara-mtq-jonggol-piala.webp` },
          { title: 'Praktik Agroteknologi', category: 'Kemandirian Vokasi', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/greenhouse-pertanian.webp` },
        ],
      },
    },
    {
      pageSlug: 'gota-ssm',
      sectionKey: 'gota_faq',
      title: 'Tanya Jawab GOTA SSM',
      sortOrder: 6,
      content: {
        heading: 'Pertanyaan Seputar Program GOTA SSM',
        faqs: [
          { question: 'Apakah menjadi Orang Tua Asuh GOTA SSM harus terikat nominal tertentu?', answer: 'Tidak. Skema Orang Tua Asuh Penuh adalah acuan kebutuhan bulanan per santri, namun Anda tetap dapat berpartisipasi dengan nominal berapa pun atau patungan melalui paket Sedekah GOTA SSM.' },
          { question: 'Bagaimana bentuk pertanggungjawaban program GOTA SSM?', answer: 'Laporan perkembangan belajar santri, dokumentasi kegiatan, dan rekap penyaluran dana dipublikasikan secara berkala melalui menu Kabar & Laporan.' },
        ],
      },
    },
  ];

  for (const sec of sectionsToSeed) {
    await sql`
      INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
      VALUES (${sec.pageSlug}, ${sec.sectionKey}, ${sec.title}, true, ${sec.sortOrder}, ${sql.json(sec.content)}, CURRENT_TIMESTAMP)
      ON CONFLICT (page_slug, section_key) DO NOTHING;
    `;
  }
  console.log('[MIGRATE-7-MENU] Seed page_sections baru selesai.');

  // 5. Seed 2 artikel awal Edukasi & Kajian jika belum ada
  const existingEdu = await sql`SELECT COUNT(*)::int AS cnt FROM news_articles WHERE content_type = 'edukasi'`;
  if ((existingEdu[0]?.cnt || 0) === 0) {
    const eduArticles = [
      {
        slug: 'fiqih-wakaf-produktif-untuk-ekosistem-pendidikan-umat',
        title: 'Fiqih Wakaf Produktif: Menghidupkan Aset untuk Ekosistem Pendidikan Umat',
        category: 'FIQIH WAKAF',
        contentType: 'edukasi',
        summary: 'Memahami landasan syariah wakaf produktif, menjaga keutuhan pokok aset, dan mengalirkan hasil manfaatnya bagi santri serta masyarakat.',
        content: `Wakaf merupakan instrumen filantropi Islam yang unik karena memadukan dimensi ibadah mahdhah dan pemberdayaan sosial ekonomi jangka panjang.\n\nDalam prinsip fiqih wakaf, pokok harta (ashl) wajib dijaga keutuhannya agar tidak berkurang atau diperjualbelikan, sementara hasil kelolaan dan manfaatnya disalurkan kepada penerima manfaat (mauquf 'alaih).\n\nDi Global Village Fund (GVF), pendekatan wakaf produktif diwujudkan melalui integrasi tanah kawasan pesantren, fasilitas ibadah Masjid Khairu Ummah Sugro, serta unit agroteknologi yang melatih kemandirian santri sekaligus menopang operasional pendidikan secara berkelanjutan.`,
        coverImage: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-landscape.webp`,
        videoUrl: '',
        attachmentUrl: '',
        author: 'Dewan Pengawas Syariah GVF',
        publishedAt: '24 November 2026',
      },
      {
        slug: 'panduan-praktis-hisab-zakat-maal-fitrah-dan-fidyah-ramadan',
        title: 'Panduan Praktis Hisab Zakat Maal, Zakat Fitrah, dan Fidyah Ramadan',
        category: 'PANDUAN ZAKAT',
        contentType: 'edukasi',
        summary: 'Ringkasan ketentuan nisab 85 gram emas, haul 1 tahun, takaran beras zakat fitrah, serta tata cara penyaluran kepada 8 golongan asnaf.',
        content: `Menunaikan zakat merupakan kewajiban rukun Islam yang memiliki ketentuan spesifik terkait nisab, haul, kadar 2,5%, serta delapan golongan asnaf yang berhak menerimanya.\n\nUntuk Zakat Fitrah, kewajiban ditunaikan setiap jiwa muslim sebelum pelaksanaan shalat Idulfitri dengan takaran 2,5 kg atau 3,5 liter beras makanan pokok (atau nilai uang yang setara).\n\nSementara itu, Zakat Maal dan Zakat Penghasilan wajib dikeluarkan sebesar 2,5% apabila total harta simpanan atau akumulasi pendapatan telah melampaui batas nisab setara 85 gram emas murni.`,
        coverImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/ustadz-menulis-materi-di-whiteboard.webp`,
        videoUrl: '',
        attachmentUrl: '',
        author: 'Tim Literasi Syariah GVF',
        publishedAt: '20 November 2026',
      },
    ];

    for (const art of eduArticles) {
      await sql`
        INSERT INTO news_articles (
          slug, title, category, content_type, summary, content, cover_image, video_url, attachment_url, author, is_published, published_at
        )
        VALUES (
          ${art.slug}, ${art.title}, ${art.category}, ${art.contentType}, ${art.summary}, ${art.content},
          ${art.coverImage}, ${art.videoUrl}, ${art.attachmentUrl}, ${art.author}, true, ${art.publishedAt}
        )
        ON CONFLICT (slug) DO NOTHING;
      `;
    }
    console.log('[MIGRATE-7-MENU] 2 artikel awal Edukasi & Kajian berhasil di-seed.');
  }

  // 6. Seed 1 contoh laporan awal di transparency_reports jika kosong
  const existingReports = await sql`SELECT COUNT(*)::int AS cnt FROM transparency_reports`;
  if ((existingReports[0]?.cnt || 0) === 0) {
    await sql`
      INSERT INTO transparency_reports (
        title, period_label, program_scope, summary, file_url, file_size, is_published, published_at
      )
      VALUES (
        'Laporan Realisasi Penghimpunan & Progres Kawasan GVF',
        'Triwulan III 2026',
        'all',
        'Ringkasan arus kas masuk-keluar Infak Material Masjid, Sedekah Dukungan GOTA SSM, Wakaf Kawasan, dan Penyaluran Zakat 8 Asnaf.',
        '/donatur',
        0,
        true,
        '24 November 2026'
      );
    `;
    console.log('[MIGRATE-7-MENU] 1 entri awal transparency_reports berhasil di-seed.');
  }

  // 7. Perbarui RBAC role_definitions & admin_users superadmin
  const newPermKeys = ['pembangunan-masjid', 'gota-ssm', 'edukasi', 'laporan'];

  const roleTargets = ['superadmin', 'editor_konten'];
  for (const rKey of roleTargets) {
    const rows = await sql`SELECT permissions FROM role_definitions WHERE role_key = ${rKey} LIMIT 1`;
    if (rows.length > 0 && Array.isArray(rows[0].permissions)) {
      const merged = Array.from(new Set([...rows[0].permissions, ...newPermKeys]));
      await sql`
        UPDATE role_definitions
        SET permissions = ${JSON.stringify(merged)}::jsonb,
            updated_at = CURRENT_TIMESTAMP
        WHERE role_key = ${rKey};
      `;
    }
  }

  const superAdmins = await sql`SELECT id, permissions FROM admin_users WHERE role = 'superadmin'`;
  for (const admin of superAdmins) {
    const cur = Array.isArray(admin.permissions) ? admin.permissions : [];
    const merged = Array.from(new Set([...cur, ...newPermKeys]));
    await sql`
      UPDATE admin_users
      SET permissions = ${JSON.stringify(merged)}::jsonb,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${admin.id};
    `;
  }

  const editorAdmins = await sql`SELECT id, permissions FROM admin_users WHERE role = 'editor_konten'`;
  for (const editor of editorAdmins) {
    const cur = Array.isArray(editor.permissions) ? editor.permissions : [];
    const merged = Array.from(new Set([...cur, ...newPermKeys]));
    await sql`
      UPDATE admin_users
      SET permissions = ${JSON.stringify(merged)}::jsonb,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${editor.id};
    `;
  }

  console.log('[MIGRATE-7-MENU] RBAC superadmin & editor_konten berhasil disinkronkan.');
  console.log('[MIGRATE-7-MENU] Migrasi selesai 100%!');
  await sql.end();
  process.exit(0);
}

main().catch(async (err) => {
  console.error('[MIGRATE-7-MENU] Migrasi gagal:', err);
  await sql.end();
  process.exit(1);
});
