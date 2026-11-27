# Global Village Fund (GVF) - Web Platform (`astro-web`)

Aplikasi web resmi **Global Village Fund (GVF)** (`https://globalvillagefund.org`) yang dibangun dengan Astro SSR, React, Tailwind CSS v4, Drizzle ORM (PostgreSQL / Neon), dan Object Storage kompatibel S3.

---

## Tech Stack

- **Framework**: Astro 7 (`output: 'server'`) + React 19 (`@astrojs/react`)
- **Styling & UI**: Tailwind CSS v4 (`@tailwindcss/vite`), `lucide-react`, `clsx`, `tailwind-merge`
- **Animasi & Carousel**: `framer-motion`, `motion`, `gsap`, `lenis`, `@blossom-carousel/web`
- **Database & ORM**: PostgreSQL (`@neondatabase/serverless`, `postgres`) + Drizzle ORM (`drizzle-orm`, `drizzle-kit`)
- **Object Storage**: `@aws-sdk/client-s3` & `minio` (Neon Object Storage / S3-compatible)
- **Autentikasi**: Session-based auth (`ADMIN_SESSION_SECRET`) + `bcryptjs`
- **Deployment Adapters**:
  - Node.js Standalone (`@astrojs/node`, default)
  - Cloudflare Pages (`@astrojs/cloudflare`, aktif saat `CLOUDFLARE=true` atau `CF_PAGES=true`)
  - Vercel (`@astrojs/vercel`, aktif saat `VERCEL=true`)

---

## Prasyarat

- **Node.js**: v22+ (sesuai `Dockerfile`)
- **Package Manager**: `pnpm` (wajib menggunakan `pnpm`)
- **Database**: PostgreSQL / Neon Serverless
- **Storage**: Bucket S3 / MinIO / Neon Object Storage

---

## Instalasi & Menjalankan Lokal

1. Masuk ke direktori `astro-web`:

   ```bash
   cd astro-web
   ```

2. Install dependensi menggunakan `pnpm`:

   ```bash
   pnpm install
   ```

