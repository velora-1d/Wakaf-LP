# Global Village Fund Transformation Implementation Plan

> **For Agent:** REQUIRED SUB-SKILL: Use `executing-plans`, `ui-ux-pro-max`, `design-taste-frontend`, and `antislop` to implement this plan task-by-task.

**Goal:** Transform the landing page (`index.html`) from a dedicated "Wakaf" page into a comprehensive **"Donasi"** platform under **Global Village Fund**, where **Donasi** serves as the overarching umbrella containing **Infaq** (pembangunan/material) and **Shodaqoh/Sedekah** (fasilitas/kegiatan), while explicitly offering dedicated consultation services for **Zakat** (Zakat Mal) and **Wakaf** (Wakaf Uang).

**Architecture & Taxonomy Hierarchy:** 
```
                          GLOBAL VILLAGE FUND
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
        [ DONASI UTAMA ]                     [ LAYANAN KHUSUS CS ]
      (Online & Rekening)                         (Manual WA)
        ┌─────┴─────┐                             ┌─────┴─────┐
        ▼           ▼                             ▼           ▼
     INFAQ       SEDEKAH                        ZAKAT       WAKAF
 (Pembangunan)  (Fasilitas)                    (Zakat Mal) (Wakaf Uang)
  [Uang/Barang] [Uang/Barang]
```
- **Payung Utama (Donasi)**: Menggantikan istilah "Wakaf" di seluruh headline utama, tombol CTA, status pembayaran, dan saluran donasi resmi.
- **Dua Pilar Donasi Reguler**:
  1. **Infaq**: Dialokasikan untuk pembangunan fisik & pengadaan material konstruksi masjid (tersedia opsi dana online/transfer dan infaq barang material).
  2. **Sedekah (Shodaqoh)**: Dialokasikan untuk fasilitas, sarana prasarana, dan operasional kegiatan masjid (tersedia opsi dana online/transfer dan sedekah barang fasilitas).
- **Layanan Khusus (Zakat & Wakaf)**:
  1. **Zakat Mal**: Perhitungan nisab dan konsultasi manual via Customer Service WhatsApp.
  2. **Wakaf Uang**: Wakaf pembangunan & fasilitas masjid berkelanjutan yang dikonsultasikan via CS WhatsApp.
- **Visual Identity & Design Tokens**: Logo transparan baru **Global Village Fund** (`logo-gvf.png`), estetika Porcelain & Islamic Forest Green (`#0c5e37` / `#16a34a`), tanpa warna ungu.
- **Preservation Gate**: 9 item matriks Arsitektur Kawasan Modern Green Building & Santripreneur FAST tetap utuh tanpa modifikasi narasi.

**Tech Stack:** HTML5 Semantic Markup, Modern Vanilla CSS3 Custom Properties (Design Tokens), SVG Icons, Google Fonts (Plus Jakarta Sans, Amiri, JetBrains Mono), Local Font (LPMQ).

---

## Design Read & Dial Calibration (Antislop Framework)
- **Design Read:** Institutional Islamic Philanthropy Landing Page under the Global Village Fund banner, providing clear structural distinction between Donasi (Infaq & Sedekah) and Layanan Khusus (Zakat & Wakaf).
- **ENERGY Dial: 2 (Balanced)** - Warm, dignified, transparent, and authoritative; eliminating generic crowdfunding cliches.
- **RHYTHM Dial: 2 (Consistent with breaks)** - Natural narrative sequence:
  1. Brand Crest & Institutional Authority (Global Village Fund & Yayasan Permata Cendekia Indonesia)
  2. Hero Prose: Donasi Pembangunan Masjid Khairu Ummah Sugro
  3. Video Theater: Visi & Ikhtiar Global Village Fund
  4. Transparansi Realisasi Anggaran Pembangunan
  5. Dalil Syar'i: QS. Al-Baqarah: 261 (Teks Arab bertasykil, terjemahan & hikmah)
  6. Alokasi Donasi (01 Pembangunan Masjid & 02 Fasilitas Masjid)
  7. Kebutuhan Donasi (01 Infaq Material & 02 Sedekah Fasilitas)
  8. Donasi dalam Bentuk Barang (Infaq Material & Sedekah Fasilitas via CS WA)
  9. Arsitektur Kawasan Modern Green Building (9 Poin Inti - Tetap Utuh)
  10. Section Khusus: Layanan Zakat & Wakaf (Konsultasi Manual Zakat Mal & Wakaf Uang via CS WA)
  11. Saluran Donasi Resmi (Tunaikan Donasi Online Scalev & BSI Transfer)
  12. Lokasi Kampus Santri & Rute Google Maps
