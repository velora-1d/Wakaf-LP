# Kanban Board: Pen.dev Alignment (Per Section)

## To Do

## In Progress
- [/] DONATUR-INPUT-KODE-TGL-01: Penambahan Kolom Input Kode Transaksi & Tanggal Transaksi pada Form Donasi Admin (/admin/donatur), Integrasi API Create & Update, serta Drizzle ORM

## In Review / Test

## Done
- [x] ADMIN-FILTER-NOMINAL-CUSTOM-01: Kolom Input Dinamis Filter Rentang Nominal Min & Max (Format Rupiah & Integrasi Preset Realtime) di /admin/donatur Terverifikasi Build
- [x] ADMIN-RBAC-ROLES-01: Sistem Role & Hak Akses Menu Dinamis dengan Checkbox (Cekbk) Per Menu di Admin CMS & Pengaturan Izin Akses Sidebar Terverifikasi Build
- [x] ADMIN-FILTER-NOMINAL-01: Filter menurut nominal donasi (preset rentang nominal & kalkulasi realtime dengan pagination) di /admin/donatur Terverifikasi Build
- [x] ADMIN-SIDEBAR-COLLAPSE-01: Fitur Sidebar Collapsible (Expand/Collapse Compact Mode) di AdminLayout dengan Persistensi State LocalStorage
- [x] ADMIN-PAGINATION-01: Komponen Pagination Interaktif untuk Tabel Donatur & Penerimaan serta Tabel Realisasi Alokasi Kas (Page Selector, Prev/Next, & Status Items)
- [x] DOCKER-PNPM-V11-FIX-01: Migrasi Konfigurasi Build Script pnpm v11+ (allowBuilds esbuild, sharp, bcryptjs) ke pnpm-workspace.yaml & Standalone pnpm-lock.yaml di Dockerfile astro-web (Lulus Push Remote Main)
- [x] CASH-ALLOC-TABS-01: Implementasi Tab Realisasi Alokasi Kas (Debit-Kredit-Saldo) di /admin/donatur Terintegrasi DB PostgreSQL (Drizzle ORM), API CRUD, & MinIO S3 (Lulus Uji End-to-End & Live SSR)
- [x] DONATUR-SEED-MKU-01: Seeding 57 Transaksi Donasi Masjid Khairu Ummah ke Shodaqoh/Sedekah (/program/sedekah) Senilai Rp 55.927.000, Update Kredensial Admin, & Standardisasi 4 Program Resmi Web (Wakaf, Infaq, Sedekah, Zakat)
- [x] BRAND-LOGO-GVF-01: Penerapan Logo Baru Global Village Fund (3D Silver-Gold) di Komponen Publik (Program Consultation Box, Footer, dan Navbar - Integrasi Aset Bersih & Terverifikasi Browser Empiris)
- [x] PROGRAM-PACKAGES-CMS-01: Sinkronisasi Skema DB PostgreSQL & Visual Package Editor di Admin CMS untuk Seluruh Halaman Program (Wakaf, Infaq, Sedekah, Zakat) Secara Paralel
- [x] PROGRAM-DONORS-FEED-01: Transformasi Tabel Add-on Tambahan menjadi Live Donatur Feed per Kategori Program di Halaman Publik (Wakaf, Infaq, Sedekah, Zakat) Terintegrasi DB PostgreSQL
- [x] DONATUR-ACTION-DEBUG-01: Investigasi dan Perbaikan Tombol Aksi di Menu Donatur (/admin/donatur: Tombol Catat Donasi Baru, Aksi Edit, Verifikasi Lunas/Pending, Hapus, WA, dan Bukti S3)
- [x] MINIO-S3-INTEG-01: Integrasi Penuh MinIO S3 (Upload di Section Editor Admin, Perbaikan PathStyle Client & Migrasi Batch Gambar ke S3) secara Paralel
- [x] DONATUR-TEST-01: Pengujian end-to-end, validasi TypeScript (`tsc --noEmit`), build verifikasi Astro SSR, dan uji browser interaktif
- [x] DONATUR-WA-01: Integrasi generator link WhatsApp konfirmasi/kwitansi dan navigasi sidebar AdminLayout
- [x] DONATUR-DRAWER-01: Implementasi Slide-Over Drawer samping kanan 70% untuk form tambah & edit donatur/transaksi terintegrasi MinIO S3
- [x] DONATUR-UI-01: Pembuatan dashboard Shadcn UI `/admin/donatur` (kartu metrik, tabel lengkap kolom No & Checkbox, filter program/leads/status, bulk action bar)
- [x] DONATUR-API-01: Pembuatan API endpoint CRUD donatur, upload bukti MinIO S3, update, dan verifikasi pembayaran (create, update, upload, verify, delete)
- [x] SIDEBAR-ROBUST-01: Perbaikan Log & Ketahanan Menu Sidebar Admin CMS (Pencegahan CONNECT_TIMEOUT Tailscale, Fallback DB Safe-Mode & Penghapusan Konflik ClientRouter)
- [x] DONATUR-DB-01: Penambahan skema `donors` & `donations` di Drizzle ORM serta eksekusi DDL migrasi PostgreSQL (Tabel, Relasi, Indeks & Seeding Berhasil)
- [x] UIVERSE-BTN-01: Penerapan Efek Animasi Tombol Uiverse (Circle Ripple Expansion Biru ISAVO) pada Hero, Program Portofolio, About & Kontak WA secara Paralel
- [x] HUMANIZE-FIX-01: Perbaikan Humanize-UI Home & Navigasi Global (Ghost links, Kontak WA, Kontras News, A11y Leadership, Bersihkan Kode Mati)
- [x] HUMANIZE-FIX-02: Perbaikan Humanize-UI Program ZISWAF & Data Filantropi (Copywriting Filantropi, Rincian Alokasi, Data Jonggol, SVG Icons)
- [x] HUMANIZE-FIX-03: Perbaikan Humanize-UI Halaman Pendukung, Admin CMS & ElasticGallery (Mobile Drawer Admin, WA Redirect, Font & Asset Lokal)
- [x] HUMANIZE-AUDIT-01: Audit Menyeluruh Humanize-UI Per Halaman & Section secara Paralel (Beranda, Program ZISWAF, Pendukung & Admin)
- [x] TASTE-ALIGN-01: Penyelarasan Taste-Skill Frontend Art Direction & Micro-Interactions (Per Halaman & Section - Easing cubic-bezier(.2, .8, .2, 1), Taktil Motion, Visual Hierarchy)
- [x] ANTISLOP-CODE-01: Pembersihan Komentar Slop (Decorative Separators, Workflow Narration, Card Numbering & Empty Labels) di Template Astro, Style & Data
- [x] CMS-FASE-06: Uji Coba End-to-End Realtime Section Management
- [x] CMS-FASE-05: Integrasi SSR Dynamic Sections & Toggle Visibility di Frontend Publik
- [x] CMS-FASE-04: Dashboard Admin UI & Section Manager Editor (/admin, /admin/pages/[slug])
- [x] CMS-FASE-03: Sistem Autentikasi Admin, Session Cookie & Halaman Login (/admin/login)
- [x] IMPECCABLE-03: Optimasi Performa & Anti-Slop Layout (Eliminasi Layout Thrashing Width/Padding, Touch Target 44px, Eliminasi Gradien AI)
- [x] CMS-FASE-02: Skema PostgreSQL & Seeding Awal Seluruh Halaman & Section
- [x] CMS-FASE-01: Setup Astro Adapter SSR (@astrojs/node) & Database Client (Drizzle ORM / postgres)
- [x] IMPECCABLE-02: Penguatan Aksesibilitas Kritis (Pause Carousel Hero, ARIA Tab Layanan, Focus Trap Modal & Label Form)
- [x] IMPECCABLE-01: Standardisasi Tipografi & Palet Warna Royal Blue (Golos Text & Royal Blue #0969da/#0752a8, eliminasi Inter & #006B3E)
- [x] ELASTIC-GALLERY-CENTER: Presisikan Elastic Gallery Accordion agar mengisi penuh 100% kontainer dan terpusat simetris
- [x] ABOUT-GALLERY-ELASTIC: Ganti Galeri Tentang Kami ke Elastic Gallery (Horizontal Accordion)
- [x] 3D-GALLERY-01: Optimasi 3D Parallax Gallery (Light Mode, Full Viewport, Ringan 60fps & Eliminasi Teks Berulang)
- [x] CONTACT-SEC-01: Halaman Kontak Sesuai Pen.dev `AlCVn` (`contact.astro` & eliminasi halaman non-pendev)
- [x] PARTNER-SEC-01: Halaman Kemitraan Sesuai Pen.dev `EHsHA` (`kemitraan.astro` & eliminasi halaman non-pendev)
- [x] ABOUT-SEC-01: Halaman Tentang Kami Sesuai Pen.dev `BtC15` (`tentang-kami.astro` & eliminasi halaman non-pendev)
- [x] ZAKAT-SEC-04: FAQ Accordion Zakat Sesuai Pen.dev (`programs.ts`)
- [x] ZAKAT-SEC-03: Deep-Dive Program Zakat 2 Kolom (`programs.ts` / `ProgramLayout.astro`)
- [x] ZAKAT-SEC-02: Pilihan Paket Zakat & Eliminasi Add-on Non-Pendev (`programs.ts`)
- [x] ZAKAT-SEC-01: Page Header & Breadcrumb Banner Sesuai Pen.dev (`programs.ts`)
- [x] SEDEKAH-SEC-04: FAQ Accordion Sedekah Sesuai Pen.dev (`programs.ts`)
- [x] SEDEKAH-SEC-03: Deep-Dive Program Sedekah 2 Kolom (`programs.ts` / `ProgramLayout.astro`)
- [x] SEDEKAH-SEC-02: Pilihan Paket Sedekah Nutrisi & Eliminasi Add-on Non-Pendev (`programs.ts`)
- [x] SEDEKAH-SEC-01: Page Header & Breadcrumb Banner Sesuai Pen.dev (`programs.ts`)
- [x] WAKAF-SEC-04: FAQ Accordion Wakaf Sesuai Pen.dev (`programs.ts`)
- [x] WAKAF-SEC-03: Deep-Dive Program Wakaf 2 Kolom (`ProgramLayout.astro` / `programs.ts`)
- [x] WAKAF-SEC-02: Pilihan Paket Wakaf & Add-on Services Table (`PricingPackagesSection.astro` / `programs.ts`)
- [x] WAKAF-SEC-01: Page Header & Breadcrumb Banner Sesuai Pen.dev (`programs.ts`)
- [x] INFAQ-SEC-04: Eliminasi Section Non-Pen.dev & Sinkronisasi FAQ Accordion (`ProgramLayout.astro`)
- [x] INFAQ-SEC-03: Deep-Dive Program 2 Kolom (`ProgramLayout.astro`)
- [x] INFAQ-SEC-02: Pilihan Paket Infaq & Add-on Services Table (`PricingPackagesSection.astro`)
- [x] INFAQ-SEC-01: Page Header & Breadcrumb Banner Sesuai Pen.dev (`ProgramLayout.astro`)
- [x] Section 1: Header / Navbar (`Navbar.astro`)
- [x] Section 2: Hero Section with Active Carousel (`HeroSection.astro`)
- [x] Section 3: Empat Pilar Kebaikan (`OurProgramsSection.astro`)
- [x] Section 4: Tentang Kami Wadah Kolaborasi (`AboutSplitSection.astro`)
- [x] Section 5: Jelajahi Ekosistem Terpadu Interactive (`InteractiveServicesSection.astro`)
- [x] Section 6: Empat Pilar Filantropi (`WorkflowSection.astro`)
- [x] Section 7: Dokumentasi Riil & Masterplan Kawasan (`ShowcaseSection.astro`)
- [x] Section 8: Temui Dewan & Pengurus GVF Interactive (`LeadershipSection.astro`)
- [x] Section 9: Video Dokumentasi YouTube Resmi & UI Refresh (`VideoSection.astro`)
- [x] Section 10: Kabar GVF 3-Column Symmetrical Grid (`NewsSection.astro`)
- [x] Section 11: Final CTA Konsultasi (`FinalCtaSection.astro`)
- [x] Section 12: Footer Global (`Footer.astro`)
- [x] PROG-01: Penyelarasan Halaman Program Sesuai Desain Pen.dev (Hero, Pricing Cards, Add-on Table, Sidebar & Deep-Dive Scoped CSS)
