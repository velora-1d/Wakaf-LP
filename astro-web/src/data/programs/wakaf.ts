// src/data/programs/wakaf.ts
import { S3_BASE, type ProgramData } from './types';

export const wakafProgram: ProgramData = {
  slug: 'wakaf',
  title: 'Wakaf: Mengelola Aset, Menghadirkan Manfaat Jangka Panjang',
  heroSubtitle: 'Wakaf merupakan bentuk ibadah dengan menyerahkan sebagian harta untuk dimanfaatkan sesuai tujuan wakaf. Melalui pengelolaan yang produktif dan bertanggung jawab, wakaf dapat menjadi instrumen pengembangan aset yang manfaatnya terus dihadirkan dari waktu ke waktu.',
  categoryBadge: 'WAKAF PRODUKTIF & PENGEMBANGAN ASET',
  heroBgImage: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-perkebunan.webp`,
  
  pricingHeading: 'Instrumen Pengelolaan Program Wakaf',
  pricingSubheading: 'Tunaikan wakaf berdasarkan ragam instrumen peruntukan: wakaf uang, wakaf melalui uang (sarana ibadah), wakaf tanah dan bangunan, serta wakaf produktif kawasan.',
  packages: [
    {
      id: 'wakaf-melalui-uang-masjid',
      title: 'Wakaf Melalui Uang (Sarana Ibadah)',
      subtitle: 'Pembangunan Masjid Khairu Ummah Sugro',
      pricePrefix: 'Rp ',
      priceAmount: '300.000',
      priceUnit: '',
      priceDesc: 'Per paket pembangunan fasilitas ibadah',
      estimation: 'Alokasi: Konstruksi fisik, mezanin & atap permanen masjid',
      isPopular: false,
      deliverables: [
        { bold: 'Pusat Ibadah Berkelanjutan', text: 'Menampung shalat berjamaah dan pembinaan harian santri serta masyarakat' },
        { bold: 'Penyelesaian Atap Permanen', text: 'Pembangunan atap permanen menggantikan naungan atap konstruksi sementara' },
        { bold: 'Mezanin Halaqah Quran', text: 'Lantai mezanin khusus untuk ruang halaqah tahfidz dan tadarus santri' },
        { bold: 'Ventilasi Alami Tropis', text: 'Desain ramah lingkungan hemat energi dengan sirkulasi udara optimal' },
        { bold: 'Laporan Progres Berkala', text: 'Dokumentasi berkala tahapan konstruksi fisik di lapangan Sukasirna' }
      ],
      ctaText: 'Tunaikan Wakaf Masjid'
    },
    {
      id: 'wakaf-tanah-bangunan',
      title: 'Wakaf Tanah dan Bangunan',
      subtitle: 'Aset Lahan Kawasan Ekosistem Jonggol',
      pricePrefix: 'Rp ',
      priceAmount: '150.000',
      priceUnit: '',
      priceDesc: 'Per meter persegi (m²)',
      estimation: 'Alokasi: Pembebasan tanah tapak kawasan terpadu ±3 hektare',
      isPopular: false,
      deliverables: [
        { bold: 'Aset Abadi Tak Bergerak', text: 'Tanah kawasan terpadu di Desa Sukasirna, Jonggol, Kabupaten Bogor' },
        { bold: 'Integrasi Fasilitas', text: 'Menjadi tapak sarana pendidikan vokasi, masjid, dan unit produktif' },
        { bold: 'Prinsip Wakaf Mengikat', text: 'Aset pokok wakaf dijaga keutuhannya dan tidak dapat diperjualbelikan' },
        { bold: 'Pahala Jariyah Mengalir', text: 'Kebaikan abadi yang terus memberi manfaat melintasi zaman' }
      ],
      ctaText: 'Tunaikan Wakaf Tanah'
    },
    {
      id: 'wakaf-produktif-agro',
      title: 'Wakaf Produktif Kawasan',
      subtitle: 'Pertanian, Greenhouse & Peternakan',
      pricePrefix: 'Rp ',
      priceAmount: '500.000',
      priceUnit: '',
      priceDesc: 'Per unit modal produktif',
      estimation: 'Alokasi: Sarana greenhouse, peternakan & unit usaha mandiri',
      isPopular: false,
      deliverables: [
        { bold: 'Pertanian Terpadu', text: 'Greenhouse budidaya melon, sayuran, dan tanaman bernilai ekonomi tinggi' },
        { bold: 'Peternakan Berkelanjutan', text: 'Unit peternakan ayam petelur untuk pemenuhan gizi dan pendapatan kawasan' },
        { bold: 'Pengolahan Hasil Produksi', text: 'Peralatan pascapanen untuk mendukung kemandirian operasional pesantren' },
        { bold: 'Kemandirian Ekonomi', text: 'Hasil usaha produktif disalurkan kembali untuk kemaslahatan program santri' }
      ],
      ctaText: 'Tunaikan Wakaf Produktif'
    }
  ],
  addonTitle: 'Pilihan Partisipasi Wakaf Lainnya',
  addonItems: [
    {
      name: 'Wakaf Uang (Tunai)',
      desc: 'Wakaf uang yang diserahkan melalui nazhir untuk dikelola secara produktif sesuai syariat',
      price: 'Nominal Bebas',
      availability: 'Tersedia via Transfer / QRIS'
    },
    {
      name: 'Wakaf Sumur Bor & Sanitasi',
      desc: 'Penyediaan instalasi air bersih mandiri untuk wudhu masjid dan asrama santri',
      price: 'Rp 500.000',
      availability: 'Tersedia untuk sarana air bersih'
    },
    {
      name: 'Wakaf Pohon Produktif',
      desc: 'Bibit buah dan tanaman keras produktif penopang keasrian kawasan',
      price: 'Rp 100.000',
      availability: 'Tersedia untuk program agro'
    }
  ],
  
  deepDiveBadge: 'URGENSI & PERUNTUKAN WAKAF',
  deepDiveTitle: 'Mengelola Aset, Menghadirkan Manfaat Jangka Panjang',
  deepDiveLead: 'Global Village Fund mengembangkan pengelolaan wakaf untuk mendukung pembangunan aset dan program produktif yang memberikan manfaat berkelanjutan. Melalui pengembangan sarana ibadah, pendidikan, hunian, dan unit usaha produktif, wakaf menjadi bagian dari upaya membangun ekosistem yang mandiri dan produktif.',
  deepDiveStory1: 'Pengelolaan wakaf di bawah payung Yayasan Permata Cendekia Indonesia (YPCI) memadukan ragam instrumen utama: Wakaf Uang (pokok dijaga, hasil dimanfaatkan), Wakaf Melalui Uang (pembangunan sarana fisik), Wakaf Tanah dan Bangunan (aset abadi tidak bergerak), serta Wakaf Produktif (pertanian terpadu, greenhouse, peternakan, dan unit usaha mandiri).',
  deepDiveStory2: '',
  deepDiveBannerImage: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru.jpeg`,
  valueBoxes: [
    {
      icon: 'infinity',
      title: 'Prinsip Pokok Terjaga',
      description: 'Pokok aset wakaf dijaga keutuhannya, tidak dapat diperjualbelikan, dihibahkan, maupun diwariskan.'
    },
    {
      icon: 'shield-check',
      title: 'Kepatuhan Syariah Penuh',
      description: 'Dikelola secara amanah oleh nazhir di bawah pengawasan syariah yayasan sesuai ketentuan perwakafan.'
    },
    {
      icon: 'file-text',
      title: 'Pengembangan Produktif',
      description: 'Menghasilkan manfaat sosial dan ekonomi jangka panjang untuk kemandirian ekosistem pesantren.'
    },
    {
      icon: 'eye',
      title: 'Transparansi & Akuntabilitas',
      description: 'Pembaruan progres fisik dan laporan kemanfaatan disajikan secara berkala dan terbuka kepada pewakif.'
    }
  ],
  deepDiveTwinImages: [
    `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-lantai-2-belum-jadi.jpeg`,
    `${S3_BASE}/bahan-konten/masjid-dan-kelas/asrama-ikhwan-dan-learning-room.jpeg`
  ],
  deepDiveSubblock1Title: 'Pusat Ibadah Masjid Khairu Ummah',
  deepDiveSubblock1Desc1: 'Masjid Khairu Ummah Sugro dirancang dengan konsep ramah lingkungan yang mengoptimalkan pencahayaan dan sirkulasi udara alami, menjadi pusat shalat berjamaah dan pembinaan karakter santri.',
  deepDiveSubblock1Desc2: 'Saat ini jamaah shalat bernaung di bawah atap sementara. Wakaf Anda difokuskan untuk penyelesaian konstruksi fisik, atap permanen, mezanin dua lantai, dan lantai ruang shalat utama.',
  deepDiveSubblock2Title: 'Kawasan Wakaf Sukasirna Jonggol',
  deepDiveSubblock2Desc1: 'Hamparan lahan seluas 3 hektare dipersiapkan untuk mengintegrasikan sarana ibadah, asrama hunian santri, ruang belajar vokasi, dan unit pertanian terpadu.',
  deepDiveSubblock2Desc2: 'Setiap kemajuan pekerjaan di lapangan merupakan buah dari gotong royong para muhsinin yang menitipkan amanah wakaf terbaiknya.',
  portfolioShowcaseItems: [
    { tag: 'ASRAMA IKHWAN', name: 'Tampak Depan Asrama Baru', category: 'Fasilitas Hunian', image: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-depan-asrama-ikhwan-baru.jpeg` },
    { tag: 'AGRO-TECHNOPARK', name: 'Budidaya Melon Greenhouse', category: 'Unit Produktif Mandiri', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp` },
    { tag: 'STRUKTUR AULA', name: 'Konstruksi Atap Paranet Aula', category: 'Fasilitas Serbaguna', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/konstruksi-atap-aula-paranet.webp` },
    { tag: 'WUDHU & SANITASI', name: 'Progres Konstruksi Sanitasi', category: 'Infrastruktur', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp` }
  ],
  guarantees: [
    'Akad peruntukan wakaf yang jelas dan terarah',
    'Laporan progres konstruksi fisik berkala',
    'Pengawasan mutu material dan pekerjaan lapangan',
    'Pencatatan resmi di bawah Yayasan Permata Cendekia Indonesia (YPCI)',
    'Tanda terima dan konfirmasi resmi lembaga',
    'Dokumentasi visual di lokasi pembangunan',
    'Rincian kebutuhan pekerjaan yang transparan',
    'Terbuka untuk kunjungan silaturahmi langsung di Jonggol'
  ],
  
  galleryBadge: 'DOKUMENTASI ASET & PROGRES',
  galleryTitle: 'Dokumentasi Aktual Aset & Kawasan Wakaf',
  gallerySubtitle: 'Kondisi faktual sarana ibadah, hamparan lahan, dan fasilitas pendukung di Sukasirna, Jonggol.',
  galleryItems: [
    {
      id: 'gal-1',
      title: 'Akses Tangga Lantai 2',
      category: 'Akses Bangunan',
      image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/tangga-kelas-ke-lt2.jpeg`,
      status: 'Dalam Pengerjaan',
      caption: 'Tahapan konstruksi tangga penghubung lantai 2 gedung pembelajaran.'
    },
    {
      id: 'gal-2',
      title: 'Struktur Asrama Putri',
      category: 'Hunian Santri',
      image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/asrama-putri-yang-belum-jadi.jpeg`,
      status: 'Tahap Struktur',
      caption: 'Pembangunan asrama santriwati dalam kawasan terpadu Sukasirna.'
    },
    {
      id: 'gal-3',
      title: 'Perluasan Greenhouse Baru',
      category: 'Unit Usaha Agro',
      image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/green-house-yang-belum-jadi.jpeg`,
      status: 'Unit Rintisan',
      caption: 'Fasilitas pengembangan pertanian hidroponik mandiri.'
    },
    {
      id: 'gal-4',
      title: 'Pengerjaan Bagian Atas Masjid',
      category: 'Sarana Ibadah',
      image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/bagian-atas-masjid.jpeg`,
      status: 'Dalam Pengerjaan',
      caption: 'Pemasangan atap permanen masjid penopang kegiatan ibadah santri.'
    },
    {
      id: 'gal-5',
      title: 'Pondasi Kelas Lantai 2',
      category: 'Pendidikan Vokasi',
      image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/pondasi-kelas-lt2.jpeg`,
      status: 'Tahap Pondasi',
      caption: 'Struktur pondasi ruang belajar vokasi santri terpadu.'
    },
    {
      id: 'gal-6',
      title: 'Sanitasi dan Tempat Bersuci',
      category: 'Fasilitas Ibadah',
      image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kamar-mandi-wc-masjid.webp`,
      status: 'Fasilitas Riil',
      caption: 'Sarana kamar mandi dan tempat bersuci representatif di kompleks masjid.'
    }
  ],
  
  workflowHeading: 'Alur Penunaian Wakaf yang Terbuka & Jelas',
  workflowSteps: [
    {
      number: '01',
      title: 'Pilih Peruntukan & Akad',
      description: 'Tentukan pilihan wakaf (sarana ibadah atau lahan produktif) dan bacakan niat wakaf secara tulus.'
    },
    {
      number: '02',
      title: 'Penyaluran via Kanal Resmi',
      description: 'Salurkan donasi wakaf melalui transfer bank resmi atau QRIS Yayasan Permata Cendekia Indonesia (YPCI).'
    },
    {
      number: '03',
      title: 'Konfirmasi & Tanda Terima',
      description: 'Lembaga memverifikasi penyaluran donasi dan mengirimkan tanda terima konfirmasi resmi kepada pewakif.'
    },
    {
      number: '04',
      title: 'Laporan Perkembangan Berkala',
      description: 'Pewakif memperoleh pembaruan foto progres pembangunan dan pemanfaatan aset secara berkala.'
    }
  ],
  
  leadershipBadge: 'DEWAN PEMBINA & SYARIAH',
  leadershipTitle: 'Dikelola Amanah di Bawah Pengayoman YPCI',
  leadershipQuote: '"Setiap amanah wakaf ditunaikan dengan kepatuhan syariat dan tanggung jawab moral untuk menghadirkan sarana yang bermanfaat bagi umat."',
  leaders: [
    {
      name: 'Dr. H. M. Hidayat, M.Si',
      role: 'Ketua Pembina YPCI',
      credentials: 'Praktisi Pendidikan & Pengembangan Kelembagaan',
      image: `${S3_BASE}/media-lp/pengurus-1.jpg`,
      quote: 'Menjaga keberlangsungan ekosistem pendidikan dan sarana ibadah santri agar terus memberi manfaat abadi.'
    },
    {
      name: 'Ir. H. Ahmad Nawawi',
      role: 'Dewan Pengawas Syariah',
      credentials: 'Pemerhati Tata Kelola Filantropi Islam',
      image: `${S3_BASE}/media-lp/pengurus-2.jpg`,
      quote: 'Memastikan seluruh peruntukan wakaf dijalankan sesuai kaidah fiqih dan ketentuan syariah.'
    },
    {
      name: 'Ustadz Mahin Utsman',
      role: 'Direktur Eksekutif GVF',
      credentials: 'Pengelola Program & Kemitraan Pesantren',
      image: `${S3_BASE}/media-lp/pengurus-3.jpg`,
      quote: 'Mendedikasikan pengelolaan program untuk menghadirkan fasilitas nyata di lapangan Sukasirna Jonggol.'
    }
  ],
  
  legalitasBadge: 'KELEMBAGAAN & REKENING RESMI',
  legalitasTitle: 'Kedudukan Lembaga & Rekening Donasi Resmi',
  legalities: [
    {
      institution: 'Yayasan Permata Cendekia Indonesia (YPCI)',
      regNumber: 'Badan Hukum Penyelenggara',
      authority: 'Payung Hukum Resmi Inisiatif Global Village Fund (GVF)',
      description: 'Lembaga nirlaba yang menyelenggarakan pendidikan, kepesantrenan, dan pemberdayaan sosial di Jonggol.'
    },
    {
      institution: 'Pengawasan Syariah Internal',
      regNumber: 'Dewan Pengawas Syariah',
      authority: 'Bimbingan Tata Kelola Syariah Program Filantropi',
      description: 'Mengawasi keabsahan akad, pemisahan pos dana, dan kesesuaian penyaluran dengan kaidah syariah.'
    },
    {
      institution: 'Akuntabilitas & Pelaporan',
      regNumber: 'Sistem Pembukuan Lembaga',
      authority: 'Pertanggungjawaban Penyaluran Dana',
      description: 'Pencatatan berkala setiap mutasi penerimaan dan pengeluaran program yang dapat diakses para muhsinin.'
    }
  ],
  bankAccounts: [
    {
      bankName: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '7238890012',
      accountHolder: 'Yayasan Permata Cendekia Indonesia (YPCI)',
      code: '451'
    },
    {
      bankName: 'Bank Muamalat',
      accountNumber: '3480015522',
      accountHolder: 'Yayasan Permata Cendekia Indonesia',
      code: '147'
    }
  ],
  
  faqBadge: 'FAQ WAKAF',
  faqTitle: 'Pertanyaan Seputar Program Wakaf',
  faqs: [
    {
      question: 'Bagaimana akad wakaf uang yang diterapkan di GVF?',
      answer: 'Wakaf uang yang disalurkan dialokasikan untuk pengadaan dan penyelesaian aset fisik abadi (sarana ibadah Masjid Khairu Ummah atau pembebasan lahan kawasan terpadu) di bawah pengelolaan Yayasan Permata Cendekia Indonesia (YPCI).'
    },
    {
      question: 'Apakah pewakif mendapatkan bukti konfirmasi wakaf resmi?',
      answer: 'Ya, pewakif akan menerima tanda terima dan sertifikat konfirmasi wakaf digital dari lembaga segera setelah donasi terverifikasi.'
    },
    {
      question: 'Bagaimana peruntukan hasil dari unit produktif kawasan?',
      answer: 'Hasil panen atau unit produktif (seperti greenhouse melon dan kebun sayur) diprioritaskan untuk pemenuhan gizi pangan santri mukim di asrama pesantren.'
    },
    {
      question: 'Apakah aset tanah wakaf dapat dialihkan di kemudian hari?',
      answer: 'Sesuai tuntunan syariat dan regulasi perwakafan, aset tanah yang telah diikrarkan sebagai wakaf berstatus abadi, tidak dapat diperjualbelikan, dihibahkan, maupun diwariskan.'
    },
    {
      question: 'Bagaimana cara berkunjung langsung ke lokasi pembangunan di Jonggol?',
      answer: 'Donatur dan pewakif dapat menjadwalkan kunjungan silaturahmi ke lokasi kawasan di Desa Sukasirna, Jonggol, dengan menghubungi layanan donatur via WhatsApp resmi GVF.'
    }
  ],
  ctaBannerHeading: 'Konsultasikan Niat & Partisipasi Wakaf Anda',
  ctaBannerText: 'Hubungi tim layanan donatur kami untuk informasi detail mengenai peruntukan sarana ibadah atau pembebasan lahan kawasan.'
};
