"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { OrbButton } from "@/components/ui/hero-with-cards-utils/orb-button";

const CARDS = [
  {
    src: "/gambar design/interior masjid.jpg",
    alt: "Masjid Khairu Ummah",
    title: "Masjid Khairu Ummah",
    rotate: -18,
    delay: 0.9,
    z: 10,
  },
  {
    src: "/gambar-bahan/lahan donasi.jpg",
    alt: "Kawasan Wakaf Jonggol",
    title: "Kawasan Wakaf Jonggol",
    rotate: -9,
    delay: 0.75,
    z: 20,
  },
  {
    src: "/gambar design/skywalk learning room.jpg",
    alt: "SMK Skill Village",
    title: "SMK Skill Village",
    rotate: 0,
    delay: 0.6,
    z: 30,
  },
  {
    src: "/gambar-bahan/pelataran mesjid.jpeg",
    alt: "Pendidikan Santri",
    title: "Pendidikan Santri",
    rotate: 9,
    delay: 0.75,
    z: 20,
  },
  {
    src: "/gambar design/belakang masjid.jpg",
    alt: "Agro-Technopark",
    title: "Agro-Technopark",
    rotate: 18,
    delay: 0.9,
    z: 10,
  },
];

const HeroSectionwithCards: React.FC = () => {
  return (
    <section
      className="relative w-full min-w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7, 11, 20, 0.94) 0%, rgba(9, 14, 26, 0.85) 45%, rgba(6, 10, 18, 0.98) 100%), url('/gambar design/interior mesjid 2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      {/* Ambient Blue Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/15 blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[550px] h-[450px] bg-blue-600/15 blur-[150px] rounded-full"
        aria-hidden="true"
      />

      {/* Main Split Grid Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 md:pt-40 pb-20 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Sisi Kiri: Teks & Informasi Program */}
          <div className="lg:col-span-6 flex flex-col items-start text-left hero-text-col-shift">
            <style>{`
              @media (min-width: 1024px) {
                .hero-text-col-shift {
                  transform: translateX(-30%);
                }
              }
            `}</style>
            

            {/* Main Title Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.2] tracking-tight drop-shadow-md"
              style={{ color: "#ffffff" }}
            >
              Membangun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-200">
                Ekosistem Pesantren
              </span>
              <br />
              <span style={{ color: "#ffffff" }}>
                Menghadirkan Kebermanfaatan
              </span>
            </motion.h1>

            {/* Subtitle Narasi Singkat */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
              className="text-base sm:text-lg text-slate-200 max-w-xl drop-shadow"
              style={{
                color: "rgba(241, 245, 249, 0.9)",
                marginTop: "32px",
                lineHeight: "1.75",
              }}
            >
              Wadah filantropi dan wakaf produktif terpadu seluas ±3 hektare di Jonggol Bogor.
              Menyatukan Masjid Khairu Ummah, SMK Skill Village, dan Agro-Technopark.
            </motion.p>

            {/* Tombol Aksi */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.48 }}
              className="flex flex-wrap items-center gap-5 sm:gap-6"
              style={{
                marginTop: "40px",
              }}
            >
              <a
                href="#donasi"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  height: "50px",
                  padding: "0 28px",
                  backgroundColor: "#0969da",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 18px rgba(9, 105, 218, 0.35)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0756b2";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0969da";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>Tunaikan Wakaf Sekarang</span>
                <svg
                  style={{ width: "16px", height: "16px", color: "#ffffff", flexShrink: 0 }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </a>

              <a
                href="/#program"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  height: "50px",
                  paddingLeft: "26px",
                  paddingRight: "6px",
                  backgroundColor: "rgba(15, 23, 42, 0.55)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  borderRadius: "9999px",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.borderColor = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  const circle = e.currentTarget.querySelector(".isavo-circle") as HTMLElement;
                  if (circle) circle.style.transform = "rotate(45deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.55)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                  const circle = e.currentTarget.querySelector(".isavo-circle") as HTMLElement;
                  if (circle) circle.style.transform = "rotate(0deg)";
                }}
              >
                <span>Lihat Program</span>
                <span
                  className="isavo-circle"
                  style={{
                    width: "38px",
                    height: "38px",
                    backgroundColor: "#0969da",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    flexShrink: 0,
                    transition: "transform 0.25s ease, background-color 0.25s ease",
                  }}
                >
                  <svg
                    style={{ width: "16px", height: "16px" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>
            </motion.div>


          </div>

          {/* Sisi Kanan: Kartu Kipas Fanned-out Arc */}
          <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center">
            {CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 80,
                  x: (i - 2) * 72,
                  rotate: card.rotate,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: (i - 2) * 72,
                  rotate: card.rotate,
                }}
                transition={{
                  duration: 0.7,
                  delay: card.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-6 sm:bottom-10 group cursor-pointer"
                style={{
                  left: "50%",
                  marginLeft: -130, // Setengah dari lebar kartu 260px (+25%)
                  zIndex: card.z,
                  transformOrigin: "bottom center",
                }}
              >
                <Card className="w-[230px] h-[345px] sm:w-[260px] sm:h-[390px] p-0 overflow-hidden shadow-2xl ring-2 ring-white/35 hover:ring-sky-400 border-0 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-3">
                  <CardContent className="relative p-0 w-full h-full bg-slate-900">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent">
                      <p
                        className="text-xs sm:text-sm font-bold drop-shadow text-center tracking-wide"
                        style={{ color: "#ffffff" }}
                      >
                        {card.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSectionwithCards;
