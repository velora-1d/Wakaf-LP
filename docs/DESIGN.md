# DESIGN SYSTEM SPECIFICATION: ANATOMI ASLI ISAVO (isavo.co.id)

> **Dokumen Rujukan Desain Resmi (Berdasarkan Hasil Inspeksi Live Screenshot Website isavo.co.id)**  
> Hasil audit visual langsung menggunakan browser subagent terhadap seluruh halaman `https://isavo.co.id` (Hero, Layanan, Tentang Kami, Siapa Kami, Counter, Cara Bekerja, dan Portofolio).

---

## 1. Anatomi Visual Asli ISAVO (Empirical Facts dari Screenshot)

Berikut adalah komponen visual riil yang ada di website **ISAVO**:

### 1.1. Header & Navbar
- **Bar Hitam Solid/Fixed**: Warna latar belakang navbar hitam gelap (`#111111` / `#191919`).
- **Logo ISAVO**: Logo tipografi putih di dalam kotak outline persegi panjang melengkung halus `[ ISAVO ]`.
- **Menu Navigasi**:
  - Item aktif berwarna merah aksen (`Home`), item lain berwarna putih bersih.
  - Dropdown indicator dengan panah chevron minimalis (`Layanan ⌄`, `Simulasi ⌄`).
- **Elemen Sisi Kanan Navbar**:
  - Telepon dengan ikon gagang telepon: `Call Us Phone: 0878-6599-4786`.
  - **Tombol Utama Navbar**: Tombol pill kapsul merah menyala bertuliskan `Simulasi Biaya ⌄` lengkap dengan ikon kalkulator di kiri dan chevron di kanan.
  - **Drawer Trigger**: Lingkaran hitam abu-abu dengan 4 titik grid untuk menu sidebar mobile/desktop.

---

### 1.2. Hero Section
- **Background Utama**: Foto arsitektur interior / living room mewah skala penuh (*full-bleed background*).
- **Badge Kicker**: Kapsul hitam transparan dengan dot merah di kiri:  
  `• #MITRABANGUNANANDA SEJAK 2014`
- **Headline Utama (H1)**:
  - Font: **Golos Text** tebal (800), warna putih bersih, ukuran raksasa (`clamp(2.5rem, 5vw, 4rem)`).
  - Teks asli: `Rumah Impian Anda, Dibangun Dengan Presisi`.
- **Paragraf Pengantar**: Teks putih bersih 3 baris yang tenang dan rapi di bawah headline.
- **Tombol CTA Hero**:
  - Tombol pill hitam transparan ber-outline putih: `Lihat Proyek Kami`.
  - Di ujung kanan tombol terdapat lingkaran merah solid berisi ikon panah serong `↗`.

---

### 1.3. Section Layanan Kami (Service Cards)
- **Latar Belakang**: Abu-abu arsitektural sangat lembut (`#f7f7f8`) dengan **watermark sketsa blueprint / wireframe arsitektur halus** di latar belakang.
- **Header Section (Pola 2-Kolom)**:
  - Kolom Kiri: Kosong atau badge.
  - Kolom Kanan: `Layanan Terpadu dari Hulu ke Hilir. Arsitek, Kontraktor, dan Interior dalam satu pintu.` (dengan kata-kata kunci berwarna aksen).
- **Kartu Layanan (The Real Service Cards)**:
  - **Bukan teks polos tanpa kartu!** ISAVO menggunakan kartu putih solid (`#ffffff`).
  - **Border Radius**: Sangat membulat dan mewah (`border-radius: 24px`).
  - **Elevasi**: Sangat halus dan bersih tanpa bayangan hitam kasar.
  - **Struktur Isi Kartu**:
    1. **Baris Atas**: Judul layanan tebal di kiri (misal: `Architecture Design`, `Construction`, `Interior`) dan **ikon garis geometris arsitektur berwarna emas/brass** di kanan atas.
    2. **Garis Pemisah Halus**: Garis horizontal sangat tipis (`1px solid #f0f0f0`) di bawah judul & ikon.
    3. **Baris Bawah**: Paragraf deskripsi layanan dengan tipografi abu-abu gelap `#4d4d52` yang nyaman dibaca.