3. Salin atau konfigurasi file `.env` (lihat bagian [Variabel Lingkungan](#variabel-lingkungan)).

4. Jalankan development server:

   ```bash
   pnpm dev
   ```

5. Validasi tipe data dan komponen Astro:

   ```bash
   pnpm check
   ```

---

## Daftar Script (`package.json`)

| Script | Perintah | Keterangan |
| :--- | :--- | :--- |
| `dev` | `pnpm dev` | Menjalankan Astro dev server |
| `build` | `pnpm build` | Build SSR Node.js standalone ke `./dist` |
| `build:cf` | `pnpm build:cf` | Build SSR untuk target Cloudflare |
| `build:pages` | `pnpm build:pages` | Build Cloudflare + menjalankan `scripts/prepare-pages.mjs` |
| `deploy:pages` | `pnpm deploy:pages` | Build Pages dan deploy via Wrangler (`wakaf-astro`) |
| `preview` | `pnpm preview` | Preview hasil build lokal |
| `check` | `pnpm check` | Menjalankan `astro check` |

---

## Struktur Direktori Utama

```text
astro-web/
├── public/                 # Aset statis publik
├── scripts/                # Utilitas build & sinkronisasi aset S3
│   ├── prepare-pages.mjs
│   ├── sync-all-s3-assets.mjs
│   ├── sync-program-sections.mjs
│   └── upload-bahan-konten.ts
├── src/
│   ├── components/
│   │   ├── admin/          # Komponen dashboard admin (donatur, edukasi, kabar, pages, roles)
│   │   ├── home/           # Section halaman utama
│   │   ├── layout/         # Navbar, TopBar, Footer
│   │   ├── program/        # Komponen halaman program & kalkulator zakat
│   │   └── ui/             # Komponen UI reusable (React & Astro)
│   ├── layouts/            # Layout dasar halaman
│   ├── lib/
│   │   ├── db/             # Drizzle schema, koneksi client, query helpers, migrasi & seed
│   │   ├── auth.ts         # Utilitas autentikasi & RBAC
│   │   ├── constants.ts    # Konfigurasi URL aset S3
│   │   ├── seo-schema.ts   # Generator structured data SEO
│   │   └── storage.ts      # Client upload/akses Object Storage
│   ├── pages/
│   │   ├── admin/          # Halaman dashboard admin (/admin/*)
│   │   ├── api/            # Endpoint API publik & admin (/api/*)
│   │   ├── donatur/        # Portal transparansi donatur (/donatur)
│   │   ├── edukasi/        # Artikel edukasi (/edukasi, /edukasi/[slug])
│   │   ├── kabar/          # Berita & kabar (/kabar, /kabar/[slug])
│   │   ├── kontribusi/     # Form kontribusi (wakaf, infaq, sedekah, zakat)
│   │   ├── program/        # Halaman program (wakaf, infaq, sedekah, zakat, gota-ssm, pembangunan-masjid)
│   │   ├── index.astro     # Beranda
│   │   ├── tentang-kami.astro
│   │   ├── kemitraan.astro
│   │   ├── contact.astro
│   │   └── sitemap.xml.ts
│   ├── middleware.ts       # Middleware request & proteksi sesi
│   └── styles/             # Konfigurasi stylesheet & Tailwind CSS
├── astro.config.mjs        # Konfigurasi Astro & adapter dinamis
├── drizzle.config.ts       # Konfigurasi Drizzle Kit
├── Dockerfile              # Multi-stage Docker build (Node 22 Alpine + pnpm)
├── wrangler.json           # Konfigurasi Cloudflare Pages / Workers
└── package.json
```

---

## Skema Database (`src/lib/db/schema.ts`)

Menggunakan Drizzle ORM dengan dialek PostgreSQL. Tabel utama yang dikelola:

- `admin_users` & `role_definitions`: Akun admin dan kontrol akses berbasis peran (RBAC).
- `pages` & `page_sections`: Manajemen konten halaman dinamis.
- `media_assets`: Metadata aset media yang tersimpan di Object Storage.
- `news_articles`: Artikel kabar dan berita.
- `transparency_reports`: Laporan transparansi dan edukasi.
- `donors`, `donations`, `cash_allocations`: Data donatur, transaksi donasi, dan alokasi penyaluran dana.
- `labels` & `donor_labels`: Tag/label segmentasi donatur.

Untuk sinkronisasi skema dengan Drizzle Kit:

```bash
pnpm drizzle-kit push
```

---

## Variabel Lingkungan

Pastikan variabel berikut tersedia di `.env` (lokal) atau environment deployment:

- **Database**: `DATABASE_URL`, `PG_DATABASE_URL`
- **Keamanan & Sesi**: `ADMIN_SESSION_SECRET`
- **Neon Metadata**: `NEON_PROJECT_ID`, `NEON_PROJECT_NAME`, `NEON_BRANCH_ID`, `NEON_BRANCH_NAME`
- **Object Storage (S3 / MinIO / Neon Storage)**:
  `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `MINIO_BUCKET`, `MINIO_USE_SSL`, `MINIO_PUBLIC_URL`, `MINIO_USE_PATH_STYLE_ENDPOINT`, `NEON_STORAGE_ENDPOINT`, `NEON_STORAGE_BUCKET`, `NEON_STORAGE_PUBLIC_URL`
- **Cloudflare (opsional untuk deploy Pages)**: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`

---

## Deployment

### 1. Docker (Node.js Standalone)

Build dan jalankan container dari direktori `astro-web`:

```bash
docker build -t wakaf-astro-web .
docker run -p 4321:4321 --env-file .env wakaf-astro-web
```

Aplikasi berjalan pada port `4321` (`node ./dist/server/entry.mjs`).

### 2. Cloudflare Pages

```bash
pnpm run deploy:pages
```

Perintah ini membangun aplikasi dengan `CLOUDFLARE=true`, menjalankan `scripts/prepare-pages.mjs`, lalu melakukan deploy ke project Cloudflare Pages `wakaf-astro`.
