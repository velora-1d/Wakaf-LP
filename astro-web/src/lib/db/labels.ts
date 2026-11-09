// src/lib/db/labels.ts
// Manajemen Label & Kategori Donatur (CRUD & Relasi)

import { db } from './client';
import * as schema from './schema';
import { eq, asc, sql } from 'drizzle-orm';

export interface LabelWithCount extends schema.Label {
  donorCount: number;
}

export async function getAllLabels(): Promise<LabelWithCount[]> {
  try {
    const allLabels = await db
      .select()
      .from(schema.labels)
      .orderBy(asc(schema.labels.nama));

    const counts = await db
      .select({
        labelId: schema.donorLabels.labelId,
        count: sql<number>`count(*)::int`,
      })
      .from(schema.donorLabels)
      .groupBy(schema.donorLabels.labelId);

    const countMap = new Map<number, number>();
    counts.forEach((c) => countMap.set(c.labelId, c.count));

    return allLabels.map((l) => ({
      ...l,
      donorCount: countMap.get(l.id) || 0,
    }));
  } catch (error) {
    console.error('[DB] Error fetching all labels:', error);
    return [];
  }
}

export async function createLabel(data: {
  nama: string;
  warna?: string;
  deskripsi?: string;
}): Promise<schema.Label | null> {
  try {
    const inserted = await db
      .insert(schema.labels)
      .values({
        nama: data.nama.trim(),
        warna: (data.warna || 'blue').trim().toLowerCase(),
        deskripsi: data.deskripsi?.trim() || null,
        updatedAt: new Date(),
      })
      .returning();
    return inserted[0] || null;
  } catch (error) {
    console.error('[DB] Error creating label:', error);
    return null;
  }
}

export async function updateLabel(
  id: number,
  data: { nama: string; warna?: string; deskripsi?: string }
): Promise<boolean> {
  try {
    await db
      .update(schema.labels)
      .set({
        nama: data.nama.trim(),
        warna: (data.warna || 'blue').trim().toLowerCase(),
        deskripsi: data.deskripsi?.trim() || null,
        updatedAt: new Date(),
      })
      .where(eq(schema.labels.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error updating label #${id}:`, error);
    return false;
  }
}

export async function deleteLabel(id: number): Promise<boolean> {
  try {
    await db.delete(schema.labels).where(eq(schema.labels.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error deleting label #${id}:`, error);
    return false;
  }
}

export async function setDonorLabels(donorId: number, labelIds: number[]): Promise<boolean> {
  try {
    await db.delete(schema.donorLabels).where(eq(schema.donorLabels.donorId, donorId));
    if (labelIds && labelIds.length > 0) {
      const uniqueIds = Array.from(new Set(labelIds));
      await db.insert(schema.donorLabels).values(
        uniqueIds.map((lid) => ({
          donorId,
          labelId: lid,
        }))
      );
    }
    return true;
  } catch (error) {
    console.error(`[DB] Error setting labels for donor #${donorId}:`, error);
    return false;
  }
}
