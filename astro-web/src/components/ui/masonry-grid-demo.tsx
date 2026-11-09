import React from 'react';
import MasonryGrid from './masonry-grid';

const S3_BASE = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets';

// Sample data menggunakan aset riil kawasan GVF Sukasirna Jonggol
export const defaultGalleryItems = [
  { id: 1, title: 'Kawasan Terpadu Sukasirna', src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/drone-lahan-dan-pemukiman.webp` },
  { id: 2, title: 'Gedung Asrama dan Pesantren', src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/tampak-gedung-dan-halaman-asrama.webp` },
  { id: 3, title: 'Greenhouse Pertanian Modern', src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/greenhouse-pertanian.webp` },
  { id: 4, title: 'Sholat Berjamaah Santri', src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/sholat-berjamaah-santri-seragam-hitam.webp` },
  { id: 5, title: 'Karya Kreatif Santriwati', src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-pose-karya-seni.webp` },
  { id: 6, title: 'KBM Vokasi FAST Santri', src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/kbm-santri-ikhwan-menulis.webp` },
  { id: 7, title: 'Budidaya Kebun Melon', src: `${S3_BASE}/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp` },
  { id: 8, title: 'Konstruksi Tangga Asrama Baru', src: `${S3_BASE}/bahan-konten/asrama-putra-baru/tangga-asrama-ikhwan-baru.jpeg` },
  { id: 9, title: 'Kegiatan Belajar Santriwati', src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-bertiga-mencatat-di-aula.webp` },
  { id: 10, title: 'Prestasi Tahfidz Salman Aufa', src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/salman-aufa-juara-2-tahfidz-10-juz.webp` },
  { id: 11, title: 'Prestasi Seni Kaligrafi', src: `${S3_BASE}/bahan-konten/kegiatan-dan-prestasi-santri/muhammad-kholid-juara-2-kaligrafi.webp` },
  { id: 12, title: 'Penyaluran Beras Mustahik', src: `${S3_BASE}/bahan-konten/beras-zakat-fitrah-mustahik.webp` },
];

export interface MasonryDemoProps {
  items?: typeof defaultGalleryItems;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const MasonryGridDemo: React.FC<MasonryDemoProps> = ({
  items = defaultGalleryItems,
  title = 'Galeri Dokumentasi Lapangan',
  subtitle = 'Potret faktual kegiatan santri, pembangunan sarana ibadah, dan kemandirian agro-technopark di Sukasirna Jonggol',
  className = '',
}) => {
  return (
    <div className={`w-full bg-transparent py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <MasonryGrid
          items={items}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
          gap="1.25rem"
          renderItem={(item) => (
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 ease-out">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                  {item.title}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MasonryGridDemo;
