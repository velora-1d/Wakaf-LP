// src/data/programs.ts
// Re-export terpusat Master Data Program Global Village Fund (GVF) & YPCI
// File dimodularisasi ke src/data/programs/*.ts untuk menjaga batas ukuran < 1.000 baris.

export * from './programs/types';

import { wakafProgram } from './programs/wakaf';
import { infaqProgram } from './programs/infaq';
import { sedekahProgram } from './programs/sedekah';
import { zakatProgram } from './programs/zakat';
import type { ProgramData } from './programs/types';

export const programsData: Record<string, ProgramData> = {
  wakaf: wakafProgram,
  infaq: infaqProgram,
  sedekah: sedekahProgram,
  zakat: zakatProgram,
};
