<!-- codebase-memory-mcp:start -->
# Codebase Memory

## Codebase Knowledge Graph (codebase-memory-mcp)
This project uses codebase-memory-mcp to maintain a knowledge graph of the codebase.
ALWAYS prefer MCP graph tools over grep/glob/file-search for code discovery.

### Priority Order
1. `search_graph` — Temukan fungsi, kelas, rute, variabel berdasarkan pola.
2. `trace_path` — Lacak pemanggil fungsi atau alur yang dipanggilnya.
3. `get_code_snippet` — Baca kode sumber fungsi/kelas secara spesifik.
4. `check_index_coverage` — Validasi cakupan index dan jalur kode.
5. `query_graph` — Jalankan Cypher query untuk relasi kompleks.
6. `get_architecture` — Ringkasan arsitektur proyek tingkat tinggi.
<!-- codebase-memory-mcp:end -->

---

# MANDATORY ACTIVE COMPONENTS REGISTRY
Semua agent (Antigravity, Claude Code, Codex, OpenCode) wajib mengaktifkan dan mematuhi komponen inti berikut:

1. **ponytail** — Otomatisasi deteksi perubahan skema basis data, sinkronisasi model, dan migrasi inkremental yang aman.
2. **caveman** — Perlindungan integritas sandbox, pencadangan instan, dan pemulihan cepat status data.
3. **codegraph** — Pemetaan relasi dependensi kode dan struktur skema secara terstruktur.
4. **serena** — Validasi tipe data dan compiler LSP otomatis (TypeScript, Astro, Go, Python).
5. **contextmode & headroom** — Sinkronisasi konteks multi-agent real-time dan alokasi efisiensi token respons.
6. **rtk** — Utilitas integrasi Redux Toolkit dan sinkronisasi state klien.
7. **delphitools (`dt`)** — Toolkit offline untuk optimasi SVG, manipulasi gambar, favicon, dan konversi warna.
8. **skills & mcp** — Pemuat kemampuan custom agent dan eksekutor Model Context Protocol terintegrasi.

---

# FRONTEND DESIGN, AESTHETICS & ANTI-SLOP SYSTEM

### 1. Impeccable (`impeccable`)
- **Peran**: Direktur desain frontend, audit craft-floor, detektor visual otomatis, dan penghalus antarmuka produksi.
- **Workflow**: Jalankan audit teknis (`a11y`, performa, theming, responsivitas) dan detektor antipattern sebelum merilis UI.

### 2. Anti-Slop AI (`antislop`)
- **Peran**: Filter pencegahan pola desain AI generik (aturan R-01 s/d R-38).
- **Ketentuan**:
  - Dilarang layout template klise (hero tengah default + 3 kartu seragam).
  - Dilarang teks heading dengan gradient warna AI.
  - Dilarang efek neon glow dan border glassmorphism tanpa fungsi nyata.
  - Dilarang menggunakan font overused (Inter, Roboto, Geist) secara refleks tanpa konteks brand.

### 3. Humanize-UI (`humanize-ui`)
- **Peran**: Menghadirkan cita rasa desain humanis melalui kurasi komponen teruji.
- **Workflow**:
  1. *Inspect*: Periksa token desain, tipografi, dan warna lokal sebelum mencari komponen.
  2. *Scout*: Telusuri sumber terkurasi (*Beautiful UI*, *beUI*, *Rare UI*, *Transitions.dev*, *shadcn/ui*).
  3. *Adapt*: Sesuaikan komponen ke bahasa desain lokal tanpa membawa dependensi berlebih.

### 4. UI/UX Pro Max (`ui-ux-pro-max`)
- **Peran**: Standar tata letak antarmuka konversi tinggi, hierarki visual tajam, ritme ruang mikro, dan aksesibilitas ramah pengguna.
- **Standar**: Setiap elemen interaktif memiliki target sentuh minimal 44x44px, status fokus jelas, dan tipografi berjenjang tegas.

### 5. Taste Skills (`taste-skill` / `design-taste-frontend`, `gpt-taste`, `stitch-design-taste`)
- **Sumber Resmi**: `https://github.com/Leonxlnx/taste-skill` (Tasteskill v2 Anti-Slop Frontend).
- **Peran**: Art direction tingkat tinggi hasil distilasi 247 situs galeri kurasi (Awwwards, One Page Love). Menyediakan komposisi unik, tipografi display lebar, grid bento tanpa celah/gapless, dan blueprint section berkarakter.
- **Inspeksi Look-and-Fix**: Evaluasi visual berbasis tangkapan layar browser asli untuk mengeliminasi kesan template dan AI-generated.
- **Prinsip**: Animasi hanya pada `transform` dan `opacity` (hindari animating layout width/height/margin), transisi taktil 120-240ms, kurva easing decisif `cubic-bezier(.2, .8, .2, 1)`.

---

# PROJECT-SPECIFIC DESIGN RULES (WAKAF-LP / GVF)
- **Desain Rujukan**: Standar estetika ISAVO (`isavo.co.id`) arsitektural elegan dan bernilai filantropi tinggi.
- **Tipografi Resmi**: Wajib menggunakan font **Golos Text** sebagai display dan body utama.
- **Warna Identitas**: Warna biru royal arsitektural (`#0969da` / `#0752a8`), kanvas sekunder `#f7f7f8`, kanvas gelap `#0f172a` / `#111827`. Dilarang keras menggunakan warna ungu.
- **Strictly No Emojis**: Dilarang keras menggunakan emoji di seluruh UI/UX, dokumentasi, dan pesan sistem. Wajib gunakan **Lucide SVG Icons**.
- **Package Manager**: Wajib menggunakan `pnpm` untuk seluruh instalasi dan eksekusi script.
- **Siklus Task**: Wajib tercatat dan berurutan melalui Kanban (`kanban/`) dan Beads (`.beads`).
