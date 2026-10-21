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
  
  // Section 2: Pricing Packages (Exact 3 Columns ala Pen.dev)
  pricingHeading: string;
  pricingSubheading: string;
  packages: PricingPackage[];
  addonTitle?: string;
  addonItems?: AddonItem[];
  
  // Section 3: Deep Dive (2 Kolom Sticky Sidebar)
  deepDiveBadge: string;
  deepDiveTitle: string;
  deepDiveLead: string;
  deepDiveStory1: string;
  deepDiveStory2: string;
  deepDiveBannerImage: string;
  valueBoxes: ValueBox[];
  
  // Section 4: Gallery Showcase (Full-Width + Lightbox)
  galleryBadge: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryItems: GalleryItem[];
  
  // Section 5: Workflow (4 Langkah Transparan)
  workflowHeading: string;
  workflowSteps: WorkflowStep[];
  
  // Section 6: Leadership & Syariah Board
  leadershipBadge: string;
  leadershipTitle: string;
  leadershipQuote: string;
  leaders: LeaderPerson[];
  
  // Section 7: Legalitas & Rekening
  legalitasBadge: string;
  legalitasTitle: string;
  legalities: LegalItem[];
  bankAccounts: BankAccount[];
  
  // Section 8: FAQ & CTA
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
    pricingSubheading: 'Salurkan infaq material riil untuk percepatan penyelesaian Masjid Khairu Ummah Sugro & sarana santri di Jonggol. Semua laporan belanja terbuka dan dapat diakses publik.',
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
    deepDiveTitle: 'Membangun Pusat Peradaban Mandiri Berbasis Alam di Jonggol',
    deepDiveLead: 'Kawasan seluas ±3 hektare ini dirancang bukan sekadar kompleks bangunan, melainkan ekosistem terpadu yang memadukan ibadah khusyuk, pendidikan vokasi berdaya saing global, dan kelestarian alam.',
    deepDiveStory1: 'Generasi muda berbakat dari berbagai pelosok daerah membutuhkan ekosistem pembelajaran terapan yang memadukan adab luhur dan keahlian industri. Yayasan Pesantren Cendekia Indonesia (YPCI / GVF) menginisiasi pembebasan lahan wakaf abadi untuk mendirikan SMK Skill Village Islamic School dengan konsentrasi agroteknologi presisi dan rekayasa digital, serta Garden Mosque Khairu Ummah sebagai poros spiritual peradaban.',
    deepDiveStory2: 'Melalui prinsip wakaf produktif, aset yang dibangun tidak akan pernah menyusut atau dijual. Setiap meter lahan yang Anda wakafkan akan terus melahirkan lulusan santri mandiri, menghidupkan majelis ilmu, dan menghasilkan manfaat sosial berkesinambungan hingga generasi mendatang.',
    deepDiveBannerImage: '/gambar-bahan/pelataran mesjid.jpeg',
    valueBoxes: [
      {
        icon: 'infinity',
        title: 'Pahala Abadi Tanpa Putus',
        description: 'Nilai pokok aset dijaga tetap utuh selamanya sesuai kaidah fiqih wakaf nabawi.'
      },
      {
        icon: 'shield-check',
        title: 'Diawasi Badan Wakaf Indonesia',
        description: 'Nazhir resmi berizin legal BWI dengan kepatuhan tata kelola syariah ketat.'
      },
      {
        icon: 'file-text',
        title: 'Sertifikat & Akta AIW Resmi',
        description: 'Diterbitkan Akta Ikrar Wakaf resmi berkekuatan hukum dan dapat diakses digital.'
      },
      {
        icon: 'eye',
        title: 'Laporan Penyaluran Transparan',
        description: 'Pembaruan visual progres pembangunan secara real-time via web dan WhatsApp.'
      }
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
    
    faqBadge: 'TANYA JAWAB SYARIAH',
    faqTitle: 'Pertanyaan Seputar Akad & Fiqih Wakaf',
    faqs: [
      {
        question: 'Apakah boleh berwakaf dalam bentuk uang tunai (Wakaf Uang)?',
        answer: 'Boleh dan sah. Hal ini sesuai dengan Fatwa Komisi Fatwa MUI tahun 2002 dan UU No. 41 Tahun 2004 tentang Wakaf. Uang yang diwakafkan oleh Nazhir GVF akan dikonversikan menjadi aset tanah abadi dan sarana produktif yang nilai pokoknya dijaga tidak hilang atau berkurang.'
      },
      {
        question: 'Apakah saya bisa berwakaf atas nama orang tua yang sudah wafat?',
        answer: 'Sangat bisa. Berdasarkan hadits riwayat Abu Hurairah dan riwayat Sa\'ad bin Ubadah radhiyallahu \'anhu, menghadiahkan pahala sedekah jariyah/wakaf untuk orang tua yang telah meninggal dunia disepakati para ulama sampai pahalanya dan amat dianjurkan sebagai bakti anak shalih.'
      },
      {
        question: 'Bagaimana saya membuktikan bahwa wakaf saya telah tercatat resmi?',
        answer: 'Setelah pembayaran terverifikasi, Anda akan langsung menerima Akta Ikrar Wakaf (AIW) / Sertifikat Wakaf Digital ber-QR Code resmi yang mencantumkan nomor registrasi nazhir dan luas meter/paket yang Anda tunaikan.'
      },
      {
        question: 'Apakah ada potongan operasional dari dana wakaf yang saya setor?',
        answer: '100% dari dana wakaf lahan dan bangunan disalurkan untuk pembebasan aset fisik dan konstruksi. Biaya operasional nazhir diambil sesuai batasan syar\'i maksimal yang ditetapkan undang-undang (maksimal 10% dari hasil pengelolaan wakaf produktif, bukan memotong pokok aset).'
      },
      {
        question: 'Bagaimana jika saya ingin berkunjung dan meninjau lokasi fisik di Jonggol?',
        answer: 'Sangat dipersilakan! Lokasi kawasan berada di Sukasirna, Jonggol, Kabupaten Bogor. Tim nazhir GVF siap menyambut kunjungan wakif pada hari kerja maupun akhir pekan dengan konfirmasi terlebih dahulu melalui WhatsApp layanan kantor.'
      }
    ],
    ctaBannerHeading: 'Konsultasi Niat & Akad Wakaf Bersama Dewan Syariah',
    ctaBannerText: 'Bicaralah dengan tim konsultan wakaf kami untuk konsultasi penghitungan luas lahan, wakaf keluarga, atau program wakaf korporat secara privat.'
  },

  zakat: {
    slug: 'zakat',
    title: 'Penyaluran Zakat Maal & Fitrah',
    heroSubtitle: 'Tunaikan Kewajiban Rukun Islam ke-3, Bersihkan Harta dan Muliakan 8 Asnaf di Jonggol.',
    categoryBadge: 'ZAKAT',
    heroBgImage: '/gambar design/belakang masjid.jpg',
    
    pricingHeading: 'Pilihan Saluran Zakat Maal & Profesi',
    pricingSubheading: 'Tunaikan kewajiban zakat 2,5% secara amanah, tepat hisab, dan tepat sasaran. Disalurkan langsung untuk 8 asnaf, terutama beasiswa fi sabilillah dan kemandirian santri dhuafa di Sukasirna Jonggol.',
    packages: [
      {
        id: 'zakat-penghasilan',
        title: 'Zakat Penghasilan',
        subtitle: 'Zakat Profesi Karyawan & Profesional',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '/ bulan',
        priceDesc: 'Kadar 2,5% dari penghasilan bersih bulanan',
        estimation: 'Nisab: Setara 524 kg beras (~Rp 7.500.000/bln)',
        isPopular: false,
        deliverables: [
          { bold: 'Kadar Zakat 2,5%', text: 'Dipotong dari gaji bersih atau penghasilan bulanan' },
          { bold: 'Nisab 524 kg Beras', text: 'Wajib ditunaikan jika penghasilan telah mencapai batas nisab' },
          { bold: 'Penyaluran Beasiswa Vokasi', text: 'Langsung disalurkan untuk biaya belajar & hidup santri dhuafa' },
          { bold: 'Bukti Setor Resmi', text: 'Dilengkapi bukti setor resmi yang sah dan legal' }
        ],
        ctaText: 'Tunaikan Zakat Profesi'
      },
      {
        id: 'zakat-tabungan-emas',
        title: 'Zakat Tabungan & Emas',
        subtitle: 'Zakat Simpanan & Harta Mengendap',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '/ tahun',
        priceDesc: 'Kadar 2,5% dari simpanan mengendap 1 tahun',
        estimation: 'Nisab: Setara 85 gram emas murni (haul 1 thn)',
        isPopular: true,
        deliverables: [
          { bold: 'Nisab 85 Gram Emas Murni', text: 'Dihitung dari total tabungan, emas, dan deposito mengendap' },
          { bold: 'Telah Mencapai Haul 1 Tahun', text: 'Telah genap kepemilikan selama 1 tahun hijriyah/masehi' },
          { bold: 'Penyaluran 8 Asnaf Terverifikasi', text: 'Prioritas fakir miskin, gharimin, dan fi sabilillah di Jonggol' },
          { bold: 'Pembersih Harta & Penolak Bala', text: 'Menyucikan harta simpanan dan mengundang keberkahan rezeki' }
        ],
        ctaText: 'Tunaikan Zakat Tabungan'
      },
      {
        id: 'zakat-perniagaan-bisnis',
        title: 'Zakat Perniagaan',
        subtitle: 'Zakat Usaha & Perusahaan Berkah',
        pricePrefix: '',
        priceAmount: '2,5%',
        priceUnit: '/ tahun',
        priceDesc: 'Kadar 2,5% dari aset lancar dikurangi hutang lancar',
        estimation: 'Nisab: Setara 85 gram emas pada tutup buku',
        isPopular: false,
        deliverables: [
          { bold: 'Rumus Hisab Zakat Bisnis', text: '[Aset Lancar + Kas + Piutang Lancar] - Hutang Jatuh Tempo' },
          { bold: 'Konsultasi Akuntansi Syariah', text: 'Pendampingan gratis perhitungan hisab neraca bisnis Anda' },
          { bold: 'Program Berdaya Santri Vokasi', text: 'Menumbuhkan wirausaha muda santri melalui teaching factory' },
          { bold: 'Sertifikat Muzakki Perusahaan', text: 'Diterbitkan sertifikat resmi penunaian zakat korporasi' }
        ],
        ctaText: 'Tunaikan Zakat Bisnis'
      }
    ],
    addonTitle: 'Pilihan Saluran Zakat Khusus 8 Asnaf',
    addonItems: [
      {
        name: 'Beasiswa Santri Fi Sabilillah',
        desc: 'Bantuan biaya asrama, kitab, dan sertifikasi vokasi santri dhuafa',
        price: 'Rp 500.000',
        availability: 'Asnaf Fi Sabilillah'
      },
      {
        name: 'Bantuan Fakir Miskin Sekitar',
        desc: 'Santunan bahan pangan pokok bagi warga pra-sejahtera Sukasirna',
        price: 'Rp 250.000',
        availability: 'Asnaf Fakir & Miskin'
      },
      {
        name: 'Kemandirian Usaha Mustahik',
        desc: 'Modal bibit dan peralatan tani presisi untuk keluarga santri',
        price: 'Rp 1.000.000',
        availability: 'Asnaf Pemberdayaan Ekonomi'
      },
      {
        name: 'Zakat Fitrah Beras 2,5 kg',
        desc: 'Beras pulen berkualitas disalurkan tepat waktu sebelum shalat Id',
        price: 'Rp 45.000',
        availability: 'Musim Ramadhan'
      },
      {
        name: 'Kafalah Guru & Dai Pedalaman',
        desc: 'Honorarium dan sarana dakwah ustadz pembina santri di pelosok',
        price: 'Rp 750.000',
        availability: 'Asnaf Fi Sabilillah'
      }
    ],
    
    deepDiveBadge: 'HAK 8 ASNAF',
    deepDiveTitle: 'Transformasi Mustahik Menjadi Generasi Vokasi Mandiri',
    deepDiveLead: 'Zakat di Global Village Fund dialokasikan untuk pemutusan siklus kemiskinan antargenerasi melalui pendidikan vokasi terapan dan pembinaan karakter FAST.',
    deepDiveStory1: 'Sesuai dengan ketentuan syariat Surah At-Taubah ayat 60, zakat Anda disalurkan kepada asnaf yang berhak, khususnya asnaf Fi Sabilillah dan Ibnu Sabil. Para santri berbakat diberikan beasiswa penuh di SMK Skill Village Islamic School untuk menguasai keahlian teknologi industri, pertanian presisi, dan multimedia.',
    deepDiveStory2: 'Dengan kurikulum terpadu berbasis alam dan adab, para santri dididik agar mandiri saat lulus, siap kerja, dan mampu merintis usaha, sehingga kelak mereka mengangkat martabat keluarganya dari penerima zakat (mustahik) menjadi pembayar zakat (muzakki).',
    deepDiveBannerImage: '/gambar-bahan/kbm kelas 1.jpeg',
    valueBoxes: [
      {
        icon: 'check-circle',
        title: '100% Hak Asnaf Terlindungi',
        description: 'Dana zakat dipisahkan ketat dari dana infaq dan wakaf sesuai syariat.'
      },
      {
        icon: 'book-open',
        title: 'Beasiswa Santri Vokasi',
        description: 'Menjamin biaya pendidikan, sarana lab komputer, asrama, dan nutrisi sehat santri.'
      },
      {
        icon: 'file-check',
        title: 'Bukti Sah Pengurang Pajak',
        description: 'Bukti setor zakat resmi diakui untuk pelaporan SPT tahunan PPh.'
      },
      {
        icon: 'users',
        title: 'Penyaluran Produktif & Terukur',
        description: 'Mencetak teknopreneur muda mandiri yang berdaya saing industri.'
      }
    ],
    
    galleryBadge: 'DOKUMENTASI KBM & PRESTASI SANTRI',
    galleryTitle: 'Aktivitas Santri Penerima Manfaat Zakat',
    gallerySubtitle: 'Dokumentasi nyata kegiatan pembelajaran vokasi terapan, kemandirian asrama, dan prestasi santri di kampus Jonggol.',
    galleryItems: [
      {
        id: 'gal-z1',
        title: 'Praktik Pembelajaran Vokasi Santri',
        category: 'Pendidikan Vokasi',
        image: '/gambar-bahan/kbm kelas 1.jpeg',
        status: 'Kegiatan Belajar Aktif',
        caption: 'Santri vokasi mendalami materi teknologi dan rekayasa terapan untuk kesiapan kerja industri.'
      },
      {
        id: 'gal-z2',
        title: 'Kemandirian Belajar di Asrama',
        category: 'Bina Karakter FAST',
        image: '/gambar-bahan/belajar mandiri.jpeg',
        status: 'Rutinitas Harian',
        caption: 'Membentuk karakter pembelajar mandiri yang disiplin, tekun, dan berakhlak mulia.'
      },
      {
        id: 'gal-z3',
        title: 'Penguatan Adab & Keahlian Terapan',
        category: 'Bimbingan Guru',
        image: '/gambar-bahan/guru ngajar.jpeg',
        status: 'Sesi Pembelajaran',
        caption: 'Guru dan praktisi mengajar langsung di depan kelas untuk mengasah kompetensi santri.'
      },
      {
        id: 'gal-z4',
        title: 'Prestasi Juara Tingkat Nasional',
        category: 'Dampak Nyata',
        image: '/gambar-bahan/juara lomba.jpeg',
        status: 'Prestasi Santri',
        caption: 'Santri vokasi membuktikan keunggulan kompetensi dengan meraih prestasi kejuaraan membanggakan.'
      }
    ],
    
    workflowHeading: 'Alur 4 Langkah Pembayaran & Akad Zakat Sah',
    workflowSteps: [
      {
        number: '01',
        title: 'Hitung Nisab & Harta',
        description: 'Pastikan harta Anda telah mencapai batas nisab (setara 85 gram emas) dan haul (1 tahun) atau hitung zakat profesi bulanan.'
      },
      {
        number: '02',
        title: 'Lafazkan Ijab Qobul Zakat',
        description: 'Berniat zakat karena Allah SWT untuk membersihkan harta dan memberikan hak fakir miskin.'
      },
      {
        number: '03',
        title: 'Tunaikan Melalui Rekening Zakat Khusus',
        description: 'Transfer ke rekening bank khusus zakat yang terpisah dari rekening operasional dan wakaf.'
      },
      {
        number: '04',
        title: 'Terima Bukti Setor & Doa Mustahik',
        description: 'Dapatkan bukti kuitansi zakat elektronik resmi beserta doa keberkahan dari santri dan amil.'
      }
    ],
    
    leadershipBadge: 'DEWAN SYARIAH & PENGELOLA ZAKAT',
    leadershipTitle: 'Pengawasan Syariah Ketat Sesuai Fiqih 8 Asnaf',
    leadershipQuote: '"Zakat adalah kewajiban yang ketentuannya telah ditetapkan Allah SWT secara rinci. Kami memastikan tidak ada satu rupiah pun dana zakat yang dialihkan di luar asnaf yang berhak."',
    leaders: [
      {
        name: 'Dr. H. Ahmad Fauzi, Lc., M.A.',
        role: 'Ketua Dewan Pengawas Syariah',
        credentials: 'Dewan Pakar Fiqih Muamalah DSN-MUI • Alumni Al-Azhar Kairo',
        image: '/media-lp/pengurus-2.jpg',
        quote: 'Memastikan hisab, akad, dan alokasi penerima manfaat zakat 100% patuh syariat.'
      },
      {
        name: 'Ir. H. M. Hakim, M.M.',
        role: 'Pimpinan Lembaga Filantropi GVF',
        credentials: 'Praktisi Manajemen Akuntabilitas Dana Publik',
        image: '/media-lp/pengurus-1.jpg',
        quote: 'Menjamin dana zakat terserap efisien untuk menumbuhkan santri menjadi generasi mandiri yang berdaya.'
      }
    ],
    
    legalitasBadge: 'IZIN AMIL & REKENING ZAKAT',
    legalitasTitle: 'Legalitas Pengelolaan Zakat & Nomor Rekening Khusus',
    legalities: [
      {
        institution: 'Kementerian Agama RI',
        regNumber: 'Izin Operasional Pengelola ZISWAF No. 412/2026',
        authority: 'Izin Penghimpunan dan Pendistribusian Dana Zakat',
        description: 'Lembaga terakreditasi dalam tata kelola amil zakat terpercaya.'
      },
      {
        institution: 'Dewan Syariah Nasional (DSN-MUI)',
        regNumber: 'Fatwa Kepatuhan Syariah No. U-118/DSN-MUI/2026',
        authority: 'Kepatuhan Alokasi 8 Asnaf',
        description: 'Telah diaudit dan dinyatakan patuh terhadap kaidah fiqih zakat.'
      }
    ],
    bankAccounts: [
      {
        bankName: 'Bank Syariah Indonesia (BSI) - Khusus Zakat',
        accountNumber: '7238890045',
        accountHolder: 'Yayasan GVF - Zakat Maal & Profesi',
        code: '451'
      },
      {
        bankName: 'Bank Mandiri - Khusus Zakat',
        accountNumber: '1330024589928',
        accountHolder: 'Yayasan Global Village Fund Zakat',
        code: '008'
      }
    ],
    
    faqBadge: 'FAQ ZAKAT',
    faqTitle: 'Pertanyaan Fiqih Seputar Penunaian Zakat',
    faqs: [
      {
        question: 'Bagaimana cara menghitung zakat profesi bulanan?',
        answer: 'Zakat profesi dihitung 2.5% dari penghasilan kotor atau bersih per bulan jika akumulasi setahunnya telah mencapai nisab setara 85 gram emas (sekitar Rp 10.270.833 per bulan sesuai harga emas terkini).'
      },
      {
        question: 'Apakah dana zakat boleh dipakai untuk membangun gedung pesantren?',
        answer: 'Di GVF, pembangunan fisik gedung didanai oleh Wakaf dan Infaq. Dana zakat dikhususkan untuk hak asnaf (seperti beasiswa penuh pendidikan vokasi, asrama, sarana lab komputer, dan konsumsi sehat santri berdaya sebagai asnaf Fi Sabilillah dan Ibnu Sabil).'
      },
      {
        question: 'Apakah bukti setor zakat di GVF dapat mengurangi pajak penghasilan?',
        answer: 'Ya, kuitansi resmi zakat yang diterbitkan lembaga berizin dapat dilampirkan sebagai bukti pengurang penghasilan bruto dalam pelaporan SPT Tahunan PPh Orang Pribadi maupun Badan.'
      }
    ],
    ctaBannerHeading: 'Konsultasi Perhitungan Zakat Bersama Amil Ahli',
    ctaBannerText: 'Bingung menghitung zakat saham, tabungan, atau aset perdagangan Anda? Konsultasikan gratis bersama konsultan fiqih kami.'
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
    heroBgImage: '/gambar design/interior masjid.jpg',
    
    pricingHeading: 'Pilih Paket Sedekah Pangan Santri',
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
        estimation: 'Alokasi: Penyaluran rutin setiap pekan',
        isPopular: false,
        deliverables: [
          { bold: '5 kg Beras Pulen Berkualitas', text: 'Beras higienis untuk konsumsi makan santri asrama' },
          { bold: 'Minyak Goreng & Telur Segar', text: 'Bahan pokok kaya protein bagi santri penghafal Quran' },
          { bold: 'Konsumsi Harian Terjamin', text: 'Menopang makan siang dan malam santri di asrama Jonggol' },
          { bold: 'Dimasak Higienis Dapur Santri', text: 'Dikelola mandiri dan dinikmati bersama seluruh santri' }
        ],
        ctaText: 'Sedekah Pangan Sekarang'
      },
      {
        id: 'sedekah-nutrisi-tahfidz',
        title: 'Sedekah Nutrisi Tahfidz',
        subtitle: 'Paket Madu, Susu & Buah Segar',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '',
        priceDesc: 'Per paket nutrisi pekanan',
        estimation: 'Alokasi: Asupan daya ingat santri',
        isPopular: true,
        deliverables: [
          { bold: 'Susu Murni & Madu Asli', text: 'Menjaga stamina dan konsentrasi hafalan Al-Quran 30 juz' },
          { bold: 'Buah Segar Petani Lokal', text: 'Mendukung vitamin harian sekaligus memberdayakan warga Jonggol' },
          { bold: 'Multivitamin Daya Tahan', text: 'Menjaga daya tahan tubuh santri dari kelelahan belajar' },
          { bold: 'Doa Khusus Penghafal Quran', text: 'Nama muhsinin didoakan khusus dalam halaqah subuh dan maghrib' }
        ],
        ctaText: 'Sedekah Nutrisi Sekarang'
      },
      {
        id: 'sedekah-dapur-umum',
        title: 'Sedekah Dapur Umum & Beras 25kg',
        subtitle: 'Paket Lumbung Pangan Pesantren',
        pricePrefix: 'Rp ',
        priceAmount: '350.000',
        priceUnit: '',
        priceDesc: 'Per karung 25kg beras + lauk pauk',
        estimation: 'Alokasi: Ketahanan pangan sebulan santri',
        isPopular: false,
        deliverables: [
          { bold: '1 Karung Beras 25 Kilogram', text: 'Menjamin ketersediaan beras di lumbung dapur asrama' },
          { bold: 'Lauk Pauk & Sayuran Segar', text: 'Paket komplit untuk puluhan porsi makan bergizi santri' },
          { bold: 'Gas Memasak & Bumbu Dapur', text: 'Menopang operasional dapur umum pesantren selama 1 bulan' },
          { bold: 'Pahala Tiap Butir Beras', text: 'Setiap butir beras menjadi energi santri mengaji dan beribadah' }
        ],
        ctaText: 'Sedekah Lumbung Pangan'
      }
    ],
    addonTitle: 'Pilihan Donasi Sedekah Tambahan',
    addonItems: [
      {
        name: 'Sedekah Sarapan Santri',
        desc: 'Paket sarapan sehat bubur/nasi uduk sebelum halaqah subuh santri',
        price: 'Rp 15.000',
        availability: 'Tersedia harian'
      },
      {
        name: 'Sedekah Buah & Sayur Segar',
        desc: 'Asupan serat dan vitamin dari panen petani binaan Jonggol',
        price: 'Rp 50.000',
        availability: 'Tersedia mingguan'
      },
      {
        name: 'Sedekah Daging & Protein',
        desc: 'Ayam kampung, telur, dan ikan lele kolam santri mandiri',
        price: 'Rp 100.000',
        availability: 'Tersedia untuk santri tahfidz'
      },
      {
        name: 'Sedekah Tabung Gas & Dapur',
        desc: 'Bahan bakar memasak makanan harian santri asrama',
        price: 'Rp 175.000',
        availability: 'Tersedia bulanan'
      },
      {
        name: 'Sedekah Paket Buka Puasa Sunnah',
        desc: 'Kurma, takjil, dan makan malam puasa Senin-Kamis 50+ santri',
        price: 'Rp 750.000',
        availability: 'Tersedia setiap Senin & Kamis'
      }
    ],
    
    deepDiveBadge: 'KETAHANAN PANGAN PESANTREN',
    deepDiveTitle: 'Menjamin Santri Vokasi Tumbuh Sehat, Berenergi, & Fokus Belajar',
    deepDiveLead: 'Rasulullah SAW bersabda: "Sedekah itu memadamkan dosa sebagaimana air memadamkan api." (HR. Tirmidzi)',
    deepDiveStory1: 'Di SMK Skill Village, para santri menjalani rutinitas padat: pembinaan adab FAST, pendalaman syariah, serta praktik kejuruan industri dan agroteknologi hingga sore hari. Mereka memerlukan asupan nutrisi sehat dan higienis agar stamina fisik dan fokus belajar senantiasa terjaga.',
    deepDiveStory2: 'Sedekah pangan Anda dialokasikan langsung untuk operasional dapur asrama: pengadaan beras berkualitas, lauk berprotein seimbang, dan sayuran segar hasil panen agro-technopark. Setiap nutrisi yang mereka konsumsi menjadi energi kebaikan yang mengalirkan pahala jariyah abadi bagi Anda.',
    deepDiveBannerImage: '/gambar-bahan/gh update 2.jpeg',
    valueBoxes: [
      {
        icon: 'sunrise',
        title: 'Keberkahan & Kelapangan Rezeki',
        description: 'Mendapat keutamaan sedekah yang mendatangkan kelapangan hidup.'
      },
      {
        icon: 'smile',
        title: 'Konsumsi Sehat Santri Vokasi',
        description: 'Memastikan santri makan kenyang dengan nutrisi higienis dan bergizi.'
      },
      {
        icon: 'coffee',
        title: 'Konsisten & Ringan Dijalankan',
        description: 'Nominal terjangkau namun membawa dampak nyata setiap hari.'
      },
      {
        icon: 'shield',
        title: 'Penyaluran Amanah 100%',
        description: 'Dikelola secara transparan oleh pengasuh dapur asrama pesantren.'
      }
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
    
    faqBadge: 'FAQ SHODAQOH',
    faqTitle: 'Pertanyaan Seputar Shodaqoh',
    faqs: [
      {
        question: 'Kapan waktu terbaik menunaikan shodaqoh?',
        answer: 'Shodaqoh dapat ditunaikan kapan saja sepanjang hari, baik di pagi hari maupun saat melihat kesempatan berbuat kebaikan bagi sesama.'
      },
      {
        question: 'Apakah boleh shodaqoh dilakukan secara transfer digital?',
        answer: 'Sangat boleh. Transfer digital maupun scan QRIS langsung memindahkan kepemilikan dana Anda untuk kepentingan umat, sah secara syar\'i dan lebih cepat dimanfaatkan santri.'
      }
    ],
    ctaBannerHeading: 'Jadikan Shodaqoh Sebagai Rutinitas Harian',
    ctaBannerText: 'Simpan nomor rekening atau QRIS resmi GVF untuk memudahkan Anda berinfaq dan bersedekah setiap hari.'
  }
};
