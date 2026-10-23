import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

console.log('[DB-INIT] Connecting to PostgreSQL at 100.77.202.57:5433 (database: gvf)...');

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 15,
  ssl: false,
});

async function main() {
  try {
    // 1. DDL: Create tables
    console.log('[DB-INIT] Creating tables if not exist...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name VARCHAR(255) DEFAULT 'Administrator GVF',
        role VARCHAR(50) DEFAULT 'superadmin' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_published BOOLEAN DEFAULT TRUE NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS page_sections (
        id SERIAL PRIMARY KEY,
        page_slug VARCHAR(100) NOT NULL,
        section_key VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        is_enabled BOOLEAN DEFAULT TRUE NOT NULL,
        sort_order INTEGER DEFAULT 0 NOT NULL,
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT unique_page_section UNIQUE (page_slug, section_key)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS media_assets (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        mime_type VARCHAR(100),
        file_size INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    console.log('[DB-INIT] Tables created successfully.');

    // 2. Admin User Seeding
    const existingAdmin = await sql`SELECT id FROM admin_users WHERE username = 'admin' LIMIT 1`;
    const defaultPassword = 'admin123';
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(defaultPassword, salt);

    if (existingAdmin.length === 0) {
      await sql`
        INSERT INTO admin_users (username, password_hash, name, role)
        VALUES ('admin', ${hash}, 'Administrator GVF', 'superadmin')
      `;
      console.log(`[DB-INIT] Default admin created! Username: admin, Initial Password: ${defaultPassword}`);
    } else {
      await sql`
        UPDATE admin_users 
        SET password_hash = ${hash}, updated_at = CURRENT_TIMESTAMP 
        WHERE username = 'admin'
      `;
      console.log(`[DB-INIT] Admin user password updated to ${defaultPassword}.`);
    }

    // 3. Pages Seeding
    const defaultPages = [
      { slug: 'home', title: 'Beranda Utama GVF', description: 'Halaman beranda utama Global Village Fund' },
      { slug: 'tentang-kami', title: 'Tentang Kami', description: 'Profil yayasan, visi misi, dan kepengurusan GVF' },
      { slug: 'kemitraan', title: 'Kemitraan & Kolaborasi', description: 'Peluang kolaborasi dan kemitraan strategis' },
      { slug: 'contact', title: 'Hubungi Kami', description: 'Informasi kontak dan layanan konsultasi' },
      { slug: 'wakaf', title: 'Program Wakaf Produktif', description: 'Wakaf sarana prasarana dan kemandirian umat' },
      { slug: 'infaq', title: 'Program Infaq Pemberdayaan', description: 'Pilar pemberdayaan sosial dan kemanusiaan' },
      { slug: 'sedekah', title: 'Program Sedekah & Nutrisi', description: 'Bantuan santunan dan paket gizi keluarga dhuafa' },
      { slug: 'zakat', title: 'Program Zakat Maal & Fitrah', description: 'Penyaluran zakat produktif 8 asnaf terpercaya' },
    ];

    for (const p of defaultPages) {
      await sql`
        INSERT INTO pages (slug, title, description, is_published, updated_at)
        VALUES (${p.slug}, ${p.title}, ${p.description}, true, CURRENT_TIMESTAMP)
        ON CONFLICT (slug) DO UPDATE
        SET title = EXCLUDED.title, description = EXCLUDED.description, updated_at = CURRENT_TIMESTAMP;
      `;
    }
    console.log('[DB-INIT] Pages registered successfully.');

    // 4. Default Sections Seeding for 'home'
    const homeSections = [
      {
        page_slug: 'home',
        section_key: 'hero',
        title: 'Hero Section & Carousel',
        sort_order: 1,
        content: {
          badge: 'YAYASAN FILANTROPI ISLAM ARSITEKTURAL',
          heading: 'Membangun Peradaban Melalui Wakaf Berkelanjutan',
          subheading: 'Mengintegrasikan filantropi Islam dengan rancang bangun kawasan mandiri, memberdayakan umat secara transparan, profesional, dan berdampak nyata lintas generasi.',
          primaryCtaText: 'Salurkan Wakaf',
          primaryCtaUrl: '/program/wakaf',
          secondaryCtaText: 'Jelajahi Ekosistem',
          secondaryCtaUrl: '#ekosistem',
          stats: [
            { label: 'Keluarga Penerima Manfaat', value: '12.500+' },
            { label: 'Pusat Kawasan Terpadu', value: '4 Wilayah' },
            { label: 'Tingkat Akuntabilitas', value: '100% WTP' }
          ]
        }
      },
      {
        page_slug: 'home',
        section_key: 'programs_preview',
        title: 'Empat Pilar Program Utama',
        sort_order: 2,
        content: {
          heading: 'Empat Pilar Filantropi GVF',
          subheading: 'Solusi terpadu pengentasan kemiskinan dan kemandirian ekonomi umat melalui ZISWAF berstandar profesional.',
          programs: [
            { id: 'wakaf', title: 'Wakaf Produktif', tag: 'Aset Abadi', desc: 'Pengembangan kawasan sarana ibadah, pendidikan sains, dan agroekosistem mandiri.' },
            { id: 'infaq', title: 'Infaq Pemberdayaan', tag: 'Dampak Cepat', desc: 'Dukungan fasilitas umum, beasiswa generasi santri unggul, dan modal bergulir.' },
            { id: 'sedekah', title: 'Sedekah Pangan & Gizi', tag: 'Kemanusiaan', desc: 'Penyaluran sembako nutrisi dan bantuan tanggap darurat keluarga prasejahtera.' },
            { id: 'zakat', title: 'Zakat Produktif', tag: 'Wajib Syar’i', desc: 'Penyaluran zakat tepat sasaran kepada asnaf mustahik untuk memutus rantai kemiskinan.' }
          ]
        }
      },
      {
        page_slug: 'home',
        section_key: 'about_split',
        title: 'Tentang GVF (Wadah Kolaborasi)',
        sort_order: 3,
        content: {
          badge: 'TENTANG GLOBAL VILLAGE FUND',
          heading: 'Wadah Kolaborasi Filantropi Arsitektural Terdepan',
          paragraph1: 'Global Village Fund (GVF) adalah lembaga filantropi Islam yang memadukan kepatuhan syariah dengan prinsip arsitektur modern dan tata kelola profesional berstandar ISO.',
          paragraph2: 'Kami meyakini bahwa wakaf bukan sekadar aset diam, melainkan pilar katalisator peradaban yang menciptakan dampak ekonomi, pendidikan, dan kesejahteraan berkelanjutan.',
          ctaText: 'Pelajari Profil Lengkap',
          ctaUrl: '/tentang-kami'
        }
      },
      {
        page_slug: 'home',
        section_key: 'interactive_services',
        title: 'Jelajahi Ekosistem Terpadu',
        sort_order: 4,
        content: {
          badge: 'EKOSISTEM KAWASAN MANDIRI',
          heading: 'Integrasi Kawasan Produktif Terpadu',
          subheading: 'Setiap jengkal tanah wakaf dikelola untuk memberikan imbal hasil sosial dan ekonomi tertinggi bagi kemaslahatan umat.'
        }
      },
      {
        page_slug: 'home',
        section_key: 'workflow',
        title: 'Alur Tata Kelola & Transformasi 4 Langkah',
        sort_order: 5,
        content: {
          badge: 'AKUNTABILITAS & ALUR PROSES',
          heading: 'Standar Tata Kelola Amanah dan Transparan',
          subheading: 'Alur komprehensif dari penghimpunan hingga audit independen untuk memastikan setiap rupiah tepat guna.',
          steps: [
            { number: '01', title: 'Penerimaan & Akad Sah', desc: 'Penerimaan dana ZISWAF dengan bukti digital dan akad syariah yang sah serta mengikat.' },
            { number: '02', title: 'Pengalokasian Strategis', desc: 'Distribusi dana sesuai masterplan kawasan dan asnaf prioritas hasil studi kelayakan lapangan.' },
            { number: '03', title: 'Eksekusi & Konstruksi', desc: 'Pembangunan sarana dan pembinaan komunitas mustahik dengan kontrol mutu berkala.' },
            { number: '04', title: 'Audit & Pelaporan Terbuka', desc: 'Laporan keuangan dan dampak sosial dipublikasikan secara transparan dengan opini WTP.' }
          ]
        }
      },
      {
        page_slug: 'home',
        section_key: 'showcase_gallery',
        title: 'Dokumentasi Riil & Masterplan (Elastic Gallery)',
        sort_order: 6,
        content: {
          badge: 'DOKUMENTASI RIIL LAPANGAN',
          heading: 'Bukti Nyata Pembangunan Kawasan Terpadu',
          subheading: 'Galeri visual interaktif perkembangan masterplan dan penyaluran program di berbagai pelosok nusantara.'
        }
      },
      {
        page_slug: 'home',
        section_key: 'leadership',
        title: 'Temui Dewan & Pengurus GVF',
        sort_order: 7,
        content: {
          badge: 'DEWAN PENGURUS & PEMBINA',
          heading: 'Dipimpin Para Profesional & Praktisi Amanah',
          subheading: 'Kombinasi ulama syariah, arsitek tata kota, dan profesional keuangan berintegritas tinggi.'
        }
      },
      {
        page_slug: 'home',
        section_key: 'video_documentary',
        title: 'Video Dokumentasi YouTube Resmi',
        sort_order: 8,
        content: {
          badge: 'DOKUMENTASI AUDIO VISUAL',
          heading: 'Menyaksikan Langsung Jejak Kebaikan di Pelosok Desa',
          youtubeId: 'dQw4w9WgXcQ',
          videoTitle: 'Satu Kebaikan Mengubah Ratusan Senyuman',
          description: 'Saksikan kisah nyata perubahan para penerima manfaat melalui program wakaf terpadu Global Village Fund.'
        }
      },
      {
        page_slug: 'home',
        section_key: 'news_section',
        title: 'Kabar & Warta GVF',
        sort_order: 9,
        content: {
          badge: 'WARTA & DOKUMENTASI TERKINI',
          heading: 'Kabar Kebaikan & Perkembangan Proyek',
          subheading: 'Informasi transparan mengenai peresmian program, kegiatan relawan, dan laporan berkala yayasan.'
        }
      },
      {
        page_slug: 'home',
        section_key: 'final_cta',
        title: 'Final CTA Konsultasi & Donasi',
        sort_order: 10,
        content: {
          heading: 'Mari Mulai Mengalirkan Pahala Jariyah yang Tak Pernah Putus',
          subheading: 'Konsultasikan rencana wakaf keluarga, korporasi, atau perseorangan bersama tim konsultan filantropi profesional GVF.',
          primaryBtnText: 'Mulai Donasi Sekarang',
          primaryBtnUrl: '/program/wakaf',
          secondaryBtnText: 'Hubungi Call Center',
          secondaryBtnUrl: '/contact'
        }
      }
    ];

    for (const s of homeSections) {
      await sql`
        INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
        VALUES (${s.page_slug}, ${s.section_key}, ${s.title}, true, ${s.sort_order}, ${sql.json(s.content)}, CURRENT_TIMESTAMP)
        ON CONFLICT (page_slug, section_key) DO UPDATE
        SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, updated_at = CURRENT_TIMESTAMP;
      `;
    }
    console.log('[DB-INIT] Home sections seeded.');

    // 5. Default Sections for Program Pages (Wakaf, Infaq, Sedekah, Zakat)
    const programSlugs = ['wakaf', 'infaq', 'sedekah', 'zakat'] as const;
    for (const slug of programSlugs) {
      const progSections = [
        {
          page_slug: slug,
          section_key: 'prog_hero',
          title: `Header & Banner ${slug.toUpperCase()}`,
          sort_order: 1,
          content: {
            badge: `PROGRAM ${slug.toUpperCase()} RESMI GVF`,
            title: `Program ${slug.charAt(0).toUpperCase() + slug.slice(1)} Berkelanjutan`,
            subtitle: `Salurkan dana ${slug} Anda dengan pengelolaan profesional, tepat sasaran, dan akuntabel sesuai syariat Islam.`
          }
        },
        {
          page_slug: slug,
          section_key: 'prog_pricing',
          title: `Pilihan Paket ${slug.toUpperCase()}`,
          sort_order: 2,
          content: {
            heading: `Pilihan Paket Kontribusi ${slug.toUpperCase()}`,
            subheading: `Tentukan nominal dan tujuan penyaluran ${slug} terbaik untuk kemaslahatan umat.`
          }
        },
        {
          page_slug: slug,
          section_key: 'prog_addons',
          title: `Layanan Pelengkap & Operasional`,
          sort_order: 3,
          content: {
            title: 'Layanan Tambahan Pendukung Program',
            desc: 'Dukungan pelaporan personal, plakat wakaf, dan sertifikat digital berkode verifikasi QR.'
          }
        },
        {
          page_slug: slug,
          section_key: 'prog_details',
          title: `Deep-Dive Penjelasan Program 2-Kolom`,
          sort_order: 4,
          content: {
            badge: 'TATA KELOLA SYARIAH',
            title: `Implementasi Nyata Program ${slug.toUpperCase()}`,
            storyLead: `Setiap kontribusi yang dipercayakan kepada GVF dikawal oleh tim ahli bersertifikasi demi menghasilkan multiplier effect yang berlipat ganda.`
          }
        },
        {
          page_slug: slug,
          section_key: 'prog_faq',
          title: `FAQ Accordion Pertanyaan Sering Diajukan`,
          sort_order: 5,
          content: {
            heading: `Pertanyaan Seputar ${slug.toUpperCase()}`,
            subheading: `Semua jawaban atas keraguan dan ketentuan fiqih terkait ${slug}.`
          }
        }
      ];

      for (const ps of progSections) {
        await sql`
          INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
          VALUES (${ps.page_slug}, ${ps.section_key}, ${ps.title}, true, ${ps.sort_order}, ${sql.json(ps.content)}, CURRENT_TIMESTAMP)
          ON CONFLICT (page_slug, section_key) DO UPDATE
          SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, updated_at = CURRENT_TIMESTAMP;
        `;
      }
    }
    console.log('[DB-INIT] Program sections seeded for wakaf, infaq, sedekah, zakat.');

    // 6. Default Sections for Static Pages: Tentang Kami, Kemitraan, Contact
    const otherPages = [
      {
        slug: 'tentang-kami',
        sections: [
          { key: 'about_hero', title: 'Header & Visi Misi', sort_order: 1, content: { title: 'Mengenal Yayasan Global Village Fund', subtitle: 'Dedikasi tanpa henti untuk membangun peradaban madani berlandaskan syariat dan arsitektur berwawasan masa depan.' } },
          { key: 'about_stats', title: 'Metrik Pencapaian & Statistik', sort_order: 2, content: { title: 'Dampak Nyata yang Telah Dihadirkan' } },
          { key: 'about_gallery', title: 'Galeri Elastic Interaktif', sort_order: 3, content: { title: 'Dokumentasi Fasilitas & Penyaluran' } },
          { key: 'about_team', title: 'Struktur Dewan Pengurus', sort_order: 4, content: { title: 'Jajaran Pembina & Pelaksana Harian' } }
        ]
      },
      {
        slug: 'kemitraan',
        sections: [
          { key: 'partner_hero', title: 'Banner & Ajakan Kolaborasi', sort_order: 1, content: { title: 'Kemitraan Strategis Filantropi', subtitle: 'Bersama korporasi, institusi pendidikan, dan komunitas mewujudkan transformasi desa mandiri.' } },
          { key: 'partner_benefits', title: 'Nilai Lebih & Manfaat Kolaborasi', sort_order: 2, content: { title: 'Mengapa Bermitra dengan GVF?' } },
          { key: 'partner_form', title: 'Formulir Pengajuan Kemitraan', sort_order: 3, content: { title: 'Mulai Diskusi Kemitraan Hari Ini' } }
        ]
      },
      {
        slug: 'contact',
        sections: [
          { key: 'contact_hero', title: 'Banner Hubungi Kami', sort_order: 1, content: { title: 'Layanan Informasi & Konsultasi', subtitle: 'Pintu kami selalu terbuka untuk diskusi donasi, wakaf, dan kemitraan.' } },
          { key: 'contact_info', title: 'Alamat Kantor & Jam Operasional', sort_order: 2, content: { address: 'Menara GVF Lantai 8, Jakarta Selatan', email: 'layanan@globalvillagefund.org', phone: '+62 21 8899 7700' } },
          { key: 'contact_form', title: 'Formulir Kirim Pesan', sort_order: 3, content: { title: 'Kirimkan Pertanyaan atau Masukan' } }
        ]
      }
    ];

    for (const page of otherPages) {
      for (const sec of page.sections) {
        await sql`
          INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
          VALUES (${page.slug}, ${sec.key}, ${sec.title}, true, ${sec.sort_order}, ${sql.json(sec.content)}, CURRENT_TIMESTAMP)
          ON CONFLICT (page_slug, section_key) DO UPDATE
          SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, updated_at = CURRENT_TIMESTAMP;
        `;
      }
    }
    console.log('[DB-INIT] All pages and sections seeded successfully in PostgreSQL!');

  } catch (error) {
    console.error('[DB-INIT] Error during migration and seeding:', error);
    process.exit(1);
  } finally {
    await sql.end();
    console.log('[DB-INIT] Database connection closed.');
  }
}

main();
