// src/data/programs.ts
// Data Terpusat Program Global Village Fund (GVF) di bawah Yayasan Permata Cendekia Indonesia (YPCI)

export interface DeliverableItem {
  bold: string;
  text: string;
}

export interface PricingPackage {
  id: string;
  title: string;
  subtitle: string;
  priceAmount: string;
  pricePrefix?: string;
  priceUnit: string;
  priceDesc: string;
  estimation: string;
  isPopular?: boolean;
  deliverables: DeliverableItem[];
  ctaText: string;
}

export interface ValueBox {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  status: string;
  caption: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

export interface LeaderPerson {
  name: string;
  role: string;
  credentials: string;
  image: string;
  quote: string;
}

export interface LegalItem {
  institution: string;
  regNumber: string;
  authority: string;
  description: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  code: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AddonItem {
  name: string;
  desc: string;
  price: string;
  availability: string;
}

export interface ProgramData {
  slug: 'wakaf' | 'zakat' | 'infaq' | 'sedekah';
  title: string;
  heroSubtitle: string;
  categoryBadge: string;
  heroBgImage: string;
  
  pricingHeading: string;
  pricingSubheading: string;
  packages: PricingPackage[];
  addonTitle?: string;
  addonItems?: AddonItem[];
  
  deepDiveBadge: string;
  deepDiveTitle: string;
  deepDiveLead: string;
  deepDiveStory1: string;
  deepDiveStory2: string;
  deepDiveBannerImage: string;
  valueBoxes: ValueBox[];
  deepDiveTwinImages?: [string, string];
  deepDiveSubblock1Title?: string;
  deepDiveSubblock1Desc1?: string;
  deepDiveSubblock1Desc2?: string;
  deepDiveSubblock2Title?: string;
  deepDiveSubblock2Desc1?: string;
  deepDiveSubblock2Desc2?: string;
  portfolioShowcaseItems?: {
    tag: string;
    name: string;
    category: string;
    image: string;
  }[];
  guarantees?: string[];
  
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryItems: GalleryItem[];
  
  workflowHeading: string;
  workflowSteps: WorkflowStep[];
  
  leadershipBadge: string;
  leadershipTitle: string;
  leadershipQuote: string;
  leaders: LeaderPerson[];
  
  legalitasBadge: string;
  legalitasTitle: string;
  legalities: LegalItem[];
  bankAccounts: BankAccount[];
  