---

### 1.4. Section Tentang Kami (About Us)
- **Split Layout 2-Sisi**:
  - **Sisi Kiri (Dark Section)**: Latar belakang gelap arsitektural.
    - Badge: `• BERDIRI SEJAK 2014` (kapsul kecil dengan dot merah).
    - Judul: `Tempat Dimana Rumah Impian Anda Menjadi Kenyataan` (kata `Menjadi Kenyataan` berwarna merah aksen).
    - Checklist keunggulan.
    - Tombol: `Lebih Lanjut Tentang Kami ↗` (pill outline dengan lingkaran merah panah).
  - **Sisi Kanan**: Foto nyata pimpinan/kegiatan dengan sudut melengkung `border-radius: 24px`.
- **Watermark Huruf Raksasa**: Teks `isavo` berukuran raksasa transparan di latar belakang sebagai identitas brand.

---

### 1.5. Section Fitur (Siapa Kami)
- **Header**:
  - Kolom Kiri: Kapsul abu-abu dengan dot merah `• SIAPA KAMI`.
  - Kolom Kanan: Judul besar `Jelajahi Layanan Desain Interior Kami Yang Menyeluruh` (dengan kata `Layanan Desain Interior` berwarna merah aksen) + paragraf deskripsi.
- **Komposisi Konten**:
  - Sisi Kiri: Foto proyek besar dengan sudut melengkung `border-radius: 20px`.
  - Sisi Kanan: Daftar vertikal interaktif bernomor `01`, `02`, `03`, `04` dengan judul layanan dan panah arsitektural `→`.

---

### 1.6. Section Counter / Capaian
- **Latar Belakang**: Abu-abu lembut `#f7f7f8` dengan watermark teks raksasa `isavo`.
- **4 Kolom Angka**:
  - `10+` | `Tahun Pengalaman` | Mitra pembangunan sejak 2014
  - `150+` | `Keluarga Terlayani` | Membangun rumah impian se-Jabodetabek
  - `5.0 ⭐` | `Rating Google` | Dinilai 5 bintang oleh 34+ klien yang puas
  - `3` | `Layanan Utama` | Arsitek, Konstruksi & Interior dalam satu atap
- **Ilustrasi Fisik**: Render 3D isometric potongan denah rumah arsitektural (*floorplan cutaway*) yang detail di bagian bawah kanan section.

---

### 1.7. Section Cara Kami Bekerja (The 4-Step Process)
- **Latar Belakang**: Sketsa kawat perspektif arsitektur (*3D wireframe perspective sketch*) abu-abu terang di latar belakang.
- **4 Kartu Proses Vertikal**:
  - Kartu putih solid (`#ffffff`), `border-radius: 20px`, sudut membulat elegan.
  - Bagian Atas: **Foto dokumentasi riil lapangan** (foto survey, pengukuran, rapat gambar DED, inspeksi proyek, serah terima rumah).
  - Bagian Tengah: Nomor langkah berwarna merah + judul tebal:
    - `01. Survey & Konsultasi`
    - `02. Desain & Anggaran`
    - `03. Eksekusi & Pelaporan`
    - `04. Serah Terima & Garansi`
  - Bagian Bawah: Penjelasan alur kerja yang lugas.
  - **Watermark Angka Raksasa di Pojok Kanan Bawah Kartu**: Angka transparan `01`, `02`, `03`, `04` berukuran besar yang menyatu di dalam kartu.
- **Footer Text**: Teks ajakan `Mulai Project Impian Anda Bersama Kami, Isavo [Konsultasikan Gratis]` dengan link merah bergaris bawah.

