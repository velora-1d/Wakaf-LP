// src/data/programs.ts
// Data Terpusat Program ZISWAF Global Village Fund (GVF) Presisi 100% Mengadopsi ISAVO

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

export const programsData: Record<string, ProgramData> = {
  wakaf: {
    slug: 'wakaf',
    title: 'Wakaf Produktif & Lahan',
    heroSubtitle: 'Investasi Abadi Membangun Masjid Khairu Ummah & SMK Skill Village di Kawasan Terpadu Jonggol Bogor.',
    categoryBadge: 'WAKAF PRODUKTIF',
    heroBgImage: '/gambar design/belakang masjid.jpg',
    
    pricingHeading: 'Pilihan Paket Wakaf Produktif',
    pricingSubheading: 'Salurkan wakaf produktif tanah dan infrastruktur abadi untuk kemaslahatan kawasan terpadu Jonggol.',
    packages: [
      {
        id: 'wakaf-pembebasan-lahan',
        title: 'Wakaf Pembebasan Lahan',
        subtitle: 'Kawasan Terpadu Jonggol',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per meter persegi (m²)',
        estimation: 'Alokasi: Pembebasan tanah 3 hektare',
        isPopular: false,
        deliverables: [
          { bold: 'Pembebasan Lahan ±3 Ha', text: 'Tanah kawasan terpadu di Desa Sukasirna Jonggol' },
          { bold: 'Sertifikat Resmi KUA & BWI', text: 'Disertifikatkan secara resmi sebagai Tanah Wakaf di KUA & BWI' },
          { bold: 'Tapak Bangunan Kawasan', text: 'Menjadi tapak bangunan masjid, sekolah vokasi, dan greenhouse santri' },
          { bold: 'Pahala Abadi Mengalir', text: 'Pahala jariyah abadi yang terus mengalir melintasi generasi' }
        ],
        ctaText: 'Tunaikan Wakaf Lahan'
      },
      {
        id: 'wakaf-masjid-khairu-ummah',
        title: 'Wakaf Masjid Khairu Ummah',
        subtitle: 'Pusat Ibadah & Pembelajaran',
        pricePrefix: 'Rp ',
        priceAmount: '300.000',
        priceUnit: '',
        priceDesc: 'Per paket pembangunan masjid',
        estimation: 'Alokasi: Konstruksi green building masjid',
        isPopular: true,
        deliverables: [
          { bold: 'Pembangunan Dua Lantai', text: 'Pembangunan masjid green building ramah lingkungan dua lantai' },
          { bold: 'Kapasitas 500+ Jamaah', text: 'Menampung shalat berjamaah 500+ santri dan jamaah sekitar asrama' },
          { bold: 'Mezanin Halaqah Quran', text: 'Mezanin lantai dua untuk halaqah tahfidz Quran santri intensif' },
          { bold: 'Ventilasi Tropis Alami', text: 'Pencahayaan alami & sirkulasi udara sejuk ramah lingkungan' },
          { bold: 'Laporan Progres Mingguan', text: 'Laporan foto & video perkembangan fisik mingguan transparan' },
          { bold: 'Akta Ikrar Wakaf Resmi', text: 'Sertifikat Ikrar Wakaf resmi dan pencatatan nama pewakif' }
        ],
        ctaText: 'Tunaikan Wakaf Masjid'
      },
      {
        id: 'wakaf-agro-technopark',
        title: 'Wakaf Agro-Technopark',
        subtitle: 'Kemandirian Ekonomi Pesantren',
        pricePrefix: 'Rp ',
        priceAmount: '500.000',
        priceUnit: '',
        priceDesc: 'Per unit sarana kemandirian',
        estimation: 'Alokasi: Greenhouse & panel surya mandiri',
        isPopular: false,
        deliverables: [
          { bold: 'Greenhouse Hortikultura', text: 'Fasilitas greenhouse hortikultura dan pertanian presisi santri' },
          { bold: 'Pembangkit Panel Surya', text: 'Instalasi solar cell panel surya pembangkit listrik kawasan' },
          { bold: 'Kemandirian Pangan Asrama', text: 'Hasil panen menopang pangan harian asrama dan kemandirian santri' }
        ],
        ctaText: 'Tunaikan Wakaf Produktif'
      }
    ],
    addonTitle: 'Pilihan Saluran Wakaf Tambahan',
    addonItems: [
      {
        name: 'Wakaf Uang Bebas',
        desc: 'Wakaf uang tunai sukarela dialokasikan ke kebutuhan mendesak kawasan',
        price: 'Bebas',
        availability: 'Tersedia via Transfer / QRIS'
      },
      {
        name: 'Wakaf Pohon Produktif',
        desc: 'Bibit buah & tanaman pelindung kawasan agroteknopark (per pohon)',
        price: 'Rp 100.000',
        availability: 'Tersedia untuk semua paket'
      },
      {
        name: 'Wakaf Sumur Bor & Filtrasi',
        desc: 'Penyediaan instalasi air bersih mandiri asrama dan masjid',
        price: 'Rp 750.000',
        availability: 'Tersedia untuk semua paket'
      },
      {
        name: 'Wakaf Panel Surya Modul',
        desc: '1 unit modul panel surya energi bersih kawasan pesantren',
        price: 'Rp 1.500.000',
        availability: 'Tersedia untuk semua paket'
      },
      {
        name: 'Infaq Unit Sanitasi',
        desc: 'Kran wudhu kuningan & penampung air bersih higienis',
        price: 'Rp 500.000',
        availability: 'Tersedia untuk program sanitasi'
      }
    ],
    
    deepDiveBadge: 'URGENSI & DOKUMENTASI',
    deepDiveTitle: 'Wakaf Produktif Menuju Kemandirian Umat',
    deepDiveLead: 'Global Village Fund mengelola wakaf produktif dengan pendekatan ekosistem terpadu di kawasan seluas ±3 hektare, Desa Sukasirna, Jonggol. Wakaf diarahkan untuk aset abadi yang memberikan manfaat sosial dan ekonomi berkelanjutan bagi santri dan masyarakat.',
    deepDiveStory1: 'Dari pembebasan lahan pesantren, pembangunan Masjid Khairu Ummah Sugro, hingga pendirian Agro-Technopark, setiap jengkal tanah wakaf dikelola profesional sesuai tuntunan syariat dan ketentuan perundang-undangan Badan Wakaf Indonesia (BWI).',
    deepDiveStory2: '',
    deepDiveBannerImage: '/gambar design/interior masjid.jpg',
    valueBoxes: [
      {
        icon: 'infinity',
        title: 'Legalitas AIW Resmi',
        description: 'Akta Ikrar Wakaf (AIW) diterbitkan resmi dan tercatat di KUA serta Badan Wakaf Indonesia (BWI).'
      },
      {
        icon: 'shield-check',
        title: 'Prinsip Wakaf Abadi',
        description: 'Aset pokok wakaf dijaga keutuhannya, tidak dapat diperjualbelikan, dihibahkan, maupun diwariskan.'
      },
      {
        icon: 'file-text',
        title: 'Dampak Berkelanjutan',
        description: 'Hasil produktif lahan menopang kebutuhan pangan asrama santri dan kemandirian ekonomi pesantren.'
      },
      {
        icon: 'eye',
        title: 'Pahala Mengalir Abadi',
        description: 'Amal jariyah yang pahalanya terus mengalir melintasi zaman selama tanah dimanfaatkan umat.'
      }
    ],
    deepDiveTwinImages: [
      '/gambar design/skywalk learning room.jpg',
      '/gambar design/belakang masjid.jpg'
    ],
    deepDiveSubblock1Title: 'Integrasi Pesantren & Agro-Technopark',
    deepDiveSubblock1Desc1: 'Masjid Khairu Ummah Sugro dirancang dengan arsitektur tropis ramah lingkungan yang memanfaatkan pencahayaan alami dan ventilasi silang, mengurangi konsumsi listrik dan menghadirkan suasana khusyuk bagi para jamaah.',
    deepDiveSubblock1Desc2: 'Dilengkapi area mezzanine dua lantai untuk menampung kegiatan ibadah berjamaah, halaqah Quran, serta ruang belajar santri yang terintegrasi dengan keasrian alam sekitar Sukasirna Jonggol.',
    deepDiveSubblock2Title: 'Dokumentasi Kawasan Wakaf Jonggol',
    deepDiveSubblock2Desc1: 'Dokumentasi progres pembangunan riil Masjid Khairu Ummah Sugro di Sukasirna Jonggol — dari pemancangan tiang, pengecoran lantai, pemasangan dinding bata ringan, hingga instalasi sanitasi.',
    deepDiveSubblock2Desc2: 'Setiap kemajuan di lapangan adalah buah dari gotong royong dan ketulusan para muhsinin yang menyalurkan infaq terbaiknya.',
    portfolioShowcaseItems: [
      { tag: 'ARSITEKTUR', name: 'Masjid Khairu Ummah Sugro', category: 'Arsitektur', image: '/gambar design/interior masjid.jpg' },
      { tag: 'ARSITEKTUR', name: 'Kawasan Masterplan 3 Ha', category: 'Arsitektur', image: '/gambar design/skywalk learning room.jpg' },
      { tag: 'ARSITEKTUR', name: 'Greenhouse & Pertanian', category: 'Arsitektur', image: '/gambar design/tempat wudu.jpg' },
      { tag: 'ARSITEKTUR', name: 'Instalasi Panel Surya Energi', category: 'Arsitektur', image: '/gambar design/panel surya.jpg' }
    ],
    guarantees: [
      'Material bersertifikasi standar SNI',
      'Laporan progres fisik berkala',
      'Pengawasan kualitas & mutu bangunan',
      'Akad infaq transparan & terpercaya',
      'Kwitansi & tanda terima resmi GVF',
      'Dokumentasi foto penyaluran di lokasi',
      'RAB terperinci dan terbuka',
      'Kunjungan langsung ke lokasi Jonggol'
    ],
    
    galleryBadge: 'DOKUMENTASI LAPANGAN & PROGRES',
    galleryTitle: 'Bukti Nyata Pembangunan & Masterplan Lapangan',
    gallerySubtitle: 'Inspeksi langsung hamparan lahan abadi, unit greenhouse aktif, dan sarana ibadah di Sukasirna, Jonggol, Kabupaten Bogor.',
    galleryItems: [
      {
        id: 'gal-1',
        title: 'Hamparan Lahan Wakaf Abadi ±3 Hektare',
        category: 'Pembebasan Lahan',
        image: '/gambar-bahan/lahan donasi.jpg',
        status: 'Aset Fisik Riil',
        caption: 'Batas lahan pengembangan kampus terpadu SMK Skill Village dan kawasan agro-technopark di Sukasirna Jonggol.'
      },
      {
        id: 'gal-2',
        title: 'Pelataran Megah Masjid Khairu Ummah',
        category: 'Poros Ibadah',
        image: '/gambar-bahan/pelataran mesjid.jpeg',
        status: 'Fasilitas Aktif',
        caption: 'Ruang salat dan pelataran luas penampung ibadah harian santri dan masyarakat sekitar Jonggol.'
      },
      {
        id: 'gal-3',
        title: 'Unit Green House Pertanian Presisi',
        category: 'Wakaf Produktif Agro',
        image: '/gambar-bahan/gh greenhouse.jpeg',
        status: 'Beroperasi Aktif',
        caption: 'Laboratorium pertanian presisi modern penunjang kemandirian pangan dan teaching factory santri.'
      },
      {
        id: 'gal-4',
        title: 'Suasana Belajar Terapan di Kelas',
        category: 'SMK Skill Village',
        image: '/gambar-bahan/belajar kelas.jpeg',
        status: 'KBM Aktif',
        caption: 'Santri vokasi mendalami kurikulum kejuruan teknologi dan pembinaan karakter berbasis adab FAST.'
      },
      {
        id: 'gal-5',
        title: 'Sanctuary Utama & Interior Masjid',
        category: 'Interior Rumah Ibadah',
        image: '/gambar design/interior masjid.jpg',
        status: 'Finishing & Desain Rinci',
        caption: 'Ruang salat utama berkapasitas 500 jamaah dengan bukaan skylight vertikal yang sejuk.'
      },
      {
        id: 'gal-6',
        title: 'Learning Studio & Workshop Vokasi',
        category: 'SMK Skill Village',
        image: '/gambar design/learning studio & workshop.jpg',
        status: 'Tahap Struktur',
        caption: 'Gedung workshop kolaboratif berkonsep arsitektur tropis ramah lingkungan.'
      }
    ],
    
    workflowHeading: 'Alur 4 Langkah Transparan Menunaikan Wakaf',
    workflowSteps: [
      {
        number: '01',
        title: 'Pilih Paket & Akad Niat',
        description: 'Tentukan program dan nominal wakaf yang dikehendaki. Bacakan ijab qobul secara tulus untuk ridha Allah SWT.'
      },
      {
        number: '02',
        title: 'Transfer Melalui Kanal Resmi',
        description: 'Selesaikan transaksi melalui QRIS instan, Virtual Account, atau transfer langsung ke rekening yayasan terverifikasi.'
      },
      {
        number: '03',
        title: 'Konfirmasi Otomatis & Terbit AIW',
        description: 'Sistem nazhir memverifikasi donasi Anda dalam hitungan detik dan menerbitkan Akta Ikrar Wakaf (AIW) digital.'
      },
      {
        number: '04',
        title: 'Laporan Perkembangan Berkala',
        description: 'Dapatkan laporan progres fisik, foto lapangan, dan dokumentasi santri penerima manfaat langsung di ponsel Anda.'
      }
    ],
    
    leadershipBadge: 'DEWAN PENGAWAS & PENGURUS',
    leadershipTitle: 'Amanah Dikelola oleh Nazhir Profesional & Dewan Syariah',
    leadershipQuote: '"Setiap rupiah wakaf yang dititipkan adalah mandat ukhrawi. Kami memastikan setiap jengkal tanah dan bata yang terpasang senantiasa menaati ketentuan hukum syar\'i dan hukum positif negara."',
    leaders: [
      {
        name: 'Ir. H. M. Hakim, M.M.',
        role: 'Ketua Yayasan & Nazhir Utama GVF',
        credentials: 'Sertifikasi Nazhir BWI • Praktisi Manajemen & Pengembangan Wilayah',
        image: '/media-lp/pengurus-1.jpg',
        quote: 'Memastikan pengelolaan aset wakaf produktif tumbuh berkelanjutan dan membawa berkah sosial abadi.'
      },
      {
        name: 'Dr. H. Ahmad Fauzi, Lc., M.A.',
        role: 'Ketua Dewan Pengawas Syariah (DPS)',
        credentials: 'Alumni Universitas Al-Azhar Kairo • Dewan Pakar Fiqih Muamalah DSN-MUI',
        image: '/media-lp/pengurus-2.jpg',
        quote: 'Mengawasi ketat keabsahan akad, pemisahan dana pokok, dan ketepatan penyaluran sesuai maqashid syariah.'
      },
      {
        name: 'H. Bambang Sugiarto, S.T.',
        role: 'Direktur Perencanaan Fisik & Infrastruktur',
        credentials: 'Arsitek Senior • Spesialis Perancangan Kawasan Berbasis Alam',
        image: '/media-lp/pengurus-3.jpg',
        quote: 'Menjamin eksekusi pembangunan tepat mutu, tepat waktu, dan mengedepankan efisiensi biaya.'
      }
    ],
    
    legalitasBadge: 'LEGALITAS & REKENING RESMI',
    legalitasTitle: 'Legalitas Terdaftar Resmi & Transparansi Rekening',
    legalities: [
      {
        institution: 'Badan Wakaf Indonesia (BWI)',
        regNumber: 'No. Reg: 3.3.00281/BWI/NZ/2026',
        authority: 'Kewenangan Nazhir Pengelola Wakaf Uang & Benda Tak Bergerak',
        description: 'Terdaftar secara sah dan diawasi oleh regulator resmi wakaf Republik Indonesia.'
      },
      {
        institution: 'Kementerian Hukum & HAM RI',
        regNumber: 'AHU-0014285.AH.01.04.Tahun 2026',
        authority: 'Pengesahan Akta Pendirian Yayasan Filantropi',
        description: 'Badan hukum yayasan resmi yang diakui negara dengan hak dan kewajiban hukum penuh.'
      },
      {
        institution: 'Kementerian Agama Republik Indonesia',
        regNumber: 'Rekomendasi Kemenag No. B-412/Kk.01/BA.03.2/2026',
        authority: 'Izin Operasional Pengelolaan Sarana Pendidikan Keagamaan',
        description: 'Mitra sinergi pembinaan keagamaan dan kurikulum kepesantrenan holistik.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI)',
        accountNumber: '7238890012',
        accountHolder: 'Yayasan Global Village Fund Wakaf',
        code: '451'
      },
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1330024589910',
        accountHolder: 'Yayasan Global Village Fund Wakaf',
        code: '008'
      },
      {
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '8691522031',
        accountHolder: 'Yayasan Global Village Fund',
        code: '014'
      }
    ],
    
    faqBadge: 'FAQ',
    faqTitle: 'Pertanyaan Seputar Wakaf Produktif',
    faqs: [
      {
        question: 'Bagaimana hukum wakaf uang untuk pembebasan lahan?',
        answer: 'Wakaf uang untuk pembebasan tanah diperbolehkan berdasarkan Fatwa MUI tahun 2002 dan UU No. 41 Tahun 2004 tentang Wakaf. Dana yang terhimpun langsung dikonversikan menjadi aset tanah abadi yang disertifikatkan atas nama wakaf dan diawasi oleh Badan Wakaf Indonesia (BWI).'
      },
      {
        question: 'Kapan pewakif menerima Sertifikat Ikrar Wakaf resmi?',
        answer: 'Pewakif akan menerima sertifikat konfirmasi wakaf digital segera setelah donasi terverifikasi, dan Akta Ikrar Wakaf (AIW) resmi yang diterbitkan KUA setelah proses legalitas tuntas.'
      },
      {
        question: 'Apakah hasil panen Agro-Technopark boleh dimanfaatkan untuk santri?',
        answer: 'Ya, hasil produktif dari unit greenhouse dan pertanian presisi dialokasikan langsung untuk pemenuhan gizi santri asrama serta surplusnya dijual untuk biaya operasional pendidikan dhuafa.'
      },
      {
        question: 'Apakah tanah wakaf bisa dijual atau diwariskan di kemudian hari?',
        answer: 'Secara syariat dan hukum positif UU Wakaf No. 41/2004, tanah wakaf yang telah diikrarkan bersifat abadi dan mengikat, tidak dapat diperjualbelikan, dihibahkan, maupun diwariskan.'
      },
      {
        question: 'Bagaimana cara muhsinin berkunjung langsung ke lokasi Jonggol?',
        answer: 'Muhsinin dan donatur dapat menjadwalkan kunjungan silaturahmi langsung ke lokasi kawasan di Desa Sukasirna Jonggol dengan menghubungi layanan donatur via WhatsApp 0878-6599-4786.'
      }
    ],
    ctaBannerHeading: 'Konsultasi Niat & Akad Wakaf Bersama Dewan Syariah',
    ctaBannerText: 'Bicaralah dengan tim konsultan wakaf kami untuk konsultasi penghitungan luas lahan, wakaf keluarga, atau program wakaf korporat secara privat.'
  },

  zakat: {
    slug: 'zakat',
    title: 'Zakat Maal & Profesi',
    heroSubtitle: 'Tunaikan Kewajiban Zakat 2,5% untuk Beasiswa Fi Sabilillah & Kemandirian Santri Dhuafa di Jonggol.',
    categoryBadge: 'ZAKAT MAAL',
    heroBgImage: '/gambar design/interior masjid.jpg',
    
    pricingHeading: 'Pilihan Saluran Zakat Maal & Profesi',
    pricingSubheading: 'Tunaikan kewajiban zakat 2,5% secara amanah, tepat hisab, dan tepat sasaran. Disalurkan langsung untuk 8 asnaf, terutama beasiswa fi sabilillah dan kemandirian santri dhuafa di Sukasirna Jonggol.',
    packages: [
      {
        id: 'zakat-penghasilan',
        title: 'Zakat Penghasilan',
        subtitle: 'Zakat Profesi Karyawan & Profesional',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari penghasilan bersih bulanan',
        estimation: 'Kadar Zakat: 2,5% bulanan',
        isPopular: false,
        deliverables: [
          { bold: 'Kadar Zakat 2,5%', text: 'Dihitung dari penghasilan bersih bulanan' },
          { bold: 'Nisab Setara 524 kg Beras', text: 'Standar nisab bulanan setara ~Rp 7.500.000/bln' },
          { bold: 'Waktu Penunaian Fleksibel', text: 'Setiap menerima gaji atau akumulasi tahunan' },
          { bold: 'Penyaluran Tepat Sasaran', text: 'Beasiswa biaya belajar & hidup santri dhuafa' },
          { bold: 'Kwitansi BSZ Resmi', text: 'Mendapatkan Bukti Setor Zakat resmi pengurang pajak' },
          { bold: 'Pengawasan Syariah', text: 'Dikelola di bawah panduan Dewan Pengawas Syariah' }
        ],
        ctaText: 'Tunaikan Zakat Profesi'
      },
      {
        id: 'zakat-maal-harta',
        title: 'Zakat Maal (Harta)',
        subtitle: 'Simpanan Kas, Tabungan & Emas',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari total saldo akhir haul',
        estimation: 'Nisab: 85 Gram Emas Murni',
        isPopular: true,
        deliverables: [
          { bold: 'Kadar Zakat 2,5%', text: 'Dari total saldo akhir setelah mencapai haul 1 tahun' },
          { bold: 'Nisab 85 Gram Emas', text: 'Setara nilai simpanan emas murni (~Rp 115–125 Juta)' },
          { bold: 'Syarat Haul 1 Tahun', text: 'Harta tersimpan mengendap selama 1 tahun penuh' },
          { bold: 'Penyaluran Fi Sabilillah', text: 'Fasilitas santri fi sabilillah & pemberdayaan asnaf' },
          { bold: 'Akad Zakat Syar\'i', text: 'Ijab qobul dan doa pensucian harta dari ustadz pembina' },
          { bold: 'Laporan Audit Transparan', text: 'Rekapitulasi penyaluran dana zakat terverifikasi' }
        ],
        ctaText: 'Tunaikan Zakat Maal'
      },
      {
        id: 'zakat-perniagaan',
        title: 'Zakat Perniagaan',
        subtitle: 'Usaha Dagang & Perusahaan',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '',
        priceDesc: 'Dari nilai aset lancar bersih usaha',
        estimation: 'Formula: Aset Lancar - Hutang Jangka Pendek',
        isPopular: false,
        deliverables: [
          { bold: 'Kadar Zakat 2,5%', text: 'Dari nilai aset lancar bersih setelah tutup buku' },
          { bold: 'Formula Hisab Bisnis', text: '(Aset Lancar + Piutang) - Hutang Jangka Pendek' },
          { bold: 'Nisab & Haul Tahunan', text: 'Setara 85 gram emas setelah tutup buku tahunan' },
          { bold: 'Penyaluran Produktif', text: 'Pembinaan santri wirausaha & agroteknopreneur' },
          { bold: 'Kemitraan Korporat', text: 'Kerjasama CSR dan pemberdayaan ekonomi pesantren' },
          { bold: 'Legalitas Lembaga Resmi', text: 'Tanda terima resmi lembaga amil berizin sah' }
        ],
        ctaText: 'Tunaikan Zakat Bisnis'
      }
    ],
    // Addon table sengaja ditiadakan sesuai acuan Pen.dev (program-zakat.html)
    addonItems: undefined,
    
    deepDiveBadge: 'URGENSI & DOKUMENTASI',
    deepDiveTitle: 'Zakat Maal & Beasiswa Fi Sabilillah',
    deepDiveLead: 'Program Zakat Global Village Fund difokuskan untuk memenuhi hak 8 golongan asnaf sesuai syariat Islam, dengan prioritas utama beasiswa pendidikan vokasi penuh bagi santri yatim, dhuafa, dan fi sabilillah di Pesantren Jonggol. Zakat yang Anda tunaikan menjadi jembatan kemandirian generasi muda.',
    deepDiveStory1: 'Dari pemilihan kurikulum kejuruan agrotek hingga sarana asrama, setiap dana zakat disalurkan untuk menciptakan dampak berkelanjutan, bukan sekadar santunan konsumtif.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/gambar design/learning studio & workshop.jpg',
    valueBoxes: [
      {
        icon: 'shield-check',
        title: 'Tepat Sasaran 8 Asnaf',
        description: 'Disalurkan khusus bagi asnaf syariah yang berhak dengan prioritas fakir, miskin, dan fi sabilillah.'
      },
      {
        icon: 'infinity',
        title: 'Pengawasan Syariah',
        description: 'Tata kelola hisab dan penyaluran disupervisi langsung oleh Dewan Pengawas Syariah bersertifikasi.'
      },
      {
        icon: 'file-text',
        title: 'Kemandirian Produktif',
        description: 'Beasiswa vokasi yang membekali mustahiq keahlian industri sehingga bertransformasi menjadi muzakki.'
      },
      {
        icon: 'eye',
        title: 'Laporan Terverifikasi',
        description: 'Laporan keuangan dan bukti serah terima disajikan transparan, akuntabel, dan diaudit berkala.'
      }
    ],
    deepDiveTwinImages: [
      '/gambar design/skywalk learning room.jpg',
      '/gambar design/gh learning area.jpg'
    ],
    deepDiveSubblock1Title: 'Prinsip Akuntabilitas Penyaluran Zakat',
    deepDiveSubblock1Desc1: 'Setiap rupiah zakat dihisab secara presisi, diawasi oleh Dewan Pengawas Syariah, dan disalurkan secara produktif agar mustahiq bertransformasi menjadi muzakki baru yang berdaya.',
    deepDiveSubblock1Desc2: 'Kami memastikan dana zakat tidak terbuang sia-sia pada hal konsumtif semata, melainkan menjadi modal masa depan santri penghafal Quran dan vokasi terapan.',
    deepDiveSubblock2Title: 'Kisah Transformasi Santri Penerima Zakat',
    deepDiveSubblock2Desc1: 'Diprioritaskan untuk santri dhuafa, anak yatim, fisabilillah, dan keluarga prasejahtera sekitar pesantren di Desa Sukasirna Jonggol.',
    deepDiveSubblock2Desc2: 'Dengan beasiswa zakat penuh, santri dapat mengenyam pendidikan teknologi agribisnis dan menghafal 30 juz Al-Quran tanpa terkendala beban finansial.',
    portfolioShowcaseItems: [
      { tag: 'SARANA PENDIDIKAN', name: 'Kampus SMK Skill Village Jonggol', category: 'Arsitektur / Sarana Pendidikan', image: '/gambar design/learning studio & workshop.jpg' },
      { tag: 'AGRO-TECHNOPARK', name: 'Greenhouse Agroteknologi Sugro', category: 'Agro-Technopark / Kemandirian Pangan', image: '/gambar design/gh learning area.jpg' },
      { tag: 'SARANA IBADAH', name: 'Mezanin Tahfidz Masjid Sugro', category: 'Masjid & Sarana Ibadah', image: '/gambar design/interior masjid.jpg' },
      { tag: 'FASILITAS SANTRI', name: 'Dapur Gizi Asrama Santri', category: 'Fasilitas Santri Vokasi', image: '/gambar design/belakang masjid.jpg' }
    ],
    guarantees: [
      'Tata kelola syariah diawasi Dewan Pengawas',
      'Penyaluran tepat 8 asnaf prioritas',
      'Bukti Setor Zakat (BSZ) resmi',
      'Konsultasi hisab nisab & haul gratis',
      'Laporan penyaluran transparan berkala',
      'Pemberdayaan mustahiq menjadi muzakki',
      'Akad ijab qobul syar\'i dan doa zakat',
      'Kunjungan langsung ke pesantren Jonggol'
    ],
    
    galleryBadge: 'DOKUMENTASI MUSTAHIQ & PENYALURAN',
    galleryTitle: 'Pemberdayaan Asnaf & Transformasi Santri',
    gallerySubtitle: 'Dokumentasi penyerahan beasiswa zakat dan pembinaan generasi muda mandiri di Jonggol.',
    galleryItems: [
      {
        id: 'gal-z1',
        title: 'Penyerahan Beasiswa Penuh Santri',
        category: 'Beasiswa Fi Sabilillah',
        image: '/gambar-bahan/pengajian rame.jpeg',
        status: 'Penyaluran Rutin',
        caption: 'Penerima manfaat zakat mendapatkan dukungan penuh biaya asrama dan perlengkapan studi vokasi.'
      },
      {
        id: 'gal-z2',
        title: 'Praktik Agroteknologi Modern',
        category: 'Kemandirian Mustahiq',
        image: '/gambar-bahan/gh greenhouse.jpeg',
        status: 'Pelatihan Kejuruan',
        caption: 'Santri mustahiq dilatih keterampilan bertani presisi agar mandiri finansial di masa depan.'
      },
      {
        id: 'gal-z3',
        title: 'Halaqah Tahfidz Quran Santri Zakat',
        category: 'Pendidikan Al-Quran',
        image: '/gambar-bahan/masjid 1.jpeg',
        status: 'Halaqah Harian',
        caption: 'Santri binaan zakat aktif menghafal Al-Quran dan mendalami ilmu syariah di masjid asrama.'
      }
    ],
    
    workflowHeading: 'Tahapan Menunaikan Zakat Maal & Profesi',
    workflowSteps: [
      {
        number: '01',
        title: 'Hisab Harta & Nisab',
        description: 'Hitung total saldo tabungan, emas, atau penghasilan bulanan Anda apakah sudah mencapai nisab syar\'i.'
      },
      {
        number: '02',
        title: 'Kalkulasi 2,5%',
        description: 'Keluarkan 2,5% dari total harta atau penghasilan bersih yang wajib dizakati.'
      },
      {
        number: '03',
        title: 'Transfer Rekening Khusus Zakat',
        description: 'Salurkan ke rekening resmi amil zakat GVF dengan akad ijab qobul yang sah.'
      },
      {
        number: '04',
        title: 'Terima Bukti Setor Zakat (BSZ)',
        description: 'Dapatkan BSZ resmi, doa keberkahan pensucian harta, dan laporan penyaluran ke mustahiq.'
      }
    ],
    
    leadershipBadge: 'DEWAN PENGAWAS SYARIAH',
    leadershipTitle: 'Diawasi Dewan Pengawas Syariah Berpengalaman',
    leadershipQuote: '"Zakat adalah hak mustahiq yang Allah titipkan pada harta kita. Menyalurkannya secara tepat adalah kewajiban yang mendatangkan keberkahan abadi."',
    leaders: [
      {
        name: 'Ust. H. Rahmat Hidayat, S.Pd.I.',
        role: 'Dewan Pengawas Syariah & Asnaf Validator',
        credentials: 'Ahli Fiqih Zakat & Muamalah',
        image: '/media-lp/pengurus-4.jpg',
        quote: 'Memastikan hisab dan distribusi zakat 100% tepat sasaran sesuai kaidah 8 asnaf.'
      },
      {
        name: 'Ir. H. M. Hakim, M.M.',
        role: 'Ketua Yayasan Global Village Fund',
        credentials: 'Penanggung Jawab Program Mustahiq Produktif',
        image: '/media-lp/pengurus-1.jpg',
        quote: 'Mengarahkan zakat untuk beasiswa vokasi berkelanjutan agar mustahiq mandiri.'
      }
    ],
    
    legalitasBadge: 'LEGALITAS AMIL & REKENING ZAKAT',
    legalitasTitle: 'Rekening Resmi Penampungan Dana Zakat',
    legalities: [
      {
        institution: 'Kemenkumham RI',
        regNumber: 'AHU-0014285.AH.01.04.Tahun 2026',
        authority: 'Izin Lembaga Filantropi & Pengelola ZISWAF',
        description: 'Pengelolaan dana zakat amanah, transparan, dan terdaftar resmi.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI) - Rekening Khusus Zakat',
        accountNumber: '7238890042',
        accountHolder: 'Yayasan GVF - Zakat Mustahiq',
        code: '451'
      },
      {
        bankName: 'Bank Mandiri - Zakat Umat',
        accountNumber: '1330024589928',
        accountHolder: 'Yayasan Global Village Fund',
        code: '008'
      }
    ],
    
    faqBadge: 'FAQ ZAKAT',
    faqTitle: 'Pertanyaan Seputar Zakat Maal & Profesi',
    faqs: [
      {
        question: 'Siapa saja yang berhak menerima zakat (asnaf) di Global Village Fund?',
        answer: 'Zakat diprioritaskan bagi santri yatim, dhuafa, dan fi sabilillah di Pesantren Jonggol dalam bentuk beasiswa pendidikan penuh dan kebutuhan asrama, bukan sekadar bantuan konsumtif, tetapi beasiswa vokasi kejuruan yang mencetak keahlian masa depan.'
      },
      {
        question: 'Bagaimana cara menghitung nisab zakat penghasilan dan zakat maal?',
        answer: 'Nisab zakat profesi setara 524 kg beras (~Rp 7,5 juta/bulan) dengan kadar 2,5%. Sedangkan nisab zakat maal setara 85 gram emas murni yang telah mengendap selama 1 tahun (haul).'
      },
      {
        question: 'Apakah saya mendapatkan Bukti Setor Zakat (BSZ) resmi untuk pengurang pajak?',
        answer: 'Ya, muzakki yang menunaikan zakat melalui Yayasan Global Village Fund akan mendapatkan Bukti Setor Zakat (BSZ) resmi yang diakui sebagai pengurang penghasilan kena pajak.'
      },
      {
        question: 'Kapan waktu terbaik menunaikan zakat maal dan zakat profesi?',
        answer: 'Zakat profesi paling utama ditunaikan setiap kali menerima penghasilan atau gaji bulanan. Zakat maal ditunaikan ketika harta simpanan telah genap mencapai haul 1 tahun hijriyah atau masehi.'
      },
      {
        question: 'Apakah muzakki mendapatkan Bukti Setor Zakat (BSZ) resmi untuk pengurang pajak penghasilan?',
        answer: 'Setiap pembayaran zakat langsung diterbitkan kwitansi resmi digital dan dialokasikan ke rekening khusus mustahiq dengan laporan foto berkala.'
      }
    ],
    ctaBannerHeading: 'Bersihkan Harta & Berdayakan Mustahiq',
    ctaBannerText: 'Tunaikan zakat maal dan profesi Anda hari ini untuk mencetak generasi santri dhuafa yang mandiri dan berakhlak mulia.'
  },

  infaq: {
    slug: 'infaq',
    title: 'Infaq Pembangunan Fisik',
    heroSubtitle: 'Percepat Penyelesaian Fasilitas Ibadah, Perpustakaan, dan Sarana Santri Vokasi di Jonggol.',
    categoryBadge: 'INFAQ FISIK',
    heroBgImage: '/gambar design/interior masjid.jpg',
    
    pricingHeading: 'Pilih Paket Infaq Pembangunan',
    pricingSubheading: 'Salurkan infaq material riil untuk percepatan penyelesaian Masjid Khairu Ummah Sugro & sarana santri di Jonggol. Semua laporan belanja terbuka dan dapat diakses publik.',
    packages: [
      {
        id: 'infaq-semen-pasir',
        title: 'Infaq Semen & Pasir',
        subtitle: 'Paket Material Dasar',
        pricePrefix: 'Rp ',
        priceAmount: '75.000',
        priceUnit: '',
        priceDesc: 'Per sak semen + agregat pasir',
        estimation: 'Alokasi: Plester dinding & cor lantai',
        isPopular: false,
        deliverables: [
          { bold: '1 Sak Semen SNI', text: 'Pengadaan 1 sak semen standar SNI langsung ke lokasi proyek' },
          { bold: 'Agregat Pasir Plester', text: 'Pasir plester dan campuran cor beton kualitas nomor satu' },
          { bold: 'Laporan Belanja Terbuka', text: 'Nota pembelian toko bahan terverifikasi dan dapat diakses publik' },
          { bold: 'Pahala Tiap Dinding', text: 'Mengalir pahala dari setiap sujud jamaah di dalam masjid' }
        ],
        ctaText: 'Infaq Semen Sekarang'
      },
      {
        id: 'infaq-besi-beton',
        title: 'Infaq Besi & Beton Cor',
        subtitle: 'Paket Struktur Bangunan',
        pricePrefix: 'Rp ',
        priceAmount: '250.000',
        priceUnit: '',
        priceDesc: 'Per batang besi ulir + cor beton',
        estimation: 'Alokasi: Kolom struktur & sloof masjid',
        isPopular: true,
        deliverables: [
          { bold: 'Besi Beton Ulir SNI', text: 'Diameter 10mm & 12mm bersertifikasi industri resmi' },
          { bold: 'Cor Balok Lantai 2', text: 'Campuran cor bertulang kokoh untuk lantai dua dan dak kubah' },
          { bold: 'Ketahanan Abadi', text: 'Menjamin ketahanan dan keamanan struktur puluhan tahun' },
          { bold: 'Dokumentasi Fisik WA', text: 'Update foto dan video proses pengecoran langsung via WhatsApp' }
        ],
        ctaText: 'Infaq Besi Beton Sekarang'
      },
      {
        id: 'infaq-keramik-finishing',
        title: 'Infaq Keramik & Finishing',
        subtitle: 'Paket Lantai & Interior',
        pricePrefix: 'Rp ',
        priceAmount: '500.000',
        priceUnit: '',
        priceDesc: 'Per meter keramik + finishing halus',
        estimation: 'Alokasi: Lantai ruang salat & wudhu',
        isPopular: false,
        deliverables: [
          { bold: 'Granit Ruang Salat', text: 'Granit elegan anti-gores menghadirkan kenyamanan dan kebersihan' },
          { bold: 'Keramik Anti-Slip Wudhu', text: 'Menjamin keamanan santri dan jamaah saat berwudhu' },
          { bold: 'Cat Ramah Lingkungan', text: 'Warna menyejukkan mata dan tahan terhadap kelembaban tropis' },
          { bold: 'Kekhusyukan Ibadah', text: 'Menghadirkan kenyamanan maksimal bagi para penghafal Al-Quran' }
        ],
        ctaText: 'Infaq Keramik Sekarang'
      }
    ],
    addonTitle: 'Pilihan Saluran Infaq Tambahan',
    addonItems: [
      {
        name: 'Infaq Bebas Nominal',
        desc: 'Donasi sukarela untuk kebutuhan mendesak material lapangan',
        price: 'Bebas',
        availability: 'Tersedia via Transfer / QRIS'
      },
      {
        name: 'Infaq Bata Roster',
        desc: 'Pengadaan bata roster ventilasi udara alami (per 10 pcs)',
        price: 'Rp 150.000',
        availability: 'Tersedia untuk semua paket'
      },
      {
        name: 'Infaq Keramik Saf',
        desc: 'Keramik saf shalat ruang ibadah utama masjid (per dus)',
        price: 'Rp 200.000',
        availability: 'Tersedia untuk semua paket'
      },
      {
        name: 'Infaq Penerangan',
        desc: 'Titik lampu LED & instalasi kabel ruang belajar santri',
        price: 'Rp 350.000',
        availability: 'Tersedia untuk semua paket'
      },
      {
        name: 'Infaq Unit Sanitasi',
        desc: 'Kran wudhu kuningan & penampung air bersih higienis',
        price: 'Rp 500.000',
        availability: 'Tersedia untuk program sanitasi'
      }
    ],
    
    deepDiveBadge: 'AKSELERASI DAKWAH',
    deepDiveTitle: 'Infaq Pembangunan Fisik Masjid',
    deepDiveLead: 'Program Infaq Pembangunan Fisik Global Village Fund menghadirkan sarana nyata bagi kaum muslimin untuk berpartisipasi langsung dalam penyediaan material konstruksi Masjid Khairu Ummah Sugro di Jonggol. Dari semen, bata ringan, hingga sanitasi wudhu, setiap rupiah dialokasikan secara amanah dan terhisab akurat.',
    deepDiveStory1: 'Pembangunan fisik masjid ini menjadi jantung ekosistem pesantren yang menaungi ratusan santri vokasi. Setiap material yang Anda infaqkan menjadi saksi amal jariyah yang pahalanya terus mengalir abadi.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/gambar design/interior masjid.jpg',
    valueBoxes: [
      {
        icon: 'package',
        title: 'Material Nyata (Riil)',
        description: 'Infaq dibelanjakan langsung untuk material fisik terukur seperti semen, pasir, bata ringan, dan rangka baja.'
      },
      {
        icon: 'file-text',
        title: 'Transparansi RAB',
        description: 'Rencana Anggaran Biaya (RAB) dan rincian kebutuhan material disajikan secara terbuka tanpa ada biaya tersembunyi.'
      },
      {
        icon: 'camera',
        title: 'Dokumentasi Progres',
        description: 'Laporan visual berkala foto dan video perkembangan fisik langsung dari lokasi Jonggol untuk para muhsinin.'
      },
      {
        icon: 'heart',
        title: 'Pahala Jariyah Abadi',
        description: 'Sarana ibadah dan wudhu dimanfaatkan setiap hari oleh santri penghafal Quran dan warga sekitar asrama.'
      }
    ],
    
    galleryBadge: 'DOKUMENTASI SARANA & MATERIAL',
    galleryTitle: 'Progress Pengadaan Material & Fasilitas',
    gallerySubtitle: 'Transparansi pengadaan sarana sanitasi wudhu, interior, dan ruang belajar santri.',
    galleryItems: [
      {
        id: 'gal-i1',
        title: 'Pelataran Megah Masjid Khairu Ummah',
        category: 'Pengecoran Fisik',
        image: '/gambar-bahan/pelataran mesjid.jpeg',
        status: 'Realisasi Lapangan',
        caption: 'Pengecoran lantai pelataran masjid yang menampung ratusan santri dan jamaah.'
      },
      {
        id: 'gal-i2',
        title: 'Fasilitas Sanitasi & Wudhu Bersih',
        category: 'Sanitasi Higienis',
        image: '/gambar-bahan/wc mesjid.jpeg',
        status: 'Fasilitas Aktif',
        caption: 'Penyediaan kran wudhu hemat air dengan sirkulasi udara alami dan drainase bersih.'
      },
      {
        id: 'gal-i3',
        title: 'Ruang Kelas & Fasilitas Belajar Santri',
        category: 'Sarana Kelas',
        image: '/gambar-bahan/belajar kelas.jpeg',
        status: 'KBM Aktif',
        caption: 'Ruang belajar berfasilitas lengkap untuk mencetak santri vokasi berdaya saing tinggi.'
      },
      {
        id: 'gal-i4',
        title: 'Pembangunan Green House Agro-Technopark',
        category: 'Sarana Praktik',
        image: '/gambar-bahan/gh greenhouse.jpeg',
        status: 'Operasional',
        caption: 'Fasilitas penunjang praktik agroteknologi modern bagi santri vokasi.'
      }
    ],
    
    workflowHeading: 'Alur 4 Langkah Mudah Menyalurkan Infaq',
    workflowSteps: [
      {
        number: '01',
        title: 'Pilih Kategori Kebutuhan',
        description: 'Tentukan apakah infaq ditujukan untuk material semen, sarana belajar, air wudhu, atau operasional umum.'
      },
      {
        number: '02',
        title: 'Tentukan Nominal Bebas',
        description: 'Salurkan donasi terbaik Anda tanpa batasan minimum maupun maksimum.'
      },
      {
        number: '03',
        title: 'Transfer Melalui QRIS / Bank',
        description: 'Dukungan scan QRIS instan seluruh e-wallet (GoPay, OVO, Dana) dan bank transfer.'
      },
      {
        number: '04',
        title: 'Update Belanja Material',
        description: 'Pantau laporan pembelian material dan progres pengerjaan di lapangan.'
      }
    ],
    
    leadershipBadge: 'TIM PELAKSANA LAPANGAN',
    leadershipTitle: 'Diawasi oleh Tim Arsitek & Manajemen Teknis',
    leadershipQuote: '"Setiap material yang dibeli dari dana infaq diperhitungkan efisiensinya. Kami pastikan spesifikasi teknis kokoh dan tidak ada pemborosan dana donatur."',
    leaders: [
      {
        name: 'H. Bambang Sugiarto, S.T.',
        role: 'Direktur Teknis & Pengadaan Material',
        credentials: 'Ahli Manajemen Konstruksi Ramah Lingkungan',
        image: '/media-lp/pengurus-3.jpg',
        quote: 'Memastikan pembelian semen, besi, dan sarana belajar memiliki mutu terbaik dengan harga terukur.'
      },
      {
        name: 'Ir. H. M. Hakim, M.M.',
        role: 'Ketua Yayasan GVF',
        credentials: 'Penanggung Jawab Keuangan & Operasional',
        image: '/media-lp/pengurus-1.jpg',
        quote: 'Menjamin akuntabilitas setiap rupiah infaq yang diamanahkan masyarakat.'
      }
    ],
    
    legalitasBadge: 'LEGALITAS & REKENING INFAQ',
    legalitasTitle: 'Rekening Resmi Penampungan Infaq Pembangunan',
    legalities: [
      {
        institution: 'Kemenkumham RI',
        regNumber: 'AHU-0014285.AH.01.04.Tahun 2026',
        authority: 'Izin Penghimpunan Infaq & Sedekah',
        description: 'Terdaftar secara resmi sebagai lembaga sosial berbadan hukum.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI) - Infaq',
        accountNumber: '7238890023',
        accountHolder: 'Yayasan Global Village Fund - Infaq',
        code: '451'
      },
      {
        bankName: 'Bank Mandiri - Infaq Pembangunan',
        accountNumber: '1330024589910',
        accountHolder: 'Yayasan Global Village Fund',
        code: '008'
      }
    ],
    
    faqBadge: 'FAQ',
    faqTitle: 'Pertanyaan Seputar Infaq Pembangunan',
    faqs: [
      {
        question: 'Bagaimana dana infaq pembangunan dibelanjakan?',
        answer: 'Seluruh dana infaq yang terhimpun dibelanjakan 100% untuk pengadaan material fisik riil (semen, pasir, bata ringan, rangka baja, atap, dan sanitasi wudhu) sesuai Rencana Anggaran Biaya (RAB) resmi Masjid Khairu Ummah Sugro di Jonggol. Laporan belanja disajikan terbuka dan transparan.'
      },
      {
        question: 'Apakah saya mendapatkan bukti dan tanda terima resmi infaq?',
        answer: 'Ya, setiap donatur yang menyalurkan infaq akan menerima kwitansi digital resmi, tanda terima syar\'i, serta notifikasi rekapitulasi penyaluran langsung via WhatsApp atau email.'
      },
      {
        question: 'Apakah donatur bisa mengunjungi langsung lokasi pembangunan di Jonggol?',
        answer: 'Tentu saja. Kawasan Wakaf Terpadu Jonggol di Sukasirna terbuka bagi para donatur dan masyarakat umum yang ingin melihat langsung realisasi fisik pembangunan Masjid dan asrama santri.'
      },
      {
        question: 'Bagaimana cara konfirmasi setelah melakukan transfer infaq?',
        answer: 'Setelah transfer ke rekening resmi Yayasan Global Village Fund atau scan QRIS, Anda cukup mengunggah bukti transfer melalui tombol konfirmasi WhatsApp yang tertera di website ini.'
      }
    ],
    ctaBannerHeading: 'Punya Material / Bantuan Fisik Langsung?',
    ctaBannerText: 'Yayasan juga menerima sumbangan material langsung (semen, keramik, cat, perangkat komputer). Hubungi tim logistik kami.'
  },

  sedekah: {
    slug: 'sedekah',
    title: 'Sedekah Nutrisi & Pangan Santri',
    heroSubtitle: 'Dukung Kebutuhan Nutrisi, Vitamin & Makan Bergizi Santri Penghafal Al-Quran di Jonggol.',
    categoryBadge: 'SEDEKAH NUTRISI',
    heroBgImage: '/gambar design/learning studio & workshop.jpg',
    
    pricingHeading: 'Pilih Paket Sedekah Nutrisi Santri',
    pricingSubheading: 'Dukung kebutuhan nutrisi harian santri vokasi dan penghafal Quran di Pesantren Jonggol. Makanan bergizi menopang stamina mereka menuntut ilmu dan menghafal kalamullah.',
    packages: [
      {
        id: 'sedekah-pangan-pokok',
        title: 'Sedekah Pangan Pokok',
        subtitle: 'Paket Beras & Kebutuhan Dapur',
        pricePrefix: 'Rp ',
        priceAmount: '50.000',
        priceUnit: '',
        priceDesc: 'Per paket sedekah pangan',
        estimation: 'Penyaluran Rutin Setiap Pekan',
        isPopular: false,
        deliverables: [
          { bold: '5 kg Beras Pulen Berkualitas', text: 'Pengadaan beras untuk santri asrama' },
          { bold: 'Minyak Goreng & Telur Ayam', text: 'Bumbu dapur higienis dan protein harian' },
          { bold: 'Konsumsi Makan Harian', text: 'Mendukung konsumsi makan harian santri di asrama Jonggol' },
          { bold: 'Dapur Mandiri Pesantren', text: 'Dimasak langsung di dapur bersama asrama pesantren' },
          { bold: 'Laporan Dokumentasi Foto', text: 'Laporan dokumentasi foto penyaluran bahan pangan berkala' },
          { bold: 'Doa Bersama Santri', text: 'Doa bersama santri sebelum memulai halaqah belajar harian' },
          { bold: 'Penyaluran Amanah 100%', text: 'Tepat sasaran santri dhuafa dan yatim' },
          { bold: 'Pahala Sedekah Makanan', text: 'Pahala sedekah makanan yang mengalir tiada henti' },
          { bold: 'Tanda Terima Donasi Resmi', text: 'Tanda terima donasi resmi dari Yayasan Global Village Fund (GVF)' }
        ],
        ctaText: 'Salurkan Sedekah'
      },
      {
        id: 'sedekah-nutrisi-susu',
        title: 'Sedekah Nutrisi & Susu',
        subtitle: 'Paket Gizi Lengkap Santri Vokasi',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per paket gizi bulanan / santri',
        estimation: 'Menu Sehat Terjadwal Setiap Hari',
        isPopular: true,
        deliverables: [
          { bold: 'Suplemen Susu & Madu', text: 'Susu murni & madu penambah daya tahan tubuh' },
          { bold: 'Buah & Sayur Segar', text: 'Buah-buahan segar & sayuran hasil kebun hortikultura santri' },
          { bold: 'Asupan Protein Berkualitas', text: 'Standar gizi seimbang hewani & nabati' },
          { bold: 'Kebugaran Fisik Santri', text: 'Menjaga kebugaran santri saat praktikum vokasi lapangan' },
          { bold: 'Dukungan Hafalan Quran', text: 'Mendukung hafalan Quran santri agar tetap fokus dan prima' },
          { bold: 'Laporan Kesehatan Santri', text: 'Laporan perkembangan kesehatan dan keceriaan santri' },
          { bold: 'Vitamin & Stamina Rutin', text: 'Penyediaan vitamin harian & suplemen stamina berkala' },
          { bold: 'Pantauan Tenaga Medis', text: 'Dipantau oleh tenaga kesehatan & pengasuh asrama' },
          { bold: 'Menu Variatif 3x Makan', text: 'Menu variatif 3 kali makan sehat bergizi setiap hari' },
          { bold: 'Kemitraan Peternak Lokal', text: 'Kemitraan langsung unit peternak sapi perah lokal binaan' },
          { bold: 'Pahala Jariyah Memelihara Santri', text: 'Pahala jariyah memelihara fisik para penuntut ilmu' },
          { bold: 'Dokumentasi Video Terima Kasih', text: 'Laporan foto & ucapan terima kasih video dari santri' }
        ],
        ctaText: 'Salurkan Sedekah'
      },
      {
        id: 'sedekah-orang-tua-asuh',
        title: 'Sedekah Orang Tua Asuh',
        subtitle: 'Paket Beasiswa Biaya Hidup Santri',
        pricePrefix: 'Rp ',
        priceAmount: '500.000',
        priceUnit: '',
        priceDesc: 'Per santri dhuafa / bulan',
        estimation: 'Komitmen Pembinaan Santri Binaan',
        isPopular: false,
        deliverables: [
          { bold: '100% Biaya Hidup & Asrama', text: 'Menanggung biaya makan, asrama, dan nutrisi santri' },
          { bold: 'Kitab & Modul Praktikum', text: 'Kitab rujukan, buku kejuruan vokasi, dan modul praktikum' },
          { bold: 'Seragam & Perlengkapan Ibadah', text: 'Seragam sekolah vokasi, baju koko, dan perlengkapan ibadah' },
          { bold: 'Pemeriksaan Kesehatan Rutin', text: 'Pemeriksaan kesehatan berkala dan vitamin santri' },
          { bold: 'Karakter FAST & Mandiri', text: 'Mencetak generasi santri mandiri berakhlak mulia FAST' },
          { bold: 'Kartu Hafalan & Rapor Digital', text: 'Laporan perkembangan akademik & kartu hafalan Quran santri' },
          { bold: 'Mentoring Vokasi Intensif', text: 'Bimbingan intensif mentor vokasi teknologi dan keahlian' },
          { bold: 'Penyaluran Tepat Sasaran', text: 'Penyaluran langsung tepat sasaran santri yatim & dhuafa' },
          { bold: 'Silaturahmi Donatur & Santri', text: 'Silaturahmi berkala antara muhsinin dan santri asuh' },
          { bold: 'Sertifikat Orang Tua Asuh', text: 'Sertifikat Orang Tua Asuh resmi dari Yayasan Global Village Fund (GVF)' }
        ],
        ctaText: 'Salurkan Sedekah'
      }
    ],
    // Addon table sengaja ditiadakan sesuai acuan Pen.dev (program-shodaqoh.html)
    addonItems: undefined,
    
    deepDiveBadge: 'URGENSI & DOKUMENTASI',
    deepDiveTitle: 'Sedekah Pangan & Gizi Santri',
    deepDiveLead: 'Program Sedekah Nutrisi & Pangan Santri Global Village Fund bertujuan memastikan ratusan santri vokasi dan penghafal Quran di Pesantren Jonggol mendapatkan asupan makanan halal, sehat, dan bergizi seimbang. Nutrisi yang prima adalah kunci ketajaman berpikir dan ketahanan fisik santri dalam menuntut ilmu.',
    deepDiveStory1: 'Kebutuhan pangan diolah langsung di dapur umum asrama dan diperkuat oleh hasil panen kebun hortikultura serta greenhouse santri, menciptakan siklus kemandirian pangan yang berkah dan berkelanjutan.',
    deepDiveStory2: '',
    deepDiveBannerImage: '/gambar design/gh learning area.jpg',
    valueBoxes: [
      {
        icon: 'shield-check',
        title: 'Bahan Halal & Sehat',
        description: 'Beras pulen, minyak, telur, sayur mayur, dan daging protein dari pemasok terpercaya dan kebun santri.'
      },
      {
        icon: 'infinity',
        title: 'Menu Gizi Seimbang',
        description: 'Pola makan terjadwal 3 kali sehari yang diawasi kecukupan kalori dan mikronutrisinya oleh pengurus asrama.'
      },
      {
        icon: 'file-text',
        title: 'Susu & Madu Santri',
        description: 'Pemberian suplemen susu segar dan madu lebah untuk memelihara daya tahan tubuh dan stamina santri.'
      },
      {
        icon: 'eye',
        title: 'Kebun Pangan Mandiri',
        description: 'Integrasi sedekah dengan unit agroteknologi santri untuk menghasilkan bahan pangan segar mandiri.'
      }
    ],
    deepDiveTwinImages: [
      '/gambar design/learning studio & workshop.jpg',
      '/gambar design/gh learning area.jpg'
    ],
    deepDiveSubblock1Title: 'Siklus Penyaluran Sedekah Amanah',
    deepDiveSubblock1Desc1: 'Setiap dana sedekah yang masuk dihimpun dan dialokasikan sesuai jadwal belanja harian dan mingguan dapur asrama. Tim pengurus memastikan bahan makanan dibeli dalam kondisi segar dan berkualitas standar konsumsi terbaik.',
    deepDiveSubblock1Desc2: 'Laporan dokumentasi foto belanja bahan, proses memasak, hingga momen santri menikmati hidangan disajikan secara berkala kepada para muhsinin untuk menjamin transparansi 100%.',
    deepDiveSubblock2Title: 'Dampak Nyata Sedekah Anda',
    deepDiveSubblock2Desc1: 'Alhamdulillah, berkat dukungan sedekah para muhsinin, kebutuhan makan santri vokasi dan penghafal Quran dapat terpenuhi dengan baik setiap hari. Santri dapat belajar dengan tenang tanpa rasa lapar atau kekurangan asupan nutrisi.',
    deepDiveSubblock2Desc2: 'Setiap suapan makanan yang dinikmati santri mengalirkan tenaga untuk melafalkan ayat suci Al-Quran dan mempraktikkan keterampilan vokasi di Jonggol.',
    portfolioShowcaseItems: [
      { tag: 'SARANA PENDIDIKAN', name: 'Kampus SMK Skill Village Jonggol', category: 'Arsitektur / Sarana Pendidikan', image: '/gambar design/learning studio & workshop.jpg' },
      { tag: 'AGRO-TECHNOPARK', name: 'Greenhouse Agroteknologi Sugro', category: 'Agro-Technopark / Kemandirian Pangan', image: '/gambar design/gh learning area.jpg' },
      { tag: 'SARANA IBADAH', name: 'Mezanin Tahfidz Masjid Sugro', category: 'Masjid & Sarana Ibadah', image: '/gambar design/interior masjid.jpg' },
      { tag: 'FASILITAS SANTRI', name: 'Dapur Gizi Asrama Santri', category: 'Fasilitas Santri Vokasi', image: '/gambar design/belakang masjid.jpg' }
    ],
    guarantees: [
      'Menu 3 kali makan bergizi harian',
      'Suplemen susu murni & madu berkala',
      'Bahan segar hasil panen kebun santri',
      'Dapur asrama bersih & higienis',
      'Laporan foto belanja & makan santri',
      'Doa bersama santri setiap waktu makan',
      'Tanda terima & kwitansi resmi Yayasan Global Village Fund (GVF)',
      'Kunjungan langsung silaturahmi ke asrama'
    ],
    
    galleryBadge: 'DOKUMENTASI KONSUMSI & AGRO-TECHNOPARK',
    galleryTitle: 'Kemandirian Pangan & Keseharian Santri',
    gallerySubtitle: 'Dokumentasi nyata hasil panen kebun presisi dan aktivitas santri vokasi di kampus Sukasirna Jonggol.',
    galleryItems: [
      {
        id: 'gal-s1',
        title: 'Panen Sayur Segar Agro-Technopark',
        category: 'Kemandirian Pangan',
        image: '/gambar-bahan/gh update 2.jpeg',
        status: 'Panen Harian',
        caption: 'Sebagian kebutuhan konsumsi dapur santri dipasok langsung dari greenhouse pertanian presisi.'
      },
      {
        id: 'gal-s2',
        title: 'Pembinaan Karakter Santri Vokasi',
        category: 'Bina Karakter FAST',
        image: '/gambar-bahan/pengajian rame.jpeg',
        status: 'Rutinitas Harian',
        caption: 'Santri sehat dan berenergi mengikuti rangkaian pembinaan adab serta keahlian industri.'
      },
      {
        id: 'gal-s3',
        title: 'Unit Pertanian Presisi Green House',
        category: 'Laboratorium Agro',
        image: '/gambar-bahan/gh greenhouse.jpeg',
        status: 'Beroperasi Aktif',
        caption: 'Praktik budidaya melon dan tanaman hortikultura modern berstandar agribisnis terapan.'
      }
    ],
    
    workflowHeading: 'Cara Mudah Memulai Kebiasaan Shodaqoh Rutin',
    workflowSteps: [
      {
        number: '01',
        title: 'Siapkan Niat Tulus Berbagi',
        description: 'Buka website GVF atau simpan QRIS shodaqoh di ponsel Anda.'
      },
      {
        number: '02',
        title: 'Scan QRIS Instan',
        description: 'Ketik nominal sedekah terbaik Anda (mulai Rp 10.000 atau Rp 20.000) lewat aplikasi mobile banking apapun.'
      },
      {
        number: '03',
        title: 'Langsung Tersalurkan ke Dapur Santri',
        description: 'Dana langsung dialokasikan untuk kebutuhan belanja pangan harian santri.'
      },
      {
        number: '04',
        title: 'Raih Ketenangan & Keberkahan',
        description: 'Menjadikan shodaqoh sebagai amalan rutin menjauhkan marabahaya dan membuka pintu rezeki yang berkah.'
      }
    ],
    
    leadershipBadge: 'PENGASUH SANTRI',
    leadershipTitle: 'Diasuh oleh Ustadz & Pengasuh Penuh Kasih',
    leadershipQuote: '"Setiap santri di sini adalah anak kita bersama. Kebaikan Anda memastikan mereka tidak pernah merasa sendirian dalam menuntut ilmu Allah."',
    leaders: [
      {
        name: 'Ust. H. Rahmat Hidayat, S.Pd.I.',
        role: 'Kepala Pengasuhan Santri & Dapur Asrama',
        credentials: 'Praktisi Pendidikan Karakter & Gizi Pesantren',
        image: '/media-lp/pengurus-4.jpg',
        quote: 'Memastikan setiap porsi makanan santri bersih, halal, dan bergizi seimbang.'
      },
      {
        name: 'Ir. H. M. Hakim, M.M.',
        role: 'Ketua Yayasan GVF',
        credentials: 'Pembina Kesejahteraan Santri',
        image: '/media-lp/pengurus-1.jpg',
        quote: 'Memberikan lingkungan belajar terbaik agar santri tumbuh menjadi generasi unggul.'
      }
    ],
    
    legalitasBadge: 'LEGALITAS & REKENING SHODAQOH',
    legalitasTitle: 'Rekening Resmi Shodaqoh & Pangan Santri',
    legalities: [
      {
        institution: 'Kemenkumham RI',
        regNumber: 'AHU-0014285.AH.01.04.Tahun 2026',
        authority: 'Izin Lembaga Filantropi & Sosial',
        description: 'Pengelolaan dana sedekah amanah dengan audit berkala.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI) - Sedekah',
        accountNumber: '7238890034',
        accountHolder: 'Yayasan GVF - Sedekah Santri',
        code: '451'
      },
      {
        bankName: 'Bank Mandiri - Sedekah',
        accountNumber: '1330024589910',
        accountHolder: 'Yayasan Global Village Fund',
        code: '008'
      }
    ],
    
    faqBadge: 'FAQ SEDEKAH',
    faqTitle: 'Pertanyaan Seputar Sedekah Nutrisi',
    faqs: [
      {
        question: 'Apakah sedekah disalurkan dalam bentuk bahan mentah atau makanan matang?',
        answer: 'Sedekah disalurkan dalam dua bentuk: bahan pokok berkualitas untuk dapur umum asrama (beras, minyak, telur, sayur), serta hidangan matang siap santap saat sarapan, makan siang, dan acara buka puasa sunnah santri.'
      },
      {
        question: 'Berapa jumlah santri yang menerima manfaat sedekah nutrisi ini?',
        answer: 'Program sedekah nutrisi menopang konsumsi harian ratusan santri vokasi SMK Skill Village dan santri tahfidz Quran yang bermukim di asrama Sukasirna Jonggol.'
      },
      {
        question: 'Apakah saya bisa mengirimkan bahan makanan langsung ke asrama di Jonggol?',
        answer: 'Bisa. Kami menerima pengiriman bahan pangan langsung seperti beras, minyak goreng, telur, mau pun suplemen madu dan susu langsung ke dapur asrama pesantren Jonggol.'
      },
      {
        question: 'Apakah ada laporan dan dokumentasi penyaluran untuk donatur?',
        answer: 'Ya, tim kami secara berkala mempublikasikan laporan foto belanja logistik, proses masak di dapur umum, serta dokumentasi makan bersama santri melalui pesan WhatsApp dan website.'
      },
      {
        question: 'Bagaimana cara mendaftar program Orang Tua Asuh santri binaan?',
        answer: 'Anda dapat menghubungi layanan donatur kami via WhatsApp untuk memilih profil santri asuh binaan dan menerima kartu santri serta laporan berkala hafalan dan akademiknya.'
      }
    ],
    ctaBannerHeading: 'Jadikan Sedekah Nutrisi Sebagai Amalan Rutin',
    ctaBannerText: 'Simpan nomor rekening atau QRIS resmi GVF untuk memudahkan Anda berbagi nutrisi bagi para penuntut ilmu setiap hari.'
  }
};

