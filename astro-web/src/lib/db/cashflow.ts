// src/lib/db/cashflow.ts
// Query Transaksi Realisasi Belanja, Buku Kas & Saldo Berjalan GVF

import { db } from './client';
import * as schema from './schema';
import { eq, asc } from 'drizzle-orm';

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
