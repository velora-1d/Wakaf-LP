# MASTERPLAN & STRATEGI REDESIGN UI/UX (ANTI-SLOP)
## Transformasi Platform Filantropi & Pesantren Cendekia (YPCI / GVF)
**Lokasi Dokumen:** `c:\Pak-Hakim\Project\Wakaf-LP\docs\MASTERPLAN_REDESIGN_ANTI_SLOP.md`  
**Tanggal:** 12 Oktober 2026  
**Status:** Disetujui & Diterapkan Prinsip Martabat Santri (Anti-Poverty Porn)  

---

## 1. Latar Belakang & Filosofi Desain

### A. Akar Masalah: "SaaS Slop" pada Platform Ibadah
Berdasarkan hasil audit mendalam pada folder `docs/perbaikan/`, website saat ini terjebak dalam perangkap generator AI (`v0`, `Tailwind UI boilerplate`, `generic SaaS template`). Generator AI menerapkan pola **aplikasi komersial B2B / SaaS** secara mentah-mentah ke dalam situs filantropi Islam dan pesantren:
1. **Pola Pricing Table pada Ibadah:** Ibadah suci seperti zakat, sedekah pangan, dan wakaf disajikan persis seperti paket langganan Netflix atau cloud hosting dengan label **`WHAT DO YOU GET`**, daftar fitur teknis, dan badge **`PALING POPULER`** di atas karung semen atau zakat 250rb.
2. **Grid Fatigue (Kelelahan Dinding Kotak):** Setiap halaman dipaksa memiliki blok berulang berisi 4 atau 6 kartu putih ber-border tipis dengan nomor dekoratif besar `01` - `04`.
3. **Komunikasi Dingin & Birokratis:** Halaman kontak dan kemitraan meniru formulir "Book a Demo" atau "Contact Sales" lengkap dengan dropdown tiket keluhan, menghilangkan kehangatan ukhuwah dan kepercayaan personal.
4. **Kekeringan Visual (Placeholder & Tanpa Foto Riil):** Alih-alih menampilkan wajah santri, progres tukang di Jonggol, atau arsitektur nyata, UI dipenuhi kotak abu-abu kosong dengan ikon AI generik.

### B. Prinsip Martabat Santri: Anti-Deficit Framing / Anti-Poverty Porn
Yayasan Pesantren Cendekia Indonesia (YPCI / GVF) **bukan panti sosial penampungan belas kasihan**, melainkan kawah candradimuka pencetak **kader peradaban, penghafal Al-Qur'an, dan calon teknisi vokasi mandiri**.
* **DILARANG MENGGUNAKAN DIKSI RASA KASIHAN & KLISE CHARITY:** 
  - Hapus seluruh kata klise eksploitatif rasa iba seperti *"yatim, dhuafa, miskin, butuh belas kasihan"*.
  - **HARAM menggunakan kata klise charity *"Santri Penghafal Al-Qur'an / Tahfidz"*** — karena mengaburkan identitas riil pesantren ini sebagai **SMK Skill Village / Pesantren Vokasi Industri & Agro-Technopark Modern**.
* **WAJIB MENGGUNAKAN IDENTITAS RIIL (VOKASI, TEKNOLOGI & ADAB):**
  * Gunakan: **"Santri Vokasi & Teknopreneur Muda"**, **"Santri Berdaya"**, **"Kader Vokasi Industri"**, atau **"Generasi Mandiri Berakhlak FAST"**.
  * Ganti *"Bantuan Kaum Dhuafa"* menjadi **"Penerima Beasiswa Kader Peradaban"**.
  * Ganti *"Beri makan anak yatim / santri penghafal Quran"* menjadi **"Penyediaan Asupan Gizi & Nutrisi Harian Santri Vokasi"**.
  * Ganti *"Donasi belas kasihan"* menjadi **"Investasi Jariyah untuk Kemandirian Generasi Muda"**.

