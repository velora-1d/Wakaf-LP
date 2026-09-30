# GWAV Light Mode Transformation Implementation Plan

> **For Agent:** REQUIRED SUB-SKILL: Use `executing-plans`, `ui-ux-pro-max`, `design-taste-frontend`, and `antislop` to implement this plan task-by-task.

**Goal:** Transform the Wakaf Garden Mosque Khoiru Ummah (Global Waqf Village) landing page and profile page from dark mode to an organic, high-craft Light Mode calibrated to the official GWAV green brand logo, eliminating all AI slop patterns.

**Architecture:** 
- Porcelain & Sage canvas (`#f4f7f5` / `#ffffff`) replacing dark surfaces.
- Forest Green (`#0c5e37`) and Emerald Accent (`#16a34a`) derived from the official GWAV logo.
- Warm Umber/Gold (`#b45309`) accents for Islamic heritage resonance.
- Deep Slate (`#0f172a` / `#334155`) for WCAG AAA contrast ratio on text.
- Arabic Display Typography (`Amiri`) paired with modern clean sans (`Plus Jakarta Sans`).
- Zero border boxes around the logo header; zero em dashes; zero generic template cards.

**Tech Stack:** HTML5, Modern Vanilla CSS3 Custom Properties (Design Tokens), SVG Icons, Google Fonts (Plus Jakarta Sans, Amiri).

---

## Design Read & Dial Calibration (Antislop Part 3)
- **Design Read:** Waqf & Islamic Educational Institution Landing Page for prospective waqif and community partners, crafted in a prestigious, organic Porcelain & Forest Green aesthetic aligned with the GWAV visual identity.
- **ENERGY Dial: 2 (Balanced)** — Warm, dignified, inviting, and trustworthy; neither cold/sterile nor overly aggressive.
- **RHYTHM Dial: 2 (Consistent with breaks)** — Semantic sections flow naturally: Hero → Value Proposition → Video Theater → 9 Concept Matrix → 4 Strategic Pillars → Centered Passbook & Waqf Action.
- **MOTION Dial: 1 (Calm)** — Subtle 150-250ms CSS micro-transitions on hover/focus, active tactile push (`scale(0.98)`), no distracting infinite looping motion.

---

## Design Tokens Specification (Light Mode)

```css
:root {
  /* Brand Palette (Aligned with GWAV Official Logo) */
  --sv-brand-green: #0c5e37;        /* Primary GWAV Islamic Forest Green */
  --sv-brand-green-hover: #084327;  /* Deep hover state */
  --sv-brand-emerald: #16a34a;      /* Lively meadow accent */
  --sv-brand-amber: #b45309;        /* Warm heritage gold/amber */
  
  /* Background & Surface System */
  --sv-bg-canvas: #f4f7f5;          /* Organic porcelain / subtle sage tint */
  --sv-bg-surface: #ffffff;         /* Pure crisp white card surface */
  --sv-bg-surface-alt: #e9f0ec;     /* Subtle container tint */
  --sv-border-subtle: #dbe4de;      /* Refined 1px card/divider border */
  --sv-border-focus: #0c5e37;       /* Keyboard accessibility focus ring */

  /* Text & Typography Hierarchy */
  --sv-text-primary: #0f172a;       /* Slate 900: High-contrast headline & body */
  --sv-text-secondary: #334155;     /* Slate 700: Subtitles and descriptive text */
  --sv-text-muted: #64748b;         /* Slate 500: Metadata and small notes */
  --sv-text-arabic: #0c5e37;        /* Distinct Islamic green for Arabic script */

  /* Elevation & Shadow System */
  --sv-shadow-card: 0 4px 20px -4px rgba(12, 94, 55, 0.06), 0 2px 8px -2px rgba(15, 23, 42, 0.04);
  --sv-shadow-elevated: 0 12px 32px -6px rgba(12, 94, 55, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06);
}
```

---

## Tasks Breakdown

### Task 1: Complete Header & Logo Integration in `index.html`
**Files:**
- Modify: `index.html` (header logo section)

- **Step 1:** Ensure logo is displayed borderless without any badge card or wrapper border (`.sv-logo-badge` removed, logo rendered cleanly with transparent alpha directly onto the hero container).
- **Step 2:** Ensure logo image points to official GWAV asset with proper `clamp()` sizing (`width: clamp(280px, 48vw, 380px)`).
- **Step 3:** Render full authentic Arabic greeting (*Assalāmu 'alaikum warahmatullāhi wabarakātuh*) using font `Amiri` with semantic `<p lang="ar" dir="rtl">`.

### Task 2: Refine Card Rhythm, Badges & Typography Hierarchy in `index.html`
**Files:**
- Modify: `index.html` (CSS tokens and component styles)

- **Step 1:** Audit all card backgrounds, borders, and shadows to ensure WCAG AA contrast (minimum 4.5:1 ratio).
- **Step 2:** Ensure the 9 concept cards and 4 pillars use semantic SVG icons and clean, non-clashing borders (`border: 1px solid var(--sv-border-subtle)`).
- **Step 3:** Verify passbook bank section is cleanly centered with proper button targets (min 44px) and copy-to-clipboard feedback.

### Task 3: Synchronize Light Mode Theme to `profil-skill-village-islamic-school.html`
**Files:**
- Modify: `profil-skill-village-islamic-school.html`

- **Step 1:** Replace CSS tokens and styles to match the identical porcelain/forest-green system from `index.html`.
- **Step 2:** Update SVG background ornament strokes and colors from dark mode gold/purple to light mode Islamic green (`#0c5e37` / `#16a34a`).
- **Step 3:** Ensure responsive layout consistency and keyboard focus rings.

### Task 4: Antislop Quality Gate Audit & Verification
**Files:**
- Verify: `index.html` and `profil-skill-village-islamic-school.html`

- **Step 1:** Check for any forbidden em dashes (`—`) across all text copy (R-02).
- **Step 2:** Verify zero dead buttons or broken anchor links (R-24, R-26).
- **Step 3:** Verify mobile responsiveness at 375px, 768px, 1024px without horizontal overflow (R-03).
- **Step 4:** Run local build (`pnpm run build`) and test in browser (`http://localhost:5173/`).

---

## Execution Handoff
Once approved by user, execute each task cleanly using official IDE tools, build test, and commit locally.
