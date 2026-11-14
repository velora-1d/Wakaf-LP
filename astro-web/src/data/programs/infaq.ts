// src/data/programs/infaq.ts
import { S3_BASE, type ProgramData } from './types';

export const infaqProgram: ProgramData = {
  slug: 'infaq',
  title: 'Infak: Menguatkan Program, Mendukung Pengembangan',
  heroSubtitle: 'Infak merupakan kontribusi sukarela yang memberikan ruang bagi setiap orang untuk mengambil bagian dalam berbagai upaya kebaikan. Dana infak dikelola untuk mendukung kebutuhan pembangunan, operasional, pendidikan, serta pengembangan sarana dan program pemberdayaan.',
  categoryBadge: 'INFAK PROGRAM & PEMBANGUNAN',
  heroBgImage: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-portrait.webp`,
  
  pricingHeading: 'Pilihan Pos Infak Berkelanjutan',
  pricingSubheading: 'Salurkan infak Anda untuk mendukung pos Pembangunan & Infrastruktur, Kebutuhan Operasional, Pendidikan & Pembinaan, serta Pemberdayaan & Kemandirian.',
  packages: [
    {
      id: 'infaq-pembangunan-infrastruktur',
      title: 'Pembangunan & Infrastruktur',
      subtitle: 'Konstruksi & Material Bangunan',
      pricePrefix: 'Rp ',
      priceAmount: '100.000',
      priceUnit: '',
      priceDesc: 'Per paket partisipasi konstruksi',
      estimation: 'Alokasi: Semen, hebel, besi, baja ringan, atap & sanitasi',
      isPopular: false,
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
      title: 'Kebutuhan Operasional',
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
      title: 'Pendidikan & Pembinaan',
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
  addonTitle: 'Infak Pemberdayaan & Kemandirian Usaha',
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
  
  deepDiveBadge: 'FUNGSI & PILAR INFAK',
  deepDiveTitle: 'Menguatkan Program, Mendukung Pengembangan',
  deepDiveLead: 'Infak merupakan kontribusi sukarela yang memberikan ruang bagi setiap orang untuk mengambil bagian dalam berbagai upaya kebaikan. Dana infak dikelola untuk mendukung kebutuhan pembangunan, operasional, pendidikan, serta pengembangan sarana dan program pemberdayaan.',
  deepDiveStory1: 'Melalui ragam pos infak terarah: Pembangunan & Infrastruktur, Kebutuhan Operasional, Pendidikan & Pembinaan, serta Pemberdayaan & Kemandirian, setiap rupiah yang Anda titipkan menjadi energi nyata yang menggerakkan roda peradaban di Jonggol.',
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
  deepDiveSubblock1Title: 'Kebutuhan Pembangunan dan Infrastruktur',
  deepDiveSubblock1Desc1: 'Mendukung pemenuhan berbagai kebutuhan konstruksi, material, dan perlengkapan untuk pembangunan, renovasi, serta pengembangan fasilitas: semen, pasir, split, besi beton, baja ringan, bata ringan, keramik, plafon, pintu, jendela, instalasi listrik, air, dan sanitasi.',
  deepDiveSubblock1Desc2: 'Kebutuhan ini mencakup pembangunan dan pengembangan berbagai fasilitas, seperti masjid, asrama, ruang kelas, dapur, sanitasi, serta sarana penunjang lainnya.',
  deepDiveSubblock2Title: 'Operasional, Pendidikan & Kemandirian Usaha',
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
};