### C. Arah Visual & Tipografi
* **Tone & Persona:** Hangat, berwibawa, terhormat, transparan, menyentuh hati, dan berakar pada tanah perjuangan di **Sukasirna, Jonggol, Bogor**.
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

## 3. Matriks Perombakan 8 Halaman & Pemetaan Kebutuhan Foto

| Halaman | Penyakit AI Slop Saat Ini | Desain Baru (Human & Editorial) | Kebutuhan Foto Asli (Wajib) | Prioritas |
| :--- | :--- | :--- | :--- | :---: |
| **`/program/zakat`** | Pricing tier bulanan Rp 250rb ber-badge `PALING POPULER`, label `WHAT DO YOU GET` | **Kalkulator Zakat Riil** (Nisab otomatis, Akad Ijab Qobul, transparansi 8 Asnaf) | 📷 **Foto Santri Berdaya & Calon Kader Umat** di Jonggol | **Fase 1** (Darurat) |
| **`/program/infaq`** | Infaq Semen ber-badge `PALING POPULER`, bullet point fitur material kaku | **Gotong Royong Material Fisik** (Progres riil semen/bata di Jonggol, satuan kebaikan) | 📷 **Foto Progres Konstruksi & Fasilitas Belajar** di lapangan | **Fase 1** (Darurat) |
| **`/program/wakaf`** | Petak tanah 1 m² (Rp 150rb) disajikan seperti paket software e-commerce | **Interactive Land Meter Slider** (Geser meteran tanah, peta masterplan, sertifikat digital) | 📷 **Foto Arsitektur Masjid & Masterplan Kawasan** | **Fase 2** |
| **`/program/sedekah`** | Makanan santri dipaketkan seperti menu katering bulanan | **Quick Impact Giving** (Pilihan cepat nutrisi santri, narasi kehangatan dapur umum) | 📷 **Foto Dapur Santri & Kebersamaan Makan Bergizi** | **Fase 2** |
| **`/` (Home)** | Tab mini dashboard di hero, 6 kotak ekosistem, 6 kartu cara berkontribusi | **Editorial Storytelling Flow** (Split screen narasi + foto Jonggol, tab 1-viewport kebaikan) | 📷 **Foto Kawasan Sukasirna, Green House, & Kelas Vokasi** | **Fase 3** |
| **`/contact`** | Form tiket support "Book a Demo" dengan dropdown program kaku | **Human-Centric Direct Chat** (Foto hangat Nazhir Jonggol, direct WhatsApp, peta lokasi) | 📷 **Foto Profil Asli Nazhir & Pengawas Pesantren** | **Fase 3** |
| **`/kemitraan`** | 5 kartu "SaaS Integrations" korporat untuk hubungan kemitraan | **Alur Sinergi Nyata** (Studi kasus teaching factory, CSR terukur, jalur silaturahmi langsung) | 📷 **Foto Fasilitas Bengkel Vokasi & Panel Surya** | **Fase 4** |
| **`/dampak`** | 6 kotak alur bertumpuk di atas 4 kotak penerima manfaat (*Sudah Selesai*) | **Continuous Timeline Rail** & **Open 4-Column Editorial** (Stripe/Gates style) | 📷 **Foto Wisuda Santri Mandiri & Hasil Agro-Technopark** | **Selesai** |

---

## 4. Rincian Desain, Logika, & Penempatan Foto per Halaman

### 4.1. Halaman Zakat (`/program/zakat`) — *Fase 1*
* **Kebutuhan Foto Riil:**
  * **Section Hero / Pengantar**: Foto santri vokasi dan calon teknopreneur muda dengan senyum optimis (`/media-lp/WhatsApp Image 2026-10-05 at 09.22.03.jpeg`).
  * **Section 8 Asnaf Berdaya**: Foto santri tekun belajar sains dan adab syariah di asrama Sukasirna (`/media-lp/WhatsApp Image 2026-10-05 at 09.22.04 (1).jpeg`).