  faqBadge: string;
  faqTitle: string;
  faqs: FaqItem[];
  ctaBannerHeading: string;
  ctaBannerText: string;
}

const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

export const programsData: Record<string, ProgramData> = {
  wakaf: {
    slug: 'wakaf',
    title: 'Wakaf: Mengelola Aset, Menghadirkan Manfaat Jangka Panjang',
    heroSubtitle: 'Wakaf merupakan bentuk ibadah dengan menyerahkan sebagian harta untuk dimanfaatkan sesuai tujuan wakaf. Melalui pengelolaan yang produktif dan bertanggung jawab, wakaf dapat menjadi instrumen pengembangan aset yang manfaatnya terus dihadirkan dari waktu ke waktu.',
    categoryBadge: 'WAKAF PRODUKTIF & PENGEMBANGAN ASET',
    heroBgImage: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-perkebunan.webp`,
    
    pricingHeading: 'Instrumen Pengelolaan Program Wakaf',
    pricingSubheading: 'Tunaikan wakaf berdasarkan 4 pilar peruntukan: wakaf uang, wakaf melalui uang (masjid), wakaf tanah/bangunan, dan wakaf produktif terpadu.',
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
        isPopular: true,
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
    deepDiveStory1: 'Pengelolaan wakaf di bawah payung Yayasan Permata Cendekia Indonesia (YPCI) memadukan 4 instrumen utama: Wakaf Uang (pokok dijaga, hasil dimanfaatkan), Wakaf Melalui Uang (pembangunan sarana fisik tertentu), Wakaf Tanah & Bangunan (aset tidak bergerak), dan Wakaf Produktif (pertanian terpadu, greenhouse, peternakan, serta unit usaha mandiri).',
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
  },

  infaq: {
    slug: 'infaq',
    title: 'Infak: Menguatkan Program, Mendukung Pengembangan',
    heroSubtitle: 'Infak merupakan kontribusi sukarela yang memberikan ruang bagi setiap orang untuk mengambil bagian dalam berbagai upaya kebaikan. Dana infak dikelola untuk mendukung kebutuhan pembangunan, operasional, pendidikan, serta pengembangan sarana dan program pemberdayaan.',
    categoryBadge: 'INFAK PROGRAM & PEMBANGUNAN',
    heroBgImage: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-portrait.webp`,
    
    pricingHeading: 'Pilihan Pos Infak Berkelanjutan',
    pricingSubheading: 'Salurkan infak Anda untuk 4 pos utama: Kebutuhan Pembangunan & Infrastruktur, Kebutuhan Operasional, Pendidikan & Pembinaan, serta Pemberdayaan & Kemandirian.',
    packages: [
      {
        id: 'infaq-pembangunan-infrastruktur',
        title: 'A. Pembangunan & Infrastruktur',
        subtitle: 'Konstruksi & Material Bangunan',
        pricePrefix: 'Rp ',
        priceAmount: '100.000',
        priceUnit: '',
        priceDesc: 'Per paket partisipasi konstruksi',
        estimation: 'Alokasi: Semen, hebel, besi, baja ringan, atap & sanitasi',
        isPopular: true,
        deliverables: [
          { bold: 'Material Konstruksi Lengkap', text: 'Semen, pasir split, besi beton, baja ringan, bata hebel, keramik, atap & plafon' },
          { bold: 'Kusen, Pintu & Jendela', text: 'Pengadaan kusen aluminium, kaca, dan pintu ruang kelas serta asrama santri' },
          { bold: 'Instalasi Listrik & Air', text: 'Pemasangan instalasi listrik penerangan, air bersih, dan sanitasi sehat' },
          { bold: 'Pengembangan Fasilitas', text: 'Mencakup masjid, asrama, ruang kelas, dapur, sanitasi, dan sarana penunjang' },
          { bold: 'Laporan Belanja Terbuka', text: 'Pencatatan nota material dan dokumentasi progres fisik lapangan' }
        ],
        ctaText: 'Salurkan Infak Pembangunan'
      },
      {
        id: 'infaq-kebutuhan-operasional',
        title: 'B. Kebutuhan Operasional',
        subtitle: 'Pemeliharaan & Utilitas Pesantren',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per paket operasional',
        estimation: 'Alokasi: Pangan pokok, listrik, air, gas & pemeliharaan',
        isPopular: false,
        deliverables: [
          { bold: 'Bahan Pangan Pokok', text: 'Pemenuhan kebutuhan beras, bahan dapur umum, dan konsumsi harian santri' },
          { bold: 'Utilitas Air, Listrik & Gas', text: 'Membantu biaya rekening listrik penerangan, air bersih, dan bahan bakar dapur' },
          { bold: 'Kebersihan & Perawatan', text: 'Perlengkapan sanitasi, kebersihan, dan pemeliharaan fasilitas pesantren' },
          { bold: 'Kelancaran Aktivitas', text: 'Menjaga rutinitas belajar dan ibadah santri berjalan tertib tanpa kendala' }
        ],
        ctaText: 'Salurkan Infak Operasional'
      },
      {
        id: 'infaq-pendidikan-pembinaan',
        title: 'C. Pendidikan & Pembinaan',
        subtitle: 'Sarana Belajar & Vokasi Santri',
        pricePrefix: 'Rp ',
        priceAmount: '200.000',
        priceUnit: '',
        priceDesc: 'Per paket sarana belajar',
        estimation: 'Alokasi: Buku, ATK, komputer, alat praktik vokasi & media',
        isPopular: false,
        deliverables: [
          { bold: 'Buku & Perlengkapan Belajar', text: 'Kitab pegangan, modul kejuruan, dan alat tulis penunjang belajar santri' },
          { bold: 'Komputer & Alat Praktik', text: 'Perangkat komputer dan peralatan praktik kejuruan vokasi teknologi' },
          { bold: 'Media Pembelajaran & Bahasa', text: 'Papan tulis whiteboard, media audio-visual, dan materi penguatan bahasa' },
          { bold: 'Sarana Pembinaan Karakter', text: 'Peralatan kegiatan ekstrakurikuler, olahraga, dan pembinaan adab santri' }
        ],
        ctaText: 'Salurkan Infak Pendidikan'
      }
    ],
    addonTitle: 'D. Infak Pemberdayaan & Kemandirian Usaha',
    addonItems: [
      {
        name: 'Peralatan Pertanian & Greenhouse',
        desc: 'Sarana greenhouse budidaya melon, fertigasi, dan bibit tanaman produktif',
        price: 'Rp 250.000',
        availability: 'Tersedia untuk unit agro'
      },
      {
        name: 'Peralatan Peternakan Ayam Petelur',
        desc: 'Kandang modern, pakan berkualitas, dan sarana kesehatan unggas petelur',
        price: 'Rp 200.000',
        availability: 'Tersedia untuk peternakan'
      },
      {
        name: 'Mesin & Alat Pengolahan Pangan',
        desc: 'Peralatan pengolahan pascapanen pangan dan mesin produksi unit usaha',
        price: 'Rp 300.000',
        availability: 'Tersedia untuk vokasi usaha'
      }
    ],
    
    deepDiveBadge: 'FUNGSI & 4 PILAR INFAK',
    deepDiveTitle: 'Menguatkan Program, Mendukung Pengembangan',
    deepDiveLead: 'Infak merupakan kontribusi sukarela yang memberikan ruang bagi setiap orang untuk mengambil bagian dalam berbagai upaya kebaikan. Dana infak dikelola untuk mendukung kebutuhan pembangunan, operasional, pendidikan, serta pengembangan sarana dan program pemberdayaan.',
    deepDiveStory1: 'Melalui 4 pilar infak (Pembangunan & Infrastruktur, Kebutuhan Operasional, Pendidikan & Pembinaan, serta Pemberdayaan & Kemandirian), setiap rupiah yang Anda titipkan menjadi energi nyata yang menggerakkan roda peradaban di Jonggol.',
    deepDiveStory2: '',
    deepDiveBannerImage: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru-2.jpeg`,
    valueBoxes: [
      {
        icon: 'book-open',
        title: 'Fokus Belajar Santri',
        description: 'Sarana kelas yang rapi meningkatkan konsentrasi dan kenyamanan santri saat menyimak materi.'
      },
      {
        icon: 'home',
        title: 'Hunian Asrama Sehat',
        description: 'Tempat istirahat yang bersih menjaga kebugaran santri untuk menjalani rutinitas harian.'
      },
      {
        icon: 'check-circle',
        title: 'Kebutuhan Riil Lapangan',
        description: 'Setiap pos infak disesuaikan dengan daftar kebutuhan fisik yang sedang dikerjakan di Jonggol.'
      },
      {
        icon: 'file-text',
        title: 'Laporan Penyaluran',
        description: 'Dokumentasi belanja dan progres pekerjaan diinformasikan kepada para donatur secara terbuka.'
      }
    ],
    deepDiveTwinImages: [
      `${S3_BASE}/bahan-konten/masjid-dan-kelas/lorong-kelas.jpeg`,
      `${S3_BASE}/bahan-konten/masjid-dan-kelas/bangunan-kelas-bagian-atas.jpeg`
    ],
    deepDiveSubblock1Title: 'A. Kebutuhan Pembangunan dan Infrastruktur',
    deepDiveSubblock1Desc1: 'Mendukung pemenuhan berbagai kebutuhan konstruksi, material, dan perlengkapan untuk pembangunan, renovasi, serta pengembangan fasilitas: semen, pasir, split, besi beton, baja ringan, bata ringan, keramik, plafon, pintu, jendela, instalasi listrik, air, dan sanitasi.',
    deepDiveSubblock1Desc2: 'Kebutuhan ini mencakup pembangunan dan pengembangan berbagai fasilitas, seperti masjid, asrama, ruang kelas, dapur, sanitasi, serta sarana penunjang lainnya.',
    deepDiveSubblock2Title: 'B, C & D. Operasional, Pendidikan & Kemandirian',
    deepDiveSubblock2Desc1: 'Memenuhi kebutuhan operasional harian (bahan pangan pokok, dapur, air, listrik, gas, kebersihan, pemeliharaan) serta kebutuhan pendidikan (buku, ATK, komputer, alat praktik vokasi, perlengkapan bahasa).',
    deepDiveSubblock2Desc2: 'Diarahkan pula untuk pengembangan sarana produksi, unit usaha, dan fasilitas produktif (peralatan pertanian, greenhouse, peternakan, mesin pengolahan pangan, perangkat teknologi) yang menunjang kemandirian.',
    portfolioShowcaseItems: [
      { tag: 'MATERIAL FISIK', name: 'Kebutuhan Material Bangunan', category: 'Konstruksi', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/bahan-bangunan.jpeg` },
      { tag: 'WUDHU & BERSUCI', name: 'Sarana Tempat Wudhu Ikhwan', category: 'Fasilitas Ibadah', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/tempat-wudlu-ikhwan-2.jpeg` },
      { tag: 'SANITASI KELAS', name: 'Fasilitas Sanitasi & Toilet', category: 'Infrastruktur', image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/toilet-kelas.jpeg` },
      { tag: 'RUANG BELAJAR', name: 'KBM Santri di Ruang Kelas', category: 'Pendidikan Vokasi', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kbm-santri-putra-putri-kelas.webp` }
    ],
    guarantees: [
      'Alokasi dana infak langsung untuk pos kebutuhan sarana fisik',
      'Pencatatan nota pembelian bahan bangunan yang rapi',
      'Dokumentasi visual sebelum dan sesudah pekerjaan',
      'Penerimaan dalam bentuk barang material sesuai spesifikasi',
      'Tanda terima resmi dari Yayasan Permata Cendekia Indonesia (YPCI)',
      'Kunjungan langsung untuk meninjau fasilitas di Jonggol'
    ],
    
    galleryBadge: 'DOKUMENTASI SARANA',
    galleryTitle: 'Kondisi Aktual Fasilitas Pendidikan & Asrama',
    gallerySubtitle: 'Dokumentasi sarana belajar, akses gedung, dan lingkungan asrama santri di Sukasirna Jonggol.',
    galleryItems: [
      {
        id: 'inf-1',
        title: 'Fasilitas Tempat Wudhu Ikhwan',
        category: 'Sarana Bersuci',
        image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/tempat-wudlu-ikhwan.jpeg`,
        status: 'Fasilitas Aktif',
        caption: 'Penyediaan sarana tempat wudhu santri yang bersih dan memadai.'
      },
      {
        id: 'inf-2',
        title: 'Konstruksi Tangga Asrama Baru',
        category: 'Infrastruktur Hunian',
        image: `${S3_BASE}/bahan-konten/asrama-putra-baru/tangga-asrama-ikhwan-baru.jpeg`,
        status: 'Dalam Pengerjaan',
        caption: 'Akses tangga cor semen kokoh penghubung lantai asrama santri baru.'
      },
      {
        id: 'inf-3',
        title: 'Sarana Sanitasi & Toilet Kelas',
        category: 'Sanitasi Sehat',
        image: `${S3_BASE}/bahan-konten/masjid-dan-kelas/toilet-kelas.jpeg`,
        status: 'Fasilitas Aktif',
        caption: 'Pemenuhan fasilitas toilet dan sanitasi higienis di area belajar santri.'
      }
    ],
    
