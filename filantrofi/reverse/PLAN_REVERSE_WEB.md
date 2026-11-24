# Master Plan Reverse Engineering Web: amalsholeh.com ke Filantrofi (Astro)

Rencana kerja terperinci untuk merekayasa balik (*reverse engineering*) aspek desain, menu, dan alur pengguna (*user flow*) dari platform filantropi amalsholeh.com untuk diimplementasikan ke dalam ekosistem **Filantrofi Web (Astro)**.

---

## 1. Tujuan & Metodologi Clean-Room

1. **Benchmarking Berbasis Fakta**: Mengekstraksi pola UX terbaik yang terbukti efektif di lapangan (konversi donasi tinggi, trust building, dan engagement donatur).
2. **Kepatuhan Desain Sistem GVF**: Menyelaraskan seluruh temuan dengan standar desain resmi:
   - Font: **Golos Text** (menggantikan Inter).
   - Palet Warna: **Biru Royal Arsitektural** (`#0969da` / `#0752a8`), kanvas bersih `#f8fafc`, kanvas gelap `#0f172a`. Tanpa warna ungu atau gradien berlebih.
   - Ikonografi: **Lucide SVG Icons** murni (tanpa emoji).
   - Tanpa Anti-Pattern AI Slop: Bebas dari floating glow, border neon, dan template kaku.

---

## 2. Bagian 1: Reverse Engineering Desain & Tata Letak

### A. Pola Viewport & Kontainer
* **Mobile-First Layout**:
  - Pada layar ponsel (< 640px), aplikasi bertindak menyerupai Progressive Web App (PWA) dengan kontainer terpusat maksimal 480px–540px.
  - Header sticky di atas (logo, search button, avatar).
  - Floating CTA sticky di bawah layar ("Wakaf Sekarang" / "Donasi Sekarang").
  - Fixed bottom navigation bar (5 tombol utama).
* **Desktop Layout**:
  - Grid simetris lebar 1200px.
  - Header penuh dengan bilah pencarian tengah, navigasi kategori, dan tombol CTA.
  - Two-column detail page: Kolom kiri (65%) narasi kampanye & update kabar; Kolom kanan (35%) kartu donasi sticky dengan progress bar dan tombol transaksi.

### B. Hierarki Kartu Program (Campaign Card Anatomy)
1. **Thumbnail Media**: Rasio 16:9 atau 4:3 dengan lazy-loading dan badge kategori di pojok kiri atas.
2. **Mitra Pengelola**: Nama lembaga mitra dan badge verifikasi akun.
3. **Judul Program**: Maksimal 2 baris (`line-clamp-2`), font weight 700, teks warna netral gelap.
4. **Indikator Progres**:
   - Slim progress bar (tinggi 6px, border-radius pill).
   - Persentase terkumpul (0% - 100%+).
5. **Metrik Finansial**:
   - Kolom kiri: Nominal terkumpul (bold, warna aksen biru).
   - Kolom kanan: Sisa hari kampanye (*countdown deadline*).

---

## 3. Bagian 2: Reverse Engineering Menu & Arsitektur Navigasi

### A. Struktur Navigasi Desktop
* **Top Bar / Header**:
  - Logo Filantrofi.
  - Search Input: "Cari program kebaikan, wakaf, atau masjid...".
  - Navigasi Utama:
    * Beranda (`/`)
    * Program Wakaf (`/programs?category=wakaf`)
    * Infaq & Sedekah (`/programs?category=infaq`)
    * Zakat (`/zakat`)
    * Kabar Penyaluran (`/kabar`)
  - Aksi Donatur: Tombol "Donasi Cepat" dan tautan "Masuk / Akun".

