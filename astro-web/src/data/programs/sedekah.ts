// src/data/programs/sedekah.ts
import { S3_BASE, type ProgramData } from './types';

export const sedekahProgram: ProgramData = {
  slug: 'sedekah',
  title: 'Sedekah: Berbagi dengan Cara, Menghadirkan Manfaat',
  heroSubtitle: 'Sedekah merupakan bentuk kepedulian yang dapat diwujudkan melalui berbagai bentuk pemberian. Tidak terbatas pada uang, sedekah juga dapat berupa barang, pangan, ilmu, keterampilan, maupun tenaga yang memberikan manfaat.',
  categoryBadge: 'SEDEKAH PANGAN, BARANG & JASA',
  heroBgImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/suasana-kajian-santri-aula.webp`,
  
  pricingHeading: 'Pilihan Pos Sedekah Berkelanjutan',
  pricingSubheading: 'Salurkan sedekah melalui ragam kepedulian: Pangan dan Kebutuhan Konsumsi, Fasilitas dan Perlengkapan, Pendidikan dan Kegiatan, serta Keahlian, Jasa, dan Tenaga.',
  packages: [
    {
      id: 'sedekah-pangan-konsumsi',
      title: 'Pangan dan Kebutuhan Konsumsi',
      subtitle: 'Beras, Makanan Siap Saji & Nutrisi Santri',
      pricePrefix: 'Rp ',
      priceAmount: '25.000',
      priceUnit: '',
      priceDesc: 'Per porsi makan lengkap bernutrisi',
      estimation: 'Alokasi: Beras, minyak, telur, daging/ikan, sayur, susu & air minum',
      isPopular: false,
      deliverables: [
        { bold: 'Bahan Pangan Pokok', text: 'Beras, minyak goreng, telur, daging dan ikan, sayuran dan buah-buahan, susu, serta bahan makanan pokok lainnya' },
        { bold: 'Makanan Siap Saji & Air Minum', text: 'Penyediaan sajian makanan siap saji sehat dan pasokan air minum bersih bagi santri' },
        { bold: 'Paket Kebutuhan Pangan', text: 'Pengadaan paket sembako berkala untuk menjamin ketersediaan pangan sehari-hari asrama' },
        { bold: 'Dapur Mandiri Higienis', text: 'Dimasak setiap hari di dapur umum asrama oleh juru masak pesantren secara bersih dan tertib' },
        { bold: 'Dokumentasi Konsumsi Harian', text: 'Pencatatan nota belanja logistik dan dokumentasi suasana makan bersama santri' }
      ],
      ctaText: 'Sedekah Pangan Santri'
    },
    {
      id: 'sedekah-fasilitas-perlengkapan',
      title: 'Fasilitas dan Perlengkapan',
      subtitle: 'Kenyamanan Hunian, Asrama & Ibadah',
      pricePrefix: 'Rp ',
      priceAmount: '150.000',
      priceUnit: '',
      priceDesc: 'Per paket perlengkapan',
      estimation: 'Alokasi: Kasur, lemari, meja kursi, kipas, alat dapur & audio',
      isPopular: false,
      deliverables: [
        { bold: 'Hunian & Kamar Asrama', text: 'Tempat tidur dan kasur, lemari pakaian, meja dan kursi, serta kipas angin kamar santri' },
        { bold: 'Peralatan Dapur & Kebersihan', text: 'Peralatan dapur umum, peralatan kebersihan, dan perlengkapan sanitasi higienis' },
        { bold: 'Perlengkapan Masjid & Ibadah', text: 'Karpet sajadah masjid, perlengkapan shalat berjamaah, serta perangkat audio dan multimedia' },
        { bold: 'Kenyamanan Aktivitas Harian', text: 'Mendukung kelengkapan fasilitas penunjang kenyamanan dan aktivitas harian santri' }
      ],
      ctaText: 'Sedekah Fasilitas'
    },
    {
      id: 'sedekah-pendidikan-kegiatan',
      title: 'Pendidikan dan Kegiatan',
      subtitle: 'Sarana Belajar, Pembinaan & Vokasi',
      pricePrefix: 'Rp ',
      priceAmount: '200.000',
      priceUnit: '',
      priceDesc: 'Per paket sarana kegiatan',
      estimation: 'Alokasi: Buku, ATK, komputer, alat praktik, peraga & olahraga',
      isPopular: false,
      deliverables: [
        { bold: 'Buku & Alat Tulis', text: 'Pengadaan mushaf Al-Quran, kitab, buku referensi belajar, dan perlengkapan alat tulis santri' },
        { bold: 'Alat Praktik & Komputer', text: 'Perangkat komputer, alat praktik keterampilan vokasi, dan media pembelajaran audio-visual' },
        { bold: 'Alat Peraga & Edukasi', text: 'Alat peraga visual, papan tulis, media pembelajaran, dan perlengkapan kegiatan santri' },
        { bold: 'Olahraga & Kegiatan Keagamaan', text: 'Perlengkapan olahraga pembinaan jasmani dan sarana pendukung kegiatan keagamaan santri' }
      ],
      ctaText: 'Sedekah Pendidikan'
    }
  ],
  addonTitle: 'Sedekah Keahlian, Jasa, dan Tenaga',
  addonItems: [
    {
      name: 'Tenaga Pembangunan & Perbaikan',
      desc: 'Kontribusi tenaga pembangunan dan jasa perbaikan fasilitas di lokasi pesantren Jonggol',
      price: 'Tenaga / Sukarela',
      availability: 'Koordinasi Lapangan Jonggol'
    },
    {
      name: 'Keahlian Teknologi & Pelatihan',
      desc: 'Pelatihan keterampilan vokasi, keahlian teknologi, coding, desain, serta pengajaran dan pembinaan santri',
      price: 'Keahlian / Workshop',
      availability: 'Jadwal Kuliah Tamu'
    },
    {
      name: 'Pendampingan & Konsultasi Teknis',
      desc: 'Pendampingan profesional, jasa desain dan komunikasi, serta konsultasi teknis arsitektur, hukum, dan tata kelola',
      price: 'Jasa Profesional',
      availability: 'Via Daring / Tatap Muka'
    }
  ],
  
  deepDiveBadge: 'RAGAM BENTUK SEDEKAH',
  deepDiveTitle: 'Berbagi dengan Cara, Menghadirkan Manfaat',
  deepDiveLead: 'Sedekah merupakan bentuk kepedulian yang dapat diwujudkan melalui berbagai bentuk pemberian. Tidak terbatas pada uang, sedekah juga dapat berupa barang, pangan, ilmu, keterampilan, maupun tenaga yang memberikan manfaat.',
  deepDiveStory1: 'Setiap butir beras, perlengkapan kamar, bantuan mengajar, maupun waktu dan keahlian yang disumbangkan menjadi energi nyata yang menguatkan kehidupan para penuntut ilmu di Sukasirna Jonggol.',
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
  deepDiveSubblock1Title: 'Pangan dan Kebutuhan Konsumsi',
  deepDiveSubblock1Desc1: 'Sedekah yang disalurkan dapat membantu memenuhi kebutuhan konsumsi dan ketersediaan pangan sehari-hari, antara lain: beras, minyak goreng, telur, daging dan ikan, sayuran dan buah-buahan, susu, bahan makanan pokok lainnya, makanan siap saji, air minum, serta paket kebutuhan pangan.',
  deepDiveSubblock1Desc2: 'Sedekah pangan langsung dialokasikan untuk logistik dapur umum asrama agar asupan nutrisi santri mukim terjaga sehat dan tercukupi setiap hari.',
  deepDiveSubblock2Title: 'Fasilitas, Perlengkapan, Pendidikan & Tenaga',
  deepDiveSubblock2Desc1: 'Sedekah barang mendukung kelengkapan fasilitas (tempat tidur dan kasur, lemari pakaian, meja dan kursi, kipas angin, peralatan dapur, perlengkapan masjid, perlengkapan asrama, peralatan kebersihan, perlengkapan sanitasi, perangkat audio dan multimedia) serta kebutuhan pendidikan (buku dan alat tulis, perlengkapan olahraga, alat praktik keterampilan, perangkat komputer, alat peraga, perlengkapan kegiatan keagamaan, media pembelajaran, perlengkapan kegiatan santri).',
  deepDiveSubblock2Desc2: 'Sedekah juga dapat diwujudkan melalui kontribusi nonmateri berupa waktu, keahlian, dan tenaga untuk mendukung pengembangan fasilitas maupun kapasitas santri: tenaga pembangunan, jasa perbaikan fasilitas, keahlian teknologi, pelatihan keterampilan, pendampingan profesional, pengajaran dan pembinaan, jasa desain dan komunikasi, serta konsultasi teknis.',
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
};
