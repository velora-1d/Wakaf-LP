"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface FacilityItem {
  src: string;
  title: string;
  category: string;
}

const GVF_FACILITIES: FacilityItem[] = [
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp",
    title: "Pelataran Masjid Khairu Ummah",
    category: "Pusat Ibadah",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/kebun-melon-dalam-greenhouse.webp",
    title: "Greenhouse Budidaya Melon",
    category: "Agro-Technopark",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/tiga-santri-juara-mtq-jonggol-piala.webp",
    title: "Prestasi Santri Juara MTQ",
    category: "Pendidikan Berprestasi",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/drone-lapangan-dan-lahan-tani.webp",
    title: "Hamparan Lahan Wakaf ±3 Ha",
    category: "Kawasan Terpadu",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/atap-rangka-baja-aula.webp",
    title: "Konstruksi Rangka Baja Aula",
    category: "Fasilitas Belajar",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-diskusi-belajar-meja-lipat.webp",
    title: "Diskusi Halaqah Santri Ikhwan",
    category: "KBM & Karakter FAST",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp",
    title: "Progres Pembangunan Lantai 2",
    category: "Infrastruktur Fisik",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/santriwati-bertiga-mencatat-di-aula.webp",
    title: "KBM Santriwati Menyimak Materi",
    category: "Pendidikan Holistik",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/tampak-gedung-dan-halaman-asrama.webp",
    title: "Gedung & Halaman Asrama Santri",
    category: "Hunian Mandiri",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/duta-santri-berprestasi-1.webp",
    title: "Duta Santri Inspiratif",
    category: "Generasi Emas",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/dinding-hebel-ventilasi-roster-1.webp",
    title: "Dinding Bata Ringan Roster SNI",
    category: "Arsitektur Ramah Lingkungan",
  },
  {
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/sholat-berjamaah-imam-santri-belakang.webp",
    title: "Shalat Berjamaah Santri Asrama",
    category: "Spiritualitas Berkelanjutan",
  },
];

export interface ParallaxGalleryProps {
  items?: FacilityItem[];
}

export default function Parallax3DGallery({ items = GVF_FACILITIES }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const colMedia = useMemo(() => {
    const list = items.length > 0 ? items : GVF_FACILITIES;
    return {
      col1: [list[0], list[4], list[8]].filter(Boolean),
      col2: [list[1], list[5], list[9]].filter(Boolean),
      col3: [list[2], list[6], list[10]].filter(Boolean),
      col4: [list[3], list[7], list[11]].filter(Boolean),
    };
  }, [items]);

  // Hook Scroll dihitung terhadap ref container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring ultra-smooth & responsif (damping & stiffness optimal agar ringan 60fps)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // 3D Parallax Matrix: rotasi proporsional & elegan
  const rotateX = useTransform(smoothProgress, [0, 1], [18, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [-20, 0]);
  const rotateZ = useTransform(smoothProgress, [0, 1], [6, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.85, 1, 1, 0.9]);

  // Parallax multi kecepatan kolom yang stabil dan selalu terlihat di viewport
  const yCol1 = useTransform(smoothProgress, [0, 1], ["4%", "-8%"]);
  const yCol2 = useTransform(smoothProgress, [0, 1], ["-8%", "6%"]);
  const yCol3 = useTransform(smoothProgress, [0, 1], ["6%", "-6%"]);
  const yCol4 = useTransform(smoothProgress, [0, 1], ["-6%", "8%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[170vh] bg-slate-50 text-slate-900"
    >
      {/* Sticky Fullscreen 100vw & 100vh Edge-to-Edge Murni Visual */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* 3D Parallax Canvas - Full Width Edge to Edge */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

          {/* Perspective 3D Matrix Wrapper */}
          <div
            className="w-full h-full flex items-center justify-center pointer-events-none"
            style={{ perspective: "1300px" }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                scale,
                opacity,
                transformStyle: "preserve-3d",
              }}
              className="flex gap-4 md:gap-6 justify-center items-center w-[105vw] max-w-none origin-center pointer-events-auto will-change-transform transform-gpu"
            >
              {/* Kolom 1 */}
              <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[23vw] min-w-[200px]">
                {colMedia.col1.map((item, idx) => (
                  <div
                    key={`c1-${idx}`}
                    className="group relative h-[210px] md:h-[320px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-slate-200/90 transition-all duration-300"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{item.category}</span>
                      <h4 className="text-sm font-semibold text-white drop-shadow-sm">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Kolom 2 */}
              <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[23vw] min-w-[200px]">
                {colMedia.col2.map((item, idx) => (
                  <div
                    key={`c2-${idx}`}
                    className="group relative h-[240px] md:h-[370px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-slate-200/90 transition-all duration-300"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{item.category}</span>
                      <h4 className="text-sm font-semibold text-white drop-shadow-sm">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Kolom 3 */}
              <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[23vw] min-w-[200px]">
                {colMedia.col3.map((item, idx) => (
                  <div
                    key={`c3-${idx}`}
                    className="group relative h-[210px] md:h-[320px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-slate-200/90 transition-all duration-300"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{item.category}</span>
                      <h4 className="text-sm font-semibold text-white drop-shadow-sm">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Kolom 4 */}
              <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[23vw] min-w-[200px]">
                {colMedia.col4.map((item, idx) => (
                  <div
                    key={`c4-${idx}`}
                    className="group relative h-[240px] md:h-[370px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-slate-200/90 transition-all duration-300"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{item.category}</span>
                      <h4 className="text-sm font-semibold text-white drop-shadow-sm">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}

export { Parallax3DGallery };
