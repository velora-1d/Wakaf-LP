// astro-web/scripts/sync-program-sections.mjs
// Sinkronisasi data sections lengkap (prog_hero, prog_pricing, prog_details, prog_faq) ke Neon PostgreSQL
import { neon } from '@neondatabase/serverless';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

const connectionString = process.env.DATABASE_URL || DEFAULT_NEON_DATABASE_URL;
const sql = neon(connectionString);

const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

const programsFullData = {
  wakaf: {
    hero: {
      badge: 'WAKAF PRODUKTIF & PENDIDIKAN',
      title: 'Wakaf Produktif & Pendidikan Terpadu',
      subtitle: 'Alirkan pahala tanpa putus melalui wakaf sarana ibadah, pembebasan lahan kawasan terpadu ±3 hektare, dan unit usaha produktif untuk kemandirian santri.',
      imageUrl: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-perkebunan.webp`,
    },
    pricing: {
      heading: 'Instrumen Pengelolaan Program Wakaf',
      subheading: 'Tunaikan wakaf berdasarkan 4 pilar peruntukan: wakaf uang, wakaf melalui uang (masjid), wakaf tanah/bangunan, dan wakaf produktif terpadu.',
      packages: [
        {
          id: 'wakaf-melalui-uang-masjid',
          title: 'Wakaf Melalui Uang (Sarana Ibadah)',
          subtitle: 'Pembangunan Masjid Khairu Ummah Sugro',
          priceAmount: '300.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per paket pembangunan fasilitas ibadah',
          estimation: 'Alokasi: Konstruksi fisik, mezanin & atap permanen masjid',
          isPopular: false,
          ctaText: 'Tunaikan Wakaf Masjid',
          deliverables: [
            { bold: 'Pusat Ibadah Berkelanjutan', text: 'Menampung shalat berjamaah dan pembinaan harian santri serta masyarakat' },
            { bold: 'Penyelesaian Atap Permanen', text: 'Pembangunan atap permanen menggantikan naungan atap konstruksi sementara' },
            { bold: 'Mezanin Halaqah Quran', text: 'Lantai mezanin khusus untuk ruang halaqah tahfidz dan tadarus santri' },
            { bold: 'Ventilasi Alami Tropis', text: 'Desain ramah lingkungan hemat energi dengan sirkulasi udara optimal' },
            { bold: 'Laporan Progres Berkala', text: 'Dokumentasi berkala tahapan konstruksi fisik di lapangan Sukasirna' },
          ],
        },
        {
          id: 'wakaf-tanah-bangunan',
          title: 'Wakaf Tanah dan Bangunan',
          subtitle: 'Aset Lahan Kawasan Ekosistem Jonggol',
          priceAmount: '150.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per meter persegi (m²)',
          estimation: 'Alokasi: Pembebasan tanah tapak kawasan terpadu ±3 hektare',
          isPopular: false,
          ctaText: 'Tunaikan Wakaf Tanah',
          deliverables: [
            { bold: 'Aset Abadi Tak Bergerak', text: 'Tanah kawasan terpadu di Desa Sukasirna, Jonggol, Kabupaten Bogor' },
            { bold: 'Integrasi Fasilitas', text: 'Menjadi tapak sarana pendidikan vokasi, masjid, dan unit produktif' },
            { bold: 'Prinsip Wakaf Mengikat', text: 'Aset pokok wakaf dijaga keutuhannya dan tidak dapat diperjualbelikan' },
            { bold: 'Pahala Jariyah Mengalir', text: 'Kebaikan abadi yang terus memberi manfaat melintasi zaman' },
          ],
        },
        {
          id: 'wakaf-produktif-agro',
          title: 'Wakaf Produktif Kawasan',
          subtitle: 'Pertanian, Greenhouse & Peternakan',
          priceAmount: '500.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per unit modal produktif',
          estimation: 'Alokasi: Sarana greenhouse, peternakan & unit usaha mandiri',
          isPopular: false,
          ctaText: 'Tunaikan Wakaf Produktif',
          deliverables: [
            { bold: 'Pertanian Terpadu', text: 'Greenhouse budidaya melon, sayuran, dan tanaman bernilai ekonomi tinggi' },
            { bold: 'Peternakan Berkelanjutan', text: 'Unit peternakan ayam petelur untuk pemenuhan gizi dan pendapatan kawasan' },
            { bold: 'Pengolahan Hasil Produksi', text: 'Peralatan pascapanen untuk mendukung kemandirian operasional pesantren' },
            { bold: 'Kemandirian Ekonomi', text: 'Hasil usaha produktif disalurkan kembali untuk kemaslahatan program santri' },
          ],
        },
      ],
    },
    details: {
      badge: 'WAKAF PRODUKTIF & PENDIDIKAN',
      heading: 'Menghidupkan Nilai Abadi Melalui Wakaf Produktif Terpadu',
      storyLead: 'Wakaf bukan sekadar instrumen filantropi, melainkan fondasi peradaban Islam yang menopang kemandirian umat secara berkelanjutan.',
      story1: 'Melalui inisiatif wakaf terpadu di Jonggol, Global Village Fund mengintegrasikan pembangunan sarana ibadah Masjid Khairu Ummah Sugro, asrama santri vokasi, serta unit-unit pertanian dan peternakan produktif.',
      story2: 'Setiap meter persegi tanah dan setiap rupiah wakaf yang disalurkan dijaga keutuhannya, dikelola secara profesional, dan hasilnya dialirkan kembali untuk membiayai pendidikan santri dhuafa dan operasional kawasan.',
      imageUrl: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru.jpeg`,
      twinImages: [
        `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-lantai-2-belum-jadi.jpeg`,
        `${S3_BASE}/bahan-konten/masjid-dan-kelas/asrama-ikhwan-dan-learning-room.jpeg`,
      ],
      subblock1Title: 'Integrasi Pesantren & Agro-Technopark',
      subblock1Desc1: 'Kawasan terpadu di Jonggol dirancang menggabungkan fungsi pendidikan tahfidz dan vokasi dengan unit pertanian modern.',
      subblock1Desc2: 'Santri tidak hanya menimba ilmu agama, tetapi juga dibekali keahlian agribisnis dan teknologi budidaya greenhouse bernilai ekonomi tinggi.',
      subblock2Title: 'Dokumentasi Kawasan Wakaf Jonggol',
      subblock2Desc1: 'Dokumentasi langsung progres fisik dan pemanfaatan lahan wakaf di Desa Sukasirna, Jonggol, Kabupaten Bogor.',
      subblock2Desc2: 'Dari pembebasan lahan, pembangunan asrama, hingga penanaman bibit pertama di greenhouse percontohan.',
      portfolioShowcaseItems: [
        { tag: 'ASRAMA SANTRI', name: 'Tampak Depan Asrama Baru', category: 'Infrastruktur Kawasan', image: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-depan-asrama-ikhwan-baru.jpeg` },
        { tag: 'PERTANIAN PRODUKTIF', name: 'Budidaya Melon Greenhouse', category: 'Agro-Technopark', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp` },
        { tag: 'AULA DAKWAH', name: 'Konstruksi Atap Paranet Aula', category: 'Fasilitas Terpadu', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/konstruksi-atap-aula-paranet.webp` },
        { tag: 'SANITASI SEHAT', name: 'Progres Konstruksi Sanitasi', category: 'Kesehatan Lingkungan', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp` },
      ],
      valueBoxes: [
        { title: 'Pahala Abadi Mengalir', description: 'Pahala jariyah yang terus mengalir tanpa terputus bagi muwakif melintasi generasi.' },
        { title: 'Kepatuhan Syariah & BWI', description: 'Pengelolaan aset wakaf diawasi dan mematuhi regulasi Badan Wakaf Indonesia (BWI).' },
        { title: 'Akta Ikrar Wakaf (AIW)', description: 'Pencatatan legalitas tanah dan aset yang berkekuatan hukum demi menjaga keabadian amanah.' },
        { title: 'Laporan Transparan Berkala', description: 'Publikasi berkala perkembangan fisik pembangunan dan kemanfaatan sosial kawasan.' },
      ],
      guarantees: [
        'Legalitas akta ikrar wakaf (AIW) resmi dan mengikat',
        'Kwitansi & sertifikat wakaf resmi GVF berkode QR',
        'Laporan progres konstruksi berkala dan transparan',
        'Dokumentasi foto penyaluran di lokasi Sukasirna Jonggol',
        'Pengawasan kualitas bahan dan arsitektur berstandar tinggi',
        'RAB terperinci dan terbuka untuk para muwakif',
        'Akad donasi transparan sesuai kaidah syariah',
        'Kunjungan langsung ke kawasan wakaf Sukasirna Jonggol',
      ],
    },
    faq: {
      heading: 'Pertanyaan Seputar Program Wakaf',
      faqs: [
        { question: 'Apa perbedaan antara wakaf tanah dan wakaf melalui uang?', answer: 'Wakaf tanah adalah penyerahan hak milik tanah secara permanen untuk kepentingan umat. Sedangkan wakaf melalui uang adalah dana tunai yang disalurkan muwakif untuk dibelikan atau dibangunkan menjadi aset wakaf fisik, seperti sarana ibadah atau gedung asrama.' },
        { question: 'Apakah donatur mendapatkan Akta Ikrar Wakaf (AIW)?', answer: 'Ya, untuk wakaf tanah dan bangunan bersertifikat, GVF bekerja sama dengan KUA dan Badan Wakaf Indonesia (BWI) dalam penerbitan Akta Ikrar Wakaf (AIW) resmi sebagai bukti legalitas.' },
        { question: 'Bagaimana hasil keuntungan dari wakaf produktif dikelola?', answer: 'Hasil surplus dari wakaf produktif (pertanian dan peternakan) digunakan 100% untuk membiayai operasional pendidikan santri yatim dhuafa dan pemeliharaan fasilitas ibadah kawasan.' },
        { question: 'Apakah saya bisa meninjau lokasi kawasan wakaf di Jonggol?', answer: 'Sangat bisa. Kami menyambut kehadiran donatur dan calon muwakif untuk berkunjung langsung ke Sukasirna Jonggol guna melihat progres pembangunan dan aktivitas para santri.' },
      ],
    },
  },

  infaq: {
    hero: {
      badge: 'INFAQ PEMBANGUNAN & DAKWAH',
      title: 'Infaq Sarana Dakwah & Pendidikan Santri',
      subtitle: 'Dukung percepatan pembangunan fisik asrama, ruang kelas, sarana sanitasi, dan penyediaan material konstruksi untuk ekosistem pesantren yang layak.',
      imageUrl: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-portrait.webp`,
    },
    pricing: {
      heading: 'Pilihan Paket Infaq Pembangunan',
      subheading: 'Pilih paket infaq material atau operasional pembangunan sesuai kemampuan dan niat terbaik Anda.',
      packages: [
        {
          id: 'infaq-material-semen',
          title: 'Infaq Material Konstruksi (Semen & Pasir)',
          subtitle: 'Pengadaan Semen dan Pasir Pasang',
          priceAmount: '85.000',
          pricePrefix: 'Rp ',
          priceUnit: ' /sak',
          priceDesc: 'Per sak semen standar SNI',
          estimation: 'Alokasi: Plesteran dinding, cor lantai & pasangan bata',
          isPopular: false,
          ctaText: 'Salurkan Infaq Semen',
          deliverables: [
            { bold: 'Semen Berkualitas SNI', text: 'Digunakan untuk pekerjaan struktur dan plesteran dinding asrama' },
            { bold: 'Pencatatan Nota Resmi', text: 'Bukti pembelian material langsung dari toko bangunan rekanan' },
            { bold: 'Laporan Progres Fisik', text: 'Foto penyaluran dan pengerjaan di lokasi proyek Jonggol' },
          ],
        },
        {
          id: 'infaq-sarana-sanitasi',
          title: 'Infaq Sanitasi & Tempat Wudhu',
          subtitle: 'Fasilitas Wudhu & Toilet Bersih Santri',
          priceAmount: '250.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per paket sanitasi sehat',
          estimation: 'Alokasi: Pipa PVC, keran air wudhu, dan keramik sanitasi',
          isPopular: false,
          ctaText: 'Salurkan Infaq Sanitasi',
          deliverables: [
            { bold: 'Keran Air Wudhu Hemat', text: 'Instalasi keran air wudhu yang higienis dan efisien air' },
            { bold: 'Saluran Pembuangan Sehat', text: 'Pembuatan septic tank ramah lingkungan dan resapan air' },
            { bold: 'Menunjang Kesucian', text: 'Menjamin kebersihan dan kenyamanan santri saat bersuci' },
          ],
        },
        {
          id: 'infaq-ruang-belajar',
          title: 'Infaq Sarana Ruang Belajar',
          subtitle: 'Meja Lipat, Papan Tulis & Penerangan',
          priceAmount: '500.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per unit fasilitas ruang kelas',
          estimation: 'Alokasi: Pengadaan sarana belajar mengajar santri',
          isPopular: false,
          ctaText: 'Salurkan Infaq Kelas',
          deliverables: [
            { bold: 'Meja Belajar Santri', text: 'Meja lipat kokoh untuk kenyamanan mencatat pelajaran' },
            { bold: 'Papan Tulis & Spidol', text: 'Sarana pengajaran interaktif para asatidz di kelas' },
            { bold: 'Lampu LED Hemat Energi', text: 'Pencahayaan terang dan nyaman bagi mata santri' },
          ],
        },
      ],
    },
    details: {
      badge: 'INFAQ PEMBANGUNAN & DAKWAH',
      heading: 'Menyediakan Sarana Belajar dan Ibadah yang Bermartabat',
      storyLead: 'Kenyamanan dan kelayakan fasilitas adalah kunci ketenangan para santri dalam menuntut ilmu dan menghafal Al-Quran.',
      story1: 'Melalui program Infaq, kami mengajak para muhsinin untuk bersama-sama melengkapi kebutuhan infrastruktur riil: dari semen, bata, keramik, hingga instalasi sanitasi dan penerangan ruang kelas.',
      story2: 'Setiap rupiah infaq dialokasikan langsung untuk belanja material dan upah tukang lokal, menciptakan perputaran ekonomi yang juga memberdayakan warga sekitar Jonggol.',
      imageUrl: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru-2.jpeg`,
      twinImages: [
        `${S3_BASE}/bahan-konten/masjid-dan-kelas/lorong-kelas.jpeg`,
        `${S3_BASE}/bahan-konten/masjid-dan-kelas/bangunan-kelas-bagian-atas.jpeg`,
      ],
      subblock1Title: 'Konsep Green Building Ramah Lingkungan',
      subblock1Desc1: 'Gedung asrama dan kelas dirancang dengan ventilasi silang roster yang sejuk alami tanpa membutuhkan pendingin udara berlebih.',
      subblock1Desc2: 'Pencahayaan alami dari bukaan atap dan jendela besar menghemat konsumsi energi harian pesantren.',
      subblock2Title: 'Dokumentasi Fisik Lapangan',
      subblock2Desc1: 'Dokumentasi progres konstruksi riil di Sukasirna Jonggol — dari pemancangan pondasi, pengecoran dak, hingga instalasi sanitasi.',
      subblock2Desc2: 'Setiap kemajuan adalah buah gotong royong para muhsinin yang menyalurkan infaq terbaiknya.',
      portfolioShowcaseItems: [
        { tag: 'MATERIAL', name: 'Kebutuhan Material Bangunan', category: 'Konstruksi Fisik', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/bahan-bangunan.jpeg` },
        { tag: 'TEMPAT WUDHU', name: 'Sarana Tempat Wudhu Ikhwan', category: 'Fasilitas Sanitasi', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/tempat-wudlu-ikhwan-2.jpeg` },
        { tag: 'SANITASI', name: 'Fasilitas Sanitasi & Toilet', category: 'Kesehatan Lingkungan', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/toilet-kelas.jpeg` },
        { tag: 'RUANG KELAS', name: 'KBM Santri di Ruang Kelas', category: 'Pendidikan Vokasi', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kbm-santri-putra-putri-kelas.webp` },
      ],
      valueBoxes: [
        { title: 'Material Standar SNI', description: 'Semua material bangunan berspesifikasi teknis aman dan tahan lama.' },
        { title: 'Pemberdayaan Warga Lokal', description: 'Pengerjaan melibatkan tukang dan warga sekitar kawasan Sukasirna.' },
        { title: 'Kwitansi & Laporan Nota', description: 'Pencatatan nota belanja material yang rapi dan terverifikasi.' },
        { title: 'Dokumentasi Terbuka', description: 'Setiap tahapan pembangunan difoto dan dilaporkan berkala kepada donatur.' },
      ],
      guarantees: [
        'Material bersertifikasi standar SNI',
        'Kwitansi & tanda terima resmi GVF',
        'Laporan progres fisik berkala',
        'Dokumentasi foto penyaluran di lokasi',
        'Pengawasan kualitas & mutu bangunan',
        'RAB terperinci dan terbuka',
        'Akad donasi transparan & terpercaya',
        'Kunjungan langsung ke lokasi Jonggol',
      ],
    },
    faq: {
      heading: 'Pertanyaan Seputar Infaq Pembangunan',
      faqs: [
        { question: 'Apakah infaq bisa disalurkan dalam bentuk material langsung (natura)?', answer: 'Bisa. Kami menerima donasi berupa barang/material konstruksi seperti semen, besi beton, pasir, granit, maupun perlengkapan sanitasi yang dapat diantar langsung ke lokasi proyek.' },
        { question: 'Bagaimana cara mendapatkan laporan penggunaan dana infaq?', answer: 'GVF menerbitkan laporan progres pembangunan fisik berkala yang dikirimkan via WhatsApp atau email donatur terdaftar serta dipublikasikan di halaman kabar website.' },
        { question: 'Apakah ada batas minimal nominal untuk berinfaq?', answer: 'Tidak ada batas minimal. Berapa pun infaq yang Anda salurkan sangat berarti untuk menyelesaikan pembangunan sarana belajar dan asrama santri.' },
      ],
    },
  },

  sedekah: {
    hero: {
      badge: 'SEDEKAH SANTRI & PANGAN',
      title: 'Sedekah Pangan, Beasiswa & Nutrisi Santri',
      subtitle: 'Penuhi kebutuhan makan harian bergizi, perlengkapan belajar, dan pembinaan karakter generasi penghafal Quran dan santri vokasi mandiri.',
      imageUrl: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/suasana-kajian-santri-aula.webp`,
    },
    pricing: {
      heading: 'Pilihan Paket Sedekah Kebaikan',
      subheading: 'Alirkan kebaikan harian dengan memilih paket sedekah pangan bergizi atau beasiswa pembinaan santri.',
      packages: [
        {
          id: 'sedekah-pangan-harian',
          title: 'Sedekah Pangan & Dapur Santri',
          subtitle: 'Penyediaan Makan Bergizi 3x Sehari',
          priceAmount: '50.000',
          pricePrefix: 'Rp ',
          priceUnit: ' /porsi',
          priceDesc: 'Per porsi makan bernutrisi santri',
          estimation: 'Alokasi: Beras, lauk protein (ayam/telur), sayur & buah',
          isPopular: false,
          ctaText: 'Salurkan Sedekah Pangan',
          deliverables: [
            { bold: 'Menu Seimbang & Bergizi', text: 'Memastikan asupan protein dan vitamin harian santri tercukupi' },
            { bold: 'Dapur Higienis Pesantren', text: 'Diolah bersih dan higienis oleh tim dapur asrama Sukasirna' },
            { bold: 'Energi Menghafal Quran', text: 'Menjadi sumber tenaga santri dalam beribadah dan belajar' },
          ],
        },
        {
          id: 'sedekah-beasiswa-santri',
          title: 'Sedekah Beasiswa Santri Dhuafa',
          subtitle: 'Bantuan Biaya Belajar & Asrama',
          priceAmount: '200.000',
          pricePrefix: 'Rp ',
          priceUnit: ' /bulan',
          priceDesc: 'Per santri binaan per bulan',
          estimation: 'Alokasi: Kitab materi belajar, seragam & operasional asrama',
          isPopular: false,
          ctaText: 'Salurkan Beasiswa',
          deliverables: [
            { bold: 'Akses Pendidikan Gratis', text: 'Membebaskan biaya pendidikan bagi santri yatim dan dhuafa' },
            { bold: 'Kitab & Buku Penunjang', text: 'Pengadaan mushaf Quran hafalan dan kitab panduan vokasi' },
            { bold: 'Pendampingan Karakter', text: 'Bimbingan intensif akhlak dan kepemimpinan santri' },
          ],
        },
        {
          id: 'sedekah-kesehatan-santri',
          title: 'Sedekah Pos Kesehatan & Vitamin',
          subtitle: 'Pemeriksaan Medis & Suplemen',
          priceAmount: '100.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per paket kesehatan santri',
          estimation: 'Alokasi: Suplemen madu, habbatussauda & obat-obatan P3K',
          isPopular: false,
          ctaText: 'Salurkan Sedekah Sehat',
          deliverables: [
            { bold: 'Suplemen Alami', text: 'Madu murni dan multivitamin untuk daya tahan tubuh santri' },
            { bold: 'Pemeriksaan Rutin', text: 'Pemeriksaan kesehatan berkala oleh tenaga medis sukarelawan' },
            { bold: 'Klinik Mini Asrama', text: 'Penyediaan obat-obatan dasar dan kotak pertolongan pertama' },
          ],
        },
      ],
    },
    details: {
      badge: 'SEDEKAH SANTRI & PANGAN',
      heading: 'Menumbuhkan Generasi Berkarakter dan Mandiri',
      storyLead: 'Setiap suapan makanan yang dinikmati santri dan setiap lembar kitab yang mereka pelajari adalah ladang amal jariyah bagi para dermawan.',
      story1: 'Global Village Fund berkomitmen memastikan seluruh santri di Jonggol mendapatkan pemenuhan gizi yang seimbang, fasilitas asrama yang layak, serta lingkungan belajar yang kondusif.',
      story2: 'Program sedekah ini menghubungkan niat tulus donatur dengan kebutuhan harian riil di lapangan, memastikan para santri dapat fokus menuntut ilmu tanpa dibebani keterbatasan finansial.',
      imageUrl: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ramai-menyimak-ustadz-mengajar.webp`,
      twinImages: [
        `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-menulis-di-buku-catatan.webp`,
        `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-tersenyum-di-kamar-asrama.webp`,
      ],
      subblock1Title: 'Pendidikan Terpadu Tahfidz & Vokasi',
      subblock1Desc1: 'Santri dibina menghafal Al-Quran dengan metode mutqin sekaligus dilatih keterampilan kerja praktis.',
      subblock1Desc2: 'Kurikulum vokasi mencakup agribisnis, teknologi informasi dasar, dan kepemimpinan dakwah.',
      subblock2Title: 'Dokumentasi Aktivitas & Prestasi',
      subblock2Desc1: 'Dokumentasi keseharian santri dari kajian subuh, kegiatan KBM di kelas, hingga makan bersama di aula asrama.',
      subblock2Desc2: 'Senyum dan kesungguhan belajar mereka adalah bukti nyata manfaat sedekah Anda.',
      portfolioShowcaseItems: [
        { tag: 'DISKUSI KELOMPOK', name: 'Diskusi & Kerja Kelompok', category: 'KBM Harian', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/dua-santri-ikhwan-berdiskusi-meja-lipat.webp` },
        { tag: 'MENCATAT PELAJARAN', name: 'Santri Mencatat Pelajaran', category: 'Pembinaan Akademik', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-bersarung-mencatat-pelajaran.webp` },
        { tag: 'BELAJAR MANDIRI', name: 'Ketekunan Belajar Mandiri', category: 'Karakter Santri', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-menulis-tugas-pensil.webp` },
        { tag: 'MENYIMAK MATERI', name: 'Santri Menyimak Pelajaran', category: 'Halaqah Asatidz', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-berkacamata-fokus-menyimak.webp` },
      ],
      valueBoxes: [
        { title: 'Nutrisi Halal & Sehat', description: 'Bahan pangan dipilih dari sumber terpercaya dan diolah dengan standar higienis.' },
        { title: 'Bina Karakter Qurani', description: 'Fokus pada pembentukan akhlak mulia dan keteladanan harian santri.' },
        { title: 'Tepat Sasaran 100%', description: 'Penyaluran langsung kepada santri yang berhak dan membutuhkan.' },
        { title: 'Dokumentasi Penyaluran', description: 'Foto dan video saat santri menerima manfaat sedekah dikirimkan berkala.' },
      ],
      guarantees: [
        'Penyaluran langsung dalam bentuk bahan pangan dan porsi makan santri',
        'Pencatatan nota belanja bahan pangan yang tertib',
        'Tanda terima resmi dari Yayasan Permata Cendekia Indonesia (YPCI)',
        'Standar kebersihan pengolahan makanan di dapur asrama',
        'Dokumentasi visual penyajian dan makan bersama santri',
        'Laporan bulanan rekapitulasi penyaluran sedekah',
        'Doa tulus para santri penghafal Quran untuk para muhsinin',
        'Terbuka untuk kunjungan makan bersama santri di asrama Jonggol',
      ],
    },
    faq: {
      heading: 'Pertanyaan Seputar Sedekah Santri',
      faqs: [
        { question: 'Apakah saya bisa menyalurkan sedekah dalam bentuk beras atau sembako langsung?', answer: 'Tentu bisa. Donatur dapat mengirimkan beras, telur, minyak goreng, atau bahan makanan lainnya langsung ke Asrama Pondok Pesantren Sukasirna Jonggol.' },
        { question: 'Berapa jumlah santri yang saat ini didampingi oleh GVF?', answer: 'Saat ini terdapat puluhan santri mukim yang menempuh pendidikan tahfidz dan vokasi secara penuh di asrama Jonggol.' },
        { question: 'Apakah sedekah ini diperuntukkan untuk zakat fitrah?', answer: 'Sedekah pangan ini bersifat umum dan dapat disalurkan kapan saja sepanjang tahun. Namun untuk zakat fitrah, kami menyediakan pos khusus menjelang Idul Fitri.' },
      ],
    },
  },

  zakat: {
    hero: {
      badge: 'ZAKAT MAAL & PROFESI 2.5%',
      title: 'Tunaikan Kewajiban Zakat 2.5% Sesuai Syariat',
      subtitle: 'Bersihkan harta dan raih keberkahan dengan menyalurkan zakat maal, profesi, dan fitrah kepada 8 asnaf prioritas melalui program pemberdayaan santri dhuafa.',
      imageUrl: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/sholat-berjamaah-santri-shaf-portrait.webp`,
    },
    pricing: {
      heading: 'Pilihan Pos Penyaluran Zakat',
      subheading: 'Salurkan kewajiban zakat maal atau profesi Anda dengan perhitungan presisi nisab 85 gram emas.',
      packages: [
        {
          id: 'zakat-profesi-bulanan',
          title: 'Zakat Penghasilan / Profesi',
          subtitle: '2.5% dari Pendapatan Bersih Bulanan',
          priceAmount: '250.000',
          pricePrefix: 'Rp ',
          priceUnit: ' /bln',
          priceDesc: 'Estimasi nisab gaji bulanan',
          estimation: 'Alokasi: Asnaf fakir, miskin, dan fii sabilillah santri dhuafa',
          isPopular: false,
          ctaText: 'Tunaikan Zakat Profesi',
          deliverables: [
            { bold: 'Pembersih Harta', text: 'Menunaikan kewajiban rukun Islam ketiga dengan tepat takaran syariat' },
            { bold: 'Penyaluran 8 Asnaf', text: 'Diprioritaskan untuk kebutuhan biaya hidup santri yatim dan dhuafa' },
            { bold: 'Bukti Setor Zakat (BSZ)', text: 'Kwitansi resmi tanda bukti setor zakat yang sah dan akuntabel' },
          ],
        },
        {
          id: 'zakat-maal-tabungan',
          title: 'Zakat Maal (Simpanan / Emas)',
          subtitle: '2.5% dari Tabungan yang Telah Mencapai Haul & Nisab',
          priceAmount: '1.000.000',
          pricePrefix: 'Rp ',
          priceUnit: '',
          priceDesc: 'Per hitungan haul tahunan',
          estimation: 'Alokasi: Pemberdayaan asnaf produktif dan pendidikan santri',
          isPopular: false,
          ctaText: 'Tunaikan Zakat Maal',
          deliverables: [
            { bold: 'Perhitungan Fiqih Presisi', text: 'Konsultasi gratis perhitungan nisab dan haul bersama asatidz' },
            { bold: 'Kemandirian Mustahik', text: 'Zakat disalurkan untuk mengubah mustahik menjadi muzakki masa depan' },
            { bold: 'Laporan Penyaluran Amanah', text: 'Rekapitulasi penerima manfaat zakat yang transparan dan tepat sasaran' },
          ],
        },
        {
          id: 'zakat-fitrah-beras',
          title: 'Zakat Fitrah',
          subtitle: 'Penyucian Jiwa di Bulan Suci Ramadhan',
          priceAmount: '45.000',
          pricePrefix: 'Rp ',
          priceUnit: ' /jiwa',
          priceDesc: 'Setara 2.5 kg / 3.5 liter beras berkualitas',
          estimation: 'Alokasi: Beras berkualitas untuk asnaf fakir miskin menjelang Idul Fitri',
          isPopular: false,
          ctaText: 'Tunaikan Zakat Fitrah',
          deliverables: [
            { bold: 'Beras Kualitas Terbaik', text: 'Beras bersih, pulen, dan layak konsumsi untuk keluarga dhuafa' },
            { bold: 'Penyaluran Tepat Waktu', text: 'Didistribusikan sebelum pelaksanaan shalat Idul Fitri sesuai sunnah' },
            { bold: 'Doa Akad Zakat', text: 'Lafal niat dan doa resmi dari amil zakat untuk muzakki' },
          ],
        },
      ],
    },
    details: {
      badge: 'ZAKAT MAAL & PROFESI 2.5%',
      heading: 'Menunaikan Kewajiban, Mengentaskan Kemiskinan',
      storyLead: 'Zakat adalah pilar keadilan sosial dalam Islam yang menjembatani keberkahan rezeki para muzakki dengan hak asnaf yang membutuhkan.',
      story1: 'Di bawah naungan Yayasan Permata Cendekia Indonesia (YPCI), dana zakat yang dihimpun disalurkan secara amanah kepada asnaf yang berhak, khususnya anak-anak yatim dan dhuafa yang menempuh pendidikan di pesantren.',
      story2: 'Dengan pendekatan pembinaan karakter dan keahlian vokasi, kami berupaya agar santri penerima zakat hari ini kelak tumbuh menjadi insan mandiri yang mampu berdaya dan menjadi muzakki.',
      imageUrl: `${S3_BASE}/bahan-konten/tangan-beras-zakat-pangan.webp`,
      twinImages: [
        `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-berprestasi-juara-lomba-mtq.webp`,
        `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-mencatat-dan-berdiskusi.webp`,
      ],
      subblock1Title: 'Kepatuhan Syariah & Audit Transparan',
      subblock1Desc1: 'Setiap penerimaan dan penyaluran zakat dicatat dalam sistem akuntansi nirlaba yang diaudit berkala.',
      subblock1Desc2: 'Akad ijab qabul zakat dipandu langsung dan diverifikasi oleh amil yang memahami kaidah fiqih zakat.',
      subblock2Title: 'Prestasi & Bimbingan Santri Binaan',
      subblock2Desc1: 'Bukti nyata kebermanfaatan zakat: santri binaan mampu menorehkan prestasi gemilang di bidang tahfidz dan kaligrafi.',
      subblock2Desc2: 'Mewujudkan generasi santri yang mandiri, berilmu, dan berakhlak karimah.',
      portfolioShowcaseItems: [
        { tag: 'BIMBINGAN SANTRI', name: 'Kajian & Bimbingan Santriwati', category: 'Pendidikan Syariah', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kajian-santriwati-bersama-ustadz.webp` },
        { tag: 'PRESTASI TAHFIDZ', name: 'Salman Aufa (Juara 2 MTQ)', category: 'Prestasi Santri', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/salman-aufa-juara-2-tahfidz-10-juz.webp` },
        { tag: 'PRESTASI KALIGRAFI', name: 'M. Kholid (Juara 2 Kaligrafi)', category: 'Seni Islam', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-kholid-juara-2-kaligrafi.webp` },
        { tag: 'DUTA SANTRI', name: 'Bimbingan Asatidz & Duta Santri', category: 'Karakter FAST', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/foto-ustadz-bersama-duta-santri.webp` },
      ],
      valueBoxes: [
        { title: 'Tepat Sasaran 8 Asnaf', description: 'Hanya disalurkan kepada asnaf yang sah menurut ketetapan syariat Islam.' },
        { title: 'Kalkulator Zakat Akurat', description: 'Bantuan perhitungan nisab dan kadar zakat dengan panduan amil berpengalaman.' },
        { title: 'Bukti Setor Zakat Resmi', description: 'Muzakki menerima bukti setor zakat resmi berstempel yayasan.' },
        { title: 'Dampak Sosial Berkelanjutan', description: 'Fokus pada beasiswa pendidikan dan modal kemandirian mustahik.' },
      ],
      guarantees: [
        'Akad zakat sesuai kaidah fiqih syariah',
        'Penyaluran tepat sasaran kepada asnaf yang sah',
        'Kwitansi tanda terima Bukti Setor Zakat (BSZ) resmi',
        'Kalkulator zakat dengan nisab emas terkini',
        'Laporan rekapitulasi penyaluran zakat tahunan',
        'Pemberdayaan mustahik menuju kemandirian ekonomi',
        'Bimbingan konsultasi zakat bersama asatidz',
        'Kunjungan silaturahmi ke asrama penerima manfaat zakat',
      ],
    },
    faq: {
      heading: 'Pertanyaan Seputar Kewajiban Zakat',
      faqs: [
        { question: 'Bagaimana cara menghitung zakat penghasilan (profesi)?', answer: 'Zakat penghasilan dihitung sebesar 2.5% dari total pendapatan bersih bulanan jika telah mencapai nisab setara 85 gram emas per tahun (atau dibagi 12 bulan). Anda dapat berkonsultasi langsung dengan layanan donatur kami.' },
        { question: 'Siapakah asnaf yang menjadi prioritas penerima zakat di GVF?', answer: 'Prioritas utama adalah asnaf fakir, miskin, dan fii sabilillah, khususnya para santri yatim dhuafa yang sedang berjuang menuntut ilmu agama dan vokasi di Jonggol.' },
        { question: 'Kapan waktu terbaik menunaikan zakat maal?', answer: 'Zakat maal ditunaikan saat harta simpanan telah memenuhi nisab dan genap berputar selama satu tahun hijriyah (haul). Anda dapat menunaikannya kapan saja saat haul terpenuhi.' },
      ],
    },
  },
};

async function syncAll() {
  console.log('[SYNC] Starting synchronization of all 4 program sections in database...');

  // 1. Delete orphan prog_addons if any
  await sql`DELETE FROM page_sections WHERE section_key = 'prog_addons'`;

  // 2. Loop through each program and upsert sections
  for (const [slug, data] of Object.entries(programsFullData)) {
    console.log(`[SYNC] Processing program: ${slug.toUpperCase()}...`);

    const sections = [
      {
        section_key: 'prog_hero',
        title: `Header & Banner ${slug.toUpperCase()}`,
        sort_order: 1,
        content: data.hero,
      },
      {
        section_key: 'prog_pricing',
        title: `Pilihan Paket ${slug.toUpperCase()}`,
        sort_order: 2,
        content: data.pricing,
      },
      {
        section_key: 'prog_details',
        title: `Detail & Dokumentasi ${slug.toUpperCase()}`,
        sort_order: 3,
        content: data.details,
      },
      {
        section_key: 'prog_faq',
        title: `FAQ Tanya Jawab ${slug.toUpperCase()}`,
        sort_order: 4,
        content: data.faq,
      },
    ];

    for (const sec of sections) {
      const contentJson = JSON.stringify(sec.content);
      await sql`
        INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
        VALUES (${slug}, ${sec.section_key}, ${sec.title}, true, ${sec.sort_order}, ${contentJson}::jsonb, CURRENT_TIMESTAMP)
        ON CONFLICT (page_slug, section_key) DO UPDATE
        SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP;
      `;
    }
  }

  console.log('[SYNC] Checking updated page_sections table:');
  const rows = await sql`
    SELECT id, page_slug, section_key, title, sort_order 
    FROM page_sections 
    WHERE page_slug IN ('wakaf', 'infaq', 'sedekah', 'zakat') 
    ORDER BY page_slug, sort_order;
  `;
  console.table(rows);
  console.log('[SYNC] Completed successfully!');
}

syncAll().catch((err) => {
  console.error('[SYNC-ERROR]', err);
  process.exit(1);
});