- **MOTION Dial: 1 (Calm)** - 150-250ms CSS micro-transitions on hover/focus, active tactile push, modal dialog lightbox.

---

## Tasks Breakdown

### Task 1: Asset Setup & Header Re-branding (Wakaf → Donasi)
**Files:**
- Create: `logo-gvf.png` (copy from `BahanBaru/Logo/Global Village Fund RM BG.png`)
- Modify: `index.html` (header, `<title>`, meta tags, and hero copy)

- **Step 1:** Standardize the transparent logo `BahanBaru/Logo/Global Village Fund RM BG.png` to root `logo-gvf.png`.
- **Step 2:** Update `<title>`: `Donasi Pembangunan Masjid Khairu Ummah Sugro | Global Village Fund`.
- **Step 3:** Update `.sv-crest-badge` to display `logo-gvf.png` borderless, responsive, with `alt="Global Village Fund - Yayasan Permata Cendekia Indonesia"`.
- **Step 4:** Update Hero Title & Prose:
  - H1: **Donasi Pembangunan**<br><span class="sv-gold-highlight">Masjid Khairu Ummah Sugro</span>
  - Lead Prose: Memperkenalkan **Global Village Fund** sebagai wadah kontribusi kebaikan yang menghubungkan donatur dengan pembangunan Masjid Khairu Ummah Sugro di Pesantren Integratif Holistik SMK Skill Village Islamic School.

---

### Task 2: Video Theater Narrative & Quranic Verse (QS. Al-Baqarah: 261)
**Files:**
- Modify: `index.html` (video section & dalil section)

- **Step 1:** Add introductory narrative above/below video:
  *"Simak lebih dekat semangat, visi, dan ikhtiar Global Village Fund melalui video berikut."*
- **Step 2:** Replace the former hadith with **QS. Al-Baqarah: 261**:
  - Teks Arab bertasykil (LPMQ / Amiri font).
  - Takhrij / Badge: `QS. Al-Baqarah: 261`.
  - Terjemahan: *"Perumpamaan orang-orang yang menginfakkan hartanya di jalan Allah adalah serupa dengan sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji..."*

---

### Task 3: Restructure Donasi Hierarchy (Infaq, Sedekah, and Donasi Barang)
**Files:**
- Modify: `index.html` (Alokasi & Kebutuhan Donasi section)

- **Step 1: Section Header Rebranding**:
  - Ubah judul section dari "Wakaf Khairi" menjadi **Donasi Masjid Khairu Ummah Sugro**.
  - Sub-label penjelas: *"Penyaluran Donasi terbagi ke dalam Infaq Pembangunan & Sedekah Fasilitas"*.
- **Step 2: Alokasi Donasi (2 Pilar Inti)**:
  - `01 Pembangunan Masjid`: Mendukung kebutuhan konstruksi dan material untuk menyelesaikan pembangunan fisik.
  - `02 Fasilitas Masjid`: Mendukung pengadaan fasilitas dan perlengkapan untuk menunjang kegiatan ibadah & pendidikan santri.
- **Step 3: Kebutuhan Donasi (Infaq & Sedekah)**:
  - `01 Infaq - Kebutuhan Pembangunan`: 17 item material (Semen, Pasir, Split, Keramik 40x40, Granit 60x60, UNP 100 & 150, CNP 100 & 150, WF 75x150, Hollow 4x4 & 2x4, Lantai Vinyl, Panel Lantai GRC 12 mm, Kawat Loket, Hebel 10 & 7, Plafon, Aluminium, MEP, Kaca).
  - `02 Sedekah - Fasilitas & Kegiatan Masjid`: 12 item perlengkapan (Sound System, Multimedia Live Streaming, Flipchart, TV LED 50 Inch, Stand TV, Meja Lesehan, Lemari Perlengkapan, Mimbar Masjid, Karpet Masjid, Rak Sandal/Sepatu, Jam Digital, Kipas).
- **Step 4: Donasi dalam Bentuk Barang**:
  - Card penjelasan: **Infaq dalam Bentuk Barang (Material Konstruksi)** & **Sedekah dalam Bentuk Barang (Fasilitas & Perlengkapan)**.
  - Action Button: **Konfirmasi Donasi Barang via WhatsApp** dengan prefilled text spesifik ke Customer Service.

