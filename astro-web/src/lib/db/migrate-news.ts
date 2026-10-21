import postgres from 'postgres';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

console.log('[MIGRATE-NEWS] Menghubungkan ke PostgreSQL di 100.77.202.57:5433...');

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 15,
  ssl: false,
});

async function run() {
  try {
    console.log('[MIGRATE-NEWS] Membuat tabel news_articles...');
    await sql`
      CREATE TABLE IF NOT EXISTS news_articles (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(150) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT NOT NULL,
        author VARCHAR(100) DEFAULT 'Tim GVF' NOT NULL,
        is_published BOOLEAN DEFAULT TRUE NOT NULL,
        published_at VARCHAR(50) DEFAULT '2026-07-18' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON news_articles (slug);
    `;

    console.log('[MIGRATE-NEWS] Tabel news_articles siap. Memeriksa seed data...');
    const existing = await sql`SELECT COUNT(*)::int as count FROM news_articles`;
    
    if (existing[0].count === 0) {
      console.log('[MIGRATE-NEWS] Memasukkan 6 artikel awal...');
      const seedArticles = [
        {
          slug: 'fiqih-wakaf-produktif-menghidupkan-aset-umat',
          title: 'Fiqih Wakaf Produktif: Menghidupkan Aset Umat Menjadi Sumber Pahala Abadi',
          category: 'LITERASI WAKAF',
          summary: 'Transformasi aset abadi menjadi sarana pendidikan berkelanjutan dan kemandirian pangan santri secara amanah.',
          content: `Wakaf produktif merupakan salah satu instrumen filantropi Islam paling transformatif dalam sejarah peradaban Islam. Berbeda dengan wakaf konsumtif yang manfaatnya langsung habis terpakai, wakaf produktif dikelola melalui tata kelola manajerial yang profesional untuk menghasilkan nilai tambah ekonomi berkelanjutan.

Di Global Village Fund (GVF), konsep wakaf produktif diterapkan secara nyata pada kawasan terpadu seluas ±3 hektare di Sukasirna, Jonggol, Kabupaten Bogor. Aset tanah wakaf yang diamanahkan oleh para wakif dikembangkan menjadi ekosistem pendidikan kejuruan vokasi, agroteknologi hortikultura modern, dan pusat ibadah ramah lingkungan.

Hasil perputaran nilai ekonomi dari kebun buah dan fasilitas produktif tersebut dialokasikan kembali untuk mendanai beasiswa pendidikan penuh santri penghafal Quran, penyediaan fasilitas asrama yang layak, serta program ketahanan pangan masyarakat dhuafa di sekitar kawasan.

Prinsip utama yang dipegang teguh oleh GVF adalah menjaga pokok aset wakaf agar tetap utuh dan abadi (tahbisul ashli), sementara hasil kemanfaatannya disalurkan seluas-luasnya untuk kemaslahatan umat (tasbilul tsamarah). Dengan model ini, setiap rupiah wakaf yang disalurkan tidak hanya bernilai pahala jariyah di akhirat, tetapi juga melahirkan dampak sosial-ekonomi nyata lintas generasi.`,
          cover_image: 'https://s3.skillage-mart.com/skillage-website/gvf/assets/gambar%20design/interior%20masjid.jpg',
          author: 'Dewan Syariah GVF',
          published_at: '18 Juli 2026',
        },
        {
          slug: 'perkembangan-fisik-masjid-khairu-ummah-mezanin-siap-digunakan',
          title: 'Perkembangan Fisik Masjid Khairu Ummah: Mezanin Dua Lantai Siap Digunakan',
          category: 'PROGRESS MASJID',
          summary: 'Penyelesaian struktur utama dan mezanin shalat santri guna menampung jamaah ibadah dan tahfidz harian.',
          content: `Alhamdulillah, proses pembangunan fisik Masjid Khairu Ummah Sugro di kawasan Sukasirna Jonggol kini telah mencapai tonggak sejarah baru. Struktur utama rangka baja ramah lingkungan dan lantai mezanin dua lantai telah selesai dikerjakan dengan presisi tinggi.

Lantai mezanin ini dirancang secara khusus untuk memberikan ruang ibadah tambahan yang tenang bagi santri putri serta area pembelajaran tahfidz Al-Quran intensif. Dengan pencahayaan alami yang melimpah dan sirkulasi udara pasif arsitektural modern, masjid ini memadukan kekhusyukan ibadah dengan efisiensi energi.

Ketua tim pembangunan GVF menyatakan bahwa tahap berikutnya akan difokuskan pada penyelesaian lantai granit ramah wudhu, ornamen ventilasi roster artistik, dan sistem penampungan air hujan ramah lingkungan (rainwater harvesting) untuk menyuplai area sanitasi mandiri.`,
          cover_image: 'https://s3.skillage-mart.com/skillage-website/gvf/assets/gambar%20design/belakang%20masjid.jpg',
          author: 'Tim Konstruksi GVF',
          published_at: '12 Juli 2026',
        },
        {
          slug: 'santri-vokasi-agroteknologi-pembibitan-kemandirian-pangan',
          title: 'Santri Vokasi Agroteknologi: Dari Pembibitan Menuju Kemandirian Pangan',
          category: 'TECHNOPARK',
          summary: 'Keterampilan riil pembibitan hortikultura dan green house modern yang diajarkan langsung pada santri SMK Skill Village.',
          content: `Kemandirian sebuah lembaga pendidikan tidak terlepas dari kemampuannya menghasilkan ketahanan pangan mandiri. Di SMK Skill Village Islamic School Jonggol, santri tidak hanya mempelajari ilmu agama dan adab, tetapi juga diterjunkan langsung dalam kurikulum praktik agroteknologi modern.

Di dalam green house seluas 1.200 meter persegi, para santri mempraktikkan teknik pembibitan anggur varietas unggul, budidaya melon hidroponik, dan sayuran organik bernilai ekonomi tinggi. Setiap santri dilatih memahami manajemen nutrisi tanaman, pengendalian hama hayati tanpa pestisida kimiawi, serta rantai distribusi pascapanen.

Program ini membuktikan bahwa pesantren masa kini mampu menjadi inkubator technopreneur muda yang memiliki keahlian teknis tinggi sekaligus berjiwa kepemimpinan yang amanah.`,
          cover_image: 'https://s3.skillage-mart.com/skillage-website/gvf/assets/gambar%20design/learning%20studio%20%26%20workshop.jpg',
          author: 'Instruktur Vokasi GVF',
          published_at: '5 Juli 2026',
        },
        {
          slug: 'sinergi-wakaf-tunai-membuka-akses-sarana-digital-santri-vokasi',
          title: 'Sinergi Wakaf Tunai: Membuka Akses Sarana Digital Santri Vokasi',
          category: 'WAKAF DIGITAL',
          summary: 'Pemanfaatan instrumen wakaf uang untuk penyediaan sarana komputasi dan studio multimedia vokasi pesantren.',
          content: `Di era transformasi digital, penguasaan teknologi multimedia, desain rekayasa, dan pemrograman komputer menjadi kebutuhan mutlak bagi generasi muda Muslim. Menjawab tantangan ini, Global Village Fund mengoptimalkan penghimpunan wakaf uang untuk pengadaan sarana komputasi canggih di learning studio pesantren Jonggol.

Berkat kontribusi para wakif melalui platform digital GVF, puluhan workstation komputer berspesifikasi tinggi kini telah tersedia di studio workshop santri. Fasilitas ini digunakan setiap hari untuk pembelajaran desain arsitektur 3D, animasi dakwah, dan keterampilan rekayasa perangkat lunak.

Penyaluran wakaf tunai yang tepat guna ini menjadi saksi nyata bagaimana dana filantropi Islam dapat menjadi akselerator pemerataan kualitas pendidikan digital bagi anak-anak dhuafa berprestasi.`,
          cover_image: 'https://s3.skillage-mart.com/skillage-website/gvf/assets/gambar%20design/interior%20mesjid%202.jpg',
          author: 'Tim Digital GVF',
          published_at: '28 Juni 2026',
        },
        {
          slug: 'kemitraan-multipihak-sinergi-csr-korporasi-memperkuat-pesantren-jonggol',
          title: 'Kemitraan Multipihak: Sinergi CSR Korporasi Memperkuat Pesantren Jonggol',
          category: 'KEMITRAAN',
          summary: 'Kolaborasi strategis dengan berbagai lembaga dan perusahaan demi memperluas manfaat beasiswa santri dhuafa.',
          content: `Pembangunan peradaban umat yang kokoh tidak dapat dicapai secara parsial. Dibutuhkan kerja sama multipihak (pentahelix) yang melibatkan lembaga filantropi, korporasi swasta, BUMN, perguruan tinggi, dan masyarakat luas.

Sepanjang kuartal kedua 2026, Global Village Fund telah menandatangani nota kesepahaman (MoU) kemitraan strategis dengan beberapa perusahaan nasional terkemuka. Program kemitraan ini mencakup penyaluran dana Corporate Social Responsibility (CSR) untuk pembiayaan beasiswa vokasi, penyediaan genset ramah lingkungan, serta magang industri bersertifikat bagi para santri tingkat akhir.

GVF memastikan setiap bentuk kemitraan dikawal dengan pelaporan dampak sosial (Social Return on Investment / SROI) yang transparan dan dapat diaudit secara independen.`,
          cover_image: 'https://s3.skillage-mart.com/skillage-website/gvf/assets/media-lp/WhatsApp%20Image%202026-10-05%20at%2009.22.04%20(3).jpeg',
          author: 'Divisi Kemitraan GVF',
          published_at: '20 Juni 2026',
        },
        {
          slug: 'mencetak-santri-berkarakter-fast-kurikulum-vokasi-adab-sains',
          title: 'Mencetak Santri Berkarakter FAST: Kurikulum Vokasi Berbasis Adab & Sains',
          category: 'PENDIDIKAN',
          summary: 'Penggemblengan nilai Fathonah, Amanah, Siddiq, dan Tabligh dalam setiap aspek keahlian teknis santri.',
          content: `Keahlian teknologi tanpa integritas moral hanya akan melahirkan kerusakan. Oleh karena itu, kurikulum pendidikan di Global Skill Village Fund meletakkan nilai FAST (Fathonah, Amanah, Siddiq, Tabligh) sebagai pondasi utama seluruh kegiatan santri.

Setiap hari santri memulai aktivitas sebelum fajar dengan tahajud berjamaah dan halaqah Al-Quran. Selepas dhuha, mereka masuk ke laboratorium workshop teknik dan agroteknologi untuk mempraktikkan sains modern dengan etos kerja tinggi.

Pendekatan holistik ini bertujuan melahirkan lulusan vokasi yang tidak hanya mahir secara teknis di dunia industri, tetapi juga memiliki akhlak mulia dan komitmen kuat untuk membangun daerah asalnya masing-masing.`,
          cover_image: 'https://s3.skillage-mart.com/skillage-website/gvf/assets/gambar%20design/panel%20surya.jpg',
          author: 'Bidang Kurikulum GVF',
          published_at: '14 Juni 2026',
        }
      ];

      for (const a of seedArticles) {
        await sql`
          INSERT INTO news_articles (slug, title, category, summary, content, cover_image, author, published_at, is_published, created_at, updated_at)
          VALUES (${a.slug}, ${a.title}, ${a.category}, ${a.summary}, ${a.content}, ${a.cover_image}, ${a.author}, ${a.published_at}, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT (slug) DO UPDATE
          SET title = EXCLUDED.title, summary = EXCLUDED.summary, content = EXCLUDED.content, cover_image = EXCLUDED.cover_image, updated_at = CURRENT_TIMESTAMP;
        `;
      }
      console.log('[MIGRATE-NEWS] 6 artikel awal berhasil di-seed ke PostgreSQL.');
    } else {
      console.log(`[MIGRATE-NEWS] Tabel news_articles sudah memiliki ${existing[0].count} artikel.`);
    }

    console.log('[MIGRATE-NEWS] Sukses!');
  } catch (err) {
    console.error('[MIGRATE-NEWS] Error:', err);
  } finally {
    await sql.end();
  }
}

run();
