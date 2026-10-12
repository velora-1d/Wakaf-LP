# MASTERPLAN & STRATEGI REDESIGN UI/UX (ANTI-SLOP)
## Transformasi Platform Filantropi & Pesantren Cendekia (YPCI / GVF)
**Lokasi Dokumen:** `c:\Pak-Hakim\Project\Wakaf-LP\docs\MASTERPLAN_REDESIGN_ANTI_SLOP.md`  
**Tanggal:** 12 Oktober 2026  
**Status:** Disetujui untuk Eksekusi Bertahap  

---

## 1. Latar Belakang & Filosofi Desain

### Akar Masalah: "SaaS Slop" pada Platform Ibadah
Berdasarkan hasil audit mendalam pada folder `docs/perbaikan/`, website saat ini terjebak dalam perangkap generator AI (`v0`, `Tailwind UI boilerplate`, `generic SaaS template`). Generator AI menerapkan pola **aplikasi komersial B2B / SaaS** secara mentah-mentah ke dalam situs filantropi Islam dan pesantren:
1. **Pola Pricing Table pada Ibadah:** Ibadah suci seperti zakat, sedekah pangan, dan wakaf disajikan persis seperti paket langganan Netflix atau cloud hosting dengan label **`WHAT DO YOU GET`**, daftar fitur teknis, dan badge **`PALING POPULER`** di atas karung semen atau zakat 250rb.
2. **Grid Fatigue (Kelelahan Dinding Kotak):** Setiap halaman dipaksa memiliki blok berulang berisi 4 atau 6 kartu putih ber-border tipis dengan nomor dekoratif besar `01` - `04`.
3. **Komunikasi Dingin & Birokratis:** Halaman kontak dan kemitraan meniru formulir "Book a Demo" atau "Contact Sales" lengkap dengan dropdown tiket keluhan, menghilangkan kehangatan ukhuwah dan kepercayaan personal.

### Arah Baru: Human Philanthropic Editorial & Adab Pesantren
* **Tone & Persona:** Hangat, berwibawa, transparan, menyentuh hati, dan berakar pada tanah perjuangan di **Sukasirna, Jonggol, Bogor**.
* **Tipografi:** Heading berwibawa (`Plus Jakarta Sans`), body text dengan keterbacaan tinggi (`Golos Text` / neutral sans, rasio kontras WCAG AAA > 9.5:1). **Dilarang menggunakan monospace** pada teks non-kode (R-06).
* **Warna:** Biru maritim yang tenang (`--blue-600` / `#0284c7`, `#1e40af`), latar belakang putih bersih dan slate hangat (`#f8fafc`), aksen hijau tanaman untuk agribisnis (`#15803d`). **Bebas dari warna ungu dan gradien neon generic**.

---

## 2. Peran Google Stitch vs Referensi Nyata

| Aspek | Google Stitch | Benchmark UI Nyata (Charity: Water, Gates Foundation, Stripe) | Keputusan & Strategi Integrasi |
| :--- | :--- | :--- | :--- |
| **Kelebihan** | Cepat menghasilkan variasi visual sketsa screen dan visualisasi token | 100% human-crafted, terbukti menggerakkan emosi donatur dunia, zero AI slop | Kombinasi terarah |
| **Risiko** | Berpotensi kembali meng-generate *card grid* jika prompt tidak ketat | Memerlukan waktu untuk adaptasi komponen ke kode Astro lokal | Gunakan prinsip referensi nyata sebagai fondasi |
| **Penerapan** | Digunakan secara selektif sebagai *visual wireframe preview* untuk komponen kalkulator & slider | Digunakan sebagai standar absolut tata letak halaman (layout editorial, whitespace, tipografi) | **Standar Editorial Nyata menjadi hukum utama** |

---

## 3. Matriks Perombakan 8 Halaman

