# Master Plan: Template Halaman Program ZISWAF ala ISAVO (isavo.co.id)
**Global Village Fund (GVF) • Astro Fullstack**

---

## 1. Visi & Tujuan Desain
Membangun satu **arsitektur template modular (8 Section)** yang seragam untuk seluruh halaman turunan program (Wakaf, Zakat, Infaq, Shodaqoh). 
Template ini mengadopsi 100% standar estetika, grid layout, dan koreografi animasi dari halaman layanan & portofolio profesional **ISAVO (`isavo.co.id/architecture` & `isavo.co.id/portofolio`)**, disesuaikan dengan nilai-nilai filantropi Islam (*high trust, transparansi visual, legalitas nazhir, kepatuhan syariah*).

---

## 2. Fondasi UI/UX & Desain Sistem ala ISAVO

### A. Palet Warna (Corporate Navy & Clean Trust — Bebas Ungu)
- **Deep Slate / Navy**: `#0A2540` / `#0F172A` (Warna teks utama & background header dark).
- **Royal Sapphire Blue**: `#1E6091` / `#0284C7` (Warna aksen utama, tombol interaktif, badge aktif).
- **Ice Blue Soft Tint**: `#F0F7FF` / `#E0F2FE` (Background section kontras, container card).
- **Emerald Accent (Nuansa Berkah/Syariah)**: `#059669` / `#10B981` (Checklist hijau, badge status terpenuhi).
- **Neutral White & Off-White**: `#FFFFFF` / `#F8FAFC` (Kartu latar dan background selang-seling).
- **Border Hairline**: `rgba(15, 23, 42, 0.08)` (Garis batas sangat tipis dan halus ala ISAVO).

### B. Tipografi & Hirarki Visual
- **Golos Text / Plus Jakarta Sans**: Font sans-serif korporat modern.
- **Section Heading Pattern ala ISAVO**:
  - Pill Tag di atas: `#NAMA KATEGORI` dengan titik bulat aksen.
  - Heading 2: Huruf besar tebal dengan teks aksen biru (`cursor-effect`).
  - Paragraf pembuka: Abu-abu seimbang dengan line-height lapang (`1.7`).

### C. Karakteristik Spacing & Elevation
- Section padding lega (`padding: 100px 0` di desktop, `60px 0` di mobile).
- Layered Soft Shadows: `box-shadow: 0 10px 30px -10px rgba(10, 37, 64, 0.08)`.

---

## 3. Koreografi Animasi ala ISAVO

1. **Scroll Reveal (`fade-wrapper` & `fade-top`)**:
   - Elemen muncul bertahap saat masuk viewport (`opacity: 0; transform: translateY(30px)` $\rightarrow$ `opacity: 1; transform: translateY(0)` dengan transisi `cubic-bezier(0.16, 1, 0.3, 1)` durasi 0.8s).
2. **Pricing/Paket Card Staggered Hover**:
   - Card melayang naik `-8px` saat di-hover.
   - Border berubah ke warna biru aksen lembut dengan glow halus.
   - Badge *"Paling Utama / Rekomendasi"* memiliki efek subtle shimmer.
3. **Gallery Hover Zoom & Lightbox (`isavo-hover-view`)**:
   - Foto membesar perlahan (`transform: scale(1.06)`) di dalam kontainer `overflow: hidden`.
   - Muncul dark glass overlay dengan tombol zoom icon.
   - Modal Lightbox layar penuh saat foto diklik untuk inspeksi visual detail.
4. **Sticky Sidebar Navigation**:
   - Kolom navigasi program di kiri menempel (*sticky pinning*) saat pengunjung membaca narasi panjang di kolom kanan.
5. **Interactive Checklist Micro-Interaction**:
   - Ikon centang hijau sedikit membesar (`scale(1.15)`) saat item list di-hover.
6. **Smooth Accordion FAQ Expansion**:
   - Animasi buka-tutup akordeon menggunakan transisi CSS grid (`grid-template-rows: 0fr` ke `1fr`) sehingga gerakan halus tanpa layout shift.
7. **Pulse Action Widget**:
   - Tombol konsultasi WhatsApp dan tombol donasi memiliki efek cincin denyut (*pulse ring*).

---

