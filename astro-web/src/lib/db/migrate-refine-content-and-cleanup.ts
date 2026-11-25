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

function safePlainObject(raw: unknown): Record<string, any> {
  let val: unknown = raw;
  if (typeof val === 'string') {
    try {
      val = JSON.parse(val);
    } catch {
      return {};
    }
  }
  if (!val || typeof val !== 'object' || Array.isArray(val)) return {};
  const clean: Record<string, any> = {};
  for (const [k, v] of Object.entries(val as Record<string, any>)) {
    if (!/^\d+$/.test(k)) clean[k] = v;
  }
  return clean;
}

async function main() {
  console.log('[MIGRATE-REFINE] Memulai pembersihan 4 section Bentuk Kontribusi & sinkronisasi copywriting...');

  // 1. Hapus 4 section tambahan dari Bentuk Kontribusi
  const deletedSections = await sql`
    DELETE FROM page_sections
    WHERE section_key IN ('infaq_materials', 'sedekah_gota_chips', 'wakaf_objects', 'zakat_ramadan')
    RETURNING page_slug, section_key;
  `;
  console.log(`[MIGRATE-REFINE] Dihapus ${deletedSections.length} baris page_sections tambahan:`, deletedSections.map((r) => `${r.page_slug}:${r.section_key}`));

  // 2. Perbarui Beranda Hero (page_slug = 'home', section_key = 'hero')
  const heroRows = await sql`
    SELECT id, content FROM page_sections
    WHERE page_slug = 'home' AND section_key = 'hero'
    LIMIT 1;
  `;
  const slide1Lead =
    "Global Village Fund (GVF) merupakan lembaga keuangan sosial di bawah naungan Yayasan Permata Cendekia Indonesia yang menghubungkan kontribusi dan kolaborasi berbagai pihak untuk mendukung program-program kebermanfaatan.\n\n" +
    "Melalui pilot project ekosistem pesantren di Pesantren Skill Village Islamic School, GVF mengembangkan Masjid Taman Khairu Ummah Sughro sebagai pusat interaksi, ibadah, pengembangan kompetensi, dan pembentukan karakter santri.\n\n" +
    "Dari masjid sebagai pusatnya, berbagai inisiatif dikembangkan untuk mendukung kehidupan pesantren, mulai dari penyediaan sarana ibadah, pendampingan pendidikan santri, hingga edukasi berbasis Al-Qur'an dan pertanian.";

  const masjidImg = `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp`;

  if (heroRows.length > 0) {
    const existingContent = safePlainObject(heroRows[0].content);
    const existingSlides = Array.isArray(existingContent.slides) ? [...existingContent.slides] : [];

    const updatedSlide1 = {
      ...(existingSlides[0] || {}),
      id: 'slide-1',
      index: '01',
      label: 'Global Village Fund',
      badge: 'GLOBAL VILLAGE FUND',
      taglineEn: 'GLOBAL VILLAGE FUND',
      title: 'Masjid sebagai Pusat Kebaikan,<br />Ekosistem sebagai Jalan Kebermanfaatan.',
      lead: slide1Lead,
      image: existingSlides[0]?.image || masjidImg,
      buttons: [
        { text: 'Kenali GVF', href: '/tentang-kami', variant: 'primary' },
        { text: 'Ambil Bagian', href: '#program-kebaikan', variant: 'outline' },
      ],
    };

    const nextSlides = [updatedSlide1, ...existingSlides.slice(1)];
    nextSlides[1] = {
      ...(nextSlides[1] || {}),
      id: 'slide-2',
      index: '02',
      label: 'Pembangunan Masjid',
      badge: 'PROGRAM PEMBANGUNAN MASJID',
      taglineEn: 'PROGRAM PEMBANGUNAN MASJID',
      title: 'Pembangunan Masjid Taman Khairu Ummah Sughro',
      lead: 'Mendukung pembangunan masjid sebagai pusat ibadah dan interaksi santri, sekaligus ruang bagi pembinaan karakter dan pengembangan kompetensi di lingkungan pesantren.',
      image: nextSlides[1]?.image || `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp`,
      buttons: [
        { text: 'Lihat Program', href: '/program/pembangunan-masjid', variant: 'primary' },
      ],
    };
    nextSlides[2] = {
      ...(nextSlides[2] || {}),
      id: 'slide-3',
      index: '03',
      label: 'GOTA SSM',
      badge: 'PROGRAM GOTA SSM',
      taglineEn: 'PROGRAM GOTA SSM',
      title: 'GOTA SSM (Gerakan Orang Tua Asuh & Sahabat Santri Mandiri)',
      lead: 'Menghubungkan orang tua asuh dan sahabat santri untuk mendukung keberlanjutan pendidikan serta kebutuhan santri Pesantren Skill Village Islamic School.',
      image: nextSlides[2]?.image || `${S3_BASE}/bahan-konten/halaqah-santri-melingkar.webp`,
      buttons: [
        { text: 'Lihat Program', href: '/program/gota-ssm', variant: 'primary' },
      ],
    };
    nextSlides[3] = {
      ...(nextSlides[3] || {}),
      id: 'slide-4',
      index: '04',
      label: nextSlides[3]?.label || 'Tunaikan Zakat, Sucikan Harta',
      badge: 'ZAKAT GLOBAL VILLAGE FUND',
      taglineEn: 'ZAKAT GLOBAL VILLAGE FUND',
      title: 'Tunaikan Zakat Mal & Zakat Fitrah',
      lead: 'Bersihkan harta dengan zakat mal dan tunaikan kewajiban zakat lainnya. Sambut Idulfitri dengan menunaikan zakat fitrah, berbagi kebahagiaan, dan menghadirkan manfaat bagi sesama.',
      image: nextSlides[3]?.image || `${S3_BASE.replace('/assets', '')}/sections/1795526775417-slide-4-zakat.jpeg`,
      buttons: [
        { text: 'Tunaikan Zakat', href: '/kontribusi/zakat', variant: 'primary' },
      ],
    };

    const updatedHeroContent = {
      ...existingContent,
      badge: 'GLOBAL VILLAGE FUND',
      heading: 'Masjid sebagai Pusat Kebaikan, Ekosistem sebagai Jalan Kebermanfaatan.',
      subheading: slide1Lead,
      primaryCtaText: 'Kenali GVF',
      primaryCtaUrl: '/tentang-kami',
      secondaryCtaText: 'Ambil Bagian',
      secondaryCtaUrl: '#program-kebaikan',
      slides: nextSlides,
    };

    await sql`
      UPDATE page_sections
      SET content = ${sql.json(updatedHeroContent)},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${heroRows[0].id};
    `;
    console.log('[MIGRATE-REFINE] Hero Beranda (slide 1, tombol, & foto Masjid) berhasil diperbarui.');
  }

  // 2b. Pulihkan baris page_sections yang mengalami double-encoded JSONB string
  const canonicalProgramSections: Record<string, Record<string, any>> = {
    'pembangunan-masjid:masjid_hero': {
      badge: 'PROGRAM UNGGULAN • FASILITAS IBADAH',
      heading: 'Pembangunan Masjid Khairu Ummah Sugro',
      subheading: 'Membangun pusat ibadah, majelis dzikir, dan halaqah tahfidz Al-Quran berarsitektur tropis di kawasan Sukasirna, Jonggol.',
      imageUrl: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp`,
      primaryCtaText: 'Salurkan Infak Masjid',
      primaryCtaUrl: '/kontribusi/infaq#paket-pilihan',
      secondaryCtaText: 'Tunaikan Wakaf Masjid',
      secondaryCtaUrl: '/kontribusi/wakaf',
    },
    'pembangunan-masjid:masjid_progress': {
      badge: 'PROGRES FISIK LAPANGAN',
      heading: 'Perkembangan Pembangunan Saat Ini',
      subheading: 'Pantauan berkala realisasi penghimpunan dana terverifikasi dan target penyelesaian Masjid Khairu Ummah Sugro.',
      targetAmount: 1310753350,
      targetLabel: 'Rp 1.310.753.350',
      milestones: [
        { title: 'Pondasi & Struktur Utama', status: 'Selesai 100%', detail: 'Pengecoran sloof, kolom beton bertulang, dan lantai utama ruang shalat.' },
        { title: 'Dinding Hebel & Ventilasi Roster', status: 'Selesai 85%', detail: 'Pemasangan bata ringan dan panel roster terakota untuk sirkulasi udara alami.' },
        { title: 'Mezanin Halaqah & Atap Permanen', status: 'Berjalan 55%', detail: 'Konstruksi lantai mezanin dua tingkat untuk halaqah tahfidz dan pemasangan rangka atap.' },
        { title: 'Area Wudhu, Sanitasi & Pelataran', status: 'Berjalan 45%', detail: 'Instalasi kran eco-wudhu, kamar mandi jamaah, dan pengecoran pelataran depan.' },
      ],
    },
    'pembangunan-masjid:masjid_material_bridge': {
      badge: 'GOTONG ROYONG MATERIAL NYATA',
      heading: 'Ikut Membangun Lewat Katalog Material Masjid',
      desc: 'Setiap partisipasi infak Anda terkonversi langsung menjadi kebutuhan material bangunan di lapangan, mulai dari semen SNI, pasir cor, bata roster, hingga instalasi sanitasi wudhu.',
      primaryCtaText: 'Pilih Paket Infak Masjid',
      primaryCtaUrl: '/kontribusi/infaq#paket-pilihan',
    },
    'gota-ssm:gota_hero': {
      badge: 'PROGRAM UNGGULAN • PENDIDIKAN SANTRI',
      heading: 'GOTA SSM: Gerakan Orang Tua Asuh Santri Skill Village',
      subheading: 'Menjamin keberlanjutan pendidikan, gizi harian, asrama, dan pembinaan karakter santri yatim dan dhuafa agar tumbuh kompeten dan mandiri.',
      imageUrl: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kbm-santri-ikhwan-menulis.webp`,
      primaryCtaText: 'Salurkan Sedekah GOTA SSM',
      primaryCtaUrl: '/kontribusi/sedekah#paket-pilihan',
      secondaryCtaText: 'Konsultasi Orang Tua Asuh',
      secondaryCtaUrl: '/contact',
    },
    'gota-ssm:gota_sedekah_bridge': {
      badge: 'TERHUBUNG DENGAN BENTUK KONTRIBUSI SEDEKAH',
      heading: 'Salurkan Dukungan Nyata Melalui Sedekah GOTA SSM',
      desc: 'Ingin langsung memilih paket konsumsi gizi, beras logistik, atau perlengkapan belajar santri? Lanjutkan ke halaman Bentuk Kontribusi Sedekah.',
      primaryCtaText: 'Pilih Paket Dukungan GOTA SSM',
      primaryCtaUrl: '/kontribusi/sedekah#paket-pilihan',
    },
  };

  const nonObjectMeta = await sql`
    SELECT id, page_slug, section_key, jsonb_typeof(content) AS jtype, length(content::text) AS len
    FROM page_sections
    WHERE jsonb_typeof(content) != 'object';
  `;
  for (const meta of nonObjectMeta) {
    const key = `${meta.page_slug}:${meta.section_key}`;
    if (canonicalProgramSections[key]) {
      await sql`
        UPDATE page_sections
        SET content = ${sql.json(canonicalProgramSections[key])},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${meta.id};
      `;
      console.log(`[MIGRATE-REFINE] Pulihkan section kanonik ${key} (sebelumnya ${meta.len} bytes).`);
    } else if (key !== 'tentang-kami:about_stats' && Number(meta.len) < 50000) {
      const fullRows = await sql`SELECT content FROM page_sections WHERE id = ${meta.id} LIMIT 1;`;
      const parsed = safePlainObject(fullRows[0]?.content);
      await sql`
        UPDATE page_sections
        SET content = ${sql.json(parsed)},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${meta.id};
      `;
      console.log(`[MIGRATE-REFINE] Normalisasi JSONB object untuk ${key}.`);
    }
  }

  // 3. Perbarui Tentang Kami (page_slug = 'tentang-kami', section_key = 'about_stats')
  const aboutRows = await sql`
    SELECT id, jsonb_typeof(content) AS jtype FROM page_sections
    WHERE page_slug = 'tentang-kami' AND section_key = 'about_stats'
    LIMIT 1;
  `;
  let existingAboutSafe: Record<string, any> = {};
  if (aboutRows.length > 0 && aboutRows[0].jtype === 'object') {
    const rawAbout = await sql`SELECT content FROM page_sections WHERE id = ${aboutRows[0].id} LIMIT 1;`;
    existingAboutSafe = safePlainObject(rawAbout[0]?.content);
  }
  const updatedAboutContent = {
    ...existingAboutSafe,
    heading: 'Global Village Fund',
    title: 'Global Village Fund',
    paragraph1:
      'Global Village Fund adalah lembaga keuangan sosial yang berada di bawah naungan Yayasan Permata Cendekia Indonesia. GVF hadir sebagai wadah pengelolaan kontribusi sosial untuk mendukung program-program yang memiliki tujuan dan manfaat nyata.',
    paragraph2:
      'Dalam pengembangannya, GVF mengayomi pilot project ekosistem pesantren di Pesantren Skill Village Islamic School, Desa Sukasirna, Jonggol, Bogor.',
    imageUrl: existingAboutSafe.imageUrl || `${S3_BASE}/bahan-konten/masjid-dan-kelas/tampak-depan-asrama-putra.jpeg`,
    masjidHeading: 'Masjid Taman Khairu Ummah Sughro',
    masjidParagraph1:
      'Sebagai salah satu fokus pengembangan ekosistem pesantren, Masjid Taman Khairu Ummah Sughro dihadirkan bukan hanya sebagai tempat ibadah, tetapi juga sebagai pusat interaksi, pembinaan karakter, pengembangan kompetensi, dan kehidupan pesantren.',
    masjidParagraph2:
      'Keberadaan masjid menjadi bagian penting dalam mendukung aktivitas dan pengembangan ekosistem pesantren yang mencakup pendidikan, pembinaan karakter, serta berbagai kegiatan sosial dan kemasyarakatan pesantren.',
    masjidParagraph3:
      'Melalui Global Village Fund, berbagai pihak dapat mengambil bagian dalam mendukung pembangunan masjid dan pengembangan ekosistem pesantren melalui kontribusi serta kolaborasi yang terarah.',
    masjidImageUrl: existingAboutSafe.masjidImageUrl || masjidImg,
  };

  if (aboutRows.length > 0) {
    await sql`
      UPDATE page_sections
      SET content = ${sql.json(updatedAboutContent)},
          title = 'Profil Global Village Fund & Masjid',
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${aboutRows[0].id};
    `;
  } else {
    await sql`
      INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
      VALUES ('tentang-kami', 'about_stats', 'Profil Global Village Fund & Masjid', true, 2, ${sql.json(updatedAboutContent)}, CURRENT_TIMESTAMP);
    `;
  }
  console.log('[MIGRATE-REFINE] Konten Tentang Kami (Global Village Fund & Masjid Taman Khairu Ummah Sughro) berhasil diperbarui.');

  // 4. Perbarui masjid_progress (hapus collectedLabel/progressPercent statis, simpan targetAmount numerik)
  const progressRows = await sql`
    SELECT id, content FROM page_sections
    WHERE page_slug = 'pembangunan-masjid' AND section_key = 'masjid_progress'
    LIMIT 1;
  `;
  if (progressRows.length > 0) {
    const existingProg = safePlainObject(progressRows[0].content);
    delete existingProg.collectedLabel;
    delete existingProg.progressPercent;
    if (!existingProg.targetAmount || Number(existingProg.targetAmount) === 1500000000) {
      existingProg.targetAmount = 1310753350;
      existingProg.targetLabel = 'Rp 1.310.753.350';
    } else {
      existingProg.targetAmount = Number(existingProg.targetAmount);
      existingProg.targetLabel = existingProg.targetLabel || `Rp ${existingProg.targetAmount.toLocaleString('id-ID')}`;
    }
    existingProg.subheading =
      'Pantauan berkala realisasi penghimpunan dana terverifikasi dan target penyelesaian Masjid Khairu Ummah Sugro.';

    await sql`
      UPDATE page_sections
      SET content = ${sql.json(existingProg)},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${progressRows[0].id};
    `;
    console.log('[MIGRATE-REFINE] masjid_progress diperbarui untuk memakai penjumlahan real-time DB.');
  }

  // 5. Perbarui anchor CTA di masjid_hero, masjid_material_bridge, gota_hero, gota_sedekah_bridge
  const ctaTargets = ['masjid_hero', 'masjid_material_bridge', 'gota_hero', 'gota_sedekah_bridge'];
  const ctaRows = await sql`
    SELECT id, section_key, content FROM page_sections
    WHERE section_key IN ${sql(ctaTargets)};
  `;
  for (const row of ctaRows) {
    const content = safePlainObject(row.content);
    if (typeof content.primaryCtaUrl === 'string') {
      content.primaryCtaUrl = content.primaryCtaUrl
        .replace('#gotong-royong-material', '#paket-pilihan')
        .replace('#dukungan-gota-ssm', '#paket-pilihan');
    }
    if (row.section_key === 'masjid_hero' && content.primaryCtaText === 'Salurkan Infak Material Masjid') {
      content.primaryCtaText = 'Salurkan Infak Masjid';
    }
    if (row.section_key === 'masjid_material_bridge' && content.primaryCtaText === 'Buka Katalog Material Masjid') {
      content.primaryCtaText = 'Pilih Paket Infak Masjid';
    }
    await sql`
      UPDATE page_sections
      SET content = ${sql.json(content)},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${row.id};
    `;
  }
  console.log(`[MIGRATE-REFINE] ${ctaRows.length} section CTA pada Program disinkronkan ke #paket-pilihan.`);

  await sql.end();
  process.exit(0);
}

main().catch(async (err) => {
  console.error('[MIGRATE-REFINE] Gagal:', err);
  await sql.end();
  process.exit(1);
});
