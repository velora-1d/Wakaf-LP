# Rencana Transformasi Website GVF (Astro Fullstack)
## Mengadopsi Arsitektur Company Profile Profesional ala ISAVO (isavo.co.id)

---

## 1. Analisis Anatomi Website ISAVO (isavo.co.id)
Berdasarkan hasil audit struktural `isavo.co.id`, berikut formula yang membuat website mereka tampil solid, meyakinkan (*high trust*), dan profesional:

1. **Top Bar & Header Fungsional**:
   - Quick contact (WhatsApp fast response, email, telepon kantor).
   - Menu navigasi multi-level (Layanan terpilah, Portofolio, Galeri, Simulasi Interaktif, Tentang Kami, Blog).
   - CTA Utama di pojok kanan atas (*Standout Button*).
2. **Hero Section dengan Positioning Tegas**:
   - Badge reputasi: `#MITRABANGUNANANDA SEJAK 2014` / `#SOLUSISATUPINTU`.
   - Dual Call-to-Action (Eksplorasi Proyek vs Konsultasi Langsung).
3. **Pilar Layanan Terstruktur (3 Solusi Utama)**:
   - Menjelaskan spesialisasi dengan jelas tanpa membuat pengunjung bingung.
4. **Trust Badges & Value Proposition**:
   - 4 pilar jaminan (Tanpa Biaya Tersembunyi, Persetujuan Tiap Tahap, Garansi Resmi, Laporan Progres Visual).
5. **Interactive Metrics / Counter Prestasi**:
   - Angka pencapaian terukur (Tahun Berdiri, Jumlah Klien, Rating Bintang, Layanan).
6. **Alur Kerja Transparan (Numbered Process - 01 s/d 04)**:
   - 01. Survey -> 02. Desain & RAB -> 03. Eksekusi -> 04. Serah Terima & Garansi.
7. **Katalog Portofolio & Proyek Filterable**:
   - Kartu proyek dengan foto berkualitas tinggi, tag kategori, dan halaman detail.
8. **Interactive Tool / Calculator (Simulasi Biaya)**:
   - Fitur unggulan interaktif di mana pengunjung bisa menghitung estimasi secara instan.
9. **Profil Tim & Dewan Pengurus (Team & Leadership)**:
   - Menampilkan wajah tim nyata untuk membangun kredibilitas manusiawi (*human touch*).
10. **Berita & Artikel Terkini (Insights / Field Reports)**:
    - Update berkala untuk edukasi dan penguatan SEO.
11. **Footer Korporat Lengkap**:
    - Legalitas nama PT, alamat fisik kantor, link direktori rapi, dan channel media sosial.

---

## 2. Pemetaan Fitur ISAVO ke GVF (Global Village Fund & Wakaf)

| Komponen ISAVO (`isavo.co.id`) | Implementasi GVF (Company Profile & Wakaf Portal) |
| :--- | :--- |
| **Positioning Hero** | *"Membangun Peradaban Berkelanjutan Melalui Wakaf Produktif & Pendidikan Berbasis Alam"* |
| **3 Layanan Utama** | **3 Pilar Program GVF**: <br>1. *Wakaf Pendidikan (Skill Village Islamic School)*<br>2. *Wakaf Rumah Ibadah (Garden Mosque Khairu Ummah)*<br>3. *Wakaf Produktif Lingkungan (Green Waqf & Eco-Pesantren)* |
| **Trust Badges** | *Legalitas Nazhir Terdaftar BWI, Pengawasan Syariah, Audit Keuangan Terbuka, Laporan Penyaluran Real-Time* |
| **Metrics / Counter** | *Target Dana Terkumpul, Luas Lahan Terbebaskan (m²), Jumlah Santri Binaan, Total Wakif Aktif* |
| **Workflow (01 - 04)** | **Alur Wakaf GVF**:<br>01. Pilih Program -> 02. Niat & Akad Wakaf -> 03. Pembayaran Otomatis -> 04. Terbit Sertifikat Digital & Laporan Penyaluran |
| **Fitur Simulasi** | **Kalkulator Wakaf Interaktif** (Simulasi Wakaf Uang, Wakaf Lahan/Meter, dan Estimasi Dampak Berkelanjutan) |
| **Portofolio Proyek** | **Katalog Program & Masterplan Lapangan** (Dilengkapi progress bar % target dana dan galeri foto lapangan) |
| **Tim & Pengurus** | **Dewan Pembina, Dewan Pengawas Syariah (DPS), dan Tim Nazhir Pengelola** |
| **Blog / Artikel** | **Kabar Penyaluran & Edukasi Wakaf Fiqih Kontemporer** |
| **Integrasi Fullstack** | **Payment Gateway (QRIS, VA, Bank Transfer) + Penerbitan Sertifikat PDF Otomatis** |

---

## 3. Rencana Arsitektur Teknologi (Astro Fullstack)

- **Framework**: Astro 5.x (SSR Mode via `@astrojs/node` atau Serverless Adapter).
- **Styling**: Vanilla CSS / Scoped CSS Modern dengan Palet Biru Korporat (Deep Navy `#0a2540`, Royal Blue `#1e6091`, Ice Blue `#e9f2ff`, aksen Forest/Emerald untuk nuansa wakaf alam, *bebas warna ungu*).
- **Interaktivitas UI**: Astro Islands (Interaktivitas ringan untuk kalkulator wakaf, modal checkout pembayaran, dan filter proyek).
- **Database & Backend Engine**:
  - Astro Endpoints (`src/pages/api/donations.ts`, `src/pages/api/campaigns.ts`, `src/pages/api/webhook.ts`).
  - Database: PostgreSQL (Drizzle ORM) untuk menyimpan data transaksi wakif, program, dan progres dana.
- **Payment & Automation**:
  - Integrasi QRIS & Virtual Account (Midtrans / Xendit / Tripay).
  - WhatsApp Notification API (opsional) untuk notifikasi bukti wakaf ke donatur.

---

## 4. Rencana Kerja Bertahap (Phased Roadmap)

### Fase 1: Setup Fondasi Astro & Sistem Desain
- Inisialisasi Astro di dalam workspace.
- Setup layout global (Header Topbar ala Isavo, Navbar dengan mega-menu, Footer korporat).
- Implementasi Design System bertema biru elegan, tipografi modern (Inter / Plus Jakarta Sans).

### Fase 2: Pembangunan Halaman Utama (Homepage Ala Isavo)
- Hero section dengan badge dan video/photo background dinamis.
- 3 Pilar Program Utama GVF.
- Counter metrik dampak wakaf terverifikasi.
- Section 4 Langkah Alur Wakaf (01-04).
- Grid Katalog Program Pilihan dengan progress bar.
- Section Profil Dewan & Nazhir.
- Section Berita Penyaluran & FAQ.

### Fase 3: Halaman Detail Program & Profil Lembaga
- Halaman detail program (contoh: `/program/skill-village-islamic-school`, `/program/garden-mosque`).
- Halaman `/tentang-kami` (Legalitas, visi-misi, susunan pengurus).
- Halaman `/laporan-transparansi` (Download laporan keuangan tahunan).

### Fase 4: Fitur Interaktif & Fullstack Backend
- Komponen Kalkulator Wakaf Interaktif (menghitung nilai meter/saham wakaf).
- Alur Checkout Donasi + Integrasi Payment Gateway (QRIS & Virtual Account).
- Generator Akta / Sertifikat Ikrar Wakaf Digital (PDF download).
- Dashboard status transaksi donatur.
