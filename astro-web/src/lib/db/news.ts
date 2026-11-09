// src/lib/db/news.ts
// Query Database Artikel Kabar & Warta GVF

import { db } from './client';
import * as schema from './schema';
import { eq, desc } from 'drizzle-orm';

export async function getActiveNewsArticles(limitCount = 6): Promise<schema.NewsArticle[]> {
  try {
    return await db
      .select()
      .from(schema.newsArticles)
      .where(eq(schema.newsArticles.isPublished, true))
      .orderBy(desc(schema.newsArticles.createdAt))
      .limit(limitCount);
  } catch (error) {
    console.error('[DB] Error fetching active news articles:', error);
    return [];
  }
}

export async function getAllNewsArticles(): Promise<schema.NewsArticle[]> {
  try {
    return await db
      .select()
      .from(schema.newsArticles)
      .orderBy(desc(schema.newsArticles.createdAt));
  } catch (error) {
    console.error('[DB] Error fetching all news articles:', error);
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<schema.NewsArticle | null> {
  try {
    const records = await db
      .select()
      .from(schema.newsArticles)
      .where(eq(schema.newsArticles.slug, slug))
      .limit(1);
    return records.length > 0 ? records[0] : null;
  } catch (error) {
    console.error(`[DB] Error fetching article by slug ${slug}:`, error);
    return null;
  }
}

export async function createNewsArticle(data: schema.NewNewsArticle): Promise<schema.NewsArticle | null> {
  try {
    const inserted = await db
      .insert(schema.newsArticles)
      .values({ ...data, updatedAt: new Date() })
      .returning();
    return inserted[0] || null;
  } catch (error) {
    console.error('[DB] Error creating news article:', error);
    return null;
  }
}

export async function updateNewsArticle(id: number, data: Partial<schema.NewNewsArticle>): Promise<boolean> {
  try {
    await db
      .update(schema.newsArticles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.newsArticles.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error updating news article #${id}:`, error);
    return false;
  }
}

export async function deleteNewsArticle(id: number): Promise<boolean> {
  try {
    await db
      .delete(schema.newsArticles)
      .where(eq(schema.newsArticles.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error deleting news article #${id}:`, error);
    return false;
  }
}

export async function toggleNewsArticlePublish(id: number, isPublished: boolean): Promise<boolean> {
  try {
    await db
      .update(schema.newsArticles)
      .set({ isPublished, updatedAt: new Date() })
      .where(eq(schema.newsArticles.id, id));
    return true;
  } catch (error) {
    console.error(`[DB] Error toggling article #${id}:`, error);
    return false;
  }
}