    workflowHeading: 'Alur Penyaluran Infak yang Jelas & Transparan',
    workflowSteps: [
      {
        number: '01',
        title: 'Pilih Paket Kebutuhan',
        description: 'Tentukan program infak (sarana kelas, material bangunan, atau fasilitas hunian).'
      },
      {
        number: '02',
        title: 'Salurkan via Rekening Resmi',
        description: 'Transfer donasi infak melalui rekening resmi YPCI / GVF yang telah terverifikasi.'
      },
      {
        number: '03',
        title: 'Konfirmasi Penyaluran',
        description: 'Kirimkan bukti transfer untuk pencatatan pembukuan dan penerbitan tanda terima resmi.'
      },
      {
        number: '04',
        title: 'Pembaruan Progres Pengadaan',
        description: 'Dapatkan informasi dokumentasi pengadaan barang atau realisasi pekerjaan fisik di lokasi.'
      }
    ],
    
    leadershipBadge: 'PENGELOLA PROGRAM',
    leadershipTitle: 'Amanah Pengelolaan Sarana Pendidikan',
    leadershipQuote: '"Menyiapkan ruang belajar yang layak adalah ikhtiar memuliakan para penuntut ilmu agar mereka dapat belajar dengan tenang dan bermartabat."',
    leaders: [
      {
        name: 'Dr. H. M. Hidayat, M.Si',
        role: 'Ketua Pembina YPCI',
        credentials: 'Pembina Ekosistem Pendidikan & Pesantren',
        image: `${S3_BASE}/media-lp/pengurus-1.jpg`,
        quote: 'Sarana yang baik menjadi fondasi pembentukan generasi muda yang cerdas, beradab, dan mandiri.'
      },
      {
        name: 'Ustadz Mahin Utsman',
        role: 'Direktur Eksekutif GVF',
        credentials: 'Penanggung Jawab Operasional Program',
        image: `${S3_BASE}/media-lp/pengurus-3.jpg`,
        quote: 'Kami mengawal setiap bantuan material agar terpasang tepat sasaran sesuai kebutuhan lapangan.'
      }
    ],
    
    legalitasBadge: 'REKENING RESMI INFAK',
    legalitasTitle: 'Rekening Donasi Resmi Sarana Pendidikan',
    legalities: [
      {
        institution: 'Yayasan Permata Cendekia Indonesia (YPCI)',
        regNumber: 'Penyelenggara Lembaga',
        authority: 'Pengelola Program Infak Pendidikan & Fasilitas',
        description: 'Menerima dan menyalurkan dana infak secara khusus untuk pembangunan sarana fisik pesantren.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI)',
        accountNumber: '7238890012',
        accountHolder: 'Yayasan Permata Cendekia Indonesia',
        code: '451'
      },
      {
        bankName: 'Bank Muamalat',
        accountNumber: '3480015522',
        accountHolder: 'Yayasan Permata Cendekia Indonesia',
        code: '147'
      }
    ],
    
