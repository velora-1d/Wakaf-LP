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
          { bold: 'Beasiswa Penuh Santri', text: 'Menjamin SPP, asrama, dan fasilitas belajar santri vokasi berprestasi' },
          { bold: 'Sertifikat Resmi & Akta BWI', text: 'Legalisasi berkekuatan hukum penuh dari Nazhir Resmi' },
          { bold: 'Akses VIP Riset Kawasan', text: 'Kunjungan berkala dan riset agro-technopark bersama keluarga' }
        ],
        ctaText: 'Konsultasi Sekarang'
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
    title: 'Zakat Maal & Zakat Profesi',
    heroSubtitle: 'Bersihkan Harta, Sucikan Jiwa, dan Tunaikan Hak 8 Asnaf Melalui Beasiswa Vokasi & Kemandirian Santri Berdaya.',
    categoryBadge: '#ZAKAT MAAL & PROFESI 2.5%',
    heroBgImage: '/gambar-bahan/belajar kelas.jpeg',
    
    pricingHeading: 'Kalkulator & Pilihan Zakat Sah',
    pricingSubheading: 'Tunaikan kewajiban rukun Islam ke-3 Anda dengan tepat nisab, tepat hisab, dan disalurkan secara amanah kepada mustahik yang berhak.',
    packages: [
      {
        id: 'zakat-profesi-bulanan',
        title: 'Zakat Penghasilan / Profesi',
        subtitle: 'Zakat Penghasilan Bulanan 2,5%',
        pricePrefix: 'Rp ',
        priceAmount: '250.000',
        priceUnit: '/ bulan',
        priceDesc: 'Estimasi nisab 2.5% penghasilan bersih',
        estimation: 'Penyaluran bulanan untuk beasiswa santri vokasi',
        isPopular: false,
        deliverables: [
          { bold: 'Tepat Hisab 2.5%', text: 'Sesuai fatwa MUI No. 3 Tahun 2003 tentang Zakat Penghasilan' },
          { bold: 'Beasiswa Santri Vokasi', text: 'Menjamin biaya pendidikan, lab komputer, dan asrama santri' },
          { bold: 'Kuitansi Bukti Setor', text: 'Bukti resmi yang dapat digunakan sebagai pengurang pajak (NPWP)' },
          { bold: 'Laporan Penyaluran Rutin', text: 'Pembaruan dokumentasi berkala dikirim setiap akhir bulan' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'zakat-maal-tabungan',
        title: 'Zakat Maal Tabungan',
        subtitle: 'Zakat Emas, Deposito & Simpanan',
        pricePrefix: 'Rp ',
        priceAmount: '2.125.000',
        priceUnit: '/ tahun',
        priceDesc: 'Setara haul 1 tahun (nisab 85g emas)',
        estimation: 'Penyaluran modal kemandirian santri vokasi',
        isPopular: true,
        deliverables: [
          { bold: 'Hisab Sesuai Nisab Emas', text: 'Simpanan mengendap 1 tahun hijriyah dibersihkan haknya' },
          { bold: 'Pemberdayaan Vokasi', text: 'Dukungan fasilitas teaching factory santri berdaya di Jonggol' },
          { bold: 'Akta Pengesahan Muzakki', text: 'Dokumen legalitas penunaian zakat berkekuatan syariah' },
          { bold: 'Doa Khusus Santri', text: 'Didoakan dalam halaqah santri vokasi berkarakter FAST' },
          { bold: 'Laporan Audit Lembaga', text: 'Transparansi pemisahan rekening zakat yang ketat' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'zakat-perniagaan',
        title: 'Zakat Bisnis & Perniagaan',
        subtitle: 'Zakat Usaha & Korporasi Berkah',
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
          { bold: 'Laporan Dampak Sosial', text: 'Metrik terukur peningkatan kapasitas santri mandiri' }
        ],
        ctaText: 'Konsultasi Sekarang'
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
    title: 'Infaq Pembangunan & Fasilitas Dakwah',
    heroSubtitle: 'Percepat Penyelesaian Fasilitas Ibadah, Perpustakaan, dan Studio Praktik Santri Vokasi di Jonggol.',
    categoryBadge: '#INFAQ SARANA & DAKWAH',
    heroBgImage: '/gambar-bahan/pelataran mesjid.jpeg',
    
    pricingHeading: 'Gotong Royong Material Fisik',
    pricingSubheading: 'Infaq sunnah fleksibel tanpa batas nisab untuk mempercepat tersedianya material bangunan dan fasilitas sarana belajar santri.',
    packages: [
      {
        id: 'infaq-material-semen',
        title: 'Infaq Semen Konstruksi',
        subtitle: 'Pengadaan Semen Standar SNI',
        pricePrefix: 'Rp ',
        priceAmount: '65.000',
        priceUnit: '/ sak',
        priceDesc: 'Pengadaan semen cor lantai & pilar',
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
        subtitle: 'Meja & Kursi Santri Ergonomis',
        pricePrefix: 'Rp ',
        priceAmount: '350.000',
        priceUnit: '/ set',
        priceDesc: '1 set meja kursi belajar ergonomis SMK',
        estimation: 'Pengadaan bertahap sesuai kebutuhan kelas',
        isPopular: true,
        deliverables: [
          { bold: '1 Set Meja Kursi Belajar', text: 'Fasilitas belajar modern ramah postur tubuh santri' },
          { bold: 'Kitab & Literatur Digital', text: 'Dukungan buku perpustakaan dan software desain SMK' },
          { bold: 'Plat Inventaris Donatur', text: 'Dicatat pada inventaris sarana dakwah yayasan' },
          { bold: 'Doa Khusus Santri', text: 'Didoakan setiap memulai sesi belajar pagi dan petang' },
          { bold: 'Laporan Foto Penyerahan', text: 'Dokumentasi santri saat menempati ruang kelas baru' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'infaq-air-bersih',
        title: 'Instalasi Sanitasi & Wudhu',
        subtitle: 'Titik Sanitasi & Eco-Drainase',
        pricePrefix: 'Rp ',
        priceAmount: '250.000',
        priceUnit: '/ titik',
        priceDesc: 'Kran air wudhu higienis ramah lingkungan',
        estimation: 'Instalasi pipa dan kran higienis hemat air',
        isPopular: false,
        deliverables: [
          { bold: 'Kran Wudhu & Filter Bersih', text: 'Air wudhu higienis tersaring dan bebas bau' },
          { bold: 'Sistem Daur Ulang Taman', text: 'Air bekas wudhu dialirkan untuk menyiram tanaman pesantren' },
          { bold: 'Pahala Sedekah Air Berkah', text: 'Sedekah air adalah sedekah paling utama dalam hadits nabi' },
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
    deepDiveBannerImage: '/gambar-bahan/pelataran mesjid.jpeg',
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
    title: 'Sedekah Pangan & Konsumsi Sehat',
    heroSubtitle: 'Alirkan Kebaikan Berkelanjutan, Cukupi Ketahanan Pangan & Konsumsi Sehat Santri Vokasi di Jonggol.',
    categoryBadge: '#KETAHANAN PANGAN & KONSUMSI SEHAT',
    heroBgImage: '/gambar-bahan/gh update 2.jpeg',
    
    pricingHeading: 'Dukungan Ketahanan Pangan Santri',
    pricingSubheading: 'Amalan rutin untuk menjamin konsumsi sehat, gizi seimbang, dan logistik dapur santri vokasi yang sedang berjuang menuntut ilmu.',
    packages: [
      {
        id: 'sedekah-porsi-sehat',
        title: '1 Porsi Nutrisi Sehat',
        subtitle: '1 Porsi Menu Sehat Santri',
        pricePrefix: 'Rp ',
        priceAmount: '15.000',
        priceUnit: '/ porsi',
        priceDesc: 'Menu higienis berprotein & sayur',
        estimation: 'Langsung disajikan di meja makan santri',
        isPopular: true,
        deliverables: [
          { bold: 'Nutrisi Seimbang', text: 'Karbohidrat, protein, dan sayuran segar panen agro-technopark' },
          { bold: 'Keberkahan Harian', text: 'Mendapat keutamaan sedekah pemohon kelapangan rezeki yang berkah' },
          { bold: 'Energi Belajar Vokasi', text: 'Menjadi sumber tenaga santri dalam menyerap keahlian terapan' },
          { bold: 'Kebaikan Konsisten', text: 'Amalan yang dicintai Allah adalah amalan yang rutin dijalankan' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'sedekah-pangan-harian',
        title: '1 Hari Konsumsi Lengkap',
        subtitle: '3 Kali Makan Sehat Santri',
        pricePrefix: 'Rp ',
        priceAmount: '45.000',
        priceUnit: '/ hari',
        priceDesc: 'Sarapan, makan siang, & makan malam',
        estimation: 'Menjamin kebutuhan makan 1 santri seharian',
        isPopular: false,
        deliverables: [
          { bold: '3 Sesi Makan Bergizi', text: 'Asupan sarapan, makan siang, dan makan malam higienis' },
          { bold: 'Fokus & Konsentrasi', text: 'Menjaga stamina belajar teori di kelas dan praktik di lab/kebun' },
          { bold: 'Pahala Berlipat Ganda', text: 'Pahala mengalir dari setiap aktivitas menuntut ilmu santri' },
          { bold: 'Laporan Dapur Asrama', text: 'Pembaruan dokumentasi kesibukan dapur dan makan bersama' }
        ],
        ctaText: 'Konsultasi Sekarang'
      },
      {
        id: 'sedekah-beras-logistik',
        title: 'Beras Logistik Dapur Asrama',
        subtitle: 'Ketahanan Pangan Beras 10 kg',
        pricePrefix: 'Rp ',
        priceAmount: '150.000',
        priceUnit: '/ sak 10kg',
        priceDesc: 'Persediaan beras premium asrama',
        estimation: 'Cadangan pokok logistik dapur santri',
        isPopular: false,
        deliverables: [
          { bold: 'Beras Pulen Berkualitas', text: 'Beras putih bersih bebas pemutih standar konsumsi sehat' },
          { bold: 'Ketahanan Pangan Asrama', text: 'Menjamin persediaan dapur tetap aman dan tercukupi' },
          { bold: 'Serah Terima Dapur', text: 'Berita acara penyerahan logistik langsung ke kepala asrama' },
          { bold: 'Sertifikat Tanda Terima', text: 'Bukti tanda terima sedekah pangan resmi dari yayasan' }
        ],
        ctaText: 'Konsultasi Sekarang'
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
