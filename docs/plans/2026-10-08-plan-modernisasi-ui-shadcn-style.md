# 📐 PLAN MODERNISASI UI: MENGUBAH "KOTAK BASIC BAWAAN AI" MENJADI DESAIN SHADCN/UI & CRAFT-GRADE

- **Tanggal**: 8 Oktober 2026  
- **Proyek**: Global Village Fund (GVF) • `Wakaf-LP`  
- **Target**: Transformasi menyeluruh elemen UI kotak generik menjadi sistem desain profesional berstandar **shadcn/ui** dan **ISAVO Craft**.

---

## 1. ANALISIS MASALAH: MENGAPA TAMPILAN TERLIHAT "BASIC BAWAAN AI"?

Berdasarkan audit di halaman utama (`/`) dan halaman program (`/program/*`), ditemukan sejumlah pola desain yang memicu kesan "AI template / toy boxes":

| Masalah Visual | Ciri-ciri di Kode Saat Ini | Dampak Psikologis User |
|---|---|---|
| **1. Kotak-kotak Terpisah Flat** | `chain-step-card`, `support-card`, `partner-card` berupa kotak putih terpisah berderet dengan `border: 1px solid #e2e8f0` dan `border-radius: 16px/20px` seragam. | Terlihat seperti diagram PowerPoint generik yang digambar otomatis oleh AI, bukan website arsitektural matang. |
| **2. Alur Panah Primitif** | Rantai alur `01 s/d 06` dihubungkan teks karakter panah `→` statis di antara kartu terpisah. | Kurang kesinambungan proses (*disconnected*), layout kaku, dan tidak responsif dengan elegan di mobile/desktop. |
| **3. Efek Hover Klise** | Hampir semua kartu memakai efek seragam `transform: translateY(-6px)` dengan shadow abu-abu standar. | Monoton, tidak ada micro-interaction yang mendalam atau aksen pencahayaan (*lighting/glow*). |
| **4. Densitas & Simetri Kaku** | 6 pilar atau 5 mitra disusun dalam grid simetris identik (3 kolom x 2 baris atau 4 kolom). | Tidak ada variasi hierarki (mana yang utama, mana yang pendukung). |
| **5. Kurangnya Aksen Tipografi shadcn** | Label, badge, dan nomor memakai styling dasar tanpa font mono, micro-dot indicator, atau garis batas (*hairline borders*). | Kehilangan sentuhan *clean minimalist enterprise* khas shadcn/ui. |

---

## 2. PILAR & FILOSOFI DESAIN PENGGANTI (SHADCN/UI & CRAFT-GRADE)

Transformasi ini akan menerapkan 4 pola desain utama:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TRANSFORMASI SISTEM DESAIN GVF                       │
├────────────────────────────────┬───────────────────────────────────────┤
│ POLA LAMA ("BASIC AI BOXES")   │ POLA BARU (SHADCN/UI & CRAFT)         │
├────────────────────────────────┼───────────────────────────────────────┤
│ • Kotak terputus dengan "→"    │ ➔ Connected Linear Process Pipeline   │
│ • Grid kotak simetris monoton  │ ➔ Asymmetric Bento Grid / Split Flow  │
│ • Border tebal flat            │ ➔ Hairline Subdued Borders (zinc-200) │
│ • Hover translateY klise       │ ➔ Subtle Card Border Highlight & Glow │
│ • Text badge biasa             │ ➔ Micro-dot Status Badges + Mono Font │
└────────────────────────────────┴───────────────────────────────────────┘
```

### 1. Connected Linear Pipeline (Untuk Alur Proses & Rantai Dampak)
- Mengganti deretan kotak terpisah dengan **Track Pipeline Berkelanjutan**:
  - Garis konektor presisi di belakang nomor step.
  - Node step berbentuk kapsul/lingkaran minimalis dengan nomor monospaced (`01`, `02`, ...).
  - Isi deskripsi berada di bawah atau menyatu dalam alur horizontal yang mulus.
  - Interaktif: Step yang aktif atau di-hover memunculkan highlight garis dan konten.

### 2. shadcn Card System Architecture
Mengadopsi anatomi baku shadcn/ui untuk seluruh kartu:
- **Card**: Border 1px halus, radius terukur (`rounded-xl` atau `16px`), background bersih, transisi warna border saat hover.
- **CardHeader**: Ruang terpisah antara kategori/badge dengan judul.
- **CardTitle**: Tipografi tegas dengan letter-spacing rapat (`tracking-tight`).
- **CardDescription**: Teks penjelas dengan warna `muted-foreground` (`#64748b`).
- **CardContent & CardFooter**: Pembagian konten terstruktur tanpa ruang kosong canggung.

### 3. Asymmetric Bento Grid
- Mengelompokkan item ke dalam Bento Grid: kartu pilar utama mendapatkan ukuran lebih lebar/tinggi dengan grafis pendukung, sedangkan kartu pelengkap berukuran kompak.

---

## 3. RENCANA IMPLEMENTASI BERTAHAP (ROADMAP EKSEKUSI)

Roadmap dibagi menjadi **4 Fase terukur** agar setiap halaman dapat diuji dan divalidasi visualnya tanpa regresi fungsional:

---

### 🔹 FASE 1: Halaman Utama — Section Rantai Dampak & Transparansi (Prioritas Utama)
Fokus: Menyelesaikan area yang langsung disorot user pada tangkapan layar.

