// src/lib/db/pages.ts
// Query Database Halaman Statis & Manajemen Seksi Halaman (CMS)

import { db } from './client';
import * as schema from './schema';
import { eq, and, asc } from 'drizzle-orm';

/**
 * Fallback static page list if DB encounters transient network lag
 */
export const STATIC_PAGES_FALLBACK = [
  { id: 1, slug: 'home', title: 'Beranda Utama GVF', description: 'Halaman Utama Global Village Fund', isPublished: true, updatedAt: new Date() },
  { id: 2, slug: 'tentang-kami', title: 'Tentang Kami', description: 'Profil, Sejarah & Ekosistem GVF', isPublished: true, updatedAt: new Date() },
  { id: 3, slug: 'kemitraan', title: 'Kemitraan & Kolaborasi', description: 'Sinergi Strategis CSR & Lembaga', isPublished: true, updatedAt: new Date() },
  { id: 4, slug: 'contact', title: 'Hubungi Kami', description: 'Saluran Komunikasi Resmi GVF', isPublished: true, updatedAt: new Date() },
  { id: 5, slug: 'pembangunan-masjid', title: 'Program Pembangunan Masjid', description: 'Pembangunan Masjid Khairu Ummah Sugro & Fasilitas Ibadah Santri', isPublished: true, updatedAt: new Date() },
  { id: 6, slug: 'gota-ssm', title: 'Program GOTA SSM', description: 'Gerakan Orang Tua Asuh Santri Skill Village Islamic School', isPublished: true, updatedAt: new Date() },
  { id: 7, slug: 'infaq', title: 'Infak (Material Masjid)', description: 'Kontribusi Infak Katalog Material Pembangunan Masjid & Sarana Dakwah', isPublished: true, updatedAt: new Date() },
  { id: 8, slug: 'sedekah', title: 'Sedekah (Dukungan GOTA SSM)', description: 'Kontribusi Sedekah Pangan, Perlengkapan & Pembinaan Santri GOTA SSM', isPublished: true, updatedAt: new Date() },
  { id: 9, slug: 'wakaf', title: 'Wakaf (Objek & Peruntukan)', description: 'Objek dan Peruntukan Wakaf Tanah, Bangunan, Masjid & Produktif', isPublished: true, updatedAt: new Date() },
  { id: 10, slug: 'zakat', title: 'Zakat (Kampanye Ramadan & Idulfitri)', description: 'Kampanye Zakat Fitrah, Fidyah, Zakat Maal & Profesi Asnaf Berkelanjutan', isPublished: true, updatedAt: new Date() },
];

/**
 * Get all pages safely (with fallback)
 */
export async function getAllPages() {
  try {
    const records = await db.select().from(schema.pages).orderBy(schema.pages.id);
    return records.length > 0 ? records : STATIC_PAGES_FALLBACK;
  } catch (error) {
    console.error('[DB-SAFE-FALLBACK] Error fetching all pages:', error);
    return STATIC_PAGES_FALLBACK;
  }
}

/**
 * Get page by slug safely (with fallback)
 */
export async function getPageBySlug(slug: string) {
  try {
    const records = await db.select().from(schema.pages).where(eq(schema.pages.slug, slug)).limit(1);
    if (records.length > 0) return records[0];
    const fallback = STATIC_PAGES_FALLBACK.find((p) => p.slug === slug);
    return fallback || null;
  } catch (error) {
    console.error(`[DB-SAFE-FALLBACK] Error fetching page by slug ${slug}:`, error);
    const fallback = STATIC_PAGES_FALLBACK.find((p) => p.slug === slug);
    return fallback || null;
  }
}

/**
 * Get all sections across all pages safely
 */
export async function getAllSections() {
  try {
    return await db.select().from(schema.pageSections).orderBy(schema.pageSections.sortOrder);
  } catch (error) {
    console.error('[DB-SAFE-FALLBACK] Error fetching all sections:', error);
    return [];
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
