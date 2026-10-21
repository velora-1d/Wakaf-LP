import postgres from 'postgres';
import { programsData } from '../../data/programs';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 15,
  ssl: false,
});

async function syncPackages() {
  console.log('[SYNC-PACKAGES] Memulai sinkronisasi paket dinamis ke database PostgreSQL...');

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

  console.log('[SYNC-PACKAGES] Sukses! Seluruh paket dan poin deliverables untuk 4 program telah tersimpan di PostgreSQL.');
  await sql.end();
}

syncPackages().catch((err) => {
  console.error('[SYNC-PACKAGES] Error saat sinkronisasi:', err);
  process.exit(1);
});
