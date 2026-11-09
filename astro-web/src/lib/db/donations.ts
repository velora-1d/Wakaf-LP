// src/lib/db/donations.ts
// Query Transaksi Donasi, Data Donatur & Metrik Penghimpunan

import { db } from './client';
import * as schema from './schema';
import { eq, and, desc } from 'drizzle-orm';
import { setDonorLabels } from './labels';

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
 * Mengambil seluruh donasi terverifikasi (lunas) lintas semua program untuk Halaman Detail Donatur Publik
 */
export async function getAllVerifiedDonations(
  limitCount = 500
): Promise<VerifiedPublicDonation[]> {
  try {
    const all = await getAllDonationsWithDonors();
    const lunasList = all.filter((d) => d.statusPembayaran === 'lunas');

    return lunasList.slice(0, limitCount).map((d) => ({
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
    console.error('[DB] Error fetching all verified donations:', error);
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
