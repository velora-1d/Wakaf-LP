# Master Plan: Dynamic Page Builder & Admin CMS Dashboard
**Proyek**: Global Village Fund (GVF) Portal  
**Target**: Semua halaman dan section menjadi dinamis (teks, gambar, metrik, switch on/off visibilitas) via Dashboard Admin  
**Database**: PostgreSQL (`postgresql://DB-PGbase:***@100.77.202.57:5433/gvf`)  
**Stack**: Astro SSR (`@astrojs/node`) + Drizzle ORM + Tailwind/Vanilla CSS + React Islands  
**Aksen Desain**: Modern Clean ISAVO, Dominan Biru Royal (`#0969da` / `#0752a8`), No Purple, No Emojis.

---

## 1. Arsitektur Inti & Alur Kerja

```
                           ┌────────────────────────────────────────────────┐
                           │   PostgreSQL Database (Tailscale: 100.77...)   │
                           │     - admin_users                              │
                           │     - pages                                    │
                           │     - page_sections (JSONB content + is_active)│
                           │     - media_assets                             │
                           └───────────────────────┬────────────────────────┘
                                                   │
                         Drizzle ORM / Node.js SSR │ (Realtime Queries)
                                                   ▼
┌───────────────────────────────────────────┐    ┌───────────────────────────────────────────┐
│        DASHBOARD ADMIN (/admin)           │    │          PUBLIC FRONTEND (/)              │
│  - /admin/login (Auth Session)            │    │  - Mengambil data section dari DB         │
│  - /admin/pages/[slug] (Editor Section)   │    │  - Checkbox is_enabled = false -> SKIP    │
│  - Toggle Switch ON/OFF per Section       │    │  - Fallback aman jika data DB kosong      │
│  - Form Edit Teks, Gambar & Metrik        │    │  - Realtime update tanpa re-build         │
└───────────────────────────────────────────┘    └───────────────────────────────────────────┘
```

---

## 2. Struktur Database PostgreSQL

