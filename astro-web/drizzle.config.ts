import { defineConfig } from 'drizzle-kit';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || DEFAULT_NEON_DATABASE_URL,
  },
});
