# Filantrofi: Ekosistem Kebaikan & Wakaf

Ruang kerja utama **Filantrofi** yang mengintegrasikan aplikasi web berbasis **Astro** dan aplikasi mobile berbasis **React Native**, disertai dokumentasi riset arsitektur.

---

## Struktur Folder Utama

```
filantrofi/
├── README.md                 # Dokumentasi umum ruang kerja Filantrofi
├── reverse/                  # Riset & reverse engineering referensi amalsholeh.com
│   └── ANALYSIS.md           # Analisis teknis SvelteKit, Caddy, alur donasi & skema
├── website/                  # Platform Web Filantrofi (Astro)
│   ├── package.json          # Astro 5+, React, Tailwind CSS
│   ├── astro.config.mjs      # Konfigurasi Astro
│   ├── tsconfig.json         # Konfigurasi TypeScript
│   └── src/
│       ├── layouts/Layout.astro
│       ├── components/Navbar.astro
│       ├── components/CampaignCard.astro
│       └── pages/index.astro
└── mobile/                   # Aplikasi Mobile Filantrofi (React Native)
    ├── package.json          # React Native, TypeScript, Lucide React Native
    ├── app.json              # Manifest aplikasi mobile
    ├── tsconfig.json         # Konfigurasi TypeScript
    ├── index.js              # Entry point runtime React Native
    └── src/
        ├── App.tsx           # Root component
        ├── theme/colors.ts   # Palet warna Royal Blue (#0969da), Anti-Slop
        ├── types/campaign.ts # Tipe data program & kategori
        ├── components/CampaignCard.tsx
        └── screens/HomeScreen.tsx
```

---

## Standar Desain & Arsitektur

* **Web**: Astro dengan performa tinggi, Server-Side Rendering / Static Generation, font resmi **Golos Text**, dan arsitektur modular.
* **Mobile**: React Native cross-platform (Android & iOS) dengan komponen native touch-first.
* **Desain Sistem**: Warna utama Biru Royal Arsitektural (`#0969da`), kanvas bersih `#f8fafc`, kanvas gelap `#0f172a`, ikonografi Lucide resmi tanpa emoji, dan bebas dari warna ungu.