    faqBadge: 'FAQ INFAK',
    faqTitle: 'Pertanyaan Seputar Infak Pendidikan',
    faqs: [
      {
        question: 'Apakah infak dapat diberikan dalam bentuk barang material bangunan?',
        answer: 'Bisa. Donatur dapat berpartisipasi dalam bentuk pengadaan barang langsung seperti semen, hebel, pasir, atau perlengkapan kamar setelah berkoordinasi dengan tim lapangan mengenai spesifikasi yang dibutuhkan.'
      },
      {
        question: 'Bagaimana penentuan prioritas pembangunan sarana?',
        answer: 'Prioritas ditentukan berdasarkan kebutuhan mendesak santri, yaitu keamanan ruang belajar kelas dan kenyamanan fasilitas hunian asrama.'
      },
      {
        question: 'Apakah donatur mendapatkan laporan penggunaan dana infak?',
        answer: 'Ya, tim kami mendokumentasikan progres fisik secara berkala melalui foto dan video yang dipublikasikan di kanal resmi yayasan.'
      }
    ],
    ctaBannerHeading: 'Bantu Wujudkan Sarana Belajar yang Layak',
    ctaBannerText: 'Setiap bata dan meja yang Anda hadirkan menjadi saksi amal kebaikan bagi kemajuan pendidikan santri di Jonggol.'
  },

