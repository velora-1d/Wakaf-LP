import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import * as schema from './schema';
import { eq, and, asc, desc, sql } from 'drizzle-orm';

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
  donor: schema.Donor & {
    labels?: schema.Label[];
  };
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

    // Fetch all donor_labels joined with labels
    const dlRows = await db
      .select({
        donorId: schema.donorLabels.donorId,
        label: schema.labels,
      })
      .from(schema.donorLabels)
      .innerJoin(schema.labels, eq(schema.donorLabels.labelId, schema.labels.id));

    const donorLabelsMap = new Map<number, schema.Label[]>();
    dlRows.forEach((r) => {
      const existing = donorLabelsMap.get(r.donorId) || [];
      existing.push(r.label);
      donorLabelsMap.set(r.donorId, existing);
    });

    return rows.map((r) => ({
      ...r.donation,
      donor: {
        ...r.donor,
        labels: donorLabelsMap.get(r.donor.id) || [],
      },
    }));
  } catch (error) {
    console.error('[DB] Error fetching all donations with donors:', error);
    return [];
  }
}

export interface VerifiedPublicDonation {
  id: number;
  kodeTransaksi: string;
  nominalTotal: number;
  namaDonatur: string;
  atasNamaNiat: string | null;
  doaDonatur: string | null;
  metodePembayaran: string | null;
  createdAt: Date;
  programTujuan: string;
}

/**
 * Mengambil donasi terverifikasi (lunas) sesuai kategori program untuk Live Donatur Feed
 */
export async function getVerifiedDonationsByProgram(
  programSlug: string,
  limitCount = 10
): Promise<VerifiedPublicDonation[]> {
  try {
    const all = await getAllDonationsWithDonors();
    const lunasList = all.filter((d) => d.statusPembayaran === 'lunas');

    const filtered = lunasList.filter((d) => {
      const prog = (d.programTujuan || '').toLowerCase();
      const slug = (programSlug || '').toLowerCase();

      if (slug === 'wakaf') {
        return prog === 'wakaf' || prog.includes('wakaf');
      } else if (slug === 'infaq') {
        return prog === 'infaq' || prog.includes('infaq');
      } else if (slug === 'sedekah') {
        return prog === 'sedekah' || prog.includes('sedekah') || prog.includes('shodaqoh');
      } else if (slug === 'zakat') {
        return prog === 'zakat' || prog.includes('zakat');
      }
      return prog === slug;
    });

    return filtered.slice(0, limitCount).map((d) => ({
      id: d.id,
      kodeTransaksi: d.kodeTransaksi,
      nominalTotal: d.nominalTotal,
      namaDonatur: d.donor?.namaTampilan || d.donor?.namaLengkap || 'Hamba Allah',
      atasNamaNiat: d.atasNamaNiat,
      doaDonatur: d.doaDonatur,
      metodePembayaran: d.metodePembayaran,
      createdAt: d.createdAt,
      programTujuan: d.programTujuan,
    }));
  } catch (error) {
    console.error(`[DB] Error fetching verified donations for program ${programSlug}:`, error);
    return [];
  }
}

/**
 * Mengambil konfigurasi paket dinamis dari tabel page_sections jika diatur di CMS admin
 */