### Tabel 1: `admin_users`
Menyimpan akun pengelola dashboard yang terenkripsi.
- `id` (UUID, Primary Key)
- `username` (VARCHAR 50, Unique)
- `email` (VARCHAR 100, Unique)
- `password_hash` (TEXT - Bcrypt / Argon2)
- `role` (VARCHAR 20 - `'superadmin'`, `'editor'`)
- `last_login_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)

### Tabel 2: `pages`
Daftar seluruh halaman dalam portal GVF.
- `id` (VARCHAR 50, Primary Key, misal: `'home'`, `'tentang-kami'`, `'kemitraan'`, `'contact'`, `'program-wakaf'`, `'program-zakat'`, `'program-infaq'`, `'program-sedekah'`)
- `title` (VARCHAR 150)
- `slug` (VARCHAR 100, Unique)
- `meta_title` (VARCHAR 200)
- `meta_description` (TEXT)
- `is_published` (BOOLEAN, default true)
- `updated_at` (TIMESTAMP)

### Tabel 3: `page_sections` (Kunci Fleksibilitas Konten)
Menyimpan blok-blok section dinamis untuk setiap halaman.
- `id` (UUID, Primary Key)
- `page_id` (VARCHAR 50, Foreign Key ke `pages.id`)
- `section_key` (VARCHAR 50, identifier komponen, misal `'hero'`, `'showcase_gallery'`, `'pricing'`)
- `section_name` (VARCHAR 100, label manusiawi di admin, misal: *"06. Galeri Dokumentasi Kawasan"*)
- `is_enabled` (BOOLEAN, default true) -> **Checkbox Switch On/Off di Admin**
- `sort_order` (INTEGER, default 0) -> **Urutan Tampil di Halaman**
- `content` (JSONB) -> **Payload Dinamis Lengkap (Teks, Judul, URL Gambar, Metrik, Tombol, Item List)**
- `updated_at` (TIMESTAMP)

### Tabel 4: `media_assets`
Manajemen aset gambar yang diunggah / digunakan di CMS.
- `id` (UUID, Primary Key)
- `file_name` (VARCHAR 255)
- `file_url` (TEXT)
- `file_size` (INTEGER)
- `mime_type` (VARCHAR 50)
- `alt_text` (VARCHAR 255)
- `created_at` (TIMESTAMP)

---

## 3. Inventaris Lengkap Halaman & Section Dinamis

### Halaman 1: Beranda (`/` - Slug: `'home'`)
| No | Section Key | Nama Section di Admin | Konten Dinamis yang Bisa Diedit via Admin |
| :--- | :--- | :--- | :--- |
| 1 | `hero` | 01. Hero Slider Cinematic | 4 slide (judul, subtitle, badge, foto background, teks tombol CTA) |
| 2 | `programs_pillar` | 02. Empat Pilar Program ZISWAF | Kicker badge, judul utama, 4 kartu program (Wakaf, Zakat, Infaq, Sedekah) |
| 3 | `about_split` | 03. Tentang Kami & Visi | Tagline, judul narasi, 4 poin checklist keunggulan, foto dokumentasi |
| 4 | `interactive_services` | 04. Jelajahi Ekosistem Terpadu | Header, foto display, accordion tab 01-04 (Masjid, SMK, Lab, Greenhouse) |
| 5 | `workflow` | 05. Alur Filantropi & Tahapan | 4 kartu langkah (01 Hisab, 02 Akad, 03 Realisasi, 04 Laporan) |
| 6 | `showcase_gallery` | 06. Galeri Kawasan Jonggol | Judul, subtitle, 5 item Elastic Gallery (foto, judul fasilitas, deskripsi) |
| 7 | `leadership` | 07. Dewan Pembina & Pengurus | Quote pimpinan, switcher tab dewan, foto, nama, gelar, dan testimoni |
| 8 | `video` | 08. Video Dokumentasi Lapangan | Judul video, subtitle, ID YouTube embed, thumbnail cover |
| 9 | `news_grid` | 09. Kabar & Berita Terkini GVF | Header, 3-6 kartu kabar (kategori, judul artikel, tanggal, foto) |
| 10 | `final_cta` | 10. Final CTA Konsultasi | Judul ajakan jariyah, subteks, nomor kontak WhatsApp resmi |

---

### Halaman 2: Tentang Kami (`/tentang-kami` - Slug: `'tentang-kami'`)
| No | Section Key | Nama Section di Admin | Konten Dinamis yang Bisa Diedit via Admin |
| :--- | :--- | :--- | :--- |
| 1 | `about_banner` | 01. Header Banner & Breadcrumb | Judul halaman, background banner, teks breadcrumb |
| 2 | `about_intro` | 02. Intro Split & Metrik Hektare | Judul visi, narasi ekosistem pesantren, angka metrik (3 Hektare), foto |
| 3 | `about_timeline` | 03. Garis Waktu Milestone | 4 titik tahun (2020 Cita-cita, 2022 Pembebasan, 2024 Peletakan Batu, 2026 Operasional) |
| 4 | `about_workflow` | 04. Tata Kelola & Nilai FAST | 4 pilar adab (Fathonah, Amanah, Shiddiq, Tabligh), narasi transparansi |
| 5 | `about_facility` | 05. Galeri Fasilitas Pembelajaran | Elastic Gallery fasilitas SMK Skill Village dan asrama Jonggol |
| 6 | `about_final_cta` | 06. Final CTA Kemitraan | Banner ajakan kolaborasi yayasan & tombol kontak |

---

### Halaman 3: Kemitraan (`/kemitraan` - Slug: `'kemitraan'`)
| No | Section Key | Nama Section di Admin | Konten Dinamis yang Bisa Diedit via Admin |
| :--- | :--- | :--- | :--- |
| 1 | `partner_banner` | 01. Header Banner & Breadcrumb | Judul kemitraan multipihak, latar belakang foto |
| 2 | `partner_gallery` | 02. Galeri Sinergi Mitra | Galeri akordeon dokumentasi fasilitas hasil gotong royong |
| 3 | `partner_collaborate`| 03. Tiga Model Kemitraan | CSR Perusahaan, Hibah Alat Industri Vokasi, Orang Tua Asuh Beasiswa |
| 4 | `partner_final_cta` | 04. Final CTA Kemitraan | Form inquiry kerja sama & tombol hotline CSR |

---

### Halaman 4: Kontak (`/contact` - Slug: `'contact'`)
| No | Section Key | Nama Section di Admin | Konten Dinamis yang Bisa Diedit via Admin |
| :--- | :--- | :--- | :--- |
| 1 | `contact_banner` | 01. Header Banner | Judul "Hubungi Kami", subteks bantuan layanan donatur |
| 2 | `contact_main` | 02. Form Pesan & Kartu Kontak | Alamat sekretariat, nomor call center WA, email resmi, jam operasional |
| 3 | `contact_map` | 03. Peta Lokasi Pesantren | Embed Google Maps koordinat kawasan Sukasirna Jonggol |

---

### Halaman 5 s/d 8: Halaman Detail Program ZISWAF
*(Berlaku untuk `/program/wakaf`, `/program/zakat`, `/program/infaq`, `/program/sedekah`)*
| No | Section Key | Nama Section di Admin | Konten Dinamis yang Bisa Diedit via Admin |
| :--- | :--- | :--- | :--- |
| 1 | `prog_header` | 01. Hero Banner Program | Judul program, category badge, foto background |
| 2 | `prog_pricing` | 02. Pilihan Paket Donasi & Addon | 3 kartu paket donasi (nominal, benefit, rekomendasi), tabel add-on |
| 3 | `prog_deepdive` | 03. Deep-Dive Story & Nilai | Sidebar link navigasi program, narasi urgensi, 4 value box ikon |
| 4 | `prog_showcase` | 04. Portfolio / Galeri Program | Foto dokumentasi riil penyaluran & transformasi mustahiq/santri |
| 5 | `prog_workflow` | 05. 4 Langkah Akad & Setor | Tahapan berdonasi sah syar'i 01 s/d 04 |
| 6 | `prog_leadership`| 06. Dewan Pengawas Syariah | Nama ustadz pembina, fatwa kepatuhan, quote syariah |
| 7 | `prog_legality` | 07. Legalitas & Rekening Bank | Izin Kemenkumham/BWI, nomor rekening resmi BSI & Mandiri |
| 8 | `prog_faq` | 08. FAQ & Banner Ajakan | Daftar pertanyaan & jawaban fiqih, banner doa keberkahan |

---

## 4. Rancang Bangun Dashboard Admin (`/admin`)

### A. Halaman Login Admin (`/admin/login`)
- **Tampilan**: Halaman login elegan dengan tema Dark Navy/Royal Blue GVF (`#0f172a` & `#0969da`).
- **Elemen**:
  - Logo resmi GVF
  - Input Username / Email
  - Input Password (dengan toggle lihat sandi)
  - Tombol Masuk ("Masuk ke Portal Admin GVF")
  - Notifikasi error visual jika kredensial tidak cocok
