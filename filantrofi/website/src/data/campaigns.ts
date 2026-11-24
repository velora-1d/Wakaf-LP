export interface FundAllocation {
  category: string;
  percentage: number;
  amount: number;
  description: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  images?: string[];
}

export interface DonorPrayer {
  id: string;
  name: string;
  isAnonymous: boolean;
  amount: number;
  timeAgo: string;
  prayer: string;
  aamiinCount: number;
}

export interface Fundraiser {
  name: string;
  role: string;
  organization: string;
  verified: boolean;
  avatarUrl: string;
  bio: string;
  contactEmail: string;
}

export interface Campaign {
  slug: string;
  title: string;
  category: string;
  institution: string;
  verified: boolean;
  imageUrl: string;
  galleryImages?: string[];
  collectedAmount: number;
  targetAmount: number;
  donorCount: number;
  daysRemaining: number;
  location: string;
  shortDescription: string;
  story: string[];
  fundAllocations: FundAllocation[];
  newsUpdates: NewsUpdate[];
  donorPrayers: DonorPrayer[];
  fundraiser: Fundraiser;
}

export const campaigns: Campaign[] = [
  {
    slug: 'wakaf-masjid-khairu-ummah',
    title: 'Wakaf Pembangunan Masjid & Pusat Pendidikan Khairu Ummah Sugro',
    category: 'Wakaf Produktif',
    institution: 'Global Village Fund (GVF)',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'
    ],
    collectedAmount: 1420000000,
    targetAmount: 2500000000,
    donorCount: 1840,
    daysRemaining: 45,
    location: 'Sukasirna, Jonggol, Jawa Barat',
    shortDescription: 'Mewujudkan pusat peribadatan dan pendidikan generasi penghafal Al-Quran yang mandiri, asri, dan berdaya guna sepanjang masa.',
    story: [
      'Di pelosok kawasan perbukitan Sukasirna Jonggol, ratusan santri dan warga sekitar menempuh perjalanan berkilo-kilo meter melintasi jalan tanah untuk menunaikan ibadah berjamaah dan menuntut ilmu syariah.',
      'Melalui inisiatif Wakaf Pembangunan Masjid & Pusat Pendidikan Khairu Ummah Sugro, Global Village Fund (GVF) bersama para nadzir bersertifikasi berikhtiar mendirikan kompleks terpadu yang memadukan ruang sholat utama berkapasitas 800 jamaah, perpustakaan riset keislaman, serta fasilitas ruang belajar multimedia ramah lingkungan.',
      'Pembangunan tahap 1 telah menyelesaikan pengecoran fondasi cakar ayam bertulang dan struktur kolom lantai dasar. Tahap 2 kini berfokus pada pekerjaan rangka atap baja bentang lebar, dinding pasangan bata kedap suara, instalasi wudhu hemat air terintegrasi resapan biopori, serta lantai marmer lokal anti-selip.',
      'Setiap rupiah wakaf yang Anda amanahkan akan menjadi amal jariyah kekal yang pahalanya terus mengalir selama masjid dan ruang belajar ini dimanfaatkan oleh ribuan santri dan generasi penerus bangsa.'
    ],
    fundAllocations: [
      {
        category: 'Pekerjaan Struktur & Arsitektur Utama',
        percentage: 65,
        amount: 1625000000,
        description: 'Pengecoran atap beton bertulang, dinding batu bata ringan, lantai marmer, dan kubah baja ringan tahan gempa.'
      },
      {
        category: 'Sistem Sanitasi, Wudhu & Air Bersih',
        percentage: 15,
        amount: 375000000,
        description: 'Sumur bor artesis kedalaman 90m, toren filtrasi air minum, dan instalasi daur ulang air wudhu ke kolam resapan.'
      },
      {
        category: 'Interior, Akustik & Sound System',
        percentage: 10,
        amount: 250000000,
        description: 'Karpet sajadah premium ketebalan 16mm, mihrab kayu jati ukir kaligrafi, dan mikrofon array digital.'
      },
      {
        category: 'Pengawasan Lapangan & Audit Transparansi',
        percentage: 10,
        amount: 250000000,
        description: 'Supervisi tim insinyur sipil bersertifikasi, audit berkala kantor akuntan publik, dan dokumentasi berkala untuk donatur.'
      }
    ],
    newsUpdates: [
      {
        id: 'news-3',
        title: 'Pengecoran Balok Atap Lantai 2 Berhasil Diselesaikan',
        date: '12 November 2026',
        author: 'Tim Teknis Sipil GVF',
        content: 'Alhamdulillah, pengerjaan cor balok gantung lantai 2 telah selesai dengan hasil uji kuat tekan beton mutu K-300 yang memenuhi standar kelayakan gempa SNI. Pekerjaan kini beralih pada instalasi perancah atap baja ringan.',
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80']
      },
      {
        id: 'news-2',
        title: 'Pemasangan Pipa Air Bersih & Penyiapan Area Wudhu Terpadu',
        date: '28 Oktober 2026',
        author: 'Koordinator Pelaksana Lapangan',
        content: 'Pengeboran sumber air artesis pada kedalaman 85 meter telah menemukan debit air jernih dan melimpah. Bak penampungan awal kapasitas 10.000 liter telah siap digunakan untuk konstruksi dan penyiapan sistem wudhu santri.',
        images: ['https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80']
      },
      {
        id: 'news-1',
        title: 'Peletakan Batu Pertama dan Tasyakuran Bersama Tokoh Masyarakat',
        date: '15 September 2026',
        author: 'Humas Global Village Fund',
        content: 'Acara tasyakuran peletakan batu pertama dihadiri oleh perwakilan warga, tokoh agama setempat, dan perwakilan wakif. Harapan besar tercurah agar proyek ini berjalan lancar hingga rampung sempurna.',
        images: ['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80']
      }
    ],
    donorPrayers: [
      {
        id: 'dp-1',
        name: 'Hj. Siti Rahmawati',
        isAnonymous: false,
        amount: 2500000,
        timeAgo: '15 menit yang lalu',
        prayer: 'Bismillah, diwakafkan atas nama almarhum ayahanda H. Burhanuddin. Semoga menjadi penerang kubur beliau dan berkah bagi seluruh santri yang beribadah di dalamnya.',
        aamiinCount: 42
      },
      {
        id: 'dp-2',
        name: 'Hamba Allah',
        isAnonymous: true,
        amount: 500000,
        timeAgo: '42 menit yang lalu',
        prayer: 'Ya Allah berikanlah kelancaran rezeki, kesehatan untuk kedua orang tua kami, dan jadikanlah anak cucu kami pejuang Al-Quran.',
        aamiinCount: 29
      },
      {
        id: 'dp-3',
        name: 'Ahmad Faisal',
        isAnonymous: false,
        amount: 1000000,
        timeAgo: '2 jam yang lalu',
        prayer: 'Semoga pembangunan cepat tuntas sebelum Ramadhan tahun depan agar dapat dimanfaatkan maksimal untuk tarawih dan iktikaf.',
        aamiinCount: 56
      },
      {
        id: 'dp-4',
        name: 'Keluarga Besar dr. Handoko',
        isAnonymous: false,
        amount: 5000000,
        timeAgo: '5 jam yang lalu',
        prayer: 'Semoga setiap huruf Al-Quran yang dibaca di masjid ini mengalirkan syafaat bagi kami sekeluarga di yaumul akhir nanti. Aamiin ya Rabbal alamin.',
        aamiinCount: 88
      },
      {
        id: 'dp-5',
        name: 'Hamba Allah',
        isAnonymous: true,
        amount: 100000,
        timeAgo: '8 jam yang lalu',
        prayer: 'Mohon doa agar dimudahkan dalam mencari pekerjaan dan segera diberi keturunan yang sholeh.',
        aamiinCount: 34
      }
    ],
    fundraiser: {
      name: 'Global Village Fund (GVF)',
      role: 'Lembaga Pengelola Wakaf Resmi (Nadzir)',
      organization: 'Yayasan Global Village Fund Indonesia',
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Lembaga filantropi Islam terdaftar di Badan Wakaf Indonesia (BWI) yang berdedikasi membangun kemandirian ekonomi, fasilitas dakwah, dan pendidikan santri di pelosok Nusantara.',
      contactEmail: 'amanah@gvf.or.id'
    }
  },
  {
    slug: 'infaq-asrama-santri',
    title: 'Infaq Sarana Asrama & Fasilitas Mandiri Santri Penghafal Quran',
    category: 'Infaq Sarana',
    institution: 'Global Village Fund (GVF)',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80'
    ],
    collectedAmount: 312500000,
    targetAmount: 500000000,
    donorCount: 740,
    daysRemaining: 18,
    location: 'Cianjur, Jawa Barat',
    shortDescription: 'Menyediakan tempat istirahat yang layak, higienis, dan nyaman bagi 120 santri tahfidz mukim yatim dan dhuafa.',
    story: [
      'Kondisi asrama santri saat ini masih berupa bilik semi permanen dengan ventilasi terbatas dan kasur tipis yang telah bertahun-tahun dipakai bergantian.',
      'Melalui program ini, kami merenovasi total unit hunian santri, melengkapinya dengan ranjang susun kokoh, lemari pakaian individual, meja belajar ergonomis, serta fasilitas sanitasi modern.'
    ],
    fundAllocations: [
      {
        category: 'Pengadaan Ranjang Susun & Kasur Ortopedik',
        percentage: 50,
        amount: 250000000,
        description: '60 set tempat tidur besi anti-karat tingkat dua beserta kasur busa berstandar kesehatan.'
      },
      {
        category: 'Renovasi Plafon & Ventilasi Udara',
        percentage: 30,
        amount: 150000000,
        description: 'Pemasangan exhaust fan, plafon gypsum tahan lembab, dan jendela kasa nyamuk.'
      },
      {
        category: 'Lemari Loker & Meja Belajar Santri',
        percentage: 20,
        amount: 100000000,
        description: 'Loker penyimpanan arsip hafalan dan baju santri berbahan plat besi tahan rayap.'
      }
    ],
    newsUpdates: [
      {
        id: 'asrama-news-1',
        title: 'Pengiriman 30 Unit Pertama Ranjang Susun Tiba di Lokasi',
        date: '5 November 2026',
        author: 'Logistik GVF',
        content: 'Truk logistik membawa 30 paket rangka ranjang susun telah tiba dengan aman. Perakitan dilakukan bersama para pengurus pondok.',
        images: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80']
      }
    ],
    donorPrayers: [
      {
        id: 'as-1',
        name: 'Bambang Sutrisno',
        isAnonymous: false,
        amount: 1000000,
        timeAgo: '1 jam yang lalu',
        prayer: 'Semoga santri-santri dapat tidur nyenyak dan semakin bersemangat murajaah hafalannya.',
        aamiinCount: 21
      }
    ],
    fundraiser: {
      name: 'Global Village Fund (GVF)',
      role: 'Lembaga Pengelola Wakaf Resmi (Nadzir)',
      organization: 'Yayasan Global Village Fund Indonesia',
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Fokus pada penyediaan sarana pendidikan agama di daerah pedalaman.',
      contactEmail: 'amanah@gvf.or.id'
    }
  },
  {
    slug: 'sedekah-pangan-beras',
    title: 'Sedekah Paket Pangan Beras Nutrisi Santri Dhuafa Sukasirna Jonggol',
    category: 'Sedekah Pangan',
    institution: 'Global Village Fund (GVF)',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=1200&auto=format&fit=crop&q=80'
    ],
    collectedAmount: 98000000,
    targetAmount: 120000000,
    donorCount: 412,
    daysRemaining: 12,
    location: 'Bogor Timur, Jawa Barat',
    shortDescription: 'Memastikan kebutuhan asupan gizi, beras pulen, dan lauk berprotein tinggi harian bagi ratusan santri tahfidz terjamin setiap hari.',
    story: [
      'Gizi seimbang adalah modal dasar santri menghafal puluhan juz Al-Quran tanpa terkendala keletihan fisik.',
      'Program lumbung pangan ini menyuplai beras organik dari petani lokal langsung ke dapur umum pondok secara berkala setiap dua pekan.'
    ],
    fundAllocations: [
      {
        category: 'Beras Organik Panen Petani Binaan',
        percentage: 70,
        amount: 84000000,
        description: 'Pengadaan 7 ton beras kualitas super langsung dari petani binaan GVF.'
      },
      {
        category: 'Paket Sayur & Protein Nabati/Hewani',
        percentage: 20,
        amount: 24000000,
        description: 'Suplai telur, tempe, tahu, ikan asin, dan sayuran segar mingguan.'
      },
      {
        category: 'Distribusi & Logistik Dapur Santri',
        percentage: 10,
        amount: 12000000,
        description: 'Biaya angkut armada pickup dan wadah penyimpanan beras kedap kutu.'
      }
    ],
    newsUpdates: [
      {
        id: 'pangan-news-1',
        title: 'Penyaluran Beras Tahap 4 Sebanyak 1.500 Kg',
        date: '10 November 2026',
        author: 'Relawan GVF Dapur Sehat',
        content: 'Beras telah ditimbang dan disimpan di lumbung dapur umum. Santri menikmati santap siang bersama penuh syukur.',
        images: ['https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&auto=format&fit=crop&q=80']
      }
    ],
    donorPrayers: [
      {
        id: 'sp-1',
        name: 'Hamba Allah',
        isAnonymous: true,
        amount: 250000,
        timeAgo: '30 menit yang lalu',
        prayer: 'Semoga menjadi sebab keberkahan rezeki keluarga kami. Aamiin.',
        aamiinCount: 14
      }
    ],
    fundraiser: {
      name: 'Global Village Fund (GVF)',
      role: 'Lembaga Pengelola Wakaf Resmi (Nadzir)',
      organization: 'Yayasan Global Village Fund Indonesia',
      verified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Menjaga ketahanan pangan para santri di pesantren pelosok.',
      contactEmail: 'amanah@gvf.or.id'
    }
  }
];

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}