---

### 1.8. Section Portofolio Proyek
- Carousel horizontal berisi kartu proyek:
  - Foto riil proyek bangunan dengan sudut melengkung `border-radius: 16px`.
  - Badge kategori transparan di sudut atas foto: `KONTRAKTOR` / `INTERIOR` / `ARSITEKTUR`.
  - Di bawah foto: Nama proyek tebal (contoh: `Cibadak`, `Cilengsi`, `Rawa Lumbu`, `Senayan`), jenis layanan (`Kontraktor`), dan tahun (`2026`).

---

## 2. Palet Token Desain Asli ISAVO & Adaptasi ke Wakaf-LP

| Elemen | Kode Warna Asli ISAVO | Penerapan di Wakaf-LP (Sesuai Preferensi Biru User) |
| :--- | :--- | :--- |
| **Warna Aksen Utama** | `#ed3237` (Merah ISAVO) | `#0969da` / `#1e40af` (Biru Presisi Filantropi, user prefer biru bukan ungu) |
| **Warna Aksen Hover** | `#c7282c` (Merah Gelap) | `#0752a8` / `#1e3a8a` (Biru Navy Dalam) |
| **Kanvas Utama** | `#ffffff` (Putih Murni) | `#ffffff` (Putih Murni) |
| **Kanvas Sekunder** | `#f7f7f8` (Abu-abu Arsitektural) | `#f7f7f8` (Abu-abu Arsitektural) |
| **Kanvas Gelap** | `#111111` / `#191919` (Charcoal) | `#0f172a` / `#111827` (Deep Slate Charcoal) |
| **Teks Heading** | `#191919` (Charcoal Pekat) | `#191919` (Charcoal Pekat) |
| **Teks Body** | `#4d4d52` (Abu-abu Gelap) | `#4d4d52` (Abu-abu Gelap) |
| **Border Halus** | `#f0f0f0` / `#e5e7eb` (1px halus) | `#e3e3e8` (1px halus di dalam kartu) |
| **Border Radius Kartu** | `20px` – `24px` (Membulat Mewah) | `20px` – `24px` (Membulat Mewah) |
| **Border Radius Foto** | `16px` – `20px` | `16px` – `20px` |
| **Border Radius Tombol** | `9999px` (Pill Kapsul Penuh) | `9999px` (Pill Kapsul Penuh) |

---

## 3. Rumus Baku Komponen yang Harus Diterapkan di Wakaf-LP

1. **Header Section**:
   - Kolom Kiri: Badge kapsul kecil dengan dot biru: `• LAPORAN DOKUMENTASI` atau `• PROGRAM UTAMA`.
   - Kolom Kanan: Judul besar dengan kata kunci berwarna biru aksen + paragraf pengantar abu-abu `#4d4d52`.
2. **Kartu Program & Layanan**:
   - Background putih `#ffffff`, radius `24px`, padding lega (32px).
   - Ikon geometris elegan di kanan atas.
   - Garis pemisah tipis `1px solid #f0f0f0`.
3. **Kartu Alur 4-Langkah (01 s/d 04)**:
   - Foto dokumentasi riil di bagian atas.
   - Nomor langkah biru aksen `01.` + judul tebal.
   - Deskripsi ringkas.
   - Angka watermark raksasa transparan `01`, `02`, `03`, `04` di pojok kanan bawah kartu.
4. **Tombol CTA ISAVO**:
   - Tombol pill kapsul dengan ikon panah di dalam lingkaran di ujung kanan: `[ Salurkan Infaq (↗) ]`.
5. **Portofolio Proyek**:
   - Foto riil dengan radius `16px`, badge kategori transparan di pojok foto, nama proyek dan tahun di bawah foto.

---

*Dokumen ini adalah fakta visual empiris 100% dari website isavo.co.id yang diverifikasi langsung melalui screenshot live browser.*
