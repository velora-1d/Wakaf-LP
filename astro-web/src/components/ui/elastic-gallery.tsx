import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

export interface ElasticItemProps {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  link?: string;
  description?: string;
}

interface ElasticGalleryProps {
  items?: ElasticItemProps[];
  defaultActiveId?: string;
  className?: string;
}

const defaultItems: ElasticItemProps[] = [
  {
    id: "01",
    title: "Masjid Khairu Ummah Sugro",
    category: "Pusat Ibadah & Halaqah",
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/pelataran-depan-masjid.webp",
    alt: "Pelataran dan Pembangunan Masjid Khairu Ummah Sugro Jonggol",
    link: "/program/wakaf",
    description: "Pusat ibadah utama, halaqah quran, dan pembinaan karakter spiritual santri di Sukasirna, Jonggol.",
  },
  {
    id: "02",
    title: "Diskusi & KBM Santri Vokasi",
    category: "Pendidikan & Karakter FAST",
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/santri-ikhwan-diskusi-belajar-meja-lipat.webp",
    alt: "Santri Berdiskusi di Meja Lipat",
    link: "/program/infaq",
    description: "Kegiatan belajar kolaboratif dan pembinaan adab santri dengan kurikulum Fathonah, Amanah, Shiddiq, dan Tabligh.",
  },
  {
    id: "03",
    title: "Konstruksi Rangka Baja Aula",
    category: "Infrastruktur Workshop",
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/atap-rangka-baja-aula.webp",
    alt: "Pemasangan Rangka Baja Aula Pertemuan",
    link: "/kemitraan",
    description: "Pembangunan aula serbaguna dan ruang workshop santri berkonsep arsitektur tropis ramah lingkungan.",
  },
  {
    id: "04",
    title: "Prestasi Santri Juara MTQ",
    category: "Duta Santri Berprestasi",
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/kegiatan-dan-prestasi-santri/tiga-santri-juara-mtq-jonggol-piala.webp",
    alt: "Santri Peraih Piala Juara MTQ Kecamatan Jonggol",
    link: "/program/zakat",
    description: "Bukti nyata keberhasilan pendidikan santri menorehkan prestasi Juara 1 Tahfidz 5 Juz dan Juara 2 Kaligrafi.",
  },
  {
    id: "05",
    title: "Lahan Perkebunan Abadi Jonggol",
    category: "Masterplan Kawasan",
    src: "https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/drone-lahan-perkebunan.webp",
    alt: "Foto Udara Lanskap Lahan Perkebunan Jonggol",
    link: "/tentang-kami",
    description: "Kawasan wakaf produktif dan pertanian terpadu seluas ±3 hektare di perbukitan Sukasirna, Jonggol, Kabupaten Bogor.",
  },
];

export function ElasticGallery({
  items = defaultItems,
  defaultActiveId = "01",
  className,
}: ElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || items[0]?.id || "01");

  return (
    <div className={cn("w-full py-6 md:py-8 flex justify-center", className)} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div 
        className="mx-auto flex h-[480px] md:h-[560px] w-full max-w-6xl flex-col gap-3 px-3 md:flex-row md:gap-4"
        style={{ width: '100%', maxWidth: '1152px', margin: '0 auto', display: 'flex' }}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              onMouseEnter={() => setActiveId(item.id)}
              style={{
                flex: isActive ? '3.5 1 0%' : '1 1 0%',
                minWidth: 0,
                transition: 'flex 0.7s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] min-w-0 select-none",
                isActive
                  ? "border-blue-500/80 shadow-2xl ring-1 ring-blue-400/40"
                  : "border-slate-200/80 bg-slate-950 hover:border-slate-300"
              )}
            >
              {/* Gambar Latar */}
              <img
                src={item.src}
                alt={item.alt}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                  isActive
                    ? "scale-100 brightness-100"
                    : "scale-105 brightness-[0.4] group-hover:brightness-[0.55]"
                )}
                loading="lazy"
              />

              {/* Gradient Natural Dari Bawah ke Atas */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(2, 6, 23, 0.96) 0%, rgba(2, 6, 23, 0.65) 45%, rgba(2, 6, 23, 0.15) 75%, transparent 100%)',
                  transition: 'opacity 0.5s ease',
                  opacity: isActive ? 1 : 0.6,
                  pointerEvents: 'none',
                }}
              />

              {/* Indikator Nomor Minimalis di Pojok Kiri Atas */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    fontSize: '12px',
                    fontWeight: 800,
                    backgroundColor: isActive ? '#0969da' : 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  {item.id}
                </span>
              </div>

              {/* KONTEN AKTIF: Padding Terkunci 40px, Bebas Terpotong Border Radius */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '36px 40px 40px 40px',
                  boxSizing: 'border-box',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Kategori Subtitle */}
                <div style={{ marginBottom: '8px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      color: '#38bdf8',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Judul Fasilitas */}
                <h3
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: '#ffffff',
                    fontFamily: "'Golos Text', system-ui, sans-serif",
                    margin: '0 0 10px 0',
                    textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                  }}
                >
                  {item.title}
                </h3>

                {/* Deskripsi Alami */}
                {item.description && (
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#cbd5e1',
                      margin: '0 0 16px 0',
                      maxWidth: '540px',
                      textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {/* Link Aksi Minimalis */}
                {item.link && (
                  <div>
                    <a
                      href={item.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '5px',
                        textDecorationColor: '#38bdf8',
                      }}
                    >
                      <span>Lihat Detail Program</span>
                      <ArrowUpRight style={{ width: '16px', height: '16px', color: '#38bdf8' }} />
                    </a>
                  </div>
                )}
              </div>

              {/* KONTEN INAKTIF: Label Vertikal Rapi di Tengah Kolom */}
              <div
                className={cn(
                  "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500",
                  isActive ? "opacity-0 scale-75" : "opacity-100 delay-150"
                )}
              >
                <span className="hidden md:inline-block whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-white/80 [writing-mode:vertical-rl] py-2">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ElasticGallery;
