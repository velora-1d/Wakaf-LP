# Rencana & Analisis Pemetaan Seeding Data Donatur Masjid Khairu Ummah

## 1. Ikhtisar Data Sumber
- **Sumber File**: `Rekap Donasi Masjid Khairu Ummah.md`
- **Total Baris Data**: 57 transaksi donasi
- **Total Realisasi Dana**: Rp 55.927.000
- **Total Target Penggalangan**: Rp 1.310.753.350 (4,27% tercapai)
- **Rentang Transaksi**:
  - Donasi tertinggi: Rp 10.000.000 (Agustina)
  - Donasi terendah: Rp 10.000 (Khoerunnisa & Dedah Kuratulain)
  - Donasi natura/konversi semen:
    - Indra Wardiana: Rp 550.000 (10 Sak Semen)
    - Bapak Syifa: Rp 1.650.000 (30 Sak Semen)

---

## 2. Analisis Skema Database (`donors` & `donations`)

### Tabel `donors` (Profil Donatur)
| Kolom DB | Karakteristik / Constraint | Strategi Pemetaan Data |
| :--- | :--- | :--- |
| `nama_lengkap` | `VARCHAR(255) NOT NULL` | Nama lengkap donatur sesuai baris di rekap |
| `nama_tampilan` | `VARCHAR(255) DEFAULT 'Hamba Allah'` | Jika nama 'Hamba Allah' -> 'Hamba Allah', jika nama donatur spesifik -> gunakan nama donatur |
| `tipe_donatur` | `VARCHAR(50) DEFAULT 'individu'` | `'lembaga'` untuk *PT. Isa Building Workshop* & *Wali santri angkatan 3*, selain itu `'individu'` |
| `no_whatsapp` | `VARCHAR(30) NOT NULL UNIQUE` | **Catatan Kritis**: File rekap tidak mencatat nomor HP. Dibuat format dummy unik terstandarisasi: `081000000001` s/d `081000000057` atau nomor virtual berbasis ID donatur |
| `email` | `VARCHAR(150)` | `null` (opsional) |
| `kota_domisili` | `VARCHAR(100)` | `null` / 'Bogor' |
| `total_donasi_akumulasi` | `BIGINT DEFAULT 0` | Akumulasi total nominal donasi lunas per donatur |
| `frekuensi_donasi` | `INTEGER DEFAULT 0` | Jumlah transaksi donasi per donatur |
| `catatan_admin` | `TEXT` | `Donatur Rekapitulasi Fisik Masjid Khairu Ummah` |

### Tabel `donations` (Transaksi Donasi)
| Kolom DB | Karakteristik / Constraint | Strategi Pemetaan Data |
| :--- | :--- | :--- |
| `kode_transaksi` | `VARCHAR(50) NOT NULL UNIQUE` | Format terstandar: `GVF-MKU-2026-001` s/d `GVF-MKU-2026-057` |
| `donor_id` | `INTEGER REFERENCES donors.id` | ID relasi ke tabel `donors` |
| `program_tujuan` | `VARCHAR(100) NOT NULL` | `'masjid-khairu-ummah'` (tampil di UI Admin sebagai "Masjid Khairu Ummah") |
| `nominal` | `BIGINT NOT NULL` | Nominal donasi riil (Rp 10.000 s/d Rp 10.000.000) |
| `kode_unik` | `INTEGER DEFAULT 0` | `0` |
| `nominal_total` | `BIGINT NOT NULL` | Sama dengan `nominal` |
| `akad_peruntukan` | `VARCHAR(100)` | `'Wakaf Pembangunan Masjid'` |
| `atas_nama_niat` | `VARCHAR(255)` | Nama donatur / nama almarhum (cth: keluarga Senen Kromomedjo, Sukino Marsono, dll.) |
| `metode_pembayaran` | `VARCHAR(50)` | `'BSI Transfer'` (default), atau `'Konversi Material'` untuk semen |
| `status_pembayaran` | `VARCHAR(30)` | `'lunas'` |
| `verified_by` | `VARCHAR(100)` | `'Admin GVF'` |
| `verified_at` | `TIMESTAMP` | Sesuai tanggal transaksi |
| `sumber_leads` | `VARCHAR(50)` | `'relasi_langsung'` |
| `catatan_transaksi` | `TEXT` | Catatan khusus seperti '10 Sak Semen', '30 Sak semen' |
| `created_at` | `TIMESTAMP` | Sesuai tanggal transaksi (baris 34-57) atau baseline `2026-09-01` untuk baris 1-33 |

---

## 3. Poin Keputusan & Rekomendasi (Untuk Review User)

1. **Konsolidasi vs Pemisahan "Hamba Allah"**:
   - Terdapat beberapa baris bernama "Hamba Allah" (Baris 1: 4jt, Baris 2: 4jt, Baris 3: 3jt, Baris 11: 500rb [Ortu Jojo], Baris 19: 150rb).
   - **Opsi A (Rekomendasi)**: Masing-masing baris dibuatkan nomor dummy tersendiri (`081000000001`, `081000000002`, dst.) agar di tabel admin tetap muncul 57 entitas donatur yang terpisah dan urut sesuai nomor di spreadsheet.
   - **Opsi B**: Donatur "Hamba Allah" murni digabung menjadi 1 profil donatur dengan 4 kali transaksi riwayat donasi.

2. **Penanganan Baris Tanpa Tanggal (Baris 1 - 33)**:
   - Baris 1 s/d 33 tidak memiliki tanggal pada rekap asli.
   - **Rekomendasi**: Diset ke tanggal awal periode pencatatan (misal `2026-08-31` / `2026-09-01 09:00:00 WIB`) agar urutan paginasi kronologis tetap rapi.

3. **Status Kredensial Admin**:
   - Akun admin di tabel `admin_users` dan seed script telah berhasil diubah menjadi:
     - **Username**: `admin`
     - **Password**: `admin123`
     - Status: **Aktif & Terverifikasi E2E 100%**.
