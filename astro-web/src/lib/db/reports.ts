// src/lib/db/reports.ts
// Query Database Dokumen Laporan Berkala & Transparansi GVF

import { db } from './client';
import * as schema from './schema';
import { eq, desc } from 'drizzle-orm';

export async function getActiveTransparencyReports(limitCount = 50): Promise<schema.TransparencyReport[]> {
  try {
    return await db
      .select()
      .from(schema.transparencyReports)
      .where(eq(schema.transparencyReports.isPublished, true))
      .orderBy(desc(schema.transparencyReports.createdAt))
      .limit(limitCount);
  } catch (error) {
    console.error('[DB] Error fetching active transparency reports:', error);
    return [];
  }
}

export async function getAllTransparencyReports(): Promise<schema.TransparencyReport[]> {
  try {
    return await db
      .select()
      .from(schema.transparencyReports)
      .orderBy(desc(schema.transparencyReports.createdAt));
  } catch (error) {
    console.error('[DB] Error fetching all transparency reports:', error);
    return [];
  }
}

export async function createTransparencyReport(
  data: schema.NewTransparencyReport
): Promise<schema.TransparencyReport | null> {
  try {
    const inserted = await db
      .insert(schema.transparencyReports)
      .values({ ...data, updatedAt: new Date() })
      .returning();
    return inserted[0] || null;
  } catch (error) {
    console.error('[DB] Error creating transparency report:', error);
    return null;
  }
}

export async function updateTransparencyReport(
  id: number,
  data: Partial<schema.NewTransparencyReport>
): Promise<boolean> {
  try {
    await db
      .update(schema.transparencyReports)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.transparencyReports.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error updating transparency report #${id}:`, error);
    return false;
  }
}

export async function deleteTransparencyReport(id: number): Promise<boolean> {
  try {
    await db
      .delete(schema.transparencyReports)
      .where(eq(schema.transparencyReports.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error deleting transparency report #${id}:`, error);
    return false;
  }
}

export async function toggleTransparencyReportPublish(id: number, isPublished: boolean): Promise<boolean> {
  try {
    await db
      .update(schema.transparencyReports)
      .set({ isPublished, updatedAt: new Date() })
      .where(eq(schema.transparencyReports.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error toggling transparency report #${id}:`, error);
    return false;
  }
}
