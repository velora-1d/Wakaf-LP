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

const S3_BASE = '';

export const programsData: Record<string, ProgramData> = {
  wakaf: {
    slug: 'wakaf',
    title: 'Wakaf untuk Aset dan Manfaat Berkelanjutan',
    heroSubtitle: 'Dukung pengembangan aset dan sarana yang dapat memberikan manfaat jangka panjang bagi ekosistem Skill Village di Jonggol.',
    categoryBadge: 'WAKAF PRODUKTIF & SARANA IBADAH',
    heroBgImage: '/bahan-konten/Design%20Masjid/skywalk%20learning%20room.jpg',
    
    pricingHeading: 'Pilihan Program Wakaf Berkelanjutan',
    pricingSubheading: 'Tunaikan wakaf berdasarkan peruntukan yang tersedia: sarana ibadah dan wakaf produktif untuk menopang kemandirian umat.',
    packages: [
      {
        id: 'wakaf-masjid-khairu-ummah',
        title: 'Wakaf Sarana Ibadah (Masjid)',
        subtitle: 'Masjid Khairu Ummah Sugro',
        pricePrefix: 'Rp ',
        priceAmount: '300.000',
        priceUnit: '',
        priceDesc: 'Per paket pembangunan masjid',
        estimation: 'Alokasi: Konstruksi fisik, mezanin & atap permanen',
        isPopular: true,
        deliverables: [
          { bold: 'Pusat Ibadah Berkelanjutan', text: 'Menampung shalat berjamaah dan pembinaan harian santri serta warga sekitar' },
          { bold: 'Penyelesaian Atap Permanen', text: 'Pembangunan atap permanen menggantikan naungan atap sementara' },
          { bold: 'Mezanin Halaqah Quran', text: 'Lantai mezanin khusus untuk ruang halaqah tahfidz dan tadarus santri' },
          { bold: 'Sirkulasi Udara Tropis', text: 'Desain ramah lingkungan dengan bukaan ventilasi alami yang hemat energi' },
          { bold: 'Laporan Progres Berkala', text: 'Dokumentasi foto dan video perkembangan tahapan fisik lapangan' }
        ],
        ctaText: 'Tunaikan Wakaf Masjid'
      },
      {
        id: 'wakaf-pembebasan-lahan',
        title: 'Wakaf Lahan Produktif',
        subtitle: 'Kawasan Ekosistem Jonggol',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per meter persegi (m²)',
        estimation: 'Alokasi: Pembebasan tanah kawasan terpadu 3 hektare',
        isPopular: false,
        deliverables: [
          { bold: 'Tapak Ekosistem Abadi', text: 'Lahan terpadu di Desa Sukasirna, Jonggol, Kabupaten Bogor' },
          { bold: 'Integrasi Kawasan', text: 'Menjadi tapak sarana pendidikan vokasi, masjid, dan kebun produktif' },
          { bold: 'Prinsip Wakaf Mengikat', text: 'Aset pokok wakaf terjaga keutuhannya dan tidak dapat diperjualbelikan' },
          { bold: 'Pahala Jariyah Mengalir', text: 'Kebaikan abadi yang terus memberi manfaat melintasi zaman' }
        ],
        ctaText: 'Tunaikan Wakaf Lahan'
      },
      {
        id: 'wakaf-sumur-sanitasi',
        title: 'Wakaf Sumur Bor & Air Bersih',
        subtitle: 'Sanitasi Sehat Kawasan',
        pricePrefix: 'Rp ',
        priceAmount: '500.000',
        priceUnit: '',
        priceDesc: 'Per unit sarana partisipasi',
        estimation: 'Alokasi: Pengeboran sumur, tandon & instalasi pipa',
        isPopular: false,
        deliverables: [
          { bold: 'Pengeboran Sumber Air', text: 'Penyediaan instalasi air bersih mandiri untuk masjid dan asrama' },
          { bold: 'Tempat Wudhu & Sanitasi', text: 'Sarana wudhu yang higienis, bersih, dan nyaman bagi santri' },
          { bold: 'Kemandirian Air Bersih', text: 'Menjamin ketersediaan pasokan air harian untuk seluruh kawasan' }
        ],
        ctaText: 'Tunaikan Wakaf Sumur'
      }
    ],
    addonTitle: 'Pilihan Partisipasi Wakaf Lainnya',
    addonItems: [
      {
        name: 'Wakaf Uang Bebas',
        desc: 'Wakaf uang sukarela untuk kebutuhan mendesak sarana abadi kawasan',
        price: 'Nominal Bebas',
        availability: 'Tersedia via Transfer / QRIS'
      },
      {
        name: 'Wakaf Pohon Produktif',
        desc: 'Bibit buah dan tanaman produktif penopang keasrian kawasan',
        price: 'Rp 100.000',
        availability: 'Tersedia untuk program agro'
      },
      {
        name: 'Wakaf Instalasi Wudhu',
        desc: 'Penyediaan kran wudhu kuningan dan saluran pembuangan higienis',
        price: 'Rp 250.000',
        availability: 'Tersedia untuk masjid'
      }
    ],
    
    deepDiveBadge: 'URGENSI & PERUNTUKAN',
    deepDiveTitle: 'Wakaf untuk Aset dan Manfaat Berkelanjutan',
    deepDiveLead: 'Global Village Fund mengelola wakaf produktif dan sarana ibadah di bawah naungan Yayasan Permata Cendekia Indonesia (YPCI). Wakaf diarahkan untuk mendukung aset fisik yang manfaatnya dapat digunakan secara berkelanjutan bagi santri dan masyarakat.',
    deepDiveStory1: 'Pengelolaan dan peruntukan wakaf dijelaskan secara terbuka sesuai akad yang disepakati. Dari penyelesaian sarana ibadah Masjid Khairu Ummah Sugro hingga pembebasan lahan kawasan terpadu di Sukasirna Jonggol, setiap kontribusi dijaga keutuhannya.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/bahan-konten/Design%20Masjid/interior%20mesjid%202.jpg',
    valueBoxes: [
      {
        icon: 'infinity',
        title: 'Prinsip Aset Abadi',
        description: 'Pokok aset wakaf dijaga keutuhannya, tidak dapat diperjualbelikan, dihibahkan, maupun diwariskan.'
      },
      {
        icon: 'shield-check',
        title: 'Akad Sesuai Syariat',
        description: 'Dikelola secara amanah di bawah pengawasan syariah yayasan sesuai tuntunan fiqih muamalah.'
      },
      {
        icon: 'file-text',
        title: 'Manfaat Nyata Terukur',
        description: 'Manfaat sarana langsung dirasakan santri dalam menuntut ilmu dan beribadah setiap hari.'
      },
      {
        icon: 'eye',
        title: 'Transparansi Penyaluran',
        description: 'Pembaruan progres fisik dan dokumentasi lapangan disajikan secara berkala kepada pewakif.'
      }
    ],
    deepDiveTwinImages: [
      '/bahan-konten/masjid%20dan%20kelas/masjid%20tampak%20dalam.jpeg',
      '/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp'
    ],
    deepDiveSubblock1Title: 'Pusat Ibadah Masjid Khairu Ummah',
    deepDiveSubblock1Desc1: 'Masjid Khairu Ummah Sugro dirancang dengan konsep ramah lingkungan yang mengoptimalkan pencahayaan dan sirkulasi udara alami, menjadi pusat shalat berjamaah dan pembinaan karakter santri.',
    deepDiveSubblock1Desc2: 'Saat ini jamaah shalat bernaung di bawah atap sementara. Wakaf Anda difokuskan untuk penyelesaian konstruksi fisik, atap permanen, mezanin dua lantai, dan lantai ruang shalat utama.',
    deepDiveSubblock2Title: 'Kawasan Wakaf Sukasirna Jonggol',
    deepDiveSubblock2Desc1: 'Hamparan lahan seluas 3 hektare dipersiapkan untuk mengintegrasikan sarana ibadah, asrama hunian santri, ruang belajar vokasi, dan unit pertanian terpadu.',
    deepDiveSubblock2Desc2: 'Setiap kemajuan pekerjaan di lapangan merupakan buah dari gotong royong para muhsinin yang menitipkan amanah wakaf terbaiknya.',
    portfolioShowcaseItems: [
      { tag: 'SARANA IBADAH', name: 'Masjid Khairu Ummah Sugro', category: 'Kondisi Konstruksi', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp` },
      { tag: 'KAWASAN', name: 'Kawasan Terpadu 3 Hektare', category: 'Lahan Abadi', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-dan-pemukiman.webp` },
      { tag: 'UNIT AGRO', name: 'Greenhouse & Pertanian', category: 'Pertanian Presisi', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/greenhouse-pertanian.webp` },
      { tag: 'HUNIAN', name: 'Gedung Asrama Santri', category: 'Fasilitas Kehidupan', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-gedung-dan-halaman-asrama.webp` }
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
        title: 'Kawasan Lahan Terpadu 3 Hektare',
        category: 'Lahan Abadi',
        image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-dan-pemukiman.webp`,
        status: 'Aset Fisik Riil',
        caption: 'Hamparan lahan kawasan pengembangan terpadu Skill Village di Desa Sukasirna, Jonggol, Bogor.'
      },
      {
        id: 'gal-2',
        title: 'Pelataran & Bagian Depan Masjid',
        category: 'Sarana Ibadah',
        image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp`,
        status: 'Fasilitas Aktif',
        caption: 'Pelataran masjid yang digunakan santri dan masyarakat sekitar untuk kegiatan ibadah harian.'
      },
      {
        id: 'gal-3',
        title: 'Greenhouse Pertanian Terpadu',
        category: 'Wakaf Produktif Agro',
        image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp`,
        status: 'Unit Produktif',
        caption: 'Fasilitas greenhouse hortikultura sebagai laboratorium belajar pertanian santri.'
      },
      {
        id: 'gal-4',
        title: 'Halaqah Pembinaan Adab Santri',
        category: 'Pendidikan Karakter',
        image: `${S3_BASE}/bahan-konten/halaqah-santri-melingkar.webp`,
        status: 'Kegiatan Aktif',
        caption: 'Santri mukim mengikuti pembinaan karakter dan tadarus Quran terpadu.'
      },
      {
        id: 'gal-5',
        title: 'Pekerjaan Struktur Lantai & Dinding',
        category: 'Konstruksi Fisik',
        image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp`,
        status: 'Dalam Pengerjaan',
        caption: 'Dokumentasi tahapan pekerjaan dinding, wudhu, dan mezanin Masjid Khairu Ummah.'
      },
      {
        id: 'gal-6',
        title: 'Kegiatan Belajar di Ruang Kelas',
        category: 'Pendidikan Santri',
        image: `${S3_BASE}/bahan-konten/kbm-santri-putra-putri-kelas.webp`,
        status: 'Kegiatan Berjalan',
        caption: 'Suasana pembelajaran di ruang kelas pesantren binaan.'
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
    title: 'Infak untuk Pendidikan dan Fasilitas',
    heroSubtitle: 'Dukung kebutuhan sarana pendidikan, fasilitas hunian, dan pengembangan kompetensi santri Skill Village.',
    categoryBadge: 'INFAK SARANA PENDIDIKAN',
    heroBgImage: '/bahan-konten/asrama%20putra%20baru/tampak%20samping%20asrama%20ikhwan%20baru.jpeg',
    
    pricingHeading: 'Pilihan Program Infak Sarana & Pendidikan',
    pricingSubheading: 'Tampilkan kebutuhan infak yang sedang dibuka: perlengkapan belajar, material pembangunan kelas, dan fasilitas asrama santri.',
    packages: [
      {
        id: 'infaq-perlengkapan-belajar',
        title: 'Perlengkapan Belajar Santri',
        subtitle: 'Meja & Sarana Belajar Kelas',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per paket perlengkapan',
        estimation: 'Alokasi: Meja belajar lipat kayu, rak buku, whiteboard',
        isPopular: false,
        deliverables: [
          { bold: 'Meja Belajar Santri', text: 'Meja lipat ergonomis untuk kegiatan belajar dan mencatat kajian di aula' },
          { bold: 'Whiteboard & ATK Kelas', text: 'Penyediaan papan tulis dan perlengkapan mengajar asatidz' },
          { bold: 'Kenyamanan KBM', text: 'Mendukung santri menyimak materi dengan posisi duduk yang nyaman' },
          { bold: 'Laporan Penyaluran', text: 'Dokumentasi foto serah terima sarana belajar di lokasi kelas' }
        ],
        ctaText: 'Salurkan Infak Belajar'
      },
      {
        id: 'infaq-material-ruang-kelas',
        title: 'Material Ruang Belajar',
        subtitle: 'Pembangunan Kelas Lantai 2',
        pricePrefix: 'Rp ',
        priceAmount: '100.000',
        priceUnit: '',
        priceDesc: 'Per sak semen & bata hebel',
        estimation: 'Alokasi: Plester dinding, hebel, pasir cor lantai 2',
        isPopular: true,
        deliverables: [
          { bold: 'Semen & Bata Ringan Hebel', text: 'Pengadaan material SNI untuk sekat dinding ruang kelas lantai dua' },
          { bold: 'Penyelesaian Tangga Akses', text: 'Penyelesaian tangga cor semen agar akses antar-lantai aman' },
          { bold: 'Cat Dinding & Plester', text: 'Plesteran rapi dan pengecatan ruang belajar santri' },
          { bold: 'Laporan Belanja Terbuka', text: 'Pencatatan nota material bahan bangunan proyek yang dapat diverifikasi' }
        ],
        ctaText: 'Salurkan Infak Material'
      },
      {
        id: 'infaq-fasilitas-hunian-asrama',
        title: 'Fasilitas Hunian Asrama',
        subtitle: 'Ranjang Susun & Kasur Santri',
        pricePrefix: 'Rp ',
        priceAmount: '350.000',
        priceUnit: '',
        priceDesc: 'Per paket hunian santri',
        estimation: 'Alokasi: Ranjang susun besi kokoh & kasur busa higienis',
        isPopular: false,
        deliverables: [
          { bold: 'Ranjang Susun Kokoh', text: 'Rangka ranjang besi bertingkat aman untuk kamar santri' },
          { bold: 'Kasur Busa Higienis', text: 'Alas tidur bersih untuk istirahat malam santri yang berkualitas' },
          { bold: 'Lemari Loker Santri', text: 'Tempat penyimpanan pakaian dan kitab santri agar tertata rapi' },
          { bold: 'Suasana Kamar Sehat', text: 'Menciptakan lingkungan hunian asrama yang tertib dan nyaman' }
        ],
        ctaText: 'Salurkan Infak Asrama'
      }
    ],
    addonTitle: 'Pilihan Partisipasi Sarana Tambahan',
    addonItems: [
      {
        name: 'Infak Paket Semen SNI',
        desc: 'Pengadaan 1 sak semen standar industri untuk pekerjaan plester',
        price: 'Rp 65.000',
        availability: 'Tersedia untuk proyek kelas & asrama'
      },
      {
        name: 'Infak Modul Belajar & Kitab',
        desc: 'Pengadaan kitab pegangan santri dan modul kejuruan vokasi',
        price: 'Rp 100.000',
        availability: 'Tersedia untuk santri mukim'
      },
      {
        name: 'Infak Lampu Hemat Energi',
        desc: 'Lampu LED penerangan ruang kelas dan lorong asrama',
        price: 'Rp 50.000',
        availability: 'Tersedia untuk kebutuhan kelistrikan'
      }
    ],
    
    deepDiveBadge: 'FUNGSI & KEBUTUHAN',
    deepDiveTitle: 'Mengapa Fasilitas Belajar yang Layak Sangat Penting',
    deepDiveLead: 'Fasilitas yang aman dan layak membantu menciptakan lingkungan belajar dan hunian yang nyaman, menenangkan santri dalam mendalami ilmu agama maupun keterampilan vokasi.',
    deepDiveStory1: 'Kondisi fisik gedung yang aman, pencahayaan cukup, dan ruang tidur sehat memberikan ketenangan bagi para santri yang tinggal jauh dari orang tua untuk fokus belajar dan membina karakter mandiri.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/bahan-konten/masjid%20dan%20kelas/pondasi%20kelas%20lt2.jpeg',
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
      '/bahan-konten/masjid%20dan%20kelas/tangga%20kelas%20ke%20lt2.jpeg',
      '/bahan-konten/asrama%20putra%20baru/pembangunan%20asrama%20ikhwan%20baru.jpeg'
    ],
    deepDiveSubblock1Title: 'Penyelesaian Ruang Kelas Lantai 2',
    deepDiveSubblock1Desc1: 'Pekerjaan konstruksi ruang kelas lantai dua mencakup plester dinding bata hebel, pemasangan jendela ventilasi, dan pengamanan tangga akses santri.',
    deepDiveSubblock1Desc2: 'Ruang kelas ini disiapkan untuk menampung kegiatan pembelajaran teori vokasi teknologi, kurikulum adab, dan kajian keislaman santri mukim.',
    deepDiveSubblock2Title: 'Fasilitas Asrama Hunian Santri',
    deepDiveSubblock2Desc1: 'Gedung asrama santri baru terus disempurnakan agar mampu menyediakan kamar yang sehat dengan sirkulasi udara optimal dan pencahayaan memadai.',
    deepDiveSubblock2Desc2: 'Dukungan infak Anda memastikan tersedianya ranjang susun kokoh dan perlengkapan kamar yang layak bagi para penuntut ilmu.',
    portfolioShowcaseItems: [
      { tag: 'KELAS', name: 'Tangga Akses Lantai 2', category: 'Tahap Struktur', image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/tangga%20kelas%20ke%20lt2.jpeg` },
      { tag: 'ASRAMA', name: 'Gedung Asrama Putra Baru', category: 'Pembangunan Fisik', image: `${S3_BASE}/bahan-konten/asrama%20putra%20baru/pembangunan%20asrama%20ikhwan%20baru.jpeg` },
      { tag: 'KBM', name: 'Suasana Belajar Mandiri', category: 'Aktivitas Santri', image: `${S3_BASE}/gambar-bahan/belajar%20mandiri.jpeg` },
      { tag: 'LORONG', name: 'Lorong Asrama Bata Merah', category: 'Hunian Sehat', image: `${S3_BASE}/media-lp/lorong-asrama-bata-merah.webp` }
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
        title: 'Santri Belajar Mandiri di Selasar',
        category: 'Aktivitas Belajar',
        image: `${S3_BASE}/gambar-bahan/belajar%20mandiri.jpeg`,
        status: 'Kegiatan Aktif',
        caption: 'Santri memanfaatkan waktu luang di selasar asrama untuk mengulang hafalan dan membaca materi.'
      },
      {
        id: 'inf-2',
        title: 'Lorong Gedung Asrama Bata Merah',
        category: 'Fasilitas Hunian',
        image: `${S3_BASE}/media-lp/lorong-asrama-bata-merah.webp`,
        status: 'Fasilitas Berjalan',
        caption: 'Akses tangga dan lorong gedung asrama santri yang telah berdiri dan digunakan.'
      },
      {
        id: 'inf-3',
        title: 'Tangga Akses Ruang Belajar Lantai 2',
        category: 'Progres Pembangunan',
        image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/tangga%20kelas%20ke%20lt2.jpeg`,
        status: 'Dalam Pengerjaan',
        caption: 'Pekerjaan struktur tangga penghubung lantai dasar menuju ruang kelas lantai dua.'
      },
      {
        id: 'inf-4',
        title: 'Pembangunan Gedung Asrama Santri',
        category: 'Konstruksi Hunian',
        image: `${S3_BASE}/bahan-konten/asrama%20putra%20baru/pembangunan%20asrama%20ikhwan%20baru.jpeg`,
        status: 'Dalam Pengerjaan',
        caption: 'Tahapan penyelesaian dinding dan instalasi hunian asrama santri ikhwan baru.'
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
    title: 'Sedekah untuk Kebutuhan Pangan dan Operasional',
    heroSubtitle: 'Dukung pemenuhan kebutuhan pangan harian, gizi santri, dan operasional lingkungan pesantren.',
    categoryBadge: 'SEDEKAH PANGAN & OPERASIONAL',
    heroBgImage: '/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp',
    
    pricingHeading: 'Pilihan Program Sedekah Pangan & Kehidupan',
    pricingSubheading: 'Tampilkan kebutuhan yang sedang dibuka: dukungan makan harian, bahan pangan pokok beras, dan kebutuhan operasional pesantren.',
    packages: [
      {
        id: 'sedekah-makan-santri',
        title: 'Sedekah Porsi Makan Santri',
        subtitle: 'Menu Bergizi Seimbang',
        pricePrefix: 'Rp ',
        priceAmount: '25.000',
        priceUnit: '',
        priceDesc: 'Per porsi makan lengkap',
        estimation: 'Alokasi: Nasi, protein ayam/ikan/telur, sayur kebun, buah',
        isPopular: true,
        deliverables: [
          { bold: 'Menu Gizi Seimbang', text: 'Nasi pulen, lauk berprotein halal, sayuran segar, dan buah pendamping' },
          { bold: 'Olahan Dapur Bersih', text: 'Dimasak setiap hari di dapur umum asrama oleh juru masak pesantren' },
          { bold: 'Stamina Belajar', text: 'Menjaga kebugaran santri saat beraktivitas dari shubuh hingga malam hari' },
          { bold: 'Dokumentasi Harian', text: 'Penyajian makanan dan suasana makan bersama santri yang tertib' }
        ],
        ctaText: 'Sedekah Makan Santri'
      },
      {
        id: 'sedekah-beras-dapur',
        title: 'Sedekah Beras Lumbung Dapur',
        subtitle: 'Ketahanan Beras Asrama',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per karung 10 kg',
        estimation: 'Alokasi: Pasokan beras putih berkualitas untuk dapur umum',
        isPopular: false,
        deliverables: [
          { bold: 'Beras Kualitas Baik', text: 'Pengadaan beras putih higienis dan pulen untuk kebutuhan makan santri' },
          { bold: 'Ketahanan Stok Pangan', text: 'Menjaga persediaan beras di gudang pangan asrama tetap aman' },
          { bold: 'Penyaluran Langsung', text: 'Dihidangkan langsung sebagai makanan pokok harian ratusan santri' }
        ],
        ctaText: 'Sedekah Beras Dapur'
      },
      {
        id: 'sedekah-operasional-asrama',
        title: 'Sedekah Operasional & Utilitas',
        subtitle: 'Kelancaran Harian Pesantren',
        pricePrefix: 'Rp ',
        priceAmount: '300.000',
        priceUnit: '',
        priceDesc: 'Per paket operasional',
        estimation: 'Alokasi: Token listrik, gas dapur, air minum galon sehat',
        isPopular: false,
        deliverables: [
          { bold: 'Listrik & Penerangan', text: 'Mendukung penerangan ruang asrama, kamar mandi, kelas, dan masjid' },
          { bold: 'Gas Memasak Dapur', text: 'Bahan bakar gas elpiji untuk memasak hidangan harian santri' },
          { bold: 'Air Minum Higienis', text: 'Penyediaan air minum galon bersih dan teruji laboratorium' }
        ],
        ctaText: 'Sedekah Operasional'
      }
    ],
    addonTitle: 'Pilihan Partisipasi Pangan Lainnya',
    addonItems: [
      {
        name: 'Sedekah Telur Ayam (1 Rak)',
        desc: 'Pengadaan telur ayam segar untuk pemenuhan protein santri',
        price: 'Rp 60.000',
        availability: 'Tersedia untuk dapur asrama'
      },
      {
        name: 'Sedekah Minyak Goreng & Bumbu',
        desc: 'Minyak goreng kemasan dan bumbu dapur untuk mengolah makanan',
        price: 'Rp 50.000',
        availability: 'Tersedia untuk dapur asrama'
      },
      {
        name: 'Sedekah Buah Segar Santri',
        desc: 'Penyediaan buah pisang, jeruk, atau semangka pendamping makan siang',
        price: 'Rp 75.000',
        availability: 'Tersedia setiap pekan'
      }
    ],
    
    deepDiveBadge: 'PEMENUHAN KEBUTUHAN PANGAN',
    deepDiveTitle: 'Peran Sedekah dalam Menopang Keseharian Santri',
    deepDiveLead: 'Dukungan pangan membantu memenuhi kebutuhan harian santri sehingga lingkungan pesantren dapat menjalankan kegiatan belajar, pembinaan adab, dan ibadah dengan tenang.',
    deepDiveStory1: 'Setiap butir nasi dan lauk sehat yang disajikan menjadi sumber tenaga bagi para santri yang menuntut ilmu di Jonggol. Dukungan sedekah rutin memastikan asupan gizi mereka terpenuhi secara layak dan berkesinambungan.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/bahan-konten/masjid%20dan%20kelas/kandang%20ayam%20petelur.jpeg',
    valueBoxes: [
      {
        icon: 'heart',
        title: 'Gizi Terpenuhi',
        description: 'Menu seimbang dengan protein, sayuran segar, dan karbohidrat yang mencukupi kebutuhan santri.'
      },
      {
        icon: 'utensils',
        title: 'Dapur Mandiri',
        description: 'Dikelola langsung oleh tim dapur asrama dengan standar kebersihan yang senantiasa dijaga.'
      },
      {
        icon: 'sun',
        title: 'Kemandirian Kebun',
        description: 'Dipadukan dengan hasil panen sayur kangkung dan kebun hortikultura pesantren.'
      },
      {
        icon: 'file-text',
        title: 'Pencatatan Rapi',
        description: 'Laporan belanja logistik dapur dicatat dan dipertanggungjawabkan secara transparan.'
      }
    ],
    deepDiveTwinImages: [
      '/bahan-konten/masjid%20dan%20kelas/Sayuran%20Kangkung.jpeg',
      '/bahan-konten/masjid%20dan%20kelas/lahan%20kebun.jpeg'
    ],
    deepDiveSubblock1Title: 'Hasil Kebun untuk Konsumsi Asrama',
    deepDiveSubblock1Desc1: 'Di samping pengadaan bahan pangan dari pasar, pesantren mengembangkan kebun sayuran kangkung dan hortikultura yang hasilnya dimanfaatkan langsung untuk melengkapi menu dapur santri.',
    deepDiveSubblock1Desc2: 'Inisiatif ini melatih santri memahami proses bercocok tanam sekaligus memperkuat ketahanan pangan mandiri lingkungan pesantren.',
    deepDiveSubblock2Title: 'Kebersamaan & Adab Makan Santri',
    deepDiveSubblock2Desc1: 'Waktu makan bersama di selasar asrama dijalankan dengan membiasakan adab Islam: membaca basmalah, makan dengan tangan kanan, dan menjaga kebersihan tempat.',
    deepDiveSubblock2Desc2: 'Keceriaan santri saat menyantap hidangan sehat menjadi cerminan nyata dari amanah sedekah yang Anda titipkan.',
    portfolioShowcaseItems: [
      { tag: 'KEBUN', name: 'Panen Sayur Kangkung', category: 'Pangan Mandiri', image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/Sayuran%20Kangkung.jpeg` },
      { tag: 'LAHAN', name: 'Lahan Kebun Pertanian', category: 'Ketahanan Pangan', image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/lahan%20kebun.jpeg` },
      { tag: 'TERNAK', name: 'Rintisan Unit Peternakan', category: 'Kemandirian Usaha', image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/kandang%20ayam%20petelur.jpeg` },
      { tag: 'AGRO', name: 'Greenhouse Melon', category: 'Pertanian Presisi', image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp` }
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
        title: 'Panen Sayuran Kangkung Asrama',
        category: 'Hasil Kebun',
        image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/Sayuran%20Kangkung.jpeg`,
        status: 'Panen Rutin',
        caption: 'Hasil panen sayur kangkung segar dari kebun pesantren untuk menu dapur harian santri.'
      },
      {
        id: 'sed-2',
        title: 'Hamparan Lahan Kebun Pertanian',
        category: 'Ketahanan Pangan',
        image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/lahan%20kebun.jpeg`,
        status: 'Area Produktif',
        caption: 'Lahan kebun pertanian terbuka yang ditanami aneka sayuran penunjang kebutuhan asrama.'
      },
      {
        id: 'sed-3',
        title: 'Rintisan Kandang Ayam Petelur',
        category: 'Unit Ternak Mandiri',
        image: `${S3_BASE}/bahan-konten/masjid%20dan%20kelas/kandang%20ayam%20petelur.jpeg`,
        status: 'Unit Rintisan',
        caption: 'Fasilitas rintisan peternakan ayam petelur untuk mendukung pasokan protein mandiri.'
      },
      {
        id: 'sed-4',
        title: 'Greenhouse Hortikultura Presisi',
        category: 'Pertanian Modern',
        image: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp`,
        status: 'Beroperasi',
        caption: 'Budidaya melon hidroponik presisi sebagai teaching factory kejuruan santri.'
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
    title: 'Zakat yang Disalurkan Sesuai Ketentuan Syariah',
    heroSubtitle: 'Salurkan zakat melalui program yang memperhatikan ketentuan syariat dan kelayakan penerima manfaat 8 asnaf.',
    categoryBadge: 'ZAKAT MAAL & FITRAH',
    heroBgImage: '/bahan-konten/kegiatan-dan-prestasi-santri/tiga-santri-juara-mtq-jonggol-piala.webp',
    
    pricingHeading: 'Layanan Penyaluran Zakat Terverifikasi',
    pricingSubheading: 'Tunaikan kewajiban zakat 2,5% secara amanah, tepat hisab, dan disalurkan kepada asnaf yang berhak menerima.',
    packages: [
      {
        id: 'zakat-penghasilan-profesi',
        title: 'Zakat Penghasilan / Profesi',
        subtitle: 'Karyawan, Profesional & Praktisi',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari penghasilan bersih bulanan',
        estimation: 'Nisab: Setara 524 kg beras (~Rp 7.500.000/bln)',
        isPopular: true,
        deliverables: [
          { bold: 'Kadar Zakat 2,5%', text: 'Kewajiban zakat dari perolehan penghasilan halal bulanan' },
          { bold: 'Asnaf Fi Sabilillah', text: 'Bantuan biaya pendidikan & pembinaan santri dhuafa berprestasi' },
          { bold: 'Tepat Waktu Penunaian', text: 'Ditunaikan rutin setiap bulan saat menerima gaji atau penghasilan' },
          { bold: 'Tanda Terima Resmi', text: 'Mendapatkan bukti konfirmasi setor zakat resmi dari yayasan' }
        ],
        ctaText: 'Tunaikan Zakat Profesi'
      },
      {
        id: 'zakat-maal-harta',
        title: 'Zakat Maal (Tabungan & Emas)',
        subtitle: 'Simpanan Kas, Deposito & Logam Mulia',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari total saldo mengendap setelah haul 1 tahun',
        estimation: 'Nisab: 85 Gram Emas Murni',
        isPopular: false,
        deliverables: [
          { bold: 'Kadar Zakat 2,5%', text: 'Dihitung dari total nilai saldo simpanan setelah mencapai haul 1 tahun' },
          { bold: 'Standar Nisab Emas', text: 'Mencapai batas nisab setara 85 gram emas murni' },
          { bold: 'Penyaluran Mustahik', text: 'Diberikan kepada fakir miskin dan santri dhuafa yang telah diverifikasi' },
          { bold: 'Akad & Doa Zakat', text: 'Ijab qobul penunaian zakat dan doa keberkahan harta' }
        ],
        ctaText: 'Tunaikan Zakat Maal'
      },
      {
        id: 'zakat-fitrah-fidyah',
        title: 'Zakat Fitrah & Fidyah',
        subtitle: 'Kewajiban Ramadhan & Santunan Pangan',
        pricePrefix: 'Rp ',
        priceAmount: '45.000',
        priceUnit: '',
        priceDesc: 'Per jiwa (setara 3,5 liter beras)',
        estimation: 'Penyaluran menjelang Idul Fitri bagi fakir miskin sekitar',
        isPopular: false,
        deliverables: [
          { bold: 'Beras Layak Konsumsi', text: 'Dikonversikan dalam bentuk beras berkualitas baik untuk keluarga dhuafa' },
          { bold: 'Warga Sekitar Jonggol', text: 'Menjangkau keluarga mustahik pra-sejahtera di desa sekitar pesantren' },
          { bold: 'Penyaluran Tepat Waktu', text: 'Disalurkan sebelum pelaksanaan shalat Idul Fitri sesuai sunnah' }
        ],
        ctaText: 'Tunaikan Zakat Fitrah'
      }
    ],
    addonTitle: 'Layanan Konsultasi Zakat',
    addonItems: [
      {
        name: 'Simulasi Hisab Nisab Zakat',
        desc: 'Konsultasi gratis penghitungan zakat maal, tabungan, dan emas',
        price: 'Konsultasi Layanan',
        availability: 'Via WhatsApp Resmi'
      },
      {
        name: 'Fidyah Puasa',
        desc: 'Penyaluran makanan siap santap bagi kaum fakir miskin (per hari)',
        price: 'Rp 30.000',
        availability: 'Tersedia sepanjang tahun'
      }
    ],
    
    deepDiveBadge: 'PRINSIP SYARIAH & ASNAF',
    deepDiveTitle: 'Komitmen Penyaluran Zakat yang Tepat Sasaran',
    deepDiveLead: 'Zakat dikelola dengan memperhatikan ketentuan syariah, ketepatan sasaran, dan pencatatan penyaluran agar amanah para muzakki dapat dipertanggungjawabkan.',
    deepDiveStory1: 'Verifikasi kelayakan dilakukan secara cermat agar dana zakat benar-benar diterima oleh asnaf yang berhak, terutama santri penuntut ilmu agama dan vokasi yang memenuhi kriteria fi sabilillah, serta warga prasejahtera di sekitar pesantren.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/bahan-konten/kegiatan-dan-prestasi-santri/salman-aufa-juara-2-tahfidz-10-juz.webp',
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
      '/bahan-konten/kegiatan-dan-prestasi-santri/foto-ustadz-bersama-duta-santri.webp',
      '/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-syamil-ghazwan-juara-1-tahfidz-5-juz.webp'
    ],
    deepDiveSubblock1Title: 'Beasiswa Pendidikan Santri Fi Sabilillah',
    deepDiveSubblock1Desc1: 'Zakat diarahkan untuk membebaskan biaya pendidikan, penyediaan kitab kajian, dan pemenuhan kebutuhan dasar santri dhuafa berprestasi.',
    deepDiveSubblock1Desc2: 'Langkah ini membuka peluang bagi anak-anak berpotensi dari berbagai daerah untuk menuntut ilmu agama dan kejuruan secara utuh.',
    deepDiveSubblock2Title: 'Pemberdayaan Masyarakat Sekitar',
    deepDiveSubblock2Desc1: 'Di samping beasiswa santri, penyaluran zakat menjangkau warga dhuafa sekitar Sukasirna Jonggol melalui program bantuan pangan dan santunan.',
    deepDiveSubblock2Desc2: 'Kehadiran pesantren menjadi bagian yang menguatkan kerukunan dan kepedulian sosial dengan lingkungan sekitar.',
    portfolioShowcaseItems: [
      { tag: 'BEASISWA', name: 'Pembinaan Duta Santri', category: 'Pendidikan', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/foto-ustadz-bersama-duta-santri.webp` },
      { tag: 'TAHFIDZ', name: 'Santri Juara Musabaqah', category: 'Prestasi', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-syamil-ghazwan-juara-1-tahfidz-5-juz.webp` },
      { tag: 'KBM', name: 'Santri Tekun Menuntut Ilmu', category: 'Pembinaan Adab', image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-mencatat-dan-berdiskusi.webp` },
      { tag: 'KAJIAN', name: 'Halaqah Quran Intensif', category: 'Fi Sabilillah', image: `${S3_BASE}/bahan-konten/halaqah-santri-melingkar.webp` }
    ],
    guarantees: [
      'Penyaluran berpedoman teguh pada kaidah syariah 8 asnaf',
      'Verifikasi faktual kriteria penerima manfaat',
      'Pemisahan rekening zakat dari pos dana lainnya',
      'Tanda terima bukti setor zakat resmi dari yayasan',
      'Pencatatan mutasi penyaluran yang dapat diverifikasi'
    ],
    
    galleryBadge: 'DOKUMENTASI PENYALURAN',
    galleryTitle: 'Dokumentasi Santri Penerima Manfaat',
    gallerySubtitle: 'Potret pembinaan dan semangat santri penerima beasiswa pendidikan di Jonggol.',
    galleryItems: [
      {
        id: 'zak-1',
        title: 'Pembinaan Santri Penerima Manfaat',
        category: 'Beasiswa Pendidikan',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/foto-ustadz-bersama-duta-santri.webp`,
        status: 'Program Berjalan',
        caption: 'Ustadz pembina bersama santri penerima beasiswa pendidikan dan tahfidz Quran.'
      },
      {
        id: 'zak-2',
        title: 'Santri Menghafal & Mengkaji Al-Quran',
        category: 'Fi Sabilillah',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-syamil-ghazwan-juara-1-tahfidz-5-juz.webp`,
        status: 'Prestasi Santri',
        caption: 'Santri binaan menunjukkan kesungguhan dalam menuntaskan hafalan Quran dan prestasi keagamaan.'
      },
      {
        id: 'zak-3',
        title: 'Santri Tekun Mencatat Pelajaran',
        category: 'Aktivitas Belajar',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-mencatat-dan-berdiskusi.webp`,
        status: 'KBM Aktif',
        caption: 'Suasana belajar mandiri santri dalam mendalami kurikulum keilmuan dan adab.'
      },
      {
        id: 'zak-4',
        title: 'Santriwati Fokus Menyimak Kajian',
        category: 'Pendidikan Karakter',
        image: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-bertiga-mencatat-di-aula.webp`,
        status: 'KBM Aktif',
        caption: 'Pembinaan santriwati mukim dalam suasana belajar yang tertib dan bersahaja.'
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
