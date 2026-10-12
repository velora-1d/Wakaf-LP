# MASTERPLAN & STRATEGI REDESIGN UI/UX (ANTI-SLOP)
## Transformasi Platform Filantropi & Pesantren Cendekia (YPCI / GVF)
**Lokasi Dokumen:** `c:\Pak-Hakim\Project\Wakaf-LP\docs\MASTERPLAN_REDESIGN_ANTI_SLOP.md`  
**Tanggal:** 12 Oktober 2026  
**Status:** Diperbarui Total dengan Aset Asli `gambar-bahan` & Narasi Jurnalistik 3 Bab  

---

## 1. Latar Belakang & Filosofi Desain

### A. Akar Masalah: "SaaS Slop" & Reduksionisme Diagram AI
Berdasarkan hasil audit mendalam pada folder `docs/perbaikan/`, website saat ini terjebak dalam perangkap generator AI (`v0`, `Tailwind UI boilerplate`, `generic SaaS template`). Dua penyakit utama yang wajib diberantas:
1. **Pola Pricing Table pada Ibadah:** Ibadah suci disajikan persis seperti paket langganan Netflix atau cloud hosting dengan label **`WHAT DO YOU GET`**, daftar fitur teknis, dan badge **`PALING POPULER`** di atas karung semen atau zakat 250rb.
2. **Reduksionisme AI Slop (Grid & Diagram Berangka):** 
   - Memotong-motong dampak sosial menjadi **alur 6 tahap berangka (`01` - `06`)** seperti alur instalasi software.
   - Memecah manusia menjadi **4 kolom audiens berangka (`01` - `04`)** seperti slide presentasi bisnis.
   - *Koreksi:* Mengubah kotak menjadi timeline rail atau kolom terbuka tanpa border tetaplah **AI Slop jika strukturnya masih diagram numerik kaku**. Dampak nyata harus disajikan dalam **narasi jurnalistik berbasis cerita nyata bergambar**.
3. **Komunikasi Dingin & Birokratis:** Form kontak B2B dengan dropdown tiket keluhan alih-alih jalur silaturahmi hangat.
4. **Kekeringan Visual:** Penggunaan placeholder kotak abu-abu padahal yayasan memiliki puluhan dokumentasi foto asli di Sukasirna, Jonggol.

### B. Prinsip Martabat Santri: Anti-Poverty Porn & Anti-Charity Cliché
Yayasan Pesantren Cendekia Indonesia (YPCI / GVF) **bukan panti sosial penampungan belas kasihan**, melainkan kawah candradimuka pencetak **kader peradaban, praktisi vokasi industri, dan teknopreneur muda mandiri**.

* **DAFTAR KATA HARAM (MUTLAK DIBUANG DARI SELURUH TEKS):**
  - **Kata Eksploitasi Kemiskinan:** *"yatim, dhuafa, miskin, fakir, anak miskin, beri makan anak miskin, butuh belas kasihan"*.
  - **Klise Charity Religius Distortif:** *"Santri Penghafal Al-Qur'an", "Santri Penghafal Kitab", "Tahfidz", "Beri makan santri"*.
* **IDENTITAS RESMI YANG DIGUNAKAN (VOKASI, TEKNOLOGI & KEMANDIRIAN):**
  - **Profil Pelajar:** **"Santri Vokasi"**, **"Teknopreneur Muda"**, **"Santri Berdaya"**, **"Kader Vokasi Industri"**, **"Generasi Mandiri Berakhlak FAST"**.
  - **Program Pendidikan:** **"Beasiswa Pendidikan Vokasi Terpadu"**, **"Teaching Factory 4 Pilar Industri"**.
  - **Program Pangan/Konsumsi:** **"Ketahanan Pangan Pesantren & Logistik Dapur Santri Vokasi"**, **"Dukungan Konsumsi Sehat Pembelajaran Vokasi"**.
  - **Akad Partisipasi:** **"Investasi Jariyah untuk Kemandirian Generasi Muda"**, **"Kemitraan Fasilitas Pendidikan Vokasi"**.

### C. Arah Visual & Tipografi
* **Tone & Persona:** Hangat, berwibawa, terhormat, transparan, menyentuh hati, dan berakar pada tanah perjuangan di **Sukasirna, Jonggol, Bogor**.
* **Tipografi:** Heading berwibawa (`Plus Jakarta Sans`), body text dengan keterbacaan tinggi (`Golos Text` / neutral sans, rasio kontras WCAG AAA > 9.5:1). **Dilarang menggunakan monospace** pada teks non-kode (R-06).
* **Warna:** Biru maritim yang tenang (`--blue-600` / `#0284c7`, `#1e40af`), latar belakang putih bersih dan slate hangat (`#f8fafc`), aksen hijau tanaman untuk agribisnis (`#15803d`). **Bebas dari warna ungu dan gradien neon generic**.