* **Komponen Utama: Real-Time Zakat Calculator**
  * Input: Pilihan Zakat Penghasilan (Gaji Bulanan) atau Zakat Maal (Tabungan/Emas).
  * Logika: Menghitung nisab emas terkini (85 gram x harga emas acuan). Jika mencapai nisab, otomatis menghitung kewajiban 2,5%.
  * Output: Nominal zakat yang wajib ditunaikan, teks akad niat zakat yang khusyuk, dan tombol salurkan (QRIS / Bank BSI / Hubungi Amil).
* **Penghapusan Total:** Buang string `WHAT DO YOU GET`, badge `PALING POPULER`, dan 3 kolom harga kaku.

---

### 4.2. Halaman Infaq (`/program/infaq`) — *Fase 1*
* **Kebutuhan Foto Riil:**
  * **Section Progres Fisik Gotong Royong**: Foto progres pembangunan masjid & sarana santri di Jonggol (`/gambar design/belakang masjid.jpg` & `/gambar design/skywalk learning room.jpg`).
  * **Section Keberkahan Fasilitas Wudhu & Ibadah**: Foto sarana air bersih & wudhu santri (`/gambar design/tempat wudu.jpg`).
* **Komponen Utama: Progress Bar Gotong Royong Semen & Bahan Bangunan**
  * Visualisasi: Target kebutuhan material renovasi asrama/masjid santri di Sukasirna (Contoh: "Kebutuhan: 500 Sak Semen • Terpenuhi: 320 Sak • Kurang: 180 Sak").
  * Pilihan Kontribusi Fleksibel:
    * `[ 1 Sak Semen — Rp 65.000 ]`
    * `[ 5 Sak Semen — Rp 325.000 ]`
    * `[ 1 Kubik Pasir — Rp 450.000 ]`
    * `[ Nominal Bebas Suka Rela ]`

---

### 4.3. Halaman Wakaf (`/program/wakaf`) — *Fase 2*
* **Kebutuhan Foto Riil:**
  * **Section Masterplan Kawasan Sukasirna**: Foto panorama masjid hijau dan lanskap Jonggol (`/gambar design/belakang masjid (2).jpg` & `/gambar design/interior masjid.jpg`).
  * **Section Wakaf Produktif & Agro-Technopark**: Foto Green House pertanian santri (`/gambar design/gh learning area.jpg` & `gh learning area 2.jpg`).
* **Komponen Utama: Interactive Land Meter Slider (Kalkulator Tanah)**
  * Input: Slider geser horizontal dari 1 m² hingga 50 m².
  * Nilai Dasar: Rp 150.000 / m².
  * Fitur Edukasi: Penjelasan akad wakaf abadi (tanah tidak boleh dijual, diwariskan, atau disita, pahala mengalir tanpa henti).
  * Sertifikat Jariyah: Input nama wakif (atas nama diri sendiri atau orang tua/keluarga tercinta).

---

### 4.4. Halaman Sedekah (`/program/sedekah`) — *Fase 2*
* **Kebutuhan Foto Riil:**
  * **Section Dapur Santri & Logistik Pangan**: Foto stok beras berkualitas dan kebersamaan santri menikmati hidangan bergizi (`/media-lp/WhatsApp Image 2026-10-05 at 09.22.05 (2).jpeg` & `/media-lp/WhatsApp Image 2026-10-05 at 09.22.06.jpeg`).
* **Komponen Utama: Quick Impact Giving Chips**
  * Pilihan Cepat:
    * `Rp 15.000` (1 Porsi makan sehat bernutrisi untuk santri vokasi)
    * `Rp 45.000` (Paket nutrisi 1 hari penuh seorang santri vokasi)
    * `Rp 150.000` (1 Karung beras dapur umum santri)
    * `Nominal Bebas`
  * Aspek Visual: Menampilkan rasa syukur, doa keberkahan, dan energi thalabul ilmi.

