import { pgTable, serial, varchar, text, boolean, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).default('Administrator GVF'),
  role: varchar('role', { length: 50 }).default('superadmin').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  isPublished: boolean('is_published').default(true).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pageSections = pgTable('page_sections', {
  id: serial('id').primaryKey(),
  pageSlug: varchar('page_slug', { length: 100 }).notNull(),
  sectionKey: varchar('section_key', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  isEnabled: boolean('is_enabled').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  content: jsonb('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const mediaAssets = pgTable('media_assets', {
  id: serial('id').primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  url: text('url').notNull(),
  mimeType: varchar('mime_type', { length: 100 }),
  fileSize: integer('file_size'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;

export type PageSection = typeof pageSections.$inferSelect;
export type NewPageSection = typeof pageSections.$inferInsert;

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type NewMediaAsset = typeof mediaAssets.$inferInsert;
