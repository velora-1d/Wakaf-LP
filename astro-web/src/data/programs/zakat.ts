// src/data/programs/zakat.ts
import { S3_BASE, type ProgramData } from './types';

export const zakatProgram: ProgramData = {
  slug: 'zakat',
  title: 'Zakat: Menunaikan Kewajiban, Menyalurkan Amanah',
  heroSubtitle: 'Zakat merupakan kewajiban yang memiliki ketentuan khusus dalam syariat Islam. Pengelolaannya memperhatikan jenis zakat, perhitungan, serta golongan penerima yang berhak (asnaf). Melalui pengelolaan yang amanah dan penyaluran yang tepat sasaran, zakat diharapkan dapat membantu memenuhi kebutuhan mustahik serta mendukung peningkatan kesejahteraan mereka.',
  categoryBadge: 'ZAKAT SYARIAT & 8 ASNAF',
  heroBgImage: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/sholat-berjamaah-santri-shaf-portrait.webp`,
  
  pricingHeading: 'Jenis Zakat & Ketentuan Syariat',
  pricingSubheading: 'Tunaikan kewajiban zakat sesuai syariat melalui instrumen Zakat Fitrah, Zakat Maal, dan Zakat Penghasilan dengan hisab serta nisab yang terverifikasi.',
  packages: [
    {
      id: 'zakat-fitrah-ramadan',
      title: 'Zakat Fitrah',
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
      title: 'Zakat Maal',
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
      title: 'Zakat Penghasilan',
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
  deepDiveStory1: 'Dana zakat disalurkan kepada delapan golongan penerima (asnaf) sesuai ketentuan syariat: fakir, miskin, amil, mualaf, riqab, gharimin, fisabilillah, dan ibnu sabil. Penyaluran dilakukan dengan memperhatikan kaidah syariat, kelayakan penerima, dan peruntukan dana zakat.',
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
  deepDiveSubblock1Title: 'Tiga Ragam Instrumen Zakat',
  deepDiveSubblock1Desc1: 'Pengelolaan zakat mencakup Zakat Fitrah untuk penyucian jiwa jelang Idulfitri, Zakat Maal atas kepemilikan harta simpanan yang telah mencapai nisab dan haul, serta Zakat Penghasilan atas pendapatan profesi rutin yang telah memenuhi kriteria wajib zakat.',
  deepDiveSubblock1Desc2: 'Setiap instrumen dikelola secara terpisah dengan akuntabilitas tinggi dan tata kelola transparan agar kewajiban syariat tertunaikan secara sah.',
  deepDiveSubblock2Title: 'Penyaluran Kepada Delapan Golongan Asnaf',
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
};
