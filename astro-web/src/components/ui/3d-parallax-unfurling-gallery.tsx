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
    src: "https://wakaf-lp.vercel.app/gambar%20design/interior%20masjid.jpg",
    title: "Interior Masjid Utama",
    category: "Fasilitas Ibadah",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/belakang%20masjid.jpg",
    title: "Lanskap Belakang Masjid",
    category: "Kawasan Hijau",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/learning%20studio%20&%20workshop.jpg",
    title: "Studio Vokasi & Workshop",
    category: "Pendidikan & Skill",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/gh%20learning%20area.jpg",
    title: "Greenhouse Agro-Technopark",
    category: "Agrikultur Mandiri",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/skywalk%20learning%20room.jpg",
    title: "Skywalk Ruang Belajar Santri",
    category: "Sarana Pembelajaran",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/panel%20surya.jpg",
    title: "Instalasi Panel Surya Terpadu",
    category: "Energi Mandiri",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/tempat%20wudu.jpg",
    title: "Tempat Wudhu Sirkulasi Alami",
    category: "Fasilitas Penunjang",
  },
  {
    src: "https://wakaf-lp.vercel.app/gambar%20design/interior%20mesjid%202.jpg",
    title: "Mihrab & Ruang Sholat Utama",
    category: "Pusat Spiritualitas",
  },
  {
    src: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
    title: "Masterplan Arsitektur Kawasan",
    category: "Kawasan Terpadu",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    title: "Area Diskusi Terbuka",
    category: "Sarana Kolaborasi",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    title: "Laboratorium Terapan",
    category: "Riset & Pengembangan",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    title: "Gedung Pusat Administrasi",
    category: "Manajemen & Layanan",
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