| Halaman | Penyakit AI Slop Saat Ini | Desain Baru (Human & Editorial) | Prioritas |
| :--- | :--- | :--- | :---: |
| **`/program/zakat`** | Pricing tier bulanan Rp 250rb ber-badge `PALING POPULER`, label `WHAT DO YOU GET` | **Kalkulator Zakat Riil** (Nisab otomatis, Akad Ijab Qobul, transparansi 8 Asnaf) | **Fase 1** (Darurat) |
| **`/program/infaq`** | Infaq Semen ber-badge `PALING POPULER`, bullet point fitur material kaku | **Gotong Royong Material Fisik** (Progres riil semen/bata di Jonggol, satuan kebaikan) | **Fase 1** (Darurat) |
| **`/program/wakaf`** | Petak tanah 1 m² (Rp 150rb) disajikan seperti paket software e-commerce | **Interactive Land Meter Slider** (Geser meteran tanah, peta masterplan, sertifikat digital) | **Fase 2** |
| **`/program/sedekah`** | Makanan santri dipaketkan seperti menu katering bulanan | **Quick Impact Giving** (Pilihan cepat porsi makan santri, narasi kehangatan dapur umum) | **Fase 2** |
| **`/` (Home)** | Tab mini dashboard di hero, 6 kotak ekosistem, 6 kartu cara berkontribusi | **Editorial Storytelling Flow** (Split screen narasi + foto Jonggol, tab 1-viewport kebaikan) | **Fase 3** |
| **`/contact`** | Form tiket support "Book a Demo" dengan dropdown program kaku | **Human-Centric Direct Chat** (Foto hangat Nazhir Jonggol, direct WhatsApp, peta lokasi) | **Fase 3** |
| **`/kemitraan`** | 5 kartu "SaaS Integrations" korporat untuk hubungan kemitraan | **Alur Sinergi Nyata** (Studi kasus teaching factory, CSR terukur, jalur silaturahmi langsung) | **Fase 4** |
| **`/dampak`** | 6 kotak alur bertumpuk di atas 4 kotak penerima manfaat (*Sudah Selesai*) | **Continuous Timeline Rail** & **Open 4-Column Editorial** (Stripe/Gates style) | **Selesai** |

---

## 4. Rincian Desain & Spesifikasi Teknis per Komponen

### 4.1. Halaman Zakat (`/program/zakat`)
* **Komponen Utama: Real-Time Zakat Calculator**
  * Input 1: Pilihan Zakat Penghasilan (Gaji Bulanan) atau Zakat Maal (Tabungan/Emas).
  * Logika: Menghitung nisab emas terkini (85 gram x harga emas acuan). Jika mencapai nisab, otomatis menghitung kewajiban 2,5%.
  * Output: Nominal zakat yang wajib ditunaikan, teks akad niat zakat, dan tombol salurkan (QRIS / Bank BSI / Hubungi Amil).
* **Penghapusan Total:** Buang string `WHAT DO YOU GET`, badge `PALING POPULER`, dan 3 kolom harga kaku.

### 4.2. Halaman Infaq (`/program/infaq`)
* **Komponen Utama: Progress Bar Gotong Royong Semen & Bahan Bangunan**
  * Visualisasi: Target kebutuhan material renovasi asrama/masjid santri di Sukasirna (Contoh: "Kebutuhan: 500 Sak Semen • Terpenuhi: 320 Sak • Kurang: 180 Sak").
  * Pilihan Kontribusi Fleksibel:
    * `[ 1 Sak Semen — Rp 65.000 ]`
    * `[ 5 Sak Semen — Rp 325.000 ]`
    * `[ 1 Kubik Pasir — Rp 450.000 ]`
    * `[ Nominal Bebas Suka Rela ]`
* **Dokumentasi Nyata:** Menampilkan foto asli tukang dan santri yang sedang bekerja, menggantikan ilustrasi atau badge AI.

### 4.3. Halaman Wakaf (`/program/wakaf`)
* **Komponen Utama: Interactive Land Meter Slider (Kalkulator Tanah)**
  * Input: Slider geser horizontal dari 1 m² hingga 50 m².
  * Nilai Dasar: Rp 150.000 / m².
  * Fitur Edukasi: Penjelasan akad wakaf abadi (tanah tidak boleh dijual, diwariskan, atau disita, pahala mengalir tanpa henti).
  * Sertifikat Jariyah: Input nama wakif (atas nama diri sendiri atau orang tua/keluarga tercinta).