export async function getProgramPackages(pageSlug: string) {
  try {
    const section = await db
      .select()
      .from(schema.pageSections)
      .where(and(eq(schema.pageSections.pageSlug, pageSlug), eq(schema.pageSections.sectionKey, 'prog_pricing')))
      .limit(1);

    if (section.length > 0 && section[0].content) {
      const content = section[0].content as any;
      if (Array.isArray(content.packages) && content.packages.length > 0) {
        return {
          heading: content.heading || null,
          subheading: content.subheading || null,
          packages: content.packages,
        };
      }
    }
    return null;
  } catch (error) {
    console.error(`[DB] Error fetching program packages for ${pageSlug}:`, error);
    return null;
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
  kodeTransaksi?: string;
  tanggalTransaksi?: string | Date;
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
  labelIds?: number[];
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
    const txnDate = params.tanggalTransaksi ? new Date(params.tanggalTransaksi) : new Date();
    const finalKodeTransaksi = (params.kodeTransaksi && params.kodeTransaksi.trim() !== '')
      ? params.kodeTransaksi.trim()
      : `GVF-${txnDate.getFullYear()}${String(txnDate.getMonth() + 1).padStart(2, '0')}-${timestampCode}`;
    const kodeUnik = params.kodeUnik || 0;
    const nominalTotal = params.nominal + kodeUnik;
    const isLunas = params.statusPembayaran === 'lunas';

    const insertedDonation = await db
      .insert(schema.donations)
      .values({
        kodeTransaksi: finalKodeTransaksi,
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
        createdAt: txnDate,
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

    if (params.labelIds && Array.isArray(params.labelIds)) {
      await setDonorLabels(donor.id, params.labelIds);
    }

    return insertedDonation[0] || null;
  } catch (error) {
    console.error('[DB] Error creating donation with donor:', error);
    return null;
  }
}

export async function updateDonationWithDonor(params: {
  donationId: number;
  kodeTransaksi?: string;
  tanggalTransaksi?: string | Date;
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
  labelIds?: number[];
}): Promise<boolean> {
  try {
    const existing = await db
      .select()
      .from(schema.donations)
      .where(eq(schema.donations.id, params.donationId))
      .limit(1);

    if (existing.length === 0) return false;
    const oldDonation = existing[0];

    // 1. Update profil donatur
    await db
      .update(schema.donors)
      .set({
        namaLengkap: params.namaLengkap,
        namaTampilan: params.namaTampilan || 'Hamba Allah',
        tipeDonatur: params.tipeDonatur || 'individu',
        noWhatsapp: params.noWhatsapp,
        email: params.email || null,
        kotaDomisili: params.kotaDomisili || null,
        updatedAt: new Date(),
      })
      .where(eq(schema.donors.id, oldDonation.donorId));

    // 2. Hitung nominal total baru
    const kodeUnik = params.kodeUnik || 0;
    const nominalTotal = params.nominal + kodeUnik;
    const newStatus = params.statusPembayaran || oldDonation.statusPembayaran;
    const isLunas = newStatus === 'lunas';

    const txnDate = params.tanggalTransaksi ? new Date(params.tanggalTransaksi) : undefined;
    const finalKodeTransaksi = (params.kodeTransaksi && params.kodeTransaksi.trim() !== '')
      ? params.kodeTransaksi.trim()
      : undefined;

    // 3. Update data transaksi
    const donationUpdateData: any = {
      programTujuan: params.programTujuan,
      nominal: params.nominal,
      kodeUnik,
      nominalTotal,
      akadPeruntukan: params.akadPeruntukan || 'Wakaf Muabbad (Abadi)',
      atasNamaNiat: params.atasNamaNiat || null,
      doaDonatur: params.doaDonatur || null,
      metodePembayaran: params.metodePembayaran || 'BSI Transfer',
      buktiTransferUrl: params.buktiTransferUrl !== undefined ? params.buktiTransferUrl : oldDonation.buktiTransferUrl,
      statusPembayaran: newStatus,
      verifiedBy: isLunas ? (oldDonation.verifiedBy || params.verifiedBy || 'Admin GVF') : null,
      verifiedAt: isLunas ? (oldDonation.verifiedAt || new Date()) : null,
      sumberLeads: params.sumberLeads || 'relasi_langsung',
      campaignUtm: params.campaignUtm || null,
      catatanTransaksi: params.catatanTransaksi || null,
    };

    if (finalKodeTransaksi) {
      donationUpdateData.kodeTransaksi = finalKodeTransaksi;
    }
    if (txnDate && !isNaN(txnDate.getTime())) {
      donationUpdateData.createdAt = txnDate;
    }

    await db
      .update(schema.donations)
      .set(donationUpdateData)
      .where(eq(schema.donations.id, params.donationId));

    // 4. Hitung ulang akumulasi donasi donatur jika nominal atau status berubah
    const allUserDonations = await db
      .select()
      .from(schema.donations)
      .where(and(eq(schema.donations.donorId, oldDonation.donorId), eq(schema.donations.statusPembayaran, 'lunas')));

    const totalAkumulasi = allUserDonations.reduce((sum, d) => sum + d.nominalTotal, 0);
    const frekuensi = allUserDonations.length;

    await db
      .update(schema.donors)
      .set({
        totalDonasiAkumulasi: totalAkumulasi,
        frekuensiDonasi: frekuensi,
        updatedAt: new Date(),
      })
      .where(eq(schema.donors.id, oldDonation.donorId));

    if (params.labelIds && Array.isArray(params.labelIds)) {
      await setDonorLabels(oldDonation.donorId, params.labelIds);
    }

    return true;
  } catch (error) {
    console.error(`[DB] Error updating donation #${params.donationId}:`, error);
    return false;
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

export interface CashAllocationWithBalance extends schema.CashAllocation {
  saldoBerjalan: number;
}

/**
 * Mengambil semua transaksi alokasi kas dengan perhitungan saldo berjalan kronologis
 */
export async function getAllCashAllocations(programFilter?: string): Promise<CashAllocationWithBalance[]> {
  try {
    let records = await db
      .select()
      .from(schema.cashAllocations)
      .orderBy(asc(schema.cashAllocations.tanggalTransaksi), asc(schema.cashAllocations.id));

    if (programFilter && programFilter !== 'all') {
      records = records.filter((r) => r.program.toLowerCase() === programFilter.toLowerCase());
    }

    // Hitung saldo berjalan secara kronologis
    let runningBalance = 0;
    const withBalance: CashAllocationWithBalance[] = records.map((item) => {
      if (item.jenisTransaksi === 'debit') {
        runningBalance += item.nominal;
      } else {
        runningBalance -= item.nominal;
      }
      return {
        ...item,
        saldoBerjalan: runningBalance,
      };
    });

    // Kembalikan urutan dari yang terbaru ke terlama untuk tampilan tabel
    return withBalance.reverse();
  } catch (error) {
    console.error('[DB] Error fetching cash allocations:', error);
    return [];
  }
}

/**
 * Mengambil metrik total debit, kredit, dan saldo kas per program
 */
export async function getCashAllocationMetrics(programFilter?: string) {
  try {
    let records = await db.select().from(schema.cashAllocations);

    if (programFilter && programFilter !== 'all') {
      records = records.filter((r) => r.program.toLowerCase() === programFilter.toLowerCase());
    }

    let totalDebit = 0;
    let totalKredit = 0;

    for (const r of records) {
      if (r.jenisTransaksi === 'debit') {
        totalDebit += r.nominal;
      } else {
        totalKredit += r.nominal;
      }
    }

    return {
      totalDebit,
      totalKredit,
      saldoAkhir: totalDebit - totalKredit,
      totalTransaksi: records.length,
    };
  } catch (error) {
    console.error('[DB] Error getting cash allocation metrics:', error);
    return {
      totalDebit: 0,
      totalKredit: 0,
      saldoAkhir: 0,
      totalTransaksi: 0,
    };
  }
}

/**
 * Mencatat transaksi realisasi alokasi kas baru
 */
export async function createCashAllocation(data: {
  program: string;
  posAnggaran: string;
  uraian: string;
  jenisTransaksi: 'debit' | 'kredit';
  nominal: number;
  buktiNotaUrl?: string;
  pic?: string;
  tanggalTransaksi?: Date;
}): Promise<schema.CashAllocation | null> {
  try {
    const prefix = data.jenisTransaksi === 'debit' ? 'BKM' : 'BKK';
    const yearMonth = new Date().toISOString().slice(0, 7).replace('-', '');
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const kodeTransaksi = `${prefix}-${yearMonth}-${randCode}`;

    const inserted = await db
      .insert(schema.cashAllocations)
      .values({
        kodeTransaksi,
        program: data.program,
        posAnggaran: data.posAnggaran,
        uraian: data.uraian,
        jenisTransaksi: data.jenisTransaksi,
        nominal: data.nominal,
        buktiNotaUrl: data.buktiNotaUrl || null,
        pic: data.pic || 'Amil Lapangan GVF',
        tanggalTransaksi: data.tanggalTransaksi || new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return inserted[0] || null;
  } catch (error) {
    console.error('[DB] Error creating cash allocation:', error);
    return null;
  }
}

/**
 * Memperbarui transaksi realisasi alokasi kas
 */
export async function updateCashAllocation(
  id: number,
  data: {
    program?: string;
    posAnggaran?: string;
    uraian?: string;
    jenisTransaksi?: 'debit' | 'kredit';
    nominal?: number;
    buktiNotaUrl?: string;
    pic?: string;
    tanggalTransaksi?: Date;
  }
): Promise<schema.CashAllocation | null> {
  try {
    const updated = await db
      .update(schema.cashAllocations)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.cashAllocations.id, id))
      .returning();

    return updated[0] || null;
  } catch (error) {
    console.error('[DB] Error updating cash allocation:', error);
    return null;
  }
}

/**
 * Menghapus transaksi realisasi alokasi kas
 */
export async function deleteCashAllocation(id: number): Promise<boolean> {
  try {
    const res = await db.delete(schema.cashAllocations).where(eq(schema.cashAllocations.id, id)).returning();
    return res.length > 0;
  } catch (error) {
    console.error('[DB] Error deleting cash allocation:', error);
    return false;
  }
}

/**
 * ====================================================
 * ROLE & PERMISSION (RBAC) FUNCTIONS
 * ====================================================
 */

export async function getAllRoles(): Promise<schema.RoleDefinition[]> {
  try {
    return await db.select().from(schema.roleDefinitions).orderBy(schema.roleDefinitions.roleKey);
  } catch (error) {
    console.error('[DB] Error fetching roles:', error);
    return [];
  }
}

export async function getAllAdminUsers(): Promise<schema.AdminUser[]> {
  try {
    return await db.select().from(schema.adminUsers).orderBy(schema.adminUsers.id);
  } catch (error) {
    console.error('[DB] Error fetching admin users:', error);
    return [];
  }
}

export async function updateRolePermissions(
  roleKey: string,
  permissions: string[]
): Promise<schema.RoleDefinition | null> {
  try {
    const updated = await db
      .update(schema.roleDefinitions)
      .set({
        permissions,
        updatedAt: new Date(),
      })
      .where(eq(schema.roleDefinitions.roleKey, roleKey))
      .returning();

    // Juga update semua admin users yang memiliki role ini jika user tidak memiliki custom override
    await db
      .update(schema.adminUsers)
      .set({
        permissions,
        updatedAt: new Date(),
      })
      .where(eq(schema.adminUsers.role, roleKey));

    return updated[0] || null;
  } catch (error) {
    console.error(`[DB] Error updating role permissions for ${roleKey}:`, error);
    return null;
  }
}

export async function updateUserPermissions(
  userId: number,
  permissions: string[],
  role?: string
): Promise<schema.AdminUser | null> {
  try {
    const data: Partial<schema.AdminUser> = {
      permissions,
      updatedAt: new Date(),
    };
    if (role) {
      data.role = role;
    }
    const updated = await db
      .update(schema.adminUsers)
      .set(data)
      .where(eq(schema.adminUsers.id, userId))
      .returning();

    return updated[0] || null;
  } catch (error) {
    console.error(`[DB] Error updating user permissions for id ${userId}:`, error);
    return null;
  }
}

export async function createAdminUser(params: {
  username: string;
  password: string;
  name: string;
  role: string;
  permissions?: string[];
}): Promise<{ success: boolean; user?: schema.AdminUser; error?: string }> {
  try {
    const cleanUsername = params.username.trim().toLowerCase();
    if (!cleanUsername) return { success: false, error: 'Username wajib diisi.' };
    if (!params.password || params.password.length < 6) return { success: false, error: 'Password minimal 6 karakter.' };
    if (!params.name.trim()) return { success: false, error: 'Nama lengkap wajib diisi.' };

    const existing = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.username, cleanUsername))
      .limit(1);

    if (existing.length > 0) {
      return { success: false, error: `Username @${cleanUsername} sudah digunakan.` };
    }

    let permissions = params.permissions;
    if (!permissions || permissions.length === 0) {
      const roleDef = await db
        .select()
        .from(schema.roleDefinitions)
        .where(eq(schema.roleDefinitions.roleKey, params.role))
        .limit(1);
      permissions = roleDef[0]?.permissions || ['overview'];
    }

    const passwordHash = bcrypt.hashSync(params.password, 10);
    const inserted = await db
      .insert(schema.adminUsers)
      .values({
        username: cleanUsername,
        passwordHash,
        name: params.name.trim(),
        role: params.role || 'staf_lapangan',
        permissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return { success: true, user: inserted[0] };
  } catch (error: any) {
    console.error('[DB] Error creating admin user:', error);
    return { success: false, error: error.message || 'Gagal menambahkan akun admin.' };
  }
}

export async function updateAdminUser(params: {
  id: number;
  username: string;
  name: string;
  role: string;
  password?: string;
  permissions?: string[];
}): Promise<{ success: boolean; user?: schema.AdminUser; error?: string }> {
  try {
    const cleanUsername = params.username.trim().toLowerCase();
    if (!cleanUsername) return { success: false, error: 'Username wajib diisi.' };
    if (!params.name.trim()) return { success: false, error: 'Nama lengkap wajib diisi.' };

    const targetUser = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.id, params.id))
      .limit(1);

    if (targetUser.length === 0) {
      return { success: false, error: 'Akun pengguna tidak ditemukan.' };
    }

    if (cleanUsername !== targetUser[0].username) {
      const duplicate = await db
        .select()
        .from(schema.adminUsers)
        .where(eq(schema.adminUsers.username, cleanUsername))
        .limit(1);
      if (duplicate.length > 0) {
        return { success: false, error: `Username @${cleanUsername} sudah digunakan oleh akun lain.` };
      }
    }

    const updateData: Partial<schema.AdminUser> = {
      username: cleanUsername,
      name: params.name.trim(),
      role: params.role || targetUser[0].role,
      updatedAt: new Date(),
    };

    if (params.password && params.password.trim() !== '') {
      if (params.password.length < 6) {
        return { success: false, error: 'Password baru minimal 6 karakter.' };
      }
      updateData.passwordHash = bcrypt.hashSync(params.password, 10);
    }

    if (params.permissions && params.permissions.length > 0) {
      updateData.permissions = params.permissions;
    }

    const updated = await db
      .update(schema.adminUsers)
      .set(updateData)
      .where(eq(schema.adminUsers.id, params.id))
      .returning();

    return { success: true, user: updated[0] };
  } catch (error: any) {
    console.error('[DB] Error updating admin user:', error);
    return { success: false, error: error.message || 'Gagal memperbarui akun admin.' };
  }
}

export async function deleteAdminUser(params: {
  userId: number;
  currentUserId: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (params.userId === params.currentUserId) {
      return { success: false, error: 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif digunakan.' };
    }

    const target = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.id, params.userId))
      .limit(1);

    if (target.length === 0) {
      return { success: false, error: 'Akun pengguna tidak ditemukan.' };
    }

    if (target[0].username === 'admin') {
      return { success: false, error: 'Akun Administrator Utama (@admin) dilindungi dan tidak dapat dihapus.' };
    }

    await db.delete(schema.adminUsers).where(eq(schema.adminUsers.id, params.userId));
    return { success: true };
  } catch (error: any) {
    console.error('[DB] Error deleting admin user:', error);
    return { success: false, error: error.message || 'Gagal menghapus akun admin.' };
  }
}

// ==========================================
// LABEL MANAGEMENT (CRUD & RELASI DONATUR)
// ==========================================

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
      // Deduplicate labelIds
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


