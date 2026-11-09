import React from 'react';
import MasonryGrid from './masonry-grid';

export interface MasonryItem {
  id: number | string;
  src: string;
  alt?: string;
  title?: string;
  link?: string;
}

const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

// Koleksi Foto Faktual & Masterplan Kawasan Sukasirna Jonggol (100% Foto Bersih Tanpa Teks)
export const defaultShowcaseItems: MasonryItem[] = [
  {
    id: 1,
    src: `${S3_BASE}/bahan-konten/asrama-putra-baru/tangga-asrama-ikhwan-baru.jpeg`,
    alt: 'Konstruksi Tangga Gedung Asrama Baru Santri Sukasirna',
  },
  {
    id: 2,
    src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/greenhouse-pertanian.webp`,
    alt: 'Greenhouse Pertanian Modern Skill Village Sukasirna',
  },
  {
    id: 3,
    src: `${S3_BASE}/bahan-konten/santriwati-pose-karya-seni.webp`,
    alt: 'Santriwati Menunjukkan Hasil Seni dan Kriya Kreatif',
  },
  {
    id: 4,
    src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp`,
    alt: 'Kebun Melon Hidroponik di Dalam Greenhouse',
  },
  {
    id: 5,
    src: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-tampak-dalam.jpeg`,
    alt: 'Suasana Dalam Masjid Khairu Ummah Sugro',
  },
  {
    id: 6,
    src: `${S3_BASE}/bahan-konten/asrama-putra-baru/tampak-samping-asrama-ikhwan-baru.jpeg`,
    alt: 'Tampak Samping Gedung Asrama Ikhwan Baru',
  },
  {
    id: 7,
    src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-portrait.webp`,
    alt: 'Gedung Asrama Berlatar Panorama Perbukitan Sukasirna',
  },
  {
    id: 8,
    src: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-lantai-2-belum-jadi.jpeg`,
    alt: 'Progres Pembangunan Lantai 2 Masjid Khairu Ummah',
  },
  {
    id: 9,
    src: `${S3_BASE}/media-lp/lorong-asrama-bata-merah.webp`,
    alt: 'Lorong Asrama Bata Merah Kawasan Pesantren Sukasirna',
  },
  {
    id: 10,
    src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/ustadz-menulis-materi-di-whiteboard.webp`,
    alt: 'Kegiatan Pembelajaran dan Pengajaran Ustadz di Kelas',
  },
  {
    id: 11,
    src: `${S3_BASE}/bahan-konten/masjid-dan-kelas/masjid-tampak-dalam-2.jpeg`,
    alt: 'Ruang Sholat Utama Masjid Khairu Ummah Sugro',
  },
  {
    id: 12,
    src: '/gambar-bahan/kbm kelas 1.jpeg',
    alt: 'Kegiatan Belajar Mengajar Santri di Kelas',
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
    <div className={`w-full ${className}`}>
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
        renderItem={(item) => (
          <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out bg-white border border-slate-200/80">
            <img
              src={item.src}
              alt={item.alt || `Gallery item ${item.id}`}
              className="w-full h-auto object-cover block"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      />
    </div>
  );
};

export default MasonryGridDemo;
