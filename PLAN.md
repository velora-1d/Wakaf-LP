# Rencana Implementasi: Modul Manajemen Donatur & Sumber Leads (GVF)

Dokumen ini merupakan acuan resmi pengembangan modul **Data Donatur & Saluran Perolehan (Leads)** untuk Global Village Fund (GVF).

---

## 1. Ringkasan & Sasaran Utama
1. **Pusat Data Donatur Terpusat**: Mencatat profil donatur (individu, korporasi/CSR, komunitas) secara rapi tanpa duplikasi kontak.
2. **Pelacakan Sumber Perolehan (Acquisition / Leads Tracking)**: Mengetahui efektivitas setiap kanal pemasaran (Meta Ads, TikTok Ads, Google SEO, Safari Dakwah, Brosur/Event, Relasi Langsung).
3. **Verifikasi Pembayaran & Bukti Transfer S3**: Integrasi penyimpanan berkas bukti transfer ke MinIO S3 (`skillage-website`) dan alur verifikasi amil (Pending &rarr; Lunas/Verified).
4. **Slide-Over Drawer Kanan (70% Layar)**: Konsistensi antarmuka dashboard di mana seluruh formulir entri dan detail transaksi terbuka dari samping kanan selebar 70% viewport.
5. **Apresiasi Cepat via WhatsApp**: Tombol instan untuk mengirim konfirmasi dan kwitansi donasi via WhatsApp resmi yayasan.

---

## 2. Arsitektur Basis Data (PostgreSQL + Drizzle ORM)

Arsitektur relasional 2 tabel untuk memastikan histori transaksi tersimpan rapi meskipun donatur berdonasi berulang kali:

### Tabel Induk: `donors`
Menyimpan identitas dasar donatur:
- `id`: Serial primary key
- `nama_lengkap`: Varchar(255) not null
- `nama_tampilan`: Varchar(255) default 'Hamba Allah'
- `tipe_donatur`: Varchar(50) ('individu' | 'korporasi' | 'komunitas')
- `no_whatsapp`: Varchar(30) not null unique
- `email`: Varchar(150)
- `kota_domisili`: Varchar(100)
- `total_donasi_akumulasi`: Bigint default 0
- `frekuensi_donasi`: Integer default 0
- `catatan_admin`: Text
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Tabel Transaksi & Leads: `donations`
Menyimpan rincian donasi, saluran perolehan, dan bukti pembayaran:
- `id`: Serial primary key
- `kode_transaksi`: Varchar(50) unique (contoh: `GVF-202610-0001`)
- `donor_id`: Integer foreign key ke `donors.id`
- `program_tujuan`: Varchar(100) ('wakaf-produktif', 'masjid-khairu-ummah', 'vokasi-agroteknologi', 'beasiswa-santri', 'infaq-operasional', 'zakat')
- `nominal`: Bigint not null
- `kode_unik`: Integer default 0
- `nominal_total`: Bigint not null
- `akad_peruntukan`: Varchar(100) ('Wakaf Muabbad', 'Wakaf Muaqqat', 'Infaq Terikat', 'Zakat Maal')
- `atas_nama_niat`: Varchar(255) (contoh: "Alm. H. Abdullah")
- `doa_donatur`: Text
- `metode_pembayaran`: Varchar(50) ('BSI Transfer', 'Muamalat', 'BCA', 'QRIS Skillage', 'Tunai Amil')
- `bukti_transfer_url`: Text (tersimpan di MinIO S3 `skillage-website/donasi/`)
- `status_pembayaran`: Varchar(30) default 'menunggu_verifikasi' ('menunggu_verifikasi', 'lunas', 'dibatalkan')
- `verified_by`: Varchar(100)
- `verified_at`: Timestamp
- `sumber_leads`: Varchar(50) ('meta_ads', 'tiktok_ads', 'google_seo', 'safari_dakwah', 'brosur_event', 'relasi_langsung', 'walk_in')
- `campaign_utm`: Varchar(150) (opsional tag kampanye digital)
- `catatan_transaksi`: Text
- `created_at`: Timestamp

---

## 3. Spesifikasi UI/UX & Slide-Over Drawer

1. **Slide-Over Drawer Kanan (70% Layar)**:
   - Panel formulir tersembunyi dengan `transform: translateX(100%)`.
   - Meluncur halus (`transform: translateX(0)`) dengan easing `cubic-bezier(.2, .8, .2, 1)`.
   - Lebar desktop `70vw` (`width: 70vw; max-width: 70vw;`), responsif 100% pada layar ponsel (`< 768px`).
   - Sticky header dengan tombol tutup silang dan tombol simpan di footer.
2. **Indikator & Filter Dashboard**:
   - Kartu Metrik: Total Penghimpunan, Donasi Terverifikasi, Donasi Pending, dan Jumlah Donatur Unik.
   - Filter Cepat: Filter berdasarkan Status Pembayaran, Program Donasi, dan Saluran Leads.
   - Pencarian Instan: Cari berdasarkan nama donatur, nomor WhatsApp, atau kode transaksi.
3. **Upload Bukti Transfer MinIO S3**:
   - Dropzone interaktif dengan pratinjau gambar langsung.
   - Terhubung dengan endpoint `/api/admin/donatur/upload` dan bucket MinIO `skillage-website`.
4. **Integrasi WhatsApp Amil**:
   - Tombol satu-klik untuk membuka `https://wa.me/{noWhatsapp}?text={pesanEncoded}` dengan template kwitansi resmi GVF.

---

## 4. Rincian Endpoint Backend (Astro SSR)

1. `GET /api/admin/donatur/list` &rarr; Mengambil daftar donatur & transaksi dengan paginasi dan filter.
2. `POST /api/admin/donatur/create` &rarr; Entri manual donatur & donasi baru oleh amil.
3. `POST /api/admin/donatur/upload` &rarr; Upload bukti transfer ke MinIO S3 bucket `skillage-website`.
4. `PUT /api/admin/donatur/verify` &rarr; Verifikasi status pembayaran donasi (Pending &rarr; Lunas).
5. `DELETE /api/admin/donatur/delete` &rarr; Hapus data transaksi donasi.

---

## 5. Rencana Tahapan Kerja (Task Breakdown)

| Kode Task | Deskripsi Pekerjaan | Status |
| :--- | :--- | :--- |
| **DONATUR-DB-01** | Penambahan skema `donors` & `donations` di Drizzle ORM serta eksekusi DDL migrasi PostgreSQL | To Do |
| **DONATUR-API-01** | Pembuatan API endpoint CRUD donatur, upload bukti MinIO S3, dan verifikasi pembayaran | To Do |
| **DONATUR-UI-01** | Pembuatan halaman dashboard `/admin/donatur` dengan kartu ringkasan, tabel data, dan filter | To Do |
| **DONATUR-DRAWER-01** | Implementasi Slide-Over Drawer samping kanan 70% untuk form tambah/edit donatur & transaksi | To Do |
| **DONATUR-WA-01** | Integrasi generator link WhatsApp konfirmasi/kwitansi dan navigasi sidebar AdminLayout | To Do |
| **DONATUR-TEST-01** | Pengujian end-to-end, validasi TypeScript (`tsc --noEmit`), dan build verifikasi | To Do |

---

*Silakan review rencana di atas. Setelah disetujui, pengerjaan akan dimulai sesuai urutan task di atas.*