### B. Struktur Navigasi Mobile (Bottom Navigation Bar)
1. **Beranda (`/`)**: Ikon Home - Halaman kurasi program, hero slider, dan kategori chips.
2. **Program (`/programs`)**: Ikon Grid / Layers - Katalog lengkap dengan filter kategori, urutan (Terbaru, Terpopuler, Segera Berakhir).
3. **Donasi Saya (`/donations-app`)**: Ikon Receipt / History - Catatan transaksi donatur, status pembayaran VA/QRIS, dan riwayat infak.
4. **Inbox (`/inbox`)**: Ikon Bell / Message - Notifikasi konfirmasi dana masuk dan laporan penyaluran dari program yang pernah didonasikan.
5. **Akun (`/user`)**: Ikon User - Profil donatur, pengaturan nomor WhatsApp, dan opsi anonimitas permanen.

---

## 4. Bagian 3: Reverse Engineering Alur Pengguna (Core User Flows)

```
[Penemuan Program] -> [Eksplorasi Detail] -> [Pilihan Nominal] -> [Data Donatur] -> [Checkout Pembayaran] -> [Konfirmasi & Doa]
```

### Flow 1: Eksplorasi Halaman Detail Program (`/[slug]`)
Halaman detail terbagi menjadi beberapa tab dan seksi fungsional:
* **Header & Hero**: Foto utama/video YouTube, judul program, nama lembaga mitra terverifikasi, tombol "Bagikan" (*Share link dengan referral tracking*).
* **Statistik Donasi**: Total terkumpul, target dana, jumlah donatur, dan sisa hari.
* **Sticky Action**: Tombol lebar "Wakaf Sekarang" / "Donasi Sekarang".
* **Accordion Rincian Penggunaan Dana**: Transparansi alokasi (misal: 80% pembangunan fisik, 15% logistik operasional, 5% pendampingan).
* **Tab Navigasi Konten**:
  1. *Cerita / Narasi (`/[slug]/story`)*: Latar belakang masalah, urgensi, foto kondisi lapangan.
  2. *Kabar Terbaru (`/[slug]/news`)*: Timeline penyaluran berkala dilengkapi foto bukti penerima manfaat dan pencairan dana.
  3. *Daftar Donatur (`/[slug]/donatur`)*: Live feed donatur, nominal donasi, dan fitur doa.
  4. *Fundraiser (`/[slug]/fundraiser`)*: Daftar agen penggalang dana relawan dan tombol "Jadi Fundraiser".

### Flow 2: Interaksi Sosial "Doa Donatur & Aamiin"
Fitur kunci penguat *social proof* dan *emotional engagement*:
1. Donatur menulis pesan doa saat mengisi formulir checkout (contoh: *"Bismillah, wakaf untuk almarhum orang tua..."*).
2. Pesan doa tampil di kartu donatur live feed.
3. Pengunjung lain dapat menekan tombol **"Aamiin"** (ikon tangan berdoa / heart count).
4. Counter "Aamiin" bertambah secara reaktif tanpa perlu reload halaman.

### Flow 3: Alur Transaksi & Checkout Pembayaran
1. **Langkah 1 - Pemilihan Nominal**:
   - Preset chips nominal cepat: Rp 10.000, Rp 25.000, Rp 50.000, Rp 100.000, Rp 500.000.
   - Input nominal kustom (minimum Rp 10.000).
2. **Langkah 2 - Form Data Diri Donatur**:
   - Nama Lengkap (dengan toggle switch: *"Sembunyikan nama saya / Hamba Allah"*).
   - Nomor WhatsApp aktif (untuk pengiriman bukti kwitansi otomatis via WA Gateway).
   - Email (opsional).
   - Textarea: *"Tulis doa atau dukungan Anda"*.
3. **Langkah 3 - Pemilihan Metode Pembayaran**:
   - **QRIS Dinamis**: Instan via BCA Mobile, Livin, GoPay, OVO, ShopeePay, Dana.
   - **Virtual Account (VA)**: Otomatis tanpa kode unik (BCA, Mandiri, BRI, BNI, BSI).
   - **Transfer Bank Manual**: Menggunakan kode unik 3 digit (contoh: Rp 50.184) untuk auto-reconciliation.
4. **Langkah 4 - Halaman Instruksi Pembayaran**:
   - Rincian total bayar (Nominal donasi + infak operasional + kode unik).
   - Tombol "Salin Nomor Rekening / VA" dan "Salin Nominal Tepat".
   - Countdown timer 24 jam kedaluwarsa tagihan.
   - Panduan transfer bertahap (ATM, Mobile Banking, Internet Banking).
