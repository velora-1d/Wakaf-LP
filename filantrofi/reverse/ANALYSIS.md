# Analisis Arsitektur & Reverse Engineering: amalsholeh.com

Dokumen ini memuat temuan analisis arsitektur, pola data publik, dan alur pengalaman pengguna (UX) dari platform filantropi amalsholeh.com untuk benchmarking pengembangan ekosistem Wakaf-LP / Filantrofi.

---

## 1. Profil Stack Teknologi Publik

Berdasarkan inspeksi header HTTP dan bundle client-side:

| Komponen | Implementasi Terdeteksi | Catatan Arsitektur |
| :--- | :--- | :--- |
| **Frontend Engine** | SvelteKit (`x-sveltekit-page: true`) | SSR (Server-Side Rendering) dengan hidrasi modular |
| **Reverse Proxy / Web Server** | Caddy (`via: 1.1 Caddy`) | Otomasi SSL/TLS & reverse proxy performa tinggi |
| **Protokol Jaringan** | HTTP/2 & HTTP/3 (`h3=":443"`) | Optimasi multiplexing dan low-latency streaming |
| **Media & Asset Delivery** | AWS S3 + Imgix CDN (`amalsholeh-s3.imgix.net`, `reimg.kresek.site`) | Resize gambar dinamis, WebP auto-format, caching agresif |
| **Tipografi** | Google Fonts Inter (`400, 500, 600, 700`) | Standar sans-serif netral |
| **Ekosistem Subdomain** | `mitra.amalsholeh.com` | Portal mitra / lembaga penggalang dana terpisah |

---

## 2. Alur Transaksi & User Journey (Donation Flow)

1. **Discovery / Beranda**:
   - Hero banner promosi program utama.
   - Kategori program (Wakaf, Infak Kemanusiaan, Yatim Dhuafa, Bencana, dsb).
   - Card Feed dengan metrik: Target, Dana Terkumpul, Persentase Progres, Sisa Hari, dan Nama Lembaga Mitra.
2. **Halaman Detail Program**:
   - Galeri foto/video dokumentasi.
   - Bar progress dana dan total donatur aktif.
   - Narasi deskripsi, rincian peruntukan, dan tab kabar terbaru (laporan penyaluran).
   - Tombol CTA sticky: "Donasi Sekarang".
3. **Formulir Donasi**:
   - Pilihan nominal cepat (preset chip: Rp 10.000, 25.000, 50.000, 100.000, nominal kustom).
   - Opsi infak operasional platform / pembulatan nominal unik (3 digit unik untuk identifikasi transfer manual).
   - Data donatur (Nama, Nomor WhatsApp, Email, Opsi Anonim / Hamba Allah).
   - Pilihan kanal pembayaran (QRIS, Virtual Account BCA/Mandiri/BRI/BNI, E-Wallet GoPay/OVO/ShopeePay).
4. **Halaman Instruksi Pembayaran**:
   - Nomor VA / Kode QRIS dinamis.
   - Countdown timer kedaluwarsa pembayaran.
   - Tombol salin nominal dan petunjuk transfer per bank.
5. **Konfirmasi & Notifikasi**:
   - Notifikasi otomatis via WhatsApp dan Email saat dana terverifikasi.
   - Pencatatan nama/alias donatur ke riwayat donatur live feed.

---

## 3. Struktur Skema Data Kunci (Clean-Room Model)

Untuk implementasi di backend (PostgreSQL Drizzle) dan konsumsi di React Native:

### A. Program / Campaign Model
```typescript
export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: 'wakaf' | 'infaq' | 'sedekah' | 'zakat' | 'kemanusiaan';
  institutionName: string;
  institutionLogoUrl?: string;
  bannerUrl: string;
  targetAmount: number;
  collectedAmount: number;
  donorCount: number;
  daysRemaining: number;
  description: string;
  createdAt: string;
  isVerified: boolean;
}
```

### B. Donation Transaction Model
```typescript
export interface DonationTransaction {
  id: string;
  campaignId: string;
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  isAnonymous: boolean;
  amount: number;
  uniqueCode: number;
  totalPayable: number;
  paymentMethod: 'qris' | 'va_bca' | 'va_mandiri' | 'va_bri' | 'gopay';
  paymentStatus: 'pending' | 'success' | 'expired' | 'failed';
  paymentReference?: string;
  paidAt?: string;
}
```

### C. Campaign Update / Kabar Model
```typescript
export interface CampaignUpdate {
  id: string;
  campaignId: string;
  title: string;
  content: string;
  mediaUrls: string[];
  disbursedAmount: number;
  disbursedDate: string;
  publishedAt: string;
}
```

---

## 4. Adaptasi untuk Aplikasi Mobile (React Native)

Fitur inti yang wajib diadopsi pada aplikasi mobile:
1. **Offline-First Caching**: Simpan feed campaign di storage lokal untuk performa loading instan.
2. **Deep-linking & Share**: Berbagi link campaign langsung membuka halaman detail di aplikasi mobile.
3. **Native Payment Integration**: Dukungan deep-link langsung ke aplikasi perbankan atau e-wallet saat QRIS/VA digenerate.
4. **Push Notifications**: Kabar penyaluran dana dan laporan berkala langsung terkirim ke ponsel donatur.
