import { neon } from '@neondatabase/serverless';
import { programsData } from '../../data/programs';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  DEFAULT_NEON_DATABASE_URL;

const sql = neon(connectionString);

async function syncPackages() {
  console.log('[SYNC-PACKAGES] Memulai sinkronisasi paket dinamis ke database Neon PostgreSQL...');

  const slugs = ['wakaf', 'infaq', 'sedekah', 'zakat'];

  for (const slug of slugs) {
    const prog = programsData[slug];
    if (!prog) continue;

    const content = {
      heading: prog.pricingHeading,
      subheading: prog.pricingSubheading,
      packages: prog.packages,
    };

    const contentJson = JSON.stringify(content);

    console.log(`[SYNC-PACKAGES] Menyimpan paket dinamis untuk program: ${prog.slug} (${prog.packages.length} paket)...`);

    await sql`
      INSERT INTO page_sections (page_slug, section_key, title, is_enabled, sort_order, content, updated_at)
      VALUES (
        ${prog.slug},
        'prog_pricing',
        ${'Pilihan Paket ' + prog.slug.toUpperCase()},
        true,
        2,
        ${contentJson}::jsonb,
        NOW()
      )
      ON CONFLICT (page_slug, section_key)
      DO UPDATE SET
        content = ${contentJson}::jsonb,
        updated_at = NOW();
    `;
  }

  console.log('[SYNC-PACKAGES] Sukses! Seluruh paket dan poin deliverables untuk 4 program telah tersimpan di Neon PostgreSQL.');
}

syncPackages().catch((err) => {
  console.error('[SYNC-PACKAGES] Error saat sinkronisasi:', err);
  process.exit(1);
});