## 4. Anatomi Lengkap 8 Section Template Program

### Section 1: Page Header & Breadcrumb ala ISAVO (`isavo-page-header`)
- **Latar**: Banner foto bernuansa arsitektur/lanskap GVF dengan overlay gelap gradasi navy.
- **Teks**:
  - Judul Program (misal: *"Wakaf Produktif & Pendidikan Berkelanjutan"*).
  - Breadcrumb dinamis: `Home - Program - Wakaf`.
  - Badge Status Syariah: `#WAKAF ABADI BWI`.

### Section 2: Pilihan Paket Akad & Donasi (`isavo-pricing-section`)
- **Struktur**: 3-4 Kartu Berjejer (mengadopsi Pricing Card di `/architecture` ISAVO):
  - **Paket 1: Retail / Pemula** (misal: *Wakaf 1 Meter Lahan - Rp 150.000*).
  - **Paket 2: Paling Populer (Highlighted Card)** (misal: *Paket Ruang Belajar Santri - Rp 750.000*).
  - **Paket 3: Keluarga / Korporat** (misal: *Paket Fasilitas Wakaf Lengkap - Rp 2.500.000*).
  - **Paket 4: Nominal Bebas (Custom Amount)**.
- **Isi Kartu**:
  - Label paket & subjudul.
  - Nominal harga & satuan.
  - Estimasi penyaluran & akad syar'i.
  - Header: *"Penyaluran & Manfaat:"*.
  - Checklist centang hijau keunggulan (4-5 poin).
  - Tombol CTA: *"Tunaikan Akad Sekarang →"*.

### Section 3: Deep-Dive Program (2 Kolom Sticky Sidebar ala ISAVO `service-details`)
- **Kolom Kiri (Sticky Sidebar - Lebar 4 Kolom)**:
  - **Box Navigasi Program Lain**: List tautan ke program lain (`Wakaf`, `Zakat`, `Infaq`, `Sedekah`) dengan state aktif indikator biru.
  - **Box Bantuan & CS Fast-Response**: Box berlatar foto transparan, logo GVF, no telepon/WhatsApp, dan link konsultasi langsung.
- **Kolom Kanan (Konten Narasi - Lebar 8 Kolom)**:
  - Banner foto utama program (rasio 16:9 rounded border).
  - Uraian latar belakang & urgensi masalah di lapangan.
  - **4 Value Box Icon Grid**:
    - Nilai Abadi / Multiplier Pahala.
    - Penerima Manfaat Terverifikasi.
    - Laporan Dokumentasi Berkala.
    - Sertifikat Digital Resmi.
  - Paragraf penutup penguat keyakinan berdonasi.

### Section 4: Galeri & Dokumentasi Lapangan (Showcase Interaktif ala ISAVO) 📸
- **Konsep**: Dedicated Full-Width Gallery Showcase (kombinasi `isavo-project-section` & `portfolio-carousel`).
- **Heading Section**:
  - Pill Tag: `#DOKUMENTASI LAPANGAN & PROGRES`.
  - Judul: *"Bukti Nyata Penyaluran & Masterplan"*
  - Subjudul: Transparansi fisik progres pembangunan dan aktivitas penerima manfaat di Jonggol Bogor.
- **Galeri Grid / Carousel**:
  - Kartu foto beresolusi tinggi dengan rasio 4:3 atau 16:9.
  - Badge kategori foto (misal: `[Masterplan 3D]`, `[Pondasi Masjid]`, `[Santri Belajar]`, `[Lahan Hijau]`).
  - Efek hover zoom ala ISAVO (`isavo-hover-view`).
  - Modal Lightbox Popup layar penuh saat kartu foto diklik.

### Section 5: Alur Penyaluran & Akad (4-Langkah Transparan ala ISAVO `process-section`)
- Format alur horizontal (01 s/d 04) dengan nomor besar:
  - **01. Tentukan Niat & Nominal**: Pilih paket akad yang sesuai kemampuan.
  - **02. Ijab Qobul Digital**: Baca lafadz akad wakaf/zakat secara sadar.
  - **03. Transfer & Verifikasi Otomatis**: Melalui QRIS, Virtual Account, atau Bank Syariah.
  - **04. Sertifikat & Pantau Laporan**: Dapatkan akta wakaf digital dan laporan perkembangan pembangunan via WhatsApp/Email.