### 4.4. Halaman Sedekah (`/program/sedekah`)
* **Komponen Utama: Quick Impact Giving Chips**
  * Pilihan Cepat:
    * `Rp 15.000` (1 Porsi makan hangat santri penghafal Quran)
    * `Rp 45.000` (Pangan 1 hari penuh untuk 1 santri)
    * `Rp 150.000` (1 Karung beras dapur umum pesantren)
    * `Nominal Bebas`
  * Aspek Visual: Dokumentasi santri makan bersama dengan senyum tulus, membangkitkan empati alami tanpa rasa dikomparasi secara komersial.

### 4.5. Halaman Home (`/`)
* **Hero Section:** Menghilangkan tab navigasi mini dashboard `[01 Brand Utama]`, menggantinya dengan visual penuh kehangatan pesantren dan call-to-action tunggal yang tegas.
* **Pendekatan Ekosistem:** Mengubah 6 kotak grid kaku menjadi narasi bergambar selang-seling (Split-Layout: Foto dokumentasi asli Sukasirna di kiri, cerita naratif di kanan).
* **Saluran Kebaikan:** Mengonsolidasikan 6 kartu panjang menjadi tab interaktif 1-viewport (Zakat | Infaq | Wakaf | Sedekah) agar pengguna tidak lelah scroll.

### 4.6. Halaman Kontak (`/contact`) & Kemitraan (`/kemitraan`)
* **Pendekatan Human-Centric:**
  * Menampilkan kartu sapaan hangat berisi foto & nama Nazhir/Pengurus Pesantren di Jonggol.
  * Tombol utama: **Direct WhatsApp Fast Response** (membuka chat dengan template salam & niat konsultasi).
  * Formulir web disederhanakan drastis menjadi form konsultasi cepat 3 kolom tanpa dropdown teknis.

---

## 5. Rencana Tahapan Eksekusi (Roadmap)

```
[Tahap 1: Koreksi Darurat]
└── Rombak Halaman Zakat (/program/zakat) & Infaq (/program/infaq)
    ├── Hapus label "WHAT DO YOU GET" & badge "PALING POPULER"
    ├── Pasang Kalkulator Zakat Interaktif
    └── Pasang Visualisasi Gotong Royong Semen

[Tahap 2: Penguatan Nilai Jariyah]
└── Rombak Halaman Wakaf (/program/wakaf) & Sedekah (/program/sedekah)
    ├── Pasang Interactive Land Meter Slider
    └── Pasang Quick Impact Giving Chips (Pangan Santri)

[Tahap 3: Etalase Utama & Kontak]
└── Rombak Halaman Home (/) & Kontak (/contact)
    ├── Perbaiki Hero & Pecah Dinding 6 Kotak Ekosistem
    └── Ubah Form Tiket B2B menjadi Human Direct Chat Nazhir

[Tahap 4: Kemitraan & Final Polish]
└── Rombak Halaman Kemitraan (/kemitraan)
    ├── Ganti Kotak Integrasi SaaS dengan Narasi Sinergi Nyata
    └── Audit Menyeluruh Aksesibilitas WCAG AAA & Build Check
```

---

## 6. Standar Kualitas & Batasan Kode (Non-Negotiable)

1. **Anti-Box Rule:** Dilarang membungkus setiap item dalam kotak putih ber-border tipis secara monoton. Gunakan *open columns*, *timeline rails*, dan *generous whitespace*.
2. **Anti-Monospace Rule (R-06):** Dilarang keras menggunakan font monospace pada angka nominal, label, atau teks salinan umum.
3. **Contrast Standard (WCAG AAA):** Semua teks judul harus menggunakan `#0f172a` (16.1:1), body text `#334155` (9.5:1), dan teks sekunder minimal `#475569` (7.0:1) di atas latar belakang putih.
4. **Git Push Restriction:** Hanya diperbolehkan melakukan *git commit* lokal; *git push* dilarang keras tanpa perintah eksplisit dari pengguna.
