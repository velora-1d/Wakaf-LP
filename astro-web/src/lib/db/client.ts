// src/lib/db/client.ts
// Inisialisasi Koneksi Neon Serverless HTTP & Drizzle ORM

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://gvf_owner:npg_1m5lHgGejuAt@ep-flat-bread-aoom3zoi-pooler.c-2.ap-southeast-1.aws.neon.tech/gvf?channel_binding=require&sslmode=require';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  DEFAULT_NEON_DATABASE_URL;

// Neon Serverless HTTP client (stateless HTTPS queries, no TCP socket timeouts on Cloudflare)
export const client = neon(connectionString);
export const db = drizzle(client, { schema });

/**
 * Test database connectivity
 */
export async function testConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const result = await client`SELECT 1 as connected`;
    if (result && result.length > 0) {
      return { success: true, message: 'Koneksi PostgreSQL GVF aktif dan normal.' };
    }
    return { success: false, message: 'Tidak ada respons dari PostgreSQL.' };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Gagal tersambung ke PostgreSQL.' };
  }
}