### Section 6: Dewan Pengawas Syariah & Kepengurusan (`isavo-leadership-strip`)
- Profil pengawas syariah dan pimpinan nazhir yang bertanggung jawab atas program tersebut.
- Foto resmi, nama lengkap bergelar, jabatan (Ketua Dewan Pengawas Syariah, Direktur Wakaf), serta kutipan komitmen menjaga amanah umat.

### Section 7: Legalitas Resmi, SK BWI & Rekening Yayasan (`isavo-legalitas-section`)
- **Badge Keabsahan Hukum**:
  - Logo Badan Wakaf Indonesia (BWI) & Nomor Tanda Daftar Nazhir.
  - SK Kementerian Hukum dan HAM RI.
  - Rekomendasi Kementerian Agama RI.
- **Daftar Rekening Resmi Bank**:
  - Bank Syariah Indonesia (BSI), Bank Mandiri, Bank BCA atas nama yayasan.
  - Fitur "Salin Nomor Rekening" 1-klik untuk kemudahan donatur.

### Section 8: FAQ Syariah & Form Konfirmasi Akhir (`isavo-faq-section`)
- Akordeon interaktif untuk 5 pertanyaan fiqih yang paling sering ditanyakan (misal: batasan nisab zakat, keabsahan wakaf uang, pengalihan dana darurat).
- Bottom Newsletter/CTA Banner: *"Punya Pertanyaan Khusus Terkait Program Ini? Bicaralah dengan Konsultan Syariah Kami"*.

---

## 5. Rencana Struktur File & Routing Astro

```
astro-web/src/
├── data/
│   └── programs.ts                   # Data terpusat (Wakaf, Zakat, Infaq, Shodaqoh + Galeri + Paket + FAQ)
├── layouts/
│   └── ProgramLayout.astro           # Template induk 8-section yang reusable & interaktif
├── pages/
│   └── program/
│       ├── index.astro               # Halaman indeks/katalog program
│       ├── wakaf.astro               # Implementasi halaman Wakaf
│       ├── zakat.astro               # Implementasi halaman Zakat
│       ├── infaq.astro               # Implementasi halaman Infaq
│       └── sedekah.astro             # Implementasi halaman Sedekah
└── components/
    ├── layout/
    │   └── Navbar.astro              # Update menu dropdown ke link masing-masing (/program/wakaf, dll)
    └── program/
        ├── ProgramHeader.astro       # Section 1
        ├── ProgramPricing.astro      # Section 2
        ├── ProgramDeepDive.astro     # Section 3
        ├── ProgramGallery.astro      # Section 4 (Full-width Showcase + Lightbox)
        ├── ProgramWorkflow.astro     # Section 5
        ├── ProgramLeadership.astro   # Section 6
        ├── ProgramLegalitas.astro    # Section 7
        └── ProgramFaqCta.astro       # Section 8
```

---

## 6. Tahapan Eksekusi Pengerjaan

1. **Fase 1 (Data & Schema)**: Menyusun file konfigurasi `src/data/programs.ts` berisi data lengkap untuk ke-4 pilar (Wakaf, Zakat, Infaq, Sedekah) lengkap dengan paket donasi, galeri foto, dewan pengawas, legalitas, dan FAQ.
2. **Fase 2 (Komponen UI & Animasi 8 Section)**: Membangun template induk `ProgramLayout.astro` dan sub-komponennya dengan styling tokens ISAVO, efek hover zoom galeri, lightbox modal, dan animasi interaktif.
3. **Fase 3 (Halaman & Dynamic Routes)**: Mengaktifkan route `/program/wakaf`, `/program/zakat`, `/program/infaq`, `/program/sedekah` serta indeks `/program`.
4. **Fase 4 (Navbar & Link Integration)**: Menyinkronkan dropdown Navbar agar link mengarah langsung ke halaman masing-masing.
5. **Fase 5 (Testing & Quality Assurance)**: Memverifikasi tampilan responsif di mobile/desktop, testing interaksi modal lightbox galeri & salin rekening, memastikan bebas warna ungu dan nihil error console/build.
