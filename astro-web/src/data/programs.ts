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

export interface ProgramData {
  slug: 'wakaf' | 'zakat' | 'infaq' | 'sedekah';
  title: string;
  heroSubtitle: string;
  categoryBadge: string;
  heroBgImage: string;
  
  // Section 2: Pricing Packages (Exact 3 Columns ala ISAVO)
  pricingHeading: string;
  pricingSubheading: string;
  packages: PricingPackage[];
  
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
    title: 'Wakaf Produktif & Pendidikan Terpadu',
    heroSubtitle: 'Investasi Abadi Membangun Masjid Khairu Ummah & SMK Skill Village Islamic School di Kawasan Terpadu Jonggol Bogor.',
    categoryBadge: '#WAKAF PRODUKTIF & PENDIDIKAN',
    heroBgImage: '/gambar design/belakang masjid.jpg',
    
    pricingHeading: 'Pilih Paket Wakaf Terukur',
    pricingSubheading: 'Kami menyediakan pilihan paket wakaf terukur yang dapat disesuaikan dengan niat dan kemampuan Anda. Semua akad sah, transparan, dan terdaftar di Badan Wakaf Indonesia.',
    packages: [
      {
        id: 'wakaf-lahan-1m',
        title: 'Wakaf Lahan 1 m²',
        subtitle: 'Paket Pembebasan Lahan Abadi',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '/ m²',
        priceDesc: 'Harga per meter persegi lahan abadi',
        estimation: 'Estimasi 1-3 hari kerja terbit AIW Digital',
        isPopular: false,
        deliverables: [
          { bold: 'Survey & Lokasi Riil', text: 'Kunjungan langsung ke kawasan ±3 hektare Sukasirna Jonggol Bogor' },
          { bold: 'Akta Ikrar Wakaf (AIW)', text: 'Dokumen AIW digital resmi berkode verifikasi QR BWI' },
          { bold: 'Pahala Abadi Berkelanjutan', text: 'Mengalir tanpa putus dari setiap ibadah jamaah & belajar santri' },
          { bold: 'Laporan Progres Fisik', text: 'Pembaruan visual berkala kondisi pembebasan tanah via WhatsApp' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'wakaf-ruang-belajar',
        title: 'Paket Ruang Belajar',
        subtitle: 'Paket Lengkap Sarana & 5 m² Lahan',
        pricePrefix: 'Rp ',
        priceAmount: '750.000',
        priceUnit: '/ paket',
        priceDesc: 'Paket sarana terpadu pendidikan santri',
        estimation: 'Penyaluran langsung ke pembangunan fisik aktif',
        isPopular: true,
        deliverables: [
          { bold: 'Pembebasan 5 m² Lahan', text: 'Termasuk sertifikasi wakaf kawasan terpadu BWI' },
          { bold: 'Fasilitas Studio & Lab', text: 'Dukungan meja, kursi ergonomis, dan lab komputer SMK santri' },
          { bold: 'Sertifikat Wakaf Fisik', text: 'Sertifikat berbingkai eksklusif bertanda tangan Nazhir Utama' },
          { bold: 'Undangan Khusus Wakif', text: 'Akses silaturahim akbar & peletakan batu pertama proyek' },
          { bold: 'Laporan Finansial Bulanan', text: 'Audit progres pembangunan dan penyerapan dana publik' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'wakaf-fasilitas-lengkap',
        title: 'Paket Korporat / Keluarga',
        subtitle: 'Paket Terpadu & Inskripsi Nama',
        pricePrefix: 'Rp ',
        priceAmount: '2.500.000',
        priceUnit: '/ paket',
        priceDesc: 'Wakaf kolektif keluarga atau korporasi',
        estimation: 'Dukungan penuh sarana jangka panjang',
        isPopular: false,
        deliverables: [
          { bold: 'Inskripsi Nama Wakif', text: 'Nama wakif / atas nama orang tua tertera pada prasasti masjid' },
          { bold: 'Beasiswa Penuh Santri', text: 'Menjamin SPP, asrama, dan makan 1 santri dhuafa berprestasi' },
          { bold: 'Sertifikat Resmi & Akta BWI', text: 'Legalisasi berkekuatan hukum penuh dari Nazhir Resmi' },
          { bold: 'Akses VIP Riset Kawasan', text: 'Kunjungan berkala dan riset agro-technopark bersama keluarga' }
        ],
        ctaText: 'Konsultasi Sekarang'
      }
    ],
    
    deepDiveBadge: 'URGENSI & DOKUMENTASI',
    deepDiveTitle: 'Membangun Pusat Peradaban Mandiri Berbasis Alam di Jonggol',
    deepDiveLead: 'Kawasan seluas ±3 hektare ini dirancang bukan sekadar kompleks bangunan, melainkan ekosistem terpadu yang memadukan ibadah khusyuk, pendidikan vokasi berdaya saing global, dan kelestarian alam.',
    deepDiveStory1: 'Selama bertahun-tahun, santri-santri berprestasi dari kalangan dhuafa menghadapi keterbatasan akses sarana belajar terapan yang memadai. Global Village Fund menginisiasi pembebasan lahan wakaf abadi untuk mendirikan SMK Skill Village Islamic School dengan konsentrasi agroteknologi dan digital multimedia, serta Garden Mosque Khairu Ummah sebagai poros spiritual.',
    deepDiveStory2: 'Melalui prinsip wakaf produktif, aset yang dibangun tidak akan pernah menyusut atau dijual. Setiap meter lahan yang Anda wakafkan akan terus melahirkan lulusan santri mandiri, menghidupkan majelis ilmu, dan menghasilkan manfaat sosial berkesinambungan hingga generasi mendatang.',
    deepDiveBannerImage: '/gambar design/interior masjid.jpg',
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
    gallerySubtitle: 'Inspeksi langsung visualisasi desain arsitektur, masterplan 3D, dan progres riil di Sukasirna, Jonggol, Kabupaten Bogor.',
    galleryItems: [
      {
        id: 'gal-1',
        title: 'Fasad Belakang & Kolam Lanskap Alami',
        category: 'Masjid Khairu Ummah',
        image: '/gambar design/belakang masjid.jpg',
        status: 'Tahap Pondasi & Struktur',
        caption: 'Konsep arsitektur tropis modern dengan sirkulasi silang dan ruang terbuka hijau terintegrasi.'
      },
      {
        id: 'gal-2',
        title: 'Sanctuary Utama & Mihrab Kayu Akustik',
        category: 'Interior Rumah Ibadah',
        image: '/gambar design/interior masjid.jpg',
        status: 'Finishing & Desain Rinci',
        caption: 'Ruang salat utama berkapasitas 500 jamaah dengan bukaan skylight vertikal yang sejuk.'
      },
      {
        id: 'gal-3',
        title: 'Learning Studio & Workshop Vokasi',
        category: 'SMK Skill Village',
        image: '/gambar design/learning studio & workshop.jpg',
        status: 'Peletakan Batu Pertama',
        caption: 'Gedung belajar kolaboratif dilengkapi lab digital multimedia dan bengkel rekayasa.'
      },
      {
        id: 'gal-4',
        title: 'Collaborative Skywalk Learning Center',
        category: 'SMK Skill Village',
        image: '/gambar design/skywalk learning room.jpg',
        status: 'Masterplan Lapangan',
        caption: 'Jembatan penghubung asrama dan ruang studio berkonsep ramah lingkungan.'
      },
      {
        id: 'gal-5',
        title: 'Plaza Wudhu & Eco-Drainase Higienis',
        category: 'Fasilitas Sanitasi',
        image: '/gambar design/tempat wudu.jpg',
        status: 'Pekerjaan Struktur',
        caption: 'Sistem daur ulang air wudhu untuk pengairan kebun dan tanaman hortikultura pesantren.'
      },
      {
        id: 'gal-6',
        title: 'Sistem Energi Surya Hijau (Solar Technopark)',
        category: 'Green Waqf Produktif',
        image: '/gambar design/panel surya.jpg',
        status: 'Instalasi Bertahap',
        caption: 'Penyediaan energi ramah lingkungan mandiri untuk kebutuhan listrik seluruh kompleks.'
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
    title: 'Zakat Maal & Zakat Profesi',
    heroSubtitle: 'Bersihkan Harta, Sucikan Jiwa, dan Berdayakan 8 Asnaf Melalui Pendidikan & Kemandirian Santri Dhuafa.',
    categoryBadge: '#ZAKAT MAAL & PROFESI 2.5%',
    heroBgImage: '/gambar design/interior masjid.jpg',
    
    pricingHeading: 'Pilih Paket Zakat Wajib',
    pricingSubheading: 'Tunaikan kewajiban rukun Islam ke-3 Anda dengan tepat nisab, tepat hisab, dan disalurkan secara amanah kepada mustahik yang berhak.',
    packages: [
      {
        id: 'zakat-profesi-bulanan',
        title: 'Zakat Penghasilan / Profesi',
        subtitle: 'Paket Zakat Penghasilan Bulanan',
        pricePrefix: 'Rp ',
        priceAmount: '250.000',
        priceUnit: '/ bulan',
        priceDesc: 'Estimasi nisab 2.5% penghasilan bersih',
        estimation: 'Penyaluran bulanan untuk kebutuhan hidup mustahik',
        isPopular: false,
        deliverables: [
          { bold: 'Tepat Hisab 2.5%', text: 'Sesuai fatwa MUI No. 3 Tahun 2003 tentang Zakat Penghasilan' },
          { bold: 'Beasiswa Santri Dhuafa', text: 'Menjamin SPP dan asrama santri yatim penghafal Quran' },
          { bold: 'Kuitansi Bukti Setor', text: 'Bukti resmi yang dapat digunakan sebagai pengurang pajak (NPWP)' },
          { bold: 'Laporan Penyaluran Rutin', text: 'Update dokumentasi mustahik dikirim setiap akhir bulan' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'zakat-maal-tabungan',
        title: 'Zakat Maal Tabungan',
        subtitle: 'Paket Lengkap Zakat Emas & Simpanan',
        pricePrefix: 'Rp ',
        priceAmount: '2.125.000',
        priceUnit: '/ tahun',
        priceDesc: 'Setara haul 1 tahun (nisab 85g emas)',
        estimation: 'Penyaluran modal bergulir santri mandiri',
        isPopular: true,
        deliverables: [
          { bold: 'Hisab Sesuai Nisab Emas', text: 'Simpanan mengendap 1 tahun hijriyah dibersihkan haknya' },
          { bold: 'Pemberdayaan Ekonomi', text: 'Bantuan modal usaha mikro untuk keluarga mustahik sekitar Jonggol' },
          { bold: 'Akta Pengesahan Muzakki', text: 'Dokumen legalitas penunaian zakat berkekuatan syariah' },
          { bold: 'Doa Khusus Santri', text: 'Didoakan dalam halaqah subuh santri penghafal Al-Quran' },
          { bold: 'Laporan Audit Lembaga', text: 'Transparansi pemisahan rekening zakat yang ketat' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'zakat-perniagaan',
        title: 'Zakat Bisnis & Perniagaan',
        subtitle: 'Paket Korporasi & Usaha Berkah',
        pricePrefix: '2.5% ',
        priceAmount: 'Laba Bersih',
        priceUnit: '/ tahun',
        priceDesc: 'Dihitung dari aktiva lancar dikurangi hutang',
        estimation: 'Konsultasi hisab akuntansi syariah gratis',
        isPopular: false,
        deliverables: [
          { bold: 'Audit Akuntansi Syariah', text: 'Pendampingan penghitungan aset lancar usaha bersama akuntan' },
          { bold: 'Pemberdayaan Skala Luas', text: 'Penyaluran ke program vokasi teknologi tepat guna santri' },
          { bold: 'Sertifikat Muzakki Perusahaan', text: 'Bukti CSR syariah dan pengurang pajak badan resmi' },
          { bold: 'Laporan Dampak Sosial', text: 'Metrik terukur peningkatan taraf hidup keluarga dhuafa' }
        ],
        ctaText: 'Konsultasi Sekarang'
      }
    ],
    
    deepDiveBadge: 'HAK 8 ASNAF',
    deepDiveTitle: 'Transformasi Mustahik Menjadi Muzakki Berdaya Saing',
    deepDiveLead: 'Zakat di Global Village Fund tidak hanya dibagikan secara konsumtif, melainkan dialokasikan untuk pemutusan rantai kemiskinan antargenerasi melalui pendidikan vokasi terapan.',
    deepDiveStory1: 'Sesuai dengan ketentuan Surah At-Taubah ayat 60, zakat Anda disalurkan kepada asnaf fakir, miskin, dan fi sabilillah. Anak-anak dari keluarga tidak mampu diberikan beasiswa penuh di SMK Skill Village Islamic School untuk menguasai keterampilan teknologi pertanian dan digital.',
    deepDiveStory2: 'Dengan kurikulum terpadu berbasis alam, para santri dididik agar mandiri secara ekonomi saat lulus, sehingga kelak mereka mampu mengangkat martabat keluarganya dari penerima zakat (mustahik) menjadi pembayar zakat (muzakki).',
    deepDiveBannerImage: '/gambar design/learning studio & workshop.jpg',
    valueBoxes: [
      {
        icon: 'check-circle',
        title: '100% Hak Asnaf Terlindungi',
        description: 'Dana zakat dipisahkan ketat dari dana infaq dan wakaf sesuai syariat.'
      },
      {
        icon: 'book-open',
        title: 'Pendidikan Vokasi Santri Dhuafa',
        description: 'Menjamin biaya SPP, asrama, makan, dan buku santri yatim dan dhuafa.'
      },
      {
        icon: 'file-check',
        title: 'Bukti Sah Pengurang Pajak',
        description: 'Bukti setor zakat resmi diakui untuk pelaporan SPT tahunan.'
      },
      {
        icon: 'users',
        title: 'Penyaluran Produktif & Terukur',
        description: 'Menciptakan dampak sosial jangka panjang yang terverifikasi di lapangan.'
      }
    ],
    
    galleryBadge: 'DOKUMENTASI MUSTAHIK & BELAJAR',
    galleryTitle: 'Aktivitas Santri Penerima Manfaat Zakat',
    gallerySubtitle: 'Dokumentasi nyata kegiatan santri dhuafa penghafal Quran dan vokasi terapan di kampus Jonggol.',
    galleryItems: [
      {
        id: 'gal-z1',
        title: 'Praktik Laboratorium Digital Santri',
        category: 'Pendidikan Asnaf',
        image: '/gambar design/learning studio & workshop.jpg',
        status: 'Kegiatan Belajar Aktif',
        caption: 'Santri dhuafa belajar coding dan multimedia untuk bekal kemandirian kerja.'
      },
      {
        id: 'gal-z2',
        title: 'Kajian Fiqih & Halaqah Quran',
        category: 'Bina Spiritual',
        image: '/gambar design/interior mesjid 2.jpg',
        status: 'Rutinitas Ba\'da Subuh',
        caption: 'Membentuk karakter santri berakhlak mulia dan mutqin dalam hafalan Al-Quran.'
      },
      {
        id: 'gal-z3',
        title: 'Praktik Agroteknologi di Lahan Hijau',
        category: 'Vokasi Terapan',
        image: '/gambar design/gh learning area.jpg',
        status: 'Kemandirian Pangan',
        caption: 'Pelatihan budidaya tanaman presisi modern di greenhouse pesantren.'
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
        quote: 'Menjamin dana zakat terserap efisien untuk membebaskan mustahik dari jerat kemiskinan.'
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
        answer: 'Zakat profesi dihitung 2.5% dari penghasilan kotor atau bersih per bulan jika akumulasi setahunnya telah mencapai nisab setara 85 gram emas (sekitar Rp 7-8 juta per bulan tergantung harga emas terkini).'
      },
      {
        question: 'Apakah dana zakat boleh dipakai untuk membangun gedung pesantren?',
        answer: 'Di GVF, pembangunan fisik gedung didanai oleh Wakaf dan Infaq. Dana zakat dikhususkan untuk asnaf (seperti beasiswa SPP, asrama, makan, dan buku santri miskin) serta pelatihan kemandirian santri dhuafa (asnaf Fakir, Miskin, dan Fi Sabilillah).'
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
    title: 'Infaq Pembangunan & Fasilitas Dakwah',
    heroSubtitle: 'Percepat Penyelesaian Fasilitas Ibadah, Perpustakaan, dan Studio Praktik Santri di Jonggol.',
    categoryBadge: '#INFAQ SARANA & DAKWAH',
    heroBgImage: '/gambar design/learning studio & workshop.jpg',
    
    pricingHeading: 'Pilih Paket Infaq Sarana',
    pricingSubheading: 'Infaq sunnah fleksibel tanpa batas nisab untuk mempercepat tersedianya material bangunan dan fasilitas sarana belajar santri.',
    packages: [
      {
        id: 'infaq-material-semen',
        title: 'Infaq Semen & Material',
        subtitle: 'Paket Konstruksi Bata & Semen',
        pricePrefix: 'Rp ',
        priceAmount: '75.000',
        priceUnit: '/ sak semen',
        priceDesc: 'Pengadaan material semen standar SNI',
        estimation: 'Langsung dibelanjakan untuk pengecoran lapangan',
        isPopular: false,
        deliverables: [
          { bold: '1 Sak Semen SNI', text: 'Digunakan untuk pengecoran struktur lantai dan pilar masjid' },
          { bold: 'Pencatatan Buku Donasi', text: 'Tercatat rapi dalam buku donatur pembangunan fisik' },
          { bold: 'Pahala Berkelanjutan', text: 'Mengalir dari setiap sujud jamaah di atas lantai masjid' },
          { bold: 'Foto Laporan Material', text: 'Dokumentasi kedatangan material di gudang Jonggol' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'infaq-perlengkapan-kelas',
        title: 'Paket Sarana Belajar',
        subtitle: 'Paket Lengkap Meja & Kursi Santri',
        pricePrefix: 'Rp ',
        priceAmount: '350.000',
        priceUnit: '/ set sarana',
        priceDesc: '1 set meja kursi belajar ergonomis SMK',
        estimation: 'Pengadaan bertahap sesuai kebutuhan kelas',
        isPopular: true,
        deliverables: [
          { bold: '1 Set Meja Kursi Belajar', text: 'Fasilitas belajar modern ramah postur tubuh santri' },
          { bold: 'Kitab & Literatur Digital', text: 'Dukungan buku perpustakaan dan software desain SMK' },
          { bold: 'Plat Nama Donatur', text: 'Dicatat pada inventaris sarana dakwah yayasan' },
          { bold: 'Doa Khusus Santri', text: 'Didoakan setiap memulai sesi belajar pagi dan petang' },
          { bold: 'Laporan Foto Penyerahan', text: 'Dokumentasi santri saat menempati ruang kelas baru' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'infaq-air-bersih',
        title: 'Instalasi Sanitasi & Wudhu',
        subtitle: 'Paket Titik Sanitasi Eco-Drainase',
        pricePrefix: 'Rp ',
        priceAmount: '1.000.000',
        priceUnit: '/ titik',
        priceDesc: 'Sedekah air bersih mengalir untuk ratusan jamaah',
        estimation: 'Instalasi pipa dan kran higienis hemat air',
        isPopular: false,
        deliverables: [
          { bold: 'Kran Wudhu & Filter Bersih', text: 'Air wudhu higienis tersaring dan bebas bau' },
          { bold: 'Sistem Daur Ulang Taman', text: 'Air bekas wudhu dialirkan untuk menyiram tanaman pesantren' },
          { bold: 'Pahala Sedekah Air Terhebat', text: 'Sedekah air adalah sedekah paling utama dalam hadits nabi' },
          { bold: 'Sertifikat Apresiasi Donatur', text: 'Tanda bukti sumbangsih sarana kebersihan rumah Allah' }
        ],
        ctaText: 'Konsultasi Sekarang'
      }
    ],
    
    deepDiveBadge: 'AKSELERASI DAKWAH',
    deepDiveTitle: 'Menyempurnakan Sarana Ibadah & Pendidikan yang Nyaman',
    deepDiveLead: 'Infaq Anda adalah motor penggerak percepatan pembangunan fisik di lapangan. Setiap donasi langsung dialokasikan untuk pembelian material konstruksi dan pengadaan sarana belajar.',
    deepDiveStory1: 'Pembangunan Garden Mosque Khairu Ummah dan ruang vokasi SMK Skill Village membutuhkan ribuan sak semen, bata roster penyejuk alami, instalasi kabel listrik, dan meja belajar santri. Infaq dari Anda memastikan pekerjaan para tukang dan teknisi di lapangan tidak terhenti.',
    deepDiveStory2: 'Berbeda dengan zakat yang terikat pada 8 asnaf, dana infaq dapat digunakan secara lincah untuk kebutuhan mendesak sarana dan logistik pembangunan, sehingga manfaatnya dapat segera dirasakan oleh jamaah dan masyarakat sekitar.',
    deepDiveBannerImage: '/gambar design/tempat wudu.jpg',
    valueBoxes: [
      {
        icon: 'zap',
        title: 'Realisasi Cepat di Lapangan',
        description: 'Langsung dibelanjakan untuk material bangunan dan fasilitas kelas.'
      },
      {
        icon: 'heart',
        title: 'Amalan Fleksibel Kapan Saja',
        description: 'Tidak terikat waktu haul maupun batasan nominal nisab.'
      },
      {
        icon: 'tool',
        title: 'Material Berkualitas SNI',
        description: 'Spesifikasi material dipilih yang kokoh, ramah lingkungan, dan tahan lama.'
      },
      {
        icon: 'camera',
        title: 'Laporan Foto Belanja Material',
        description: 'Kwitansi dan bukti fisik material difoto dan dilaporkan terbuka.'
      }
    ],
    
    galleryBadge: 'DOKUMENTASI SARANA & MATERIAL',
    galleryTitle: 'Progress Pengadaan Material & Fasilitas',
    gallerySubtitle: 'Transparansi pengadaan sarana sanitasi wudhu, interior, dan ruang belajar santri.',
    galleryItems: [
      {
        id: 'gal-i1',
        title: 'Area Sanitasi Wudhu Ramah Lingkungan',
        category: 'Fasilitas Air Bersih',
        image: '/gambar design/tempat wudu.jpg',
        status: 'Instalasi Pipa & Kran',
        caption: 'Penyediaan kran wudhu hemat air dengan sistem filter sirkulasi taman.'
      },
      {
        id: 'gal-i2',
        title: 'Fasad Roster & Pencahayaan Alami',
        category: 'Material Arsitektur',
        image: '/gambar design/belakang masjid (2).jpg',
        status: 'Pemasangan Dinding Roster',
        caption: 'Roster tanah liat lokal yang menyaring angin dan sinar matahari agar sejuk alami.'
      },
      {
        id: 'gal-i3',
        title: 'Pengadaan Meja Studio Belajar',
        category: 'Sarana Kelas',
        image: '/gambar design/learning studio & workshop.jpg',
        status: 'Pengadaan Bertahap',
        caption: 'Ruang belajar berfasilitas lengkap untuk mencetak santri unggul.'
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
    
    faqBadge: 'FAQ INFAQ',
    faqTitle: 'Pertanyaan Seputar Infaq Pembangunan',
    faqs: [
      {
        question: 'Apa perbedaan mendasar antara Wakaf dan Infaq?',
        answer: 'Wakaf berfokus pada aset abadi yang pokoknya tidak boleh berkurang atau musnah (seperti tanah, gedung permanen). Sedangkan Infaq dapat langsung dibelanjakan dan habis dipakai untuk pembelian material (semen, pasir, cat), operasional listrik, maupun konsumsi para pekerja di lapangan.'
      },
      {
        question: 'Apakah boleh berinfaq atas nama keluarga atau almarhum?',
        answer: 'Sangat boleh. Niatkan pahala infaq pembangunan rumah Allah ini mengalir untuk kedua orang tua atau keluarga tercinta.'
      }
    ],
    ctaBannerHeading: 'Punya Material / Bantuan Fisik Langsung?',
    ctaBannerText: 'Yayasan juga menerima sumbangan material langsung (semen, keramik, cat, perangkat komputer). Hubungi tim logistik kami.'
  },

  sedekah: {
    slug: 'sedekah',
    title: 'Sedekah Subuh & Pangan Santri',
    heroSubtitle: 'Awali Hari dengan Doa Malaikat, Cukupi Nutrisi Santri Penghafal Quran di Pondok Pesantren.',
    categoryBadge: '#SEDEKAH SUBUH & PANGAN SANTRI',
    heroBgImage: '/gambar design/interior mesjid 2.jpg',
    
    pricingHeading: 'Pilih Paket Sedekah Pangan',
    pricingSubheading: 'Sedekah harian untuk menjamin makanan bergizi santri dan aksi cepat tanggap kemanusiaan bagi dhuafa sekitar Jonggol.',
    packages: [
      {
        id: 'sedekah-subuh-harian',
        title: 'Sedekah Subuh Harian',
        subtitle: 'Paket Rutin Fajar Berkah',
        pricePrefix: 'Rp ',
        priceAmount: '20.000',
        priceUnit: '/ hari',
        priceDesc: 'Konsisten bernilai besar di hadapan Allah',
        estimation: 'Didoakan malaikat yang turun setiap subuh',
        isPopular: true,
        deliverables: [
          { bold: 'Didoakan Santri Quran', text: 'Disebut dalam doa bersama ba\'da salat subuh berjamaah' },
          { bold: 'Doa Malaikat Fajar', text: 'Mendapat keutamaan doa malaikat pemohon ganti rezeki melimpah' },
          { bold: 'Pengingat Otomatis', text: 'Fitur notifikasi pengingat sedekah fajar via WhatsApp' },
          { bold: 'Kebaikan Konsisten', text: 'Amalan yang dicintai Allah adalah amalan yang dawam/rutin' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'sedekah-pangan-santri',
        title: 'Paket Makan Santri',
        subtitle: 'Paket 1 Hari Pangan Bergizi',
        pricePrefix: 'Rp ',
        priceAmount: '50.000',
        priceUnit: '/ santri / hari',
        priceDesc: 'Sarapan, makan siang, dan makan malam',
        estimation: 'Langsung dibelanjakan ke dapur umum pesantren',
        isPopular: false,
        deliverables: [
          { bold: '3 Kali Makan Sehat', text: 'Menu higienis berprotein untuk santri dhuafa dan yatim' },
          { bold: 'Energi Menghafal Quran', text: 'Menjadi darah daging penuntut ilmu yang membaca kalam Allah' },
          { bold: 'Pahala Berlipat Ganda', text: 'Pahala mengalir dari setiap hafalan dan tilawah santri' },
          { bold: 'Dokumentasi Menu Harian', text: 'Laporan foto kesibukan dapur dan santap bersama santri' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'sedekah-beras-pesantren',
        title: 'Paket Beras 1 Karung',
        subtitle: 'Ketahanan Pangan 25 Kilogram',
        pricePrefix: 'Rp ',
        priceAmount: '375.000',
        priceUnit: '/ karung 25kg',
        priceDesc: 'Persediaan beras premium dapur asrama',
        estimation: 'Mencukupi kebutuhan ratusan santri sepekan',
        isPopular: false,
        deliverables: [
          { bold: 'Beras Premium 25 kg', text: 'Kualitas beras pulen dan bersih bebas pemutih untuk santri' },
          { bold: 'Ketahanan Pangan Pesantren', text: 'Menjamin tidak ada santri yang belajar dalam kondisi lapar' },
          { bold: 'Serah Terima Dapur', text: 'Berita acara penyerahan logistik langsung ke kepala asrama' },
          { bold: 'Sertifikat Tanda Terima', text: 'Bukti tanda terima sedekah pangan resmi dari GVF' }
        ],
        ctaText: 'Konsultasi Sekarang'
      }
    ],
    
    deepDiveBadge: 'BERKAH TIAP PAGI',
    deepDiveTitle: 'Memastikan Santri Penghafal Quran Tumbuh Sehat & Fokus Belajar',
    deepDiveLead: 'Rasulullah SAW bersabda: "Tidak ada satu subuh pun yang dialami hamba-hamba Allah kecuali turun dua malaikat. Salah satunya berdoa: Ya Allah, berikanlah ganti bagi orang yang berinfak."',
    deepDiveStory1: 'Di Pesantren Skill Village, ratusan santri memulai hari sejak pukul 03.30 pagi untuk tahajud, tilawah Al-Quran, dan dilanjutkan sekolah vokasi hingga sore hari. Mereka membutuhkan asupan gizi yang cukup agar tetap sehat dan fokus menyerap ilmu.',
    deepDiveStory2: 'Sedekah Subuh Anda langsung disalurkan ke dapur umum pesantren untuk pengadaan beras, lauk berprotein, sayur mayur, dan buah-buahan segar. Setiap butir beras yang mereka konsumsi menjadi energi yang mengalirkan pahala kebaikan ke rekening akhirat Anda.',
    deepDiveBannerImage: '/gambar design/interior mesjid 2.jpg',
    valueBoxes: [
      {
        icon: 'sunrise',
        title: 'Doa Malaikat di Waktu Subuh',
        description: 'Mendapat keutamaan doa malaikat yang memohonkan ganti rezeki berlipat.'
      },
      {
        icon: 'smile',
        title: 'Senyum Santri Penghafal Quran',
        description: 'Memastikan anak-anak dhuafa dan yatim makan dengan kenyang dan bergizi.'
      },
      {
        icon: 'coffee',
        title: 'Konsisten & Ringan Dijalankan',
        description: 'Nominal terjangkau namun memiliki dampak keberkahan yang luar biasa.'
      },
      {
        icon: 'shield',
        title: 'Penyaluran Amanah 100%',
        description: 'Dikelola oleh pengasuh pesantren yang berdedikasi melayani santri.'
      }
    ],
    
    galleryBadge: 'DOKUMENTASI KESEHARIAN SANTRI',
    galleryTitle: 'Keceriaan & Kemandirian Santri Pesantren',
    gallerySubtitle: 'Potret keseharian santri dalam menuntut ilmu, beribadah, dan beraktivitas di Jonggol.',
    galleryItems: [
      {
        id: 'gal-s1',
        title: 'Halaqah Al-Quran di Sanctuary Utama',
        category: 'Ibadah Harian',
        image: '/gambar design/interior mesjid 2.jpg',
        status: 'Aktivitas Harian',
        caption: 'Santri melantunkan ayat-ayat suci Al-Quran dengan khusyuk di masjid.'
      },
      {
        id: 'gal-s2',
        title: 'Kemandirian Bercocok Tanam di Agro-Technopark',
        category: 'Edukasi Karakter',
        image: '/gambar design/gh learning area 2.jpg',
        status: 'Praktik Pagi',
        caption: 'Santri memanen sayuran segar dari kebun pesantren untuk konsumsi asrama.'
      },
      {
        id: 'gal-s3',
        title: 'Belajar Bersama di Ruang Terbuka',
        category: 'Suasana Belajar',
        image: '/gambar design/skywalk learning room 2.jpg',
        status: 'Diskusi Siang',
        caption: 'Suasana asri dan sejuk mendukung konsentrasi dan kesehatan mental santri.'
      }
    ],
    
    workflowHeading: 'Cara Mudah Memulai Kebiasaan Sedekah Subuh',
    workflowSteps: [
      {
        number: '01',
        title: 'Siapkan Niat Saat Bangun Subuh',
        description: 'Buka web GVF sesaat setelah shalat subuh atau simpan QRIS sedekah di ponsel Anda.'
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
        description: 'Memulai hari dengan sedekah menjauhkan marabahaya dan membuka pintu rezeki yang berkah.'
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
    
    legalitasBadge: 'LEGALITAS & REKENING SEDEKAH',
    legalitasTitle: 'Rekening Resmi Sedekah Subuh & Pangan Santri',
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
    
    faqBadge: 'FAQ SEDEKAH SUBUH',
    faqTitle: 'Pertanyaan Seputar Sedekah Subuh',
    faqs: [
      {
        question: 'Kapan waktu terbaik menunaikan sedekah subuh?',
        answer: 'Waktu terbaik adalah antara adzan subuh berkumandang hingga terbit fajar (syuruq). Pada waktu inilah malaikat turun khusus mendoakan orang-orang yang berinfak.'
      },
      {
        question: 'Apakah boleh sedekah subuh dilakukan secara transfer digital?',
        answer: 'Sangat boleh. Transfer digital maupun scan QRIS langsung memindahkan kepemilikan dana Anda untuk kepentingan umat, sah secara syar\'i dan lebih cepat dimanfaatkan santri.'
      }
    ],
    ctaBannerHeading: 'Jadikan Sedekah Subuh Sebagai Rutinitas Harian',
    ctaBannerText: 'Simpan nomor rekening atau QRIS resmi GVF untuk memudahkan Anda bersedekah setiap fajar menyapa.'
  }
};
