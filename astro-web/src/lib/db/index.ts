import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { eq, and, asc, desc } from 'drizzle-orm';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.PG_DATABASE_URL || 
  'postgresql://DB-PGbase:OjRqOooKEny2kXMSSqIk@100.77.202.57:5433/gvf?application_name=pgbase&sslmode=disable';

// Postgres connection with pooling and timeout controls (optimized for Tailscale VPN)
export const client = postgres(connectionString, {
  max: 8,
  idle_timeout: 10,
  connect_timeout: 5,
  prepare: false, // critical for remote Tailscale VPN to avoid prepared statement stale errors
  ssl: false,
});

export const db = drizzle(client, { schema });

/**
 * Fallback static page list if DB encounters transient Tailscale network lag
 */
export const STATIC_PAGES_FALLBACK = [
  { id: 1, slug: 'home', title: 'Beranda Utama GVF', description: 'Halaman Utama Global Village Fund', isPublished: true, updatedAt: new Date() },
  { id: 2, slug: 'tentang-kami', title: 'Tentang Kami', description: 'Profil, Sejarah & Ekosistem GVF', isPublished: true, updatedAt: new Date() },
  { id: 3, slug: 'kemitraan', title: 'Kemitraan & Kolaborasi', description: 'Sinergi Strategis CSR & Lembaga', isPublished: true, updatedAt: new Date() },
  { id: 4, slug: 'contact', title: 'Hubungi Kami', description: 'Saluran Komunikasi Resmi GVF', isPublished: true, updatedAt: new Date() },
  { id: 5, slug: 'wakaf', title: 'Program Wakaf Produktif', description: 'Pembangunan Garden Mosque & Pesantren', isPublished: true, updatedAt: new Date() },
  { id: 6, slug: 'infaq', title: 'Program Infaq Pemberdayaan', description: 'Dukungan Sarana & Operasional Santri', isPublished: true, updatedAt: new Date() },
  { id: 7, slug: 'sedekah', title: 'Program Sedekah & Nutrisi', description: 'Sedekah Pangan Santri Vokasi', isPublished: true, updatedAt: new Date() },
  { id: 8, slug: 'zakat', title: 'Program Zakat Maal & Fitrah', description: 'Penyaluran Zakat Asnaf Berkelanjutan', isPublished: true, updatedAt: new Date() },
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

/**
 * NEWS ARTICLES (KABAR & WARTA) QUERIES
 */

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

export type DonationWithDonor = schema.Donation & {
  donor: schema.Donor;
};

export async function getAllDonationsWithDonors(): Promise<DonationWithDonor[]> {
  try {
    const rows = await db
      .select({
        donation: schema.donations,
        donor: schema.donors,
      })
      .from(schema.donations)
      .innerJoin(schema.donors, eq(schema.donations.donorId, schema.donors.id))
      .orderBy(desc(schema.donations.createdAt));

    return rows.map((r) => ({
      ...r.donation,
      donor: r.donor,
    }));
  } catch (error) {
    console.error('[DB] Error fetching all donations with donors:', error);
    return [];
  }
}

export async function getAllDonors(): Promise<schema.Donor[]> {
  try {
    return await db
      .select()
      .from(schema.donors)
      .orderBy(desc(schema.donors.totalDonasiAkumulasi));
  } catch (error) {
    console.error('[DB] Error fetching donors list:', error);
    return [];
  }
}

export async function findOrCreateDonor(data: {
  namaLengkap: string;
  namaTampilan?: string;
  tipeDonatur?: string;
  noWhatsapp: string;
  email?: string;
  kotaDomisili?: string;
  catatanAdmin?: string;
}): Promise<schema.Donor | null> {
  try {
    const existing = await db
      .select()
      .from(schema.donors)
      .where(eq(schema.donors.noWhatsapp, data.noWhatsapp))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    const inserted = await db
      .insert(schema.donors)
      .values({
        namaLengkap: data.namaLengkap,
        namaTampilan: data.namaTampilan || 'Hamba Allah',
        tipeDonatur: data.tipeDonatur || 'individu',
        noWhatsapp: data.noWhatsapp,
        email: data.email || null,
        kotaDomisili: data.kotaDomisili || null,
        catatanAdmin: data.catatanAdmin || null,
        totalDonasiAkumulasi: 0,
        frekuensiDonasi: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return inserted[0] || null;
  } catch (error) {
    console.error('[DB] Error finding or creating donor:', error);
    return null;
  }
}

export async function createDonationWithDonor(params: {
  namaLengkap: string;
  namaTampilan?: string;
  tipeDonatur?: string;
  noWhatsapp: string;
  email?: string;
  kotaDomisili?: string;
  programTujuan: string;
  nominal: number;
  kodeUnik?: number;
  akadPeruntukan?: string;
  atasNamaNiat?: string;
  doaDonatur?: string;
  metodePembayaran?: string;
  buktiTransferUrl?: string;
  statusPembayaran?: string;
  sumberLeads?: string;
  campaignUtm?: string;
  catatanTransaksi?: string;
  verifiedBy?: string;
}): Promise<schema.Donation | null> {
  try {
    const donor = await findOrCreateDonor({
      namaLengkap: params.namaLengkap,
      namaTampilan: params.namaTampilan,
      tipeDonatur: params.tipeDonatur,
      noWhatsapp: params.noWhatsapp,
      email: params.email,
      kotaDomisili: params.kotaDomisili,
    });

    if (!donor) throw new Error('Gagal memproses profil donatur');

    const timestampCode = Date.now().toString().slice(-6);
    const kodeTransaksi = `GVF-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${timestampCode}`;
    const kodeUnik = params.kodeUnik || 0;
    const nominalTotal = params.nominal + kodeUnik;
    const isLunas = params.statusPembayaran === 'lunas';

    const insertedDonation = await db
      .insert(schema.donations)
      .values({
        kodeTransaksi,
        donorId: donor.id,
        programTujuan: params.programTujuan,
        nominal: params.nominal,
        kodeUnik,
        nominalTotal,
        akadPeruntukan: params.akadPeruntukan || 'Wakaf Muabbad (Abadi)',
        atasNamaNiat: params.atasNamaNiat || null,
        doaDonatur: params.doaDonatur || null,
        metodePembayaran: params.metodePembayaran || 'BSI Transfer',
        buktiTransferUrl: params.buktiTransferUrl || null,
        statusPembayaran: params.statusPembayaran || 'menunggu_verifikasi',
        verifiedBy: isLunas ? (params.verifiedBy || 'Admin GVF') : null,
        verifiedAt: isLunas ? new Date() : null,
        sumberLeads: params.sumberLeads || 'relasi_langsung',
        campaignUtm: params.campaignUtm || null,
        catatanTransaksi: params.catatanTransaksi || null,
        createdAt: new Date(),
      })
      .returning();

    if (isLunas) {
      await db
        .update(schema.donors)
        .set({
          totalDonasiAkumulasi: (donor.totalDonasiAkumulasi || 0) + nominalTotal,
          frekuensiDonasi: (donor.frekuensiDonasi || 0) + 1,
          updatedAt: new Date(),
        })
        .where(eq(schema.donors.id, donor.id));
    }

    return insertedDonation[0] || null;
  } catch (error) {
    console.error('[DB] Error creating donation with donor:', error);
    return null;
  }
}

export async function verifyDonationStatus(
  donationId: number,
  status: 'lunas' | 'menunggu_verifikasi' | 'dibatalkan',
  adminName: string
): Promise<boolean> {
  try {
    const existing = await db
      .select()
      .from(schema.donations)
      .where(eq(schema.donations.id, donationId))
      .limit(1);

    if (existing.length === 0) return false;
    const donation = existing[0];
    const prevStatus = donation.statusPembayaran;

    await db
      .update(schema.donations)
      .set({
        statusPembayaran: status,
        verifiedBy: status === 'lunas' ? adminName : null,
        verifiedAt: status === 'lunas' ? new Date() : null,
      })
      .where(eq(schema.donations.id, donationId));

    // Update akumulasi donatur jika status berubah menjadi lunas atau batal
    if (prevStatus !== 'lunas' && status === 'lunas') {
      const donor = await db
        .select()
        .from(schema.donors)
        .where(eq(schema.donors.id, donation.donorId))
        .limit(1);

      if (donor.length > 0) {
        await db
          .update(schema.donors)
          .set({
            totalDonasiAkumulasi: (donor[0].totalDonasiAkumulasi || 0) + donation.nominalTotal,
            frekuensiDonasi: (donor[0].frekuensiDonasi || 0) + 1,
            updatedAt: new Date(),
          })
          .where(eq(schema.donors.id, donation.donorId));
      }
    } else if (prevStatus === 'lunas' && status !== 'lunas') {
      const donor = await db
        .select()
        .from(schema.donors)
        .where(eq(schema.donors.id, donation.donorId))
        .limit(1);

      if (donor.length > 0) {
        const newTotal = Math.max(0, (donor[0].totalDonasiAkumulasi || 0) - donation.nominalTotal);
        const newFreq = Math.max(0, (donor[0].frekuensiDonasi || 0) - 1);
        await db
          .update(schema.donors)
          .set({
            totalDonasiAkumulasi: newTotal,
            frekuensiDonasi: newFreq,
            updatedAt: new Date(),
          })
          .where(eq(schema.donors.id, donation.donorId));
      }
    }

    return true;
  } catch (error) {
    console.error(`[DB] Error verifying donation #${donationId}:`, error);
    return false;
  }
}

export async function deleteDonationRecord(donationId: number): Promise<boolean> {
  try {
    const existing = await db
      .select()
      .from(schema.donations)
      .where(eq(schema.donations.id, donationId))
      .limit(1);

    if (existing.length === 0) return false;
    const donation = existing[0];

    // Jika berstatus lunas, kurangi akumulasi donatur terlebih dahulu
    if (donation.statusPembayaran === 'lunas') {
      const donor = await db
        .select()
        .from(schema.donors)
        .where(eq(schema.donors.id, donation.donorId))
        .limit(1);

      if (donor.length > 0) {
        const newTotal = Math.max(0, (donor[0].totalDonasiAkumulasi || 0) - donation.nominalTotal);
        const newFreq = Math.max(0, (donor[0].frekuensiDonasi || 0) - 1);
        await db
          .update(schema.donors)
          .set({
            totalDonasiAkumulasi: newTotal,
            frekuensiDonasi: newFreq,
            updatedAt: new Date(),
          })
          .where(eq(schema.donors.id, donation.donorId));
      }
    }

    await db
      .delete(schema.donations)
      .where(eq(schema.donations.id, donationId));

    return true;
  } catch (error) {
    console.error(`[DB] Error deleting donation #${donationId}:`, error);
    return false;
  }
}

export async function getDonationDashboardMetrics() {
  try {
    const all = await getAllDonationsWithDonors();
    const totalDonors = (await getAllDonors()).length;

    let totalPenghimpunan = 0;
    let lunasCount = 0;
    let pendingCount = 0;

    for (const d of all) {
      if (d.statusPembayaran === 'lunas') {
        totalPenghimpunan += d.nominalTotal;
        lunasCount++;
      } else if (d.statusPembayaran === 'menunggu_verifikasi') {
        pendingCount++;
      }
    }

    return {
      totalPenghimpunan,
      totalDonasiCount: all.length,
      lunasCount,
      pendingCount,
      totalDonors,
    };
  } catch (error) {
    console.error('[DB] Error getting donation dashboard metrics:', error);
    return {
      totalPenghimpunan: 0,
      totalDonasiCount: 0,
      lunasCount: 0,
      pendingCount: 0,
      totalDonors: 0,
    };
  }
}