---

## 2. Inventaris Aset Asli Proyek (`/gambar-bahan/`)

Folder `assets/gambar bahan/` (akan disalin ke `astro-web/public/gambar-bahan/`) menyediakan dokumentasi nyata Sukasirna Jonggol dengan penamaan deskriptif:

| File Aset Asli | Objek & Konten Visual | Penempatan Utama |
| :--- | :--- | :--- |
| `pelataran mesjid.jpeg` | Pelataran megah Masjid Khairu Ummah Sugro & kubah | **Halaman Dampak (Bab 1: Fasilitas)** & **Infaq Masjid** |
| `wc mesjid.jpeg` | Fasilitas sanitasi & wudhu modern yang bersih | **Infaq Sanitasi & Air Bersih** |
| `lahan donasi.jpg` | Hamparan lahan riil pengembangan kawasan 3 Ha | **Halaman Wakaf (Masterplan Tanah)** |
| `belajar kelas.jpeg` | Suasana santri vokasi aktif belajar di kelas | **Halaman Dampak (Bab 2: Keahlian Santri)** & **Home** |
| `guru ngajar.jpeg` | Ustadz/guru mengajar di depan papan tulis | **Program Pendidikan Vokasi** |
| `kbm kelas 1.jpeg` & `kbm kelas 2.jpeg` | Interaksi belajar mengajar santri | **Program Beasiswa & Storytelling Home** |
| `belajar mandiri.jpeg` | Santri tekun belajar mandiri di asrama | **Karakter FAST & Edukasi Adab** |
| `juara lomba.jpeg` & `kejuaraan bulanan.jpeg` | Santri berprestasi memegang piala | **Halaman Dampak (Bukti Prestasi Riil)** |
| `gh greenhouse.jpeg` & `gh update 2.jpeg` | Unit Green House pertanian presisi & melon/sayur | **Halaman Dampak (Bab 3: Kemandirian)** & **Wakaf Agro** |
| `video gh.mp4`, `video gh 2.mp4` | Video riil sistem irigasi & tanaman greenhouse | **Media Interaktif Kemandirian Agro** |
| `pengajian rame.jpeg`, `pengajian 2.jpeg` | Pembinaan adab dan kajian rutin santri | **Karakter FAST & Budaya Pesantren** |
| `slide 2 halaman utama.jpeg` | Landscape kawasan terpadu Jonggol | **Hero Slide Utama** |
| `pengurus-1.jpg` s/d `pengurus-5.jpg` | Foto profil resmi Nazhir & Dewan Pengawas | **Halaman Kontak & Kemitraan (Human Touch)** |

---

## 3. Matriks Perombakan 8 Halaman

| Halaman | Penyakit AI Slop Lama | Solusi Baru (Human & Editorial) | Aset Foto Asli Wajib | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **`/dampak`** | Skema 6 tahap alur numerik & 4 kolom audiens berangka | **3 Bab Cerita Jurnalistik Ekosistem Jonggol** (Fasilitas, Keahlian, Kemandirian) | `pelataran mesjid.jpeg`<br>`belajar kelas.jpeg`<br>`gh greenhouse.jpeg` | **Fase 1** (Perbaikan Total) |
| **`/program/zakat`** | Pricing tier bulanan Rp 250rb ber-badge `PALING POPULER`, label `WHAT DO YOU GET` | **Kalkulator Zakat Riil** (Nisab otomatis 85 gr emas, Akad Ijab Qobul, transparansi 8 Asnaf) | `kbm kelas 1.jpeg`<br>`belajar mandiri.jpeg` | **Fase 2** (Koreksi Darurat) |
| **`/program/infaq`** | Infaq Semen ber-badge `PALING POPULER`, bullet point fitur material kaku | **Gotong Royong Material Fisik** (Progres riil semen/bata di Jonggol, satuan kebaikan) | `pelataran mesjid.jpeg`<br>`wc mesjid.jpeg` | **Fase 2** (Koreksi Darurat) |
| **`/program/wakaf`** | Petak tanah 1 m² (Rp 150rb) disajikan seperti paket software e-commerce | **Interactive Land Meter Slider** (Geser meteran tanah, peta masterplan, sertifikat digital) | `lahan donasi.jpg`<br>`gh greenhouse.jpeg` | **Fase 3** |
| **`/program/sedekah`** | Pangan dipaketkan seperti menu katering bulanan dengan checklist fitur | **Dukungan Operasional Dapur Santri** (Chips pilihan operasional beras & nutrisi sehat) | `gh update 2.jpeg`<br>`pengajian rame.jpeg` | **Fase 3** |
| **`/` (Home)** | Tab mini dashboard di hero, 6 kotak ekosistem, 6 kartu cara berkontribusi | **Split-Storytelling Flow** (Naratif bergambar 3 pilar kawasan, tab 1-viewport kebaikan) | `slide 2 halaman utama.jpeg`<br>`belajar kelas.jpeg` | **Fase 4** |
| **`/contact`** | Form tiket support "Book a Demo" dengan dropdown program kaku | **Human-Centric Direct Chat** (Foto hangat Nazhir Jonggol, direct WhatsApp, peta lokasi) | `pengurus-1.jpg` s/d `pengurus-3.jpg` | **Fase 4** |
| **`/kemitraan`** | 5 kartu "SaaS Integrations" korporat untuk hubungan kemitraan | **Portofolio Kolaborasi Nyata** (Studi kasus teaching factory, CSR terukur, jalur silaturahmi) | `juara lomba.jpeg`<br>`gh update 2.jpeg` | **Fase 4** |