---

### 4.5. Halaman Home (`/`) — *Fase 3*
* **Kebutuhan Foto Riil:**
  * **Hero Section**: Foto atmosfer asri pesantren dan generasi santri Sukasirna Jonggol (`/media-lp/WhatsApp Image 2026-10-05 at 09.22.03.jpeg`).
  * **Section Storytelling Rantai Nilai (Split Layout)**: 
    * Pilar Pendidikan & Adab: Foto santri mengaji dengan takzim (`/media-lp/WhatsApp Image 2026-10-05 at 09.22.04 (3).jpeg`).
    * Pilar Vokasi Industri: Foto workshop dan teknologi (`/gambar design/learning studio & workshop.jpg` & `/gambar design/panel surya.jpg`).
    * Pilar Kemandirian: Foto Greenhouse agro-technopark (`/gambar design/gh learning area.jpg`).
* **Restrukturisasi:** Menghilangkan tab mini dashboard `[01 Brand Utama]`, dan mengonsolidasi 6 kartu panjang menjadi tab 1-viewport.

---

### 4.6. Halaman Kontak (`/contact`) — *Fase 3*
* **Kebutuhan Foto Riil:**
  * **Kartu Sapaan Nazhir/Pengurus**: Foto asli pengurus yayasan di Sukasirna Jonggol (`/media-lp/pengurus-1.jpg`, `pengurus-2.jpg`, `pengurus-3.jpg`).
  * **Landmark Lokasi**: Foto fisik gerbang/masjid pesantren di Sukasirna Jonggol mendampingi peta interaktif.
* **Pendekatan Human-Centric:** Tombol utama **Direct WhatsApp Fast Response**, formulir kaku disederhanakan drastis.

---

### 4.7. Halaman Kemitraan (`/kemitraan`) — *Fase 4*
* **Kebutuhan Foto Riil:**
  * **Section Fasilitas Teaching Factory**: Foto bengkel kerja dan instalasi energi mandiri (`/gambar design/workshop.jpg`, `/gambar design/gudang workshop.jpg`, `/gambar design/panel surya.jpg`).
* **Pendekatan:** Menghapus 5 kartu "SaaS Integrations", menggantinya dengan portofolio kolaborasi nyata bersama perguruan tinggi dan dunia usaha.

---

### 4.8. Halaman Dampak (`/dampak`) — *Status: Selesai di-refactor*
* Alur 6 tahap sudah diubah menjadi *continuous timeline rail* dan 4 penerima manfaat menjadi *open editorial columns*.
* **Penambahan Visual Foto Lapangan**: Foto kegiatan pengabdian masyarakat sekitar Jonggol (`/media-lp/WhatsApp Image 2026-10-05 at 09.22.06 (1).jpeg`).

---

## 5. Direktori Aset Foto yang Tersedia di Proyek

### A. Foto Kegiatan & Santri (`/media-lp/`)
* `/media-lp/WhatsApp Image 2026-10-05 at 09.22.03.jpeg` — Santri berkumpul / doa bersama penuh adab (Cocok untuk: Hero / Zakat).
* `/media-lp/WhatsApp Image 2026-10-05 at 09.22.04.jpeg` — Aktivitas kehidupan pesantren yang mandiri.
* `/media-lp/WhatsApp Image 2026-10-05 at 09.22.04 (1).jpeg` — Pembelajaran vokasi industri, sains & adab syariah (Cocok untuk: Zakat Asnaf).
* `/media-lp/WhatsApp Image 2026-10-05 at 09.22.05 (2).jpeg` — Dapur santri & makan bersama (Cocok untuk: Sedekah Pangan).
* `/media-lp/WhatsApp Image 2026-10-05 at 09.22.06.jpeg` — Distribusi beras & logistik pesantren (Cocok untuk: Sedekah Beras).
* `/media-lp/pengurus-1.jpg` s/d `pengurus-5.jpg` — Foto profil resmi Nazhir & Dewan Pengawas (Cocok untuk: Kontak & Tim).