- **Keamanan**:
  - Validasi kredensial dari tabel `admin_users` (Bcrypt/Argon2).
  - Penyimpanan sesi login via **HTTP-Only Secure Cookie** (`gvf_admin_session`).
  - Middleware proteksi: Setiap akses ke route `/admin/*` wajib lolos verifikasi sesi, jika belum login otomatis dialihkan ke `/admin/login`.

---

### B. Halaman Utama Admin (`/admin`)
- **Navbar & Sidebar**:
  - Profil admin yang sedang login + Tombol Logout.
  - Menu Navigasi:
    1. *Dashboard Overview* (Ringkasan metrik)
    2. *Kelola Halaman & Section* (Halaman Beranda, Program, Tentang Kami, dll.)
    3. *Media Library* (Upload & kelola foto)
    4. *Pengaturan Akun & Web*
- **Ringkasan Cepat**:
  - Status koneksi database PostgreSQL (Live & Connected).
  - Status section aktif: Total section terpasang vs section yang diaktifkan (ON).

---

### C. Halaman Editor Section (`/admin/pages/[slug]`)
Ini adalah ruang kerja utama admin untuk mengatur section per halaman:
1. **Daftar Section Interaktif**:
   - Menampilkan seluruh section yang ada di halaman tersebut secara berurutan.
   - **Saklar Switch Checkbox (Tampilkan / Sembunyikan)**: Mengklik switch langsung mengupdate status `is_enabled` di database (Realtime tanpa reload).
   - Indikator badge: Hijau (Aktif) / Abu-abu (Nonaktif).