---

## 4. Rincian Teknis Perombakan Halaman Dampak (`/dampak`)

### Penggantian Total dari Format AI Slop:
* **HAPUS TOTAL:**
  - Komponen `editorial-timeline` dengan 6 bulatan/node angka `01` - `06`.
  - Komponen `beneficiaries-section` dengan 4 kolom angka `01` - `04`.
  - Komponen `fast-credo-strip` berformat kartu ringkas generic.
* **BANGUN BARU: Format Jurnalistik 3 Bab Ekosistem Jonggol (Magazine Editorial Spread)**
  
  #### Bab 1: "Ruang yang Menghidupkan" — Poros Ibadah & Peradaban
  * **Foto Utama:** `/gambar-bahan/pelataran mesjid.jpeg` (Tampilan lebar pelataran Masjid Khairu Ummah Sugro).
  * **Narasi Humanis:** 
    > *"Pembangunan fisik di Sukasirna bukan sekadar mendirikan dinding beton. Masjid Khairu Ummah Sugro berdiri sebagai ruang pertemuan ruhani santri, pusat musyawarah warga, dan oase pembelajaran bersama bagi masyarakat sekitar Jonggol."*
  * **Fakta Lapangan:** Kapasitas ibadah santri, keterbukaan fasilitas wudhu & sanitasi bersih bagi masyarakat sekitar.

  #### Bab 2: "Keahlian yang Memerdekakan" — Pembelajaran Vokasi Berbasis Adab
  * **Foto Utama:** `/gambar-bahan/belajar kelas.jpeg` didampingi `/gambar-bahan/juara lomba.jpeg`.
  * **Narasi Humanis:**
    > *"Kami meyakini bahwa pendidikan sejati melahirkan kemandirian, bukan ketergantungan. Melalui SMK Skill Village, santri tidak hanya mendalami syariah dan adab, tetapi menguasai 4 pilar kompetensi industri terapan dan membuktikan prestasinya di tingkat nasional."*
  * **Fakta Lapangan:** Sertifikasi keahlian vokasi, kurikulum karakter FAST (*Fathanah, Amanah, Siddiq, Tabligh*), dan kesiapan kerja lulusan.

  #### Bab 3: "Ekosistem yang Menghidupi Dirinya Sendiri" — Agro-Technopark & Pangan
  * **Foto Utama:** `/gambar-bahan/gh greenhouse.jpeg` (Greenhouse melon & hidroponik modern).
  * **Narasi Humanis:**
    > *"Inilah model wakaf produktif masa depan: unit agro-technopark yang mengintegrasikan pertanian presisi dan energi terbarukan. Hasil panennya menopang kebutuhan pangan dapur santri dan mengalirkan perputaran ekonomi mandiri tanpa bergantung pada donasi rutin."*
  * **Fakta Lapangan:** Kemandirian konsumsi sehat asrama, transfer teknologi pertanian modern kepada petani lokal Jonggol.

---

## 5. Rincian Teknis Halaman Program Lainnya

