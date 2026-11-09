import postgres from 'postgres';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PG_DATABASE_URL ||
  DEFAULT_NEON_DATABASE_URL;

const sql = postgres(connectionString);

async function main() {
  console.log('Migrating admin_users permissions column...');
  await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS permissions JSONB;`;
  
  const allMenus = [
    'overview',
    'kabar',
    'donatur',
    'roles',
    'home',
    'tentang-kami',
    'kemitraan',
    'contact',
    'wakaf',
    'infaq',
    'sedekah',
    'zakat'
  ];

  await sql`
    UPDATE admin_users
    SET permissions = ${JSON.stringify(allMenus)}::jsonb
    WHERE permissions IS NULL;
  `;

  // Create roles table or prefill standard roles if needed
  await sql`
    CREATE TABLE IF NOT EXISTS role_definitions (
      role_key VARCHAR(50) PRIMARY KEY,
      role_name VARCHAR(100) NOT NULL,
      description TEXT,
      permissions JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;

  // Seed standard preset roles
  await sql`
    INSERT INTO role_definitions (role_key, role_name, description, permissions)
    VALUES 
      ('superadmin', 'Super Administrator', 'Akses penuh tanpa batas ke seluruh modul dan pengaturan sistem.', ${JSON.stringify(allMenus)}::jsonb),
      ('bendahara', 'Pengelola Keuangan & Donatur', 'Akses ke manajemen penerimaan donasi, data donatur, dan arus kas.', ${JSON.stringify(['overview', 'donatur'])}::jsonb),
      ('editor_konten', 'Editor Kabar & Konten CMS', 'Akses ke penulisan artikel kabar warta dan kelola konten halaman landing.', ${JSON.stringify(['overview', 'kabar', 'home', 'tentang-kami', 'kemitraan', 'contact', 'wakaf', 'infaq', 'sedekah', 'zakat'])}::jsonb),
      ('staf_lapangan', 'Staf Program & Lapangan', 'Akses terbatas untuk monitoring donatur dan pelaporan kegiatan.', ${JSON.stringify(['overview', 'donatur', 'kabar'])}::jsonb)
    ON CONFLICT (role_key) DO UPDATE
    SET role_name = EXCLUDED.role_name,
        description = EXCLUDED.description,
        permissions = EXCLUDED.permissions,
        updated_at = CURRENT_TIMESTAMP;
  `;

  const users = await sql`SELECT id, username, name, role, permissions FROM admin_users;`;
  console.log('Users in database:', users);

  const roles = await sql`SELECT * FROM role_definitions;`;
  console.log('Roles in database:', roles);

  process.exit(0);
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