  sedekah: {
    slug: 'sedekah',
    title: 'Sedekah: Berbagi dengan Cara, Menghadirkan Manfaat',
    heroSubtitle: 'Sedekah merupakan bentuk kepedulian yang dapat diwujudkan melalui berbagai bentuk pemberian. Tidak terbatas pada uang, sedekah juga dapat berupa barang, pangan, ilmu, keterampilan, maupun tenaga yang memberikan manfaat.',
    categoryBadge: 'SEDEKAH PANGAN, BARANG & JASA',
    heroBgImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/suasana-kajian-santri-aula.webp`,
    
    pricingHeading: 'Pilihan Pos Sedekah Berkelanjutan',
    pricingSubheading: 'Salurkan sedekah untuk 4 ragam kepedulian: Pangan & Konsumsi, Fasilitas & Perlengkapan, Pendidikan & Kegiatan, serta Keahlian, Jasa & Tenaga.',
    packages: [
      {
        id: 'sedekah-pangan-konsumsi',
        title: 'A. Pangan & Konsumsi Harian',
        subtitle: 'Beras, Lauk & Nutrisi Santri',
        pricePrefix: 'Rp ',
        priceAmount: '25.000',
        priceUnit: '',
        priceDesc: 'Per porsi makan lengkap bernutrisi',
        estimation: 'Alokasi: Beras, minyak, telur, daging/ikan, sayur & susu',
        isPopular: true,
        deliverables: [
          { bold: 'Pangan Pokok Seimbang', text: 'Beras pulen, minyak goreng, telur, daging, ikan, sayuran, dan buah segar' },
          { bold: 'Dapur Mandiri Higienis', text: 'Dimasak setiap hari di dapur umum asrama oleh juru masak pesantren' },
          { bold: 'Paket Kebutuhan Pangan', text: 'Penyediaan stok sembako aman untuk lumbung pangan santri mukim' },
          { bold: 'Stamina Belajar & Ibadah', text: 'Menjaga kesehatan dan kebugaran santri dari shubuh hingga malam' },
          { bold: 'Dokumentasi Makan Harian', text: 'Pencatatan nota belanja dan foto suasana makan bersama santri' }
        ],
        ctaText: 'Sedekah Pangan Santri'
      },
      {
        id: 'sedekah-fasilitas-perlengkapan',
        title: 'B. Fasilitas & Perlengkapan',
        subtitle: 'Kenyamanan Hunian & Ibadah',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per paket perlengkapan',
        estimation: 'Alokasi: Kasur, meja, kursi, alat dapur, perlengkapan asrama',
        isPopular: false,
        deliverables: [
          { bold: 'Tempat Tidur & Lemari', text: 'Kasur busa higienis, ranjang bertingkat, dan lemari loker pakaian santri' },
          { bold: 'Meja, Kursi & Kipas Angin', text: 'Mendukung kenyamanan ruang halaqah belajar dan sirkulasi kamar' },
          { bold: 'Peralatan Dapur & Sanitasi', text: 'Perlengkapan masak dapur umum dan sarana pembersihan asrama' },
          { bold: 'Perlengkapan Masjid', text: 'Karpet, pengeras suara audio multimedia, dan sajadah shalat berjamaah' }
        ],
        ctaText: 'Sedekah Fasilitas'
      },
      {
        id: 'sedekah-pendidikan-kegiatan',
        title: 'C. Pendidikan & Kegiatan',
        subtitle: 'Dukungan Pembinaan & Vokasi',
        pricePrefix: 'Rp ',
        priceAmount: '200.000',
        priceUnit: '',
        priceDesc: 'Per paket sarana kegiatan',
        estimation: 'Alokasi: Buku, alat olahraga, komputer & peraga',
        isPopular: false,
        deliverables: [
          { bold: 'Buku & Alat Tulis', text: 'Pengadaan mushaf Al-Quran, kitab, buku referensi, dan alat tulis' },
          { bold: 'Perlengkapan Olahraga', text: 'Sarana futsal, panahan, bulu tangkis, dan pembinaan jasmani' },
          { bold: 'Alat Praktik Keterampilan', text: 'Perangkat komputer, alat peraga visual, dan media pembelajaran santri' },
          { bold: 'Kegiatan Keagamaan', text: 'Perlengkapan daurah, safari dakwah, dan agenda pembinaan karakter' }
        ],
        ctaText: 'Sedekah Pendidikan'
      }
    ],
    addonTitle: 'D. Sedekah Keahlian, Jasa & Tenaga',
    addonItems: [
      {
        name: 'Relawan Tenaga Pembangunan',
        desc: 'Kontribusi tenaga dan gotong royong langsung dalam pekerjaan fisik sarana pesantren',
        price: 'Tenaga / Sukarela',
        availability: 'Koordinasi Lapangan Jonggol'
      },
      {
        name: 'Keahlian Teknologi & Pelatihan',
        desc: 'Memberikan workshop, mentoring vokasi, coding, desain, atau kejuruan untuk santri',
        price: 'Keahlian / Sesi',
        availability: 'Jadwal Kuliah Tamu'
      },
      {
        name: 'Konsultasi Teknis & Profesional',
        desc: 'Pendampingan profesional di bidang teknik sipil, arsitektur, pertanian, atau hukum',
        price: 'Jasa Profesional',
        availability: 'Via Daring / Tatap Muka'
      }
    ],
    
    deepDiveBadge: 'RAGAM BENTUK SEDEKAH',
    deepDiveTitle: 'Berbagi dengan Cara, Menghadirkan Manfaat',
    deepDiveLead: 'Sedekah merupakan bentuk kepedulian yang dapat diwujudkan melalui berbagai bentuk pemberian. Tidak terbatas pada uang, sedekah juga dapat berupa barang, pangan, ilmu, keterampilan, maupun tenaga yang memberikan manfaat.',
    deepDiveStory1: 'Setiap butir beras, perlengkapan kamar, bantuan mengajar, maupun keringat para relawan yang tercurah menjadi saksi kebaikan nyata yang memperkuat kehidupan para penuntut ilmu di Sukasirna Jonggol.',
    deepDiveStory2: '',
    deepDiveBannerImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ramai-menyimak-ustadz-mengajar.webp`,
    valueBoxes: [
      {
        icon: 'heart',
        title: 'Pangan Terpenuhi',
        description: 'Menu seimbang dengan protein, sayuran segar, dan karbohidrat yang mencukupi kebutuhan santri.'
      },
      {
        icon: 'utensils',
        title: 'Fasilitas Layak',
        description: 'Perlengkapan asrama, masjid, dan sarana ibadah yang bersih dan terawat dengan tertib.'
      },
      {
        icon: 'sun',
        title: 'Keahlian Berdaya',
        description: 'Ruang berbagi ilmu, keterampilan teknologi, dan pendampingan vokasi bagi santri masa depan.'
      },
      {
        icon: 'file-text',
        title: 'Pencatatan Rapi',
        description: 'Laporan penerimaan barang dan penyaluran dicatat serta dipertanggungjawabkan secara transparan.'
      }
    ],
    deepDiveTwinImages: [
      `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-menulis-di-buku-catatan.webp`,
      `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-tersenyum-di-kamar-asrama.webp`
    ],
    deepDiveSubblock1Title: 'A & B. Sedekah Pangan, Fasilitas dan Perlengkapan',
    deepDiveSubblock1Desc1: 'Membantu konsumsi pangan harian (beras, minyak goreng, telur, daging, ikan, sayuran, susu, air minum) serta perlengkapan fasilitas (kasur, lemari, meja kursi, kipas angin, peralatan dapur, perlengkapan masjid dan asrama).',
    deepDiveSubblock1Desc2: 'Bantuan berupa barang langsung dapat dikonfirmasi terlebih dahulu ke layanan WhatsApp Customer Service GVF untuk kesesuaian spesifikasi dan waktu pengiriman ke Jonggol.',
    deepDiveSubblock2Title: 'C & D. Sedekah Pendidikan, Keahlian, Jasa dan Tenaga',
    deepDiveSubblock2Desc1: 'Mendukung pengadaan buku, perlengkapan olahraga, perangkat komputer, alat peraga, dan sarana kegiatan santri.',
    deepDiveSubblock2Desc2: 'Membuka ruang seluas-luasnya bagi donatur yang ingin menyedekahkan waktu, keahlian teknologi, pelatihan vokasi, jasa perbaikan fasilitas, maupun tenaga pembangunan di lokasi pesantren.',
    portfolioShowcaseItems: [
      { tag: 'KOLABORASI SANTRI', name: 'Diskusi & Kerja Kelompok', category: 'Pendidikan Adab', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/dua-santri-ikhwan-berdiskusi-meja-lipat.webp` },
      { tag: 'DISIPLIN KAJIAN', name: 'Santri Mencatat Pelajaran', category: 'Pembinaan Santri', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-bersarung-mencatat-pelajaran.webp` },
      { tag: 'TUGAS HARIAN', name: 'Ketekunan Belajar Mandiri', category: 'Kemandirian Santri', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-menulis-tugas-pensil.webp` },
      { tag: 'FOKUS MENYIMAK', name: 'Santri Menyimak Pelajaran', category: 'Karakter Santri', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-berkacamata-fokus-menyimak.webp` }
    ],
    guarantees: [
      'Penyaluran langsung dalam bentuk bahan pangan dan porsi makan santri',
      'Standar kebersihan pengolahan makanan di dapur asrama',
      'Pencatatan nota belanja bahan pangan yang tertib',
      'Dokumentasi visual penyajian dan makan bersama santri',
      'Tanda terima resmi dari Yayasan Permata Cendekia Indonesia (YPCI)'
    ],
    
    galleryBadge: 'DOKUMENTASI PANGAN',
    galleryTitle: 'Dokumentasi Pangan & Kebun Pesantren',
    gallerySubtitle: 'Potret hasil kebun sayur, unit peternakan, dan suasana konsumsi santri di Sukasirna Jonggol.',
    galleryItems: [
      {
        id: 'sed-1',
        title: 'Suasana Belajar Santri di Aula',
        category: 'Aktivitas Harian',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/suasana-kbm-santri-ikhwan-di-aula.webp`,
        status: 'Kegiatan Aktif',
        caption: 'Santri ikhwan tertib menyimak arahan ustadz dalam kajian bersama.'
      },
      {
        id: 'sed-2',
        title: 'Santriwati Fokus Menuntut Ilmu',
        category: 'Pendidikan Muslimah',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-fokus-mencatat-pelajaran.webp`,
        status: 'KBM Berjalan',
        caption: 'Santriwati tekun memperhatikan materi dan bimbingan akhlak harian.'
      },
      {
        id: 'sed-3',
        title: 'Majelis Bimbingan Asatidz',
        category: 'Kajian Rutin',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ramai-menyimak-ustadz-mengajar.webp`,
        status: 'Majelis Ilmu',
        caption: 'Suasana khidmat santri saat menyerap ilmu dari ustadz pembina.'
      }
    ],
    
    workflowHeading: 'Alur Sedekah Pangan Santri',
    workflowSteps: [
      {
        number: '01',
        title: 'Pilih Bentuk Sedekah',
        description: 'Tentukan pilihan paket (porsi makan santri, karung beras, atau operasional dapur).'
      },
      {
        number: '02',
        title: 'Salurkan via Rekening Resmi',
        description: 'Transfer donasi sedekah melalui rekening resmi YPCI / GVF yang telah disiapkan.'
      },
      {
        number: '03',
        title: 'Pencatatan Logistik',
        description: 'Tim dapur mencatat donasi dan membelanjakannya untuk bahan pangan berkualitas.'
      },
      {
        number: '04',
        title: 'Penyajian & Laporan',
        description: 'Bahan pangan dimasak dan dihidangkan langsung kepada santri mukim di asrama.'
      }
    ],
    
    leadershipBadge: 'PENGELOLA ASRAMA',
    leadershipTitle: 'Amanah Pelayanan Konsumsi Santri',
    leadershipQuote: '"Memastikan santri mendapatkan makanan yang halal, sehat, dan bergizi adalah bagian terpenting dari ikhtiar menjaga kesehatan jasmani mereka."',
    leaders: [
      {
        name: 'Ustadz Mahin Utsman',
        role: 'Direktur Eksekutif GVF',
        credentials: 'Penanggung Jawab Harian Pesantren',
        image: `${S3_BASE}/media-lp/pengurus-3.jpg`,
        quote: 'Setiap butir beras yang disedekahkan menjadi tenaga bagi santri dalam menuntut ilmu dan beribadah.'
      }
    ],
    
    legalitasBadge: 'REKENING RESMI SEDEKAH',
    legalitasTitle: 'Rekening Resmi Sedekah Pangan & Operasional',
    legalities: [
      {
        institution: 'Yayasan Permata Cendekia Indonesia (YPCI)',
        regNumber: 'Penyelenggara Lembaga',
        authority: 'Pengelola Program Sedekah Pangan & Nutrisi',
        description: 'Penyaluran sedekah dikhususkan untuk pemenuhan pangan harian dan operasional santri.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI)',
        accountNumber: '7238890012',
        accountHolder: 'Yayasan Permata Cendekia Indonesia',
        code: '451'
      },
      {
        bankName: 'Bank Muamalat',
        accountNumber: '3480015522',
        accountHolder: 'Yayasan Permata Cendekia Indonesia',
        code: '147'
      }
    ],
    
    faqBadge: 'FAQ SEDEKAH',
    faqTitle: 'Pertanyaan Seputar Sedekah Pangan',
    faqs: [
      {
        question: 'Apakah sedekah disalurkan dalam bentuk bahan mentah atau makanan siap saji?',
        answer: 'Sedekah dialokasikan untuk belanja bahan pangan berkualitas (beras, telur, minyak, sayuran) yang dimasak langsung di dapur umum asrama menjadi hidangan hangat harian santri.'
      },
      {
        question: 'Apakah donatur boleh mengirimkan bahan pangan langsung ke Jonggol?',
        answer: 'Sangat dipersilakan. Donatur dapat mengirimkan beras, minyak goreng, atau bahan makanan lainnya langsung ke alamat pesantren di Sukasirna Jonggol.'
      },
      {
        question: 'Bagaimana keterbukaan laporan belanja dapur asrama?',
        answer: 'Setiap pengeluaran logistik dicatat dalam pembukuan rutin yayasan dan dokumentasi penyajian makanan dibagikan secara berkala kepada donatur.'
      }
    ],
    ctaBannerHeading: 'Hadirkan Hidangan Sehat Bagi Penuntut Ilmu',
    ctaBannerText: 'Salurkan sedekah pangan terbaik Anda untuk mendukung kesehatan dan semangat belajar santri di Jonggol setiap hari.'
  },

  zakat: {
    slug: 'zakat',
    title: 'Zakat: Menunaikan Kewajiban, Menyalurkan Amanah',
    heroSubtitle: 'Zakat merupakan kewajiban yang memiliki ketentuan khusus dalam syariat Islam. Pengelolaannya memperhatikan jenis zakat, perhitungan, serta golongan penerima yang berhak (asnaf). Melalui pengelolaan yang amanah dan penyaluran yang tepat sasaran, zakat diharapkan dapat membantu memenuhi kebutuhan mustahik serta mendukung peningkatan kesejahteraan mereka.',
    categoryBadge: 'ZAKAT SYARIAT & 8 ASNAF',
    heroBgImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/sholat-berjamaah-santri-shaf-portrait.webp`,
    
    pricingHeading: 'Jenis Zakat & Ketentuan Syariat',
    pricingSubheading: 'Tunaikan kewajiban zakat sesuai ketentuan: 1. Zakat Fitrah, 2. Zakat Maal, dan 3. Zakat Penghasilan dengan hisab dan nisab yang terverifikasi.',
    packages: [
      {
        id: 'zakat-fitrah-ramadan',
        title: '1. Zakat Fitrah',
        subtitle: 'Kewajiban Ramadhan Menjelang Idulfitri',
        pricePrefix: 'Rp ',
        priceAmount: '45.000',
        priceUnit: '',
        priceDesc: 'Per jiwa (setara 3,5 liter / 2,5 kg beras)',
        estimation: 'Penyaluran sebelum shalat Idulfitri kepada fakir miskin',
        isPopular: true,
        deliverables: [
          { bold: 'Kewajiban Setiap Muslim', text: 'Wajib ditunaikan oleh setiap muslim yang memenuhi ketentuan sebelum salat Idulfitri' },
          { bold: 'Penyaluran Beras Layak', text: 'Dikonversikan dalam bentuk beras berkualitas baik bagi keluarga fakir miskin sekitar' },
          { bold: 'Tepat Sasaran Asnaf', text: 'Menjangkau mustahik pra-sejahtera dan dhuafa di wilayah Sukasirna Jonggol' },
          { bold: 'Tanda Terima Syariah', text: 'Pencatatan ijab qobul dan bukti tanda terima zakat resmi dari yayasan' }
        ],
        ctaText: 'Tunaikan Zakat Fitrah'
      },
      {
        id: 'zakat-maal-harta',
        title: '2. Zakat Maal',
        subtitle: 'Tabungan, Deposito, Emas & Aset Niaga',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari saldo harta simpanan yang mencapai haul 1 tahun',
        estimation: 'Nisab: Setara 85 Gram Emas Murni',
        isPopular: false,
        deliverables: [
          { bold: 'Syarat Nisab & Haul', text: 'Zakat atas harta yang telah memenuhi persyaratan nisab (85g emas) dan haul (1 tahun)' },
          { bold: 'Kadar Zakat 2,5%', text: 'Kewajiban pembersihan harta simpanan sesuai tuntunan syariat Islam' },
          { bold: 'Dukungan Kesejahteraan', text: 'Disalurkan untuk memenuhi kebutuhan mustahik serta peningkatan taraf hidup mereka' },
          { bold: 'Laporan Penyaluran Rapi', text: 'Pertanggungjawaban pembukuan yang diawasi dewan pengawas syariah' }
        ],
        ctaText: 'Tunaikan Zakat Maal'
      },
      {
        id: 'zakat-penghasilan-profesi',
        title: '3. Zakat Penghasilan',
        subtitle: 'Gaji, Honorarium & Pendapatan Profesi',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari penghasilan bersih yang diterima',
        estimation: 'Nisab: Setara 524 kg beras (~Rp 7.500.000/bln)',
        isPopular: false,
        deliverables: [
          { bold: 'Penghasilan Halal', text: 'Zakat atas penghasilan atau pendapatan halal yang telah memenuhi ketentuan zakat' },
          { bold: 'Asnaf Fi Sabilillah', text: 'Bantuan biaya pendidikan & pembinaan beasiswa santri dhuafa berprestasi' },
          { bold: 'Rutin Setiap Bulan', text: 'Dapat ditunaikan berkala setiap menerima gaji bulanan atau imbalan jasa' },
          { bold: 'Doa Keberkahan', text: 'Didoakan oleh asatidz dan para santri penuntut ilmu di Jonggol' }
        ],
        ctaText: 'Tunaikan Zakat Penghasilan'
      }
    ],
    addonTitle: 'Layanan Konsultasi & Penyaluran 8 Asnaf',
    addonItems: [
      {
        name: 'Simulasi Hisab Nisab Zakat',
        desc: 'Konsultasi gratis penghitungan zakat maal, tabungan emas, dan profesi',
        price: 'Konsultasi Layanan',
        availability: 'Via WhatsApp Resmi'
      },
      {
        name: 'Fidyah Puasa Harian',
        desc: 'Penyaluran paket makanan bernutrisi bagi kaum fakir miskin (per hari fidyah)',
        price: 'Rp 30.000',
        availability: 'Tersedia sepanjang tahun'
      },
      {
        name: 'Kafarat & Santunan Mustahik',
        desc: 'Penyaluran kewajiban kafarat sesuai ketentuan syariat kepada mustahik yang membutuhkan',
        price: 'Sesuai Ketentuan',
        availability: 'Konsultasi Khusus'
      }
    ],
    
    deepDiveBadge: 'PENYALURAN 8 ASNAF SYARIAT',
    deepDiveTitle: 'Menunaikan Kewajiban, Menyalurkan Amanah',
    deepDiveLead: 'Zakat merupakan kewajiban yang memiliki ketentuan khusus dalam syariat Islam. Pengelolaannya memperhatikan jenis zakat, perhitungan, serta golongan penerima yang berhak (asnaf). Melalui pengelolaan yang amanah dan penyaluran yang tepat sasaran, zakat diharapkan dapat membantu memenuhi kebutuhan mustahik serta mendukung peningkatan kesejahteraan mereka.',
    deepDiveStory1: 'Dana zakat disalurkan kepada delapan golongan penerima (asnaf) sesuai ketentuan syariat: 1. Fakir, 2. Miskin, 3. Amil, 4. Mualaf, 5. Riqab, 6. Gharimin, 7. Fisabilillah, dan 8. Ibnu Sabil. Penyaluran dilakukan dengan memperhatikan ketentuan syariat, kelayakan penerima, dan peruntukan dana zakat.',
    deepDiveStory2: '',
    deepDiveBannerImage: `${S3_BASE}/bahan-konten/tangan-beras-zakat-pangan.webp`,
    valueBoxes: [
      {
        icon: 'check-circle',
        title: 'Kesesuaian 8 Asnaf',
        description: 'Penyaluran berpedoman pada ketentuan syariat Al-Quran Surat At-Taubah ayat 60.'
      },
      {
        icon: 'shield-check',
        title: 'Verifikasi Mustahik',
        description: 'Pemeriksaan latar belakang faktual penerima manfaat untuk memastikan ketepatan sasaran.'
      },
      {
        icon: 'user-check',
        title: 'Menjaga Martabat',
        description: 'Dokumentasi penyaluran dilakukan dengan santun tanpa merendahkan martabat penerima.'
      },
      {
        icon: 'file-text',
        title: 'Pencatatan Rapi',
        description: 'Setiap dana zakat yang masuk dan tersalur dicatat secara tertib dalam pembukuan yayasan.'
      }
    ],
    deepDiveTwinImages: [
      `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-berprestasi-juara-lomba-mtq.webp`,
      `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-mencatat-dan-berdiskusi.webp`
    ],
    deepDiveSubblock1Title: 'A. Tiga Ragam Jenis Zakat',
    deepDiveSubblock1Desc1: '1. Zakat Fitrah: Zakat yang wajib ditunaikan oleh setiap muslim yang memenuhi ketentuan, pada bulan Ramadan sebelum pelaksanaan salat Idulfitri. 2. Zakat Maal: Zakat atas harta yang telah memenuhi persyaratan nisab dan haul sesuai ketentuan syariat. 3. Zakat Penghasilan: Zakat atas penghasilan atau pendapatan yang telah memenuhi ketentuan zakat.',
    deepDiveSubblock1Desc2: 'Ketiga instrumen ini dikelola secara terpisah dengan akuntabilitas tinggi agar setiap rupiah kewajiban tertunai secara sah.',
    deepDiveSubblock2Title: 'B. Penyaluran Kepada Delapan Golongan (Asnaf)',
    deepDiveSubblock2Desc1: 'Dana zakat disalurkan kepada delapan golongan penerima (asnaf) sesuai ketentuan syariat: Fakir, Miskin, Amil, Mualaf, Riqab, Gharimin, Fisabilillah (dukungan pendidikan santri dhuafa berprestasi), dan Ibnu Sabil.',
    deepDiveSubblock2Desc2: 'Penyaluran dilakukan dengan memperhatikan ketentuan syariat, kelayakan penerima, dan peruntukan dana zakat untuk mendukung kesejahteraan mereka.',
    portfolioShowcaseItems: [
      { tag: 'PENDIDIKAN ASNAF', name: 'Kajian & Bimbingan Santriwati', category: 'Beasiswa Pendidikan', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kajian-santriwati-bersama-ustadz.webp` },
      { tag: 'TAHFIDZ QURAN', name: 'Salman Aufa (Juara 2 Tahfidz 10 Juz)', category: 'Beasiswa Asnaf Fi Sabilillah', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/salman-aufa-juara-2-tahfidz-10-juz.webp` },
      { tag: 'SENI ISLAM', name: 'M. Kholid (Juara 2 Kaligrafi)', category: 'Prestasi Vokasi Santri', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-kholid-juara-2-kaligrafi.webp` },
      { tag: 'PEMBINAAN ADAB', name: 'Bimbingan Asatidz & Duta Santri', category: 'Karakter FAST', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/foto-ustadz-bersama-duta-santri.webp` }
    ],
    guarantees: [
      'Penyaluran berpedoman teguh pada kaidah syariah 8 asnaf',
      'Verifikasi faktual kriteria penerima manfaat',
      'Pemisahan rekening zakat dari pos dana lainnya',
      'Tanda terima bukti setor zakat resmi dari yayasan',
      'Pencatatan mutasi penyaluran yang dapat diverifikasi'
    ],
    
    galleryBadge: 'DOKUMENTASI MUSTAHIK & PENYALURAN',
    galleryTitle: 'Dokumentasi Amanah Zakat bagi Asnaf',
    gallerySubtitle: 'Penyaluran beras pangan zakat fitrah dan beasiswa pendidikan santri fi sabilillah di Jonggol.',
    galleryItems: [
      {
        id: 'zak-1',
        title: 'Juara 1 Tahfidz 5 Juz Syamil Ghazwan',
        category: 'Tahfidz Quran',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-syamil-ghazwan-juara-1-tahfidz-5-juz.webp`,
        status: 'Juara 1 Tahfidz',
        caption: 'Prestasi gemilang santri binaan beasiswa zakat dalam musabaqah tahfidz.'
      },
      {
        id: 'zak-2',
        title: 'Dua Santri Juara MTQ Tingkat Jonggol',
        category: 'Syiar Quran',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/dua-santri-juara-2-mtq-jonggol-piala.webp`,
        status: 'Piala Bergilir MTQ',
        caption: 'Dua santri peraih kejuaraan MTQ mewakili pesantren ke tingkat wilayah.'
      },
      {
        id: 'zak-3',
        title: 'Panggung Syiar Musabaqah Tilawatil Quran',
        category: 'Syiar Dakwah',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/panggung-musabaqah-tilawatil-quran-jonggol.webp`,
        status: 'Syiar MTQ',
        caption: 'Panggung kompetisi syiar Al-Quran santri pesantren di Jonggol.'
      }
    ],
    
    workflowHeading: 'Alur Penunaian Zakat yang Amanah',
    workflowSteps: [
      {
        number: '01',
        title: 'Hitung Nisab & Kadar Zakat',
        description: 'Tentukan jenis zakat (maal atau profesi) dan pastikan telah memenuhi nisab serta kadar 2,5%.'
      },
      {
        number: '02',
        title: 'Transfer via Rekening Zakat',
        description: 'Salurkan dana zakat melalui rekening resmi zakat Yayasan Permata Cendekia Indonesia (YPCI).'
      },
      {
        number: '03',
        title: 'Akad Ijab Qobul & Konfirmasi',
        description: 'Sampaikan konfirmasi transfer dan dapatkan bukti tanda terima resmi penyaluran zakat.'
      },
      {
        number: '04',
        title: 'Penyaluran Kepada Mustahik',
        description: 'Dana zakat disalurkan langsung kepada santri fi sabilillah dan warga dhuafa yang terverifikasi.'
      }
    ],
    
    leadershipBadge: 'DEWAN SYARIAH',
    leadershipTitle: 'Amanah Penyaluran Zakat Sesuai Syariat',
    leadershipQuote: '"Zakat adalah hak mustahik yang Allah titipkan pada harta kita. Kami berikhtiar menyalurkannya secara cermat dan bertanggung jawab."',
    leaders: [
      {
        name: 'Ir. H. Ahmad Nawawi',
        role: 'Dewan Pengawas Syariah',
        credentials: 'Pemerhati Syariat & Muamalah Islam',
        image: `${S3_BASE}/media-lp/pengurus-2.jpg`,
        quote: 'Memastikan seluruh dana zakat terpisah secara ketat dan disalurkan hanya kepada asnaf yang sah.'
      },
      {
        name: 'Dr. H. M. Hidayat, M.Si',
        role: 'Ketua Pembina YPCI',
        credentials: 'Pembina Lembaga',
        image: `${S3_BASE}/media-lp/pengurus-1.jpg`,
        quote: 'Zakat yang tepat sasaran menjadi wasilah mengangkat martabat dan kemandirian kaum dhuafa.'
      }
    ],
    
    legalitasBadge: 'REKENING RESMI ZAKAT',
    legalitasTitle: 'Rekening Resmi Khusus Zakat',
    legalities: [
      {
        institution: 'Yayasan Permata Cendekia Indonesia (YPCI)',
        regNumber: 'Penyelenggara Lembaga',
        authority: 'Pengelola & Penyalur Zakat',
        description: 'Dana zakat dihimpun pada rekening terpisah khusus untuk penyaluran hak 8 asnaf.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI) - Khusus Zakat',
        accountNumber: '7238890023',
        accountHolder: 'Yayasan Permata Cendekia Indonesia - Zakat',
        code: '451'
      },
      {
        bankName: 'Bank Muamalat - Khusus Zakat',
        accountNumber: '3480015533',
        accountHolder: 'Yayasan Permata Cendekia Indonesia',
        code: '147'
      }
    ],
    
    faqBadge: 'FAQ ZAKAT',
    faqTitle: 'Pertanyaan Seputar Zakat',
    faqs: [
      {
        question: 'Bagaimana dasar hisab zakat penghasilan bulanan?',
        answer: 'Zakat penghasilan dikeluarkan sebesar 2,5% dari penghasilan bersih bulanan apabila telah mencapai nisab setara 524 kg beras (sekitar Rp 7.500.000 per bulan).'
      },
      {
        question: 'Siapa saja asnaf yang menerima penyaluran zakat di GVF?',
        answer: 'Zakat disalurkan kepada santri penuntut ilmu dhuafa dalam kategori fi sabilillah, serta keluarga prasejahtera (fakir dan miskin) di lingkungan sekitar pesantren.'
      },
      {
        question: 'Apakah rekening zakat dipisahkan dari infak dan operasional umum?',
        answer: 'Ya. Seluruh penerimaan zakat dicatat dan ditampung dalam rekening terpisah khusus zakat agar tidak bercampur dengan pos dana operasional atau wakaf.'
      }
    ],
    ctaBannerHeading: 'Tunaikan Zakat, Bersihkan Harta Anda',
    ctaBannerText: 'Salurkan zakat maal dan profesi Anda melalui kanal resmi GVF untuk mendukung kemandirian penuntut ilmu di Jonggol.'
  }
};