### B. Foto Desain Fasilitas & Arsitektur (`/gambar design/`)
* `/gambar design/interior masjid.jpg` & `interior mesjid 2.jpg` — Ruang ibadah utama.
* `/gambar design/belakang masjid.jpg` & `belakang masjid (2).jpg` — Lanskap hijau masjid.
* `/gambar design/tempat wudu.jpg` & `wudu 2.jpg` — Fasilitas sanitasi & wudhu (Cocok untuk: Infaq Sanitasi).
* `/gambar design/gh learning area.jpg` & `gh learning area 2.jpg` — Greenhouse agro-technopark (Cocok untuk: Wakaf Produktif).
* `/gambar design/skywalk learning room.jpg` & `skywalk learning room 2.jpg` — Ruang belajar modern santri.
* `/gambar design/workshop.jpg`, `internal worlshop.jpg`, `learning studio & workshop.jpg` — Fasilitas vokasi industri (Cocok untuk: Kemitraan).
* `/gambar design/panel surya.jpg` — Kemandirian energi pesantren (Cocok untuk: Kemitraan & Ekosistem).

---

## 6. Standar Teknis & Batasan Desain (Non-Negotiable)

1. **Anti-Box Rule:** Dilarang membungkus setiap item dalam kotak putih ber-border tipis secara monoton. Gunakan *open columns*, *timeline rails*, *split storytelling*, dan *generous whitespace*.
2. **Anti-Weird Lines Rule (Zero Garis-Garis Aneh — R-07, R-16):** 
   - Dilarang keras menambahkan garis-garis dekoratif aneh yang tidak memiliki fungsi struktural: dilarang SVG grid/blueprint lines, crosshair (+) dekoratif, garis gradien semu, garis putus-putus acak, garis stripe warna di sisi kiri kotak, atau garis sirkuit penghubung palsu.
   - Pemisah konten utama adalah **whitespace alami (jarak renggang yang lega)**, bukan garis border artifisial.
3. **Anti-Unnecessary Components Rule (Zero Fluff & Bloat — C-3, R-05, R-31):**
   - Dilarang membuat komponen tanpa fungsi nyata:
     - Dilarang capsule badge/pill dekoratif di atas judul yang hanya mengulang teks judul.
     - Dilarang status dot berkedip (titik hijau live/pulsing) yang tidak menandai status sistem nyata.
     - Dilarang kartu filler atau deretan ikon AI yang tidak menyampaikan informasi esensial.
     - Dilarang fake metric counter (angka statistik yang diada-adakan tanpa sumber data).
   - Setiap elemen di layar harus memiliki alasan fungsional yang jelas bagi donatur (*Purposive UI*).
4. **Anti-Poverty Porn & Anti-Charity Cliché Rule:** Dilarang menggunakan diksi meminta belas kasihan (*"yatim/miskin/dhuafa"*) dan dilarang keras memakai klise charity (*"Santri Penghafal Al-Qur'an"*). Wajib menggunakan identitas riil SMK Skill Village: *"Santri Vokasi"*, *"Teknopreneur Muda"*, *"Santri Berdaya"*, *"Kader Vokasi Industri"*.
5. **Anti-Monospace Rule (R-06):** Dilarang keras menggunakan font monospace pada angka nominal, label, atau teks salinan umum.
6. **Contrast Standard (WCAG AAA):** Semua teks judul harus menggunakan `#0f172a` (16.1:1), body text `#334155` (9.5:1), dan teks sekunder minimal `#475569` (7.0:1) di atas latar belakang putih.
7. **Git Push Restriction:** Hanya diperbolehkan melakukan *git commit* lokal; *git push* dilarang keras tanpa perintah eksplisit dari pengguna.
