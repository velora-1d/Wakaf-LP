import { pgTable, serial, varchar, text, boolean, integer, bigint, jsonb, timestamp } from 'drizzle-orm/pg-core';

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

export const newsArticles = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  coverImage: text('cover_image').notNull(),
  author: varchar('author', { length: 100 }).default('Tim GVF').notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  publishedAt: varchar('published_at', { length: 50 }).default('2026-07-18').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;

export type PageSection = typeof pageSections.$inferSelect;
export type NewPageSection = typeof pageSections.$inferInsert;

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type NewMediaAsset = typeof mediaAssets.$inferInsert;

export type NewsArticle = typeof newsArticles.$inferSelect;
export type NewNewsArticle = typeof newsArticles.$inferInsert;

export const donors = pgTable('donors', {
  id: serial('id').primaryKey(),
  namaLengkap: varchar('nama_lengkap', { length: 255 }).notNull(),
  namaTampilan: varchar('nama_tampilan', { length: 255 }).default('Hamba Allah'),
  tipeDonatur: varchar('tipe_donatur', { length: 50 }).default('individu').notNull(),
  noWhatsapp: varchar('no_whatsapp', { length: 30 }).notNull().unique(),
  email: varchar('email', { length: 150 }),
  kotaDomisili: varchar('kota_domisili', { length: 100 }),
  totalDonasiAkumulasi: bigint('total_donasi_akumulasi', { mode: 'number' }).default(0),
  frekuensiDonasi: integer('frekuensi_donasi').default(0),
  catatanAdmin: text('catatan_admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
  kodeTransaksi: varchar('kode_transaksi', { length: 50 }).notNull().unique(),
  donorId: integer('donor_id').references(() => donors.id).notNull(),
  programTujuan: varchar('program_tujuan', { length: 100 }).notNull(),
  nominal: bigint('nominal', { mode: 'number' }).notNull(),
  kodeUnik: integer('kode_unik').default(0),
  nominalTotal: bigint('nominal_total', { mode: 'number' }).notNull(),
  akadPeruntukan: varchar('akad_peruntukan', { length: 100 }).default('Wakaf Muabbad (Abadi)'),
  atasNamaNiat: varchar('atas_nama_niat', { length: 255 }),
  doaDonatur: text('doa_donatur'),
  metodePembayaran: varchar('metode_pembayaran', { length: 50 }).default('BSI Transfer').notNull(),
  buktiTransferUrl: text('bukti_transfer_url'),
  statusPembayaran: varchar('status_pembayaran', { length: 30 }).default('menunggu_verifikasi').notNull(),
  verifiedBy: varchar('verified_by', { length: 100 }),
  verifiedAt: timestamp('verified_at'),
  sumberLeads: varchar('sumber_leads', { length: 50 }).default('relasi_langsung').notNull(),
  campaignUtm: varchar('campaign_utm', { length: 150 }),
  catatanTransaksi: text('catatan_transaksi'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Donor = typeof donors.$inferSelect;
export type NewDonor = typeof donors.$inferInsert;

export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;

export const cashAllocations = pgTable('cash_allocations', {
  id: serial('id').primaryKey(),
  kodeTransaksi: varchar('kode_transaksi', { length: 50 }).notNull().unique(),
  program: varchar('program', { length: 30 }).notNull(), // 'wakaf', 'infaq', 'sedekah', 'zakat'
  posAnggaran: varchar('pos_anggaran', { length: 100 }).notNull(),
  uraian: text('uraian').notNull(),
  jenisTransaksi: varchar('jenis_transaksi', { length: 20 }).notNull(), // 'debit' | 'kredit'
  nominal: bigint('nominal', { mode: 'number' }).notNull(),
  buktiNotaUrl: text('bukti_nota_url'),
  pic: varchar('pic', { length: 100 }).default('Amil Lapangan GVF'),
  tanggalTransaksi: timestamp('tanggal_transaksi').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type CashAllocation = typeof cashAllocations.$inferSelect;
export type NewCashAllocation = typeof cashAllocations.$inferInsert;

