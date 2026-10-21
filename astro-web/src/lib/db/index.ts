import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { eq, and, asc } from 'drizzle-orm';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

// Postgres connection with pooling and timeout controls
export const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: false,
});

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

/**
 * Safely get active (enabled) sections for public frontend rendering
 */
export async function getActivePageSections(pageSlug: string): Promise<schema.PageSection[]> {
  try {
    const sections = await db
      .select()
      .from(schema.pageSections)
      .where(
        and(
          eq(schema.pageSections.pageSlug, pageSlug),
          eq(schema.pageSections.isEnabled, true)
        )
      )
      .orderBy(asc(schema.pageSections.sortOrder));
    return sections;
  } catch (error) {
    console.error(`[DB-SAFE-FALLBACK] Error fetching active sections for ${pageSlug}:`, error);
    return [];
  }
}

/**
 * Get all sections for a page (for Admin CMS management)
 */
export async function getAllPageSections(pageSlug: string): Promise<schema.PageSection[]> {
  try {
    const sections = await db
      .select()
      .from(schema.pageSections)
      .where(eq(schema.pageSections.pageSlug, pageSlug))
      .orderBy(asc(schema.pageSections.sortOrder));
    return sections;
  } catch (error) {
    console.error(`[DB] Error fetching all sections for ${pageSlug}:`, error);
    return [];
  }
}

/**
 * Toggle section visibility (on/off)
 */
export async function toggleSectionVisibility(id: number, isEnabled: boolean): Promise<boolean> {
  try {
    await db
      .update(schema.pageSections)
      .set({ isEnabled, updatedAt: new Date() })
      .where(eq(schema.pageSections.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error toggling section visibility #${id}:`, error);
    return false;
  }
}

/**
 * Update section JSON content & title
 */
export async function updateSectionData(
  id: number,
  data: { title?: string; content?: any; sortOrder?: number; isEnabled?: boolean }
): Promise<boolean> {
  try {
    const updatePayload: any = { updatedAt: new Date() };
    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.content !== undefined) updatePayload.content = data.content;
    if (data.sortOrder !== undefined) updatePayload.sortOrder = data.sortOrder;
    if (data.isEnabled !== undefined) updatePayload.isEnabled = data.isEnabled;

    await db
      .update(schema.pageSections)
      .set(updatePayload)
      .where(eq(schema.pageSections.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error updating section data #${id}:`, error);
    return false;
  }
}