---

### Task 4: Architectural Matrix Verification & Preservation Gate
**Files:**
- Verify: `index.html` (Arsitektur Kawasan 9-card matrix)

- **Step 1:** Verifikasi seluruh 9 kartu konsep Modern Green Building & Santripreneur FAST (Masjid Green Building, Skywalk, GH Learning, Area Wudhu I & II, Studio & Workshop, Aquaponic/Hydroponic, Solar Cell, Green House Hortikultura, Masjid Hub).
- **Step 2:** Memastikan tidak ada teks narasi arsitektur yang diubah sedikit pun sesuai mandat resmi (*"Arsitektur kawasan tetap dan tidak ada narasi yang diubah"*).

---

### Task 5: Implement Dedicated "Layanan Zakat & Wakaf" Section
**Files:**
- Modify: `index.html` (Layanan Zakat & Wakaf section)

- **Step 1:** Bangun section kartu khusus di bawah Arsitektur Kawasan:
  - Header: **Layanan Zakat & Wakaf**
  - Deskripsi: *"Global Village Fund juga menyediakan layanan Zakat dan Wakaf sebagai bagian dari ikhtiar menghadirkan kebermanfaatan yang lebih luas. Bagi donatur yang ingin menyalurkan Zakat atau wakaf untuk mendukung kebermanfaatan Masjid Khairu Ummah Sugro, prosesnya dapat dikonsultasikan secara manual melalui Customer Service."*
- **Step 2:** Dua pilar layanan:
  - `01 - Zakat Mal`: Khusus harta yang telah memenuhi ketentuan & nisab zakat. Perhitungan dan konsultasi disupervisi secara manual via CS.
  - `02 - Wakaf Uang`: Wakaf Pembangunan dan Wakaf Fasilitas Masjid Khairu Ummah Sugro untuk amal jariyah berkelanjutan.
- **Step 3:** Tombol CTA Resmi:
  - Link WhatsApp CS: `Konsultasi Zakat & Wakaf via WhatsApp` dengan prefilled message:
    `"Assalamualaikum Customer Service Global Village Fund, saya ingin berkonsultasi mengenai penyaluran Zakat Mal / Wakaf Uang untuk Masjid Khairu Ummah Sugro."`

---

### Task 6: Update Saluran Donasi Resmi & Closing Details (Wakaf → Donasi)
**Files:**
- Modify: `index.html` (Saluran Donasi Resmi & Passbook)

- **Step 1:** Update heading: **Saluran Donasi Resmi**.
- **Step 2:** Update tombol pembayaran online:
  - Label: **Tunaikan Donasi Online (QRIS & Virtual Account)**
- **Step 3:** Update passbook bank transfer:
  - Bank: **BANK SYARIAH INDONESIA (BSI)**
  - No. Rekening: `7142 2637 63`
  - Atas Nama: `a.n. Yayasan Permata Cendekia Indonesia`
  - Tombol Salin No. Rekening BSI.
  - Tombol WhatsApp Konfirmasi: **Konfirmasi Donasi via WhatsApp**.
- **Step 4:** Update kata penutup / doa:
  - *"Terima kasih atas kebaikan dan keikhlasan Anda. Semoga setiap kontribusi yang diberikan menjadi amal yang membawa kebermanfaatan."*
- **Step 5:** Verifikasi alamat dan link rute Google Maps Sukasirna Jonggol.

---

### Task 7: Quality Gate, Build & Visual Verification
**Files:**
- Verify: `index.html`, `dist/`
- Build: `pnpm run build`

- **Step 1:** Verifikasi audit istilah: Pastikan istilah "Wakaf" tidak lagi dipakai sebagai payung umum, melainkan hanya berada pada porsi semestinya (layanan khusus Wakaf Uang), sementara payung utama adalah **Donasi** (dengan turunan **Infaq** & **Sedekah**).
- **Step 2:** Audit Antislop: Bebas em dash (`—`), warna biru/hijau selaras tanpa ungu, ukuran touch target >= 44px, navigasi jelas.
- **Step 3:** Eksekusi build produksi (`pnpm run build`) dan verifikasi kelancaran server lokal di `http://localhost:5173/`.

---

## Execution Handoff
Rencana ini siap dieksekusi task-by-task setelah konfirmasi pengguna.