2. **Form Editor Konten Section**:
   - Tombol *"Edit Konten"* pada tiap section membuka form khusus:
     - Input teks Headline / Judul
     - Textarea Subtitle / Paragraf narasi
     - Image Picker / URL Input untuk foto background & dokumentasi
     - List Builder untuk butir-butir metrik, checklist, atau FAQ
   - Tombol *"Simpan Perubahan"* yang memvalidasi dan menyimpan payload JSONB ke PostgreSQL.
3. **Tombol "Lihat Halaman Publik"**:
   - Tautan langsung membuka halaman web publik di tab baru untuk memverifikasi hasil tampilan seketika.

---

## 5. Rencana Tahapan Eksekusi (Roadmap Implementasi)

| Fase | Deskripsi Pekerjaan | Estimasi Deliverable |
| :--- | :--- | :--- |
| **Fase 1** | **Setup Adapter SSR & ORM**<br>Pasang `@astrojs/node`, `drizzle-orm`, `pg`, dan beralih ke mode SSR di `astro.config.mjs`. | Server Astro siap membaca data database secara realtime. |
| **Fase 2** | **Migrasi Skema PostgreSQL**<br>Jalankan script pembuatan tabel `admin_users`, `pages`, `page_sections`, dan `media_assets`. Lakukan seeding data awal dari konten yang sudah ada. | Database terisi data lengkap seluruh halaman dan section default. |
| **Fase 3** | **Sistem Login & Autentikasi**<br>Buat halaman `/admin/login`, hashing password, logic session cookie, dan middleware proteksi `/admin/*`. | Akses admin terproteksi aman 100%. |
| **Fase 4** | **Pembangunan Dashboard Admin UI**<br>Buat layout admin, halaman list pages, dan editor section `/admin/pages/[slug]` dengan checkbox switch on/off dan form edit konten. | Admin bisa mengontrol visibilitas dan mengedit teks/gambar setiap section. |
| **Fase 5** | **Integrasi Frontend Publik SSR**<br>Hubungkan komponen halaman publik (`index.astro`, `tentang-kami.astro`, dll.) agar membaca section aktif dari database dengan sistem safe-fallback. | Perubahan di admin langsung tercermin di web publik secara instan. |
| **Fase 6** | **Uji Coba & Verifikasi Penuh**<br>Uji coba login, toggle hide salah satu section di admin, verifikasi section tersebut hilang di web publik, aktifkan kembali, dan verifikasi edit teks/gambar berhasil. | Sistem terverifikasi empiris 100%. |

---

## 6. Jaminan Keamanan & Keandalan
1. **Proteksi Kredensial**: Database connection string tersimpan aman di `.env` dan diabaikan oleh `.gitignore`.
2. **Safe Fallback**: Jika koneksi database terputus sesaat, frontend publik memiliki data cadangan (fallback defaults) sehingga website tidak pernah menampilkan halaman error atau blank.
3. **Audit Trail**: Setiap perubahan section dicatat dengan timestamp `updated_at`.