5. **Langkah 5 - Verifikasi Otomatis**:
   - Webhook payment gateway mentrigger status menjadi `PAID`.
   - Donasi langsung muncul di list donatur real-time.

---

## 5. Bagian 4: Blueprint Pemetaan Komponen ke `filantrofi/website` (Astro)

Penyusunan arsitektur file Astro untuk `filantrofi/website/src/`:

```
filantrofi/website/src/
├── layouts/
│   ├── Layout.astro              # Base HTML, font Golos Text, theme tokens
│   └── MobileShell.astro         # Shell khusus mobile PWA viewport
├── components/
│   ├── navigation/
│   │   ├── Navbar.astro          # Desktop header & search bar
│   │   ├── MobileBottomNav.astro # Sticky bottom 5-menu navigation
│   │   └── CategoryChips.astro   # Horizontal scroll filter pills
│   ├── campaign/
│   │   ├── CampaignCard.astro    # Kartu preview program dengan progress bar
│   │   ├── CampaignGrid.astro    # Grid 3-kolom desktop / 1-kolom mobile
│   │   ├── HeroBanner.astro      # Slider program unggulan
│   │   └── FundraiserBadge.astro # Informasi mitra pengelola terverifikasi
│   ├── detail/
│   │   ├── CampaignHeader.astro  # Galeri foto, judul & metrik terkumpul
│   │   ├── FundUsageModal.astro  # Modal rincian alokasi penggunaan dana
│   │   ├── TabNavigation.astro   # Tab Cerita, Kabar, Donatur, Fundraiser
│   │   └── StickyDonationBar.astro # Floating bottom CTA donasi
│   ├── donor/
│   │   ├── DonorFeed.astro       # Daftar riwayat donatur live
│   │   └── DonorPrayerCard.astro # Kartu doa donatur dengan tombol interaktif Aamiin
│   └── checkout/
│       ├── NominalSelector.astro # Chip pilihan nominal & input kustom
│       ├── DonorForm.astro       # Input nama, WA, doa & toggle Hamba Allah
│       └── PaymentMethodList.astro # Pilihan QRIS, VA Bank & E-Wallet
└── pages/
    ├── index.astro               # Beranda utama
    ├── programs/
    │   └── index.astro           # Katalog seluruh program & pencarian
    ├── program/
    │   └── [slug].astro          # Halaman detail program dinamis
    ├── checkout/
    │   └── [slug].astro          # Halaman formulir donasi
    ├── payment/
    │   └── [orderId].astro       # Halaman instruksi pembayaran & QRIS/VA
    └── donasi-saya/
        └── index.astro           # Riwayat donasi donatur
```

---

## 6. Bagian 5: Tahapan Eksekusi (Phased Rollout)

1. **Fase 1: Kerangka Navigasi & Shell Responsif**
   - Implementasi `Navbar.astro` (Desktop) dan `MobileBottomNav.astro` (Mobile).
   - Pengaturan breakpoint responsif (Desktop 1200px vs Mobile 480px).
2. **Fase 2: Beranda & Katalog Program**
   - Banner unggulan, filter kategori horizontal, dan grid kartu program dinamis.
3. **Fase 3: Halaman Detail Program Multi-Tab**
   - Pembuatan `[slug].astro` dengan tab Cerita, Kabar Penyaluran, dan Donatur.
   - Komponen doa donatur dengan interaksi tombol "Aamiin".
4. **Fase 4: Alur Checkout Donasi & Instruksi Pembayaran**
   - Halaman formulir donasi dengan chip nominal dan toggle Hamba Allah.
   - Halaman tagihan dengan salin nomor rekening dan timer kedaluwarsa.
5. **Fase 5: Validasi Build & Anti-Slop Audit**
   - Audit a11y, target sentuh minimal 44x44px, palet warna biru arsitektural `#0969da`, tanpa gradien slop, dan verifikasi build 100%.