### 5.1. Halaman Zakat (`/program/zakat`)
* **Kalkulator Zakat Interaktif Tunggal:**
  * Tab: Zakat Penghasilan (Bulanan) & Zakat Maal (Tabungan/Emas).
  * Logika: Nisab 85 gr emas otomatis terhubung -> Menghitung kewajiban 2,5%.
  * Output: Nominal zakat, teks doa Ijab Qobul yang khusyuk, opsi pembayaran (QRIS / BSI / Hubungi Amil).
* **Foto Riil:** `/gambar-bahan/kbm kelas 1.jpeg` (Santri tekun belajar).
* **Penghapusan Total:** Buang `WHAT DO YOU GET`, badge `PALING POPULER`, dan 3 kolom harga.

### 5.2. Halaman Infaq Pembangunan (`/program/infaq`)
* **Progress Gotong Royong Fisik:**
  * Tampilan progres kebutuhan material riil di Jonggol (Semen, Bata, Pasir).
  * Pilihan Unit Dukungan: 1 Sak Semen (Rp 65.000), 5 Sak Semen (Rp 325.000), atau Nominal Bebas.
* **Foto Riil:** `/gambar-bahan/pelataran mesjid.jpeg` & `/gambar-bahan/wc mesjid.jpeg`.

### 5.3. Halaman Wakaf (`/program/wakaf`)
* **Interactive Land Meter Slider:**
  * Slider geser 1 m² s/d 50 m² (Rp 150.000 / m²).
  * Penjelasan hukum syariah wakaf abadi (tidak boleh dijual, dialihkan, atau disita).
* **Foto Riil:** `/gambar-bahan/lahan donasi.jpg` & `/gambar-bahan/gh greenhouse.jpeg`.

### 5.4. Halaman Sedekah (`/program/sedekah`)
* **Quick Impact Chips (Konsumsi Sehat Santri Vokasi):**
  * Pilihan dukungan operasional: Rp 15.000 (1 Paket Konsumsi), Rp 45.000 (1 Hari Konsumsi Sehat), Rp 150.000 (1 Sak Beras Logistik).
* **Foto Riil:** `/gambar-bahan/gh update 2.jpeg` (Panen sayur segar) & `/gambar-bahan/pengajian rame.jpeg`.

---

## 6. Standar Teknis & Batasan Desain (Non-Negotiable)

1. **Anti-Box Rule:** Dilarang membungkus setiap item dalam kotak putih ber-border tipis secara monoton. Gunakan *open columns*, *magazine photo-story spreads*, dan *generous whitespace*.
2. **Anti-Weird Lines Rule (Zero Garis-Garis Aneh — R-07, R-16):** 
   - Dilarang keras SVG grid/blueprint lines, crosshair (+) dekoratif, garis gradien semu, garis putus-putus acak, garis stripe warna di sisi kiri kotak, atau garis sirkuit penghubung palsu.
   - Pemisah konten utama adalah **whitespace alami (jarak renggang yang lega)**, bukan garis border artifisial.
3. **Anti-Unnecessary Components Rule (Zero Fluff & Bloat — C-3, R-05, R-31):**
   - Dilarang capsule badge/pill di atas judul yang hanya mengulang teks judul.
   - Dilarang status dot berkedip (titik hijau live/pulsing) yang tidak menandai status sistem nyata.
   - Dilarang kartu filler atau deretan ikon AI yang tidak menyampaikan informasi esensial.
4. **Anti-Poverty Porn & Anti-Charity Cliché Rule:** Dilarang keras menggunakan diksi meminta belas kasihan (*"yatim/miskin/dhuafa"*), narasi pangan eksploitatif (*"beri makan anak miskin"*, *"penghafal kitab"*), dan klise charity generik (*"Santri Penghafal Al-Qur'an"*). Wajib menggunakan identitas riil SMK Skill Village: *"Santri Vokasi"*, *"Teknopreneur Muda"*, *"Santri Berdaya"*, *"Kader Vokasi Industri"*.
5. **Anti-Monospace Rule (R-06):** Dilarang keras menggunakan font monospace pada angka nominal, label, atau teks salinan umum.
6. **Contrast Standard (WCAG AAA):** Semua teks judul harus menggunakan `#0f172a` (16.1:1), body text `#334155` (9.5:1), dan teks sekunder minimal `#475569` (7.0:1) di atas latar belakang putih.
7. **Git Push Restriction:** Hanya diperbolehkan melakukan *git commit* lokal; *git push* dilarang keras tanpa perintah eksplisit dari pengguna.
