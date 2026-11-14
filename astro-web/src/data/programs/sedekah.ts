// src/data/programs/sedekah.ts
import { S3_BASE, type ProgramData } from './types';

export const sedekahProgram: ProgramData = {
  slug: 'sedekah',
  title: 'Sedekah: Berbagi dengan Cara, Menghadirkan Manfaat',
  heroSubtitle: 'Sedekah merupakan bentuk kepedulian yang dapat diwujudkan melalui berbagai bentuk pemberian. Tidak terbatas pada uang, sedekah juga dapat berupa barang, pangan, ilmu, keterampilan, maupun tenaga yang memberikan manfaat.',
  categoryBadge: 'SEDEKAH PANGAN, BARANG & JASA',
  heroBgImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/suasana-kajian-santri-aula.webp`,
  
  pricingHeading: 'Pilihan Pos Sedekah Berkelanjutan',
  pricingSubheading: 'Salurkan sedekah melalui ragam kepedulian: Pangan & Konsumsi, Fasilitas & Perlengkapan, Pendidikan & Kegiatan, serta Keahlian, Jasa & Tenaga.',
  packages: [
    {
      id: 'sedekah-pangan-konsumsi',
      title: 'Pangan & Konsumsi Harian',
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
      title: 'Fasilitas & Perlengkapan',
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
      title: 'Pendidikan & Kegiatan',
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
  addonTitle: 'Sedekah Keahlian, Jasa & Tenaga',
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
  deepDiveSubblock1Title: 'Sedekah Pangan, Fasilitas dan Perlengkapan',
  deepDiveSubblock1Desc1: 'Membantu konsumsi pangan harian (beras, minyak goreng, telur, daging, ikan, sayuran, susu, air minum) serta perlengkapan fasilitas (kasur, lemari, meja kursi, kipas angin, peralatan dapur, perlengkapan masjid dan asrama).',
  deepDiveSubblock1Desc2: 'Bantuan berupa barang langsung dapat dikonfirmasi terlebih dahulu ke layanan WhatsApp Customer Service GVF untuk kesesuaian spesifikasi dan waktu pengiriman ke Jonggol.',
  deepDiveSubblock2Title: 'Sedekah Pendidikan, Keahlian, Jasa dan Tenaga',
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
};
