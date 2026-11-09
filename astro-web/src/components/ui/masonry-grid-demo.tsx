import React from 'react';
import MasonryGrid from './masonry-grid';

export interface MasonryItem {
  id: number | string;
  title: string;
  src: string;
  category?: string;
  statusBadge?: string;
  description?: string;
  link?: string;
  alt?: string;
}

const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

// 8 Foto Riil Faktual Kawasan GVF Sukasirna Jonggol (100% Unik & Bebas Duplikasi)
export const defaultShowcaseItems: MasonryItem[] = [
  {
    id: '01',
    title: 'Arsitektur Tangga Gedung Asrama Baru',
    category: 'Infrastruktur',
    statusBadge: 'Konstruksi 2026',
    src: `${S3_BASE}/bahan-konten/asrama-putra-baru/tangga-asrama-ikhwan-baru.jpeg`,
    alt: 'Konstruksi Tangga Gedung Asrama Baru Santri Sukasirna',
    description: 'Akses tangga kokoh gedung asrama baru untuk mobilitas santri penghafal Al-Quran.',
  },
  {
    id: '02',
    title: 'Greenhouse Pertanian Modern',
    category: 'Agro-Technopark',
    statusBadge: 'Kemandirian Pangan',
    src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/greenhouse-pertanian.webp`,
    alt: 'Greenhouse Pertanian Modern Skill Village Sukasirna',
    description: 'Laboratorium praktik budidaya presisi dan teknologi pertanian terpadu santri.',
  },
  {
    id: '03',
    title: 'Karya Seni & Kriya Vokasi Santriwati',
    category: 'Kreativitas Santri',
    statusBadge: 'Vokasi FAST',
    src: `${S3_BASE}/bahan-konten/santriwati-pose-karya-seni.webp`,
    alt: 'Santriwati Menunjukkan Hasil Seni dan Kriya Kreatif',
    description: 'Pengembangan keterampilan vokasi terapan dan karya seni santriwati mandiri.',
  },
  {
    id: '04',
    title: 'Budidaya Melon Hidroponik Greenhouse',
    category: 'Ketahanan Pangan',
    statusBadge: 'Agribisnis',
    src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp`,
    alt: 'Kebun Melon Hidroponik di Dalam Greenhouse',
    description: 'Unit produksi hortikultura bernilai ekonomi tinggi penopang operasional pesantren.',
  },
  {
    id: '05',
    title: 'Ruang Sholat & Aula Utama Masjid',
    category: 'Sarana Ibadah',
    statusBadge: 'Pusat Tarbiyah',
    src: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-tampak-dalam.jpeg`,
    alt: 'Suasana Dalam Masjid Khairu Ummah Sugro',
    description: 'Area halaqah Al-Quran, kajian fikih, dan sholat berjamaah lima waktu.',
  },
  {
    id: '06',
    title: 'Pembangunan Sayap Gedung Asrama',
    category: 'Fasilitas Hunian',
    statusBadge: 'Kawasan Terpadu',
    src: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru.jpeg`,
    alt: 'Tampak Samping Gedung Asrama Ikhwan Baru',
    description: 'Ekspansi kapasitas hunian santri binaan beasiswa dengan sirkulasi udara alami.',
  },
  {
    id: '07',
    title: 'Gedung Asrama & Panorama Perbukitan',
    category: 'Kawasan Pesantren',
    statusBadge: 'Sukasirna Jonggol',
    src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-portrait.webp`,
    alt: 'Gedung Asrama Berlatar Panorama Perbukitan Sukasirna',
    description: 'Lingkungan asri dan tenang yang mendukung ketenangan menghafal Al-Quran.',
  },
  {
    id: '08',
    title: 'Progres Konstruksi Lantai 2 Masjid',
    category: 'Wakaf Bangunan',
    statusBadge: 'Peluang Amal Jariyah',
    src: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-lantai-2-belum-jadi.jpeg`,
    alt: 'Progres Pembangunan Lantai 2 Masjid Khairu Ummah',
    description: 'Ikhtiar penyelesaian mezanin dan lantai atas untuk daya tampung jamaah yang lebih luas.',
  },
];

export interface MasonryDemoProps {
  items?: MasonryItem[];
  title?: string;
  subtitle?: string;
  columns?: string;
  gap?: string;
  className?: string;
}

export const MasonryGridDemo: React.FC<MasonryDemoProps> = ({
  items = defaultShowcaseItems,
  title,
  subtitle,
  columns = 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
  gap = '1.25rem',
  className = '',
}) => {
  return (
    <div className={`w-full bg-transparent ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-10 max-w-3xl mx-auto px-4">
          {title && (
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3 font-['Golos_Text',sans-serif]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-['Golos_Text',sans-serif]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <MasonryGrid
        items={items}
        className={columns}
        gap={gap}
        renderItem={(item) => {
          const cardContent = (
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(9,105,218,0.12)] transition-all duration-300 ease-out cursor-pointer">
              <div className="relative w-full overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.alt || item.title}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out block"
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none transition-opacity duration-300" />

                {/* Top Badge Pill */}
                {(item.statusBadge || item.category) && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-slate-800 shadow-sm border border-slate-200/60 backdrop-blur-md">
                      {item.statusBadge || item.category}
                    </span>
                  </div>
                )}

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                  {item.category && (
                    <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-white text-base sm:text-lg font-bold leading-snug tracking-tight font-['Golos_Text',sans-serif]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );

          if (item.link) {
            return (
              <a href={item.link} className="block no-underline focus:outline-none focus:ring-2 focus:ring-[#0969da] rounded-2xl">
                {cardContent}
              </a>
            );
          }

          return cardContent;
        }}
      />
    </div>
  );
};

export default MasonryGridDemo;