- [ ] **Task 1.1: Redesign Section 10 (`ImpactValueChainSection.astro`)**
  - Ubah 6 kotak rantai donasi (`01 DONASI` s/d `06 DAMPAK LUAS`) menjadi **Connected Horizontal Pipeline / Stepper**:
    - Satu garis track horizontal menghubungkan node 01 sampai 06.
    - Node nomor bulat/kapsul dengan tipografi monospaced.
    - Kartu ringkasan terintegrasi di bawah alur, bukan kotak terpisah yang canggung.
  - Ubah 4 kartu penerima manfaat (*Untuk Santri, Untuk Pesantren, Untuk Masyarakat, Untuk Mitra*) menjadi **shadcn-style Cards**:
    - 1px subtle hairline border, aksen line tipis di sisi kiri/atas sesuai kategori.
    - Status badge minimalis dengan dot indikator berdenyut halus.
  - Modernisasi *Standar Karakter Santri FAST* menjadi banner callout minimalis bergaya Bento.

- [ ] **Task 1.2: Redesign Section 11 (`TransparencySection.astro`)**
  - Rombak 3 poin akuntabilitas menjadi list interaktif dengan pembatas hairline (*divider* tipis).
  - Polish kotak tata kelola YPCI dengan efek dark card mewah (*subtle border highlight* dan metrik persentase clean).

---

### 🔹 FASE 2: Halaman Utama — Section Ekosistem, Alokasi & Kemitraan
Fokus: Membersihkan kotak-kotak generik di bagian tengah beranda.

- [ ] **Task 2.1: Redesign Section 05 (`WhereSupportGoesSection.astro`)**
  - Ubah 6 kartu alokasi (*Pendidikan, Fasilitas, Keterampilan, Kemandirian, Wakaf, Pemberdayaan*) dari grid kotak seragam menjadi **Bento Grid**:
    - Kartu unggulan (*Pendidikan* & *Wakaf Produktif*) diberi aksen visual lebih menonjol.
    - 4 kartu lainnya berbentuk kartu fitur ringkas dengan ikon SVG terintegrasi rapi.

- [ ] **Task 2.2: Redesign Section 12 (`CollaborateSection.astro`)**
  - Ubah 5 kotak stakeholder menjadi **Directory Mitra Modern ala shadcn**:
    - Header card dengan badge kategori monospaced.
    - Card CTA *Bangun Kemitraan* menyatu secara proporsional di dalam grid bento.

- [ ] **Task 2.3: Polish Section 07 & 09 (`DonationChannelsSection.astro` & `WakafPillarsSection.astro`)**
  - Saluran donasi diubah menjadi tab selector atau segmented cards yang ringkas.
  - Pilar wakaf ditingkatkan kedalaman visualnya (*elevation & subtle border*).

---

### 🔹 FASE 3: Halaman Program ZISWAF (`/program/wakaf`, `/program/infaq`, dll.)
Fokus: Mengeliminasi kotak kaku pada halaman detail program di `ProgramLayout.astro`.

- [ ] **Task 3.1: Modernisasi Pricing Packages Card**
  - Terapkan layout shadcn Pricing Card:
    - Garis pemisah tegas antara harga, durasi, dan daftar deliverables.
    - Badge "Paling Populer" bergaya kapsul minimalis di atas border.
    - Checklist deliverables menggunakan icon SVG clean dengan teks berbobot seimbang.

- [ ] **Task 3.2: Modernisasi Value Boxes & 4-Step Workflow**
  - Ubah 3 kotak Value Boxes menjadi card vertikal dengan aksen garis kiri.
  - Ubah 4 langkah workflow menjadi timeline vertikal bertahap dengan progress bar pengubung.

- [ ] **Task 3.3: Modernisasi Rekening Bank & FAQ Accordion**
  - Kartu nomor rekening dibuat seperti kartu virtual/digital wallet clean dengan tombol copy interaktif.
  - FAQ diubah menjadi pure shadcn Accordion (garis bawah tipis, transisi buka-tutup halus, tanpa kotak tebal).

---

### 🔹 FASE 4: Halaman Portofolio, Kontak & Verifikasi Akhir
Fokus: Menyelaraskan seluruh halaman pendukung dan pengujian performa.

- [ ] **Task 4.1: Modernisasi Form Kontak (`contact.astro` & `ContactSection.astro`)**
  - Input form dengan border focus ring khas shadcn (`ring-1 ring-blue-500 border-slate-300`).
  - Kartu alamat dan saluran komunikasi disusun dalam layout split yang kokoh.

- [ ] **Task 4.2: Audit Responsivitas & Build Verification**
  - Verifikasi mobile, tablet, dan desktop di browser lokal (`http://localhost:4321/`).
  - Uji `pnpm run build` dan pastikan zero build warning.
  - Dokumentasikan perubahan dan checkpoint Git lokal.

---

## 4. METODE TEKNIS YANG DIGUNAKAN

1. **Astro Native + Tailwind/Token CSS**: Mengadopsi tokens shadcn/ui (`--border: #e2e8f0`, `--card: #ffffff`, `--muted: #f8fafc`, `--primary: #0284c7`, `--radius: 0.75rem`) langsung ke stylesheet proyek tanpa bloating bundle Javascript.
2. **Performa Maksimal**: Zero heavy client runtime, rendering 100% statis secepat kilat.
3. **Kepatuhan Brand**: Tetap setia pada warna biru royal (`#0284c7`), navy korporat (`#0a2540`), aksen merah ISAVO (`#e53935`), dan dilarang memakai warna ungu.
