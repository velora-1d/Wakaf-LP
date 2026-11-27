import postgres from 'postgres';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PG_DATABASE_URL ||
  DEFAULT_NEON_DATABASE_URL;

const useSsl = connectionString.includes('sslmode=require') || connectionString.includes('neon.tech');

const sql = postgres(connectionString, {
  max: 1,
  connect_timeout: 20,
  ssl: useSsl ? 'require' : false,
});

async function main() {
  console.log('[MIGRATE-REPORT-GALLERY] Menambahkan kolom gallery_images pada tabel transparency_reports...');
  await sql`ALTER TABLE transparency_reports ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb NOT NULL;`;
  console.log('[MIGRATE-REPORT-GALLERY] Kolom gallery_images siap.');
  await sql.end();
}

main().catch((err) => {
  console.error('[MIGRATE-REPORT-GALLERY] Gagal:', err);
  process.exit(1);
});
