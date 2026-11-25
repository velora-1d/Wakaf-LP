// src/scripts/admin/donatur.ts
// Interactive Client Script for Admin Donatur & Alokasi Kas GVF

// DOM Elements
const btnOpenCreate = document.getElementById('btnOpenCreateDonation');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const drawerBox = document.getElementById('drawerBox');
const btnCloseDrawer = document.getElementById('btnCloseDrawer');
const btnCancelDrawer = document.getElementById('btnCancelDrawer');
const btnSubmitDonation = document.getElementById('btnSubmitDonation');

// Search & Filter Elements
const searchInput = document.getElementById('tableSearchInput') as HTMLInputElement | null;
const filterStatus = document.getElementById('filterStatus') as HTMLSelectElement | null;
const donaturDateStart = document.getElementById('donaturDateStart') as HTMLInputElement | null;
const donaturDateEnd = document.getElementById('donaturDateEnd') as HTMLInputElement | null;
const donaturPeriodPills = document.querySelectorAll('.donatur-period-pill') as NodeListOf<HTMLButtonElement>;
const filterLeads = document.getElementById('filterLeads') as HTMLSelectElement | null;
const filterProgram = document.getElementById('filterProgram') as HTMLSelectElement | null;
const btnResetFilters = document.getElementById('btnResetFilters');
const tableRows = document.querySelectorAll('.donation-row') as NodeListOf<HTMLTableRowElement>;
const displayedRowsCount = document.getElementById('displayedRowsCount');

// Checkbox & Bulk Actions
const selectAllCheckbox = document.getElementById('selectAllCheckbox') as HTMLInputElement | null;
const rowCheckboxes = document.querySelectorAll('.row-checkbox') as NodeListOf<HTMLInputElement>;
const bulkActionBar = document.getElementById('bulkActionBar');
const selectedCountText = document.getElementById('selectedCountText');
const btnBulkVerifyLunas = document.getElementById('btnBulkVerifyLunas');

// Dropzone Elements
const dropzoneContainer = document.getElementById('dropzoneContainer');
const proofFileInput = document.getElementById('proofFileInput') as HTMLInputElement | null;
const dropzoneEmptyView = document.getElementById('dropzoneEmptyView');
const dropzoneUploadingView = document.getElementById('dropzoneUploadingView');
const dropzonePreviewView = document.getElementById('dropzonePreviewView');
const uploadedProofPreview = document.getElementById('uploadedProofPreview') as HTMLImageElement | null;
const uploadedFileName = document.getElementById('uploadedFileName');
const btnRemoveProof = document.getElementById('btnRemoveProof');
const inputBuktiUrl = document.getElementById('inputBuktiTransferUrl') as HTMLInputElement | null;

// Proof Modal Elements
const proofModal = document.getElementById('proofModal');
const btnCloseProof = document.getElementById('btnCloseProof');
const proofImageElement = document.getElementById('proofImageElement') as HTMLImageElement | null;
const proofCodeBadge = document.getElementById('proofCodeBadge');
const proofExternalLink = document.getElementById('proofExternalLink') as HTMLAnchorElement | null;

// 1. OPEN / CLOSE DRAWER KANAN (70% LAYAR)
function openDrawer() {
  if (!drawerBackdrop || !drawerBox) return;
  drawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
  drawerBox.classList.remove('translate-x-full');
  drawerBox.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!drawerBackdrop || !drawerBox) return;
  drawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
  drawerBox.classList.remove('translate-x-0');
  drawerBox.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

btnOpenCreate?.addEventListener('click', () => {
  resetDonationForm();
  openDrawer();
});
btnCloseDrawer?.addEventListener('click', closeDrawer);
btnCancelDrawer?.addEventListener('click', closeDrawer);

drawerBackdrop?.addEventListener('click', (e) => {
  if (e.target === drawerBackdrop) closeDrawer();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closeProofModal();
  }
});

// 2. CHECKBOX SELECT ALL & ROW SELECTION
function updateBulkActionBar() {
  const checked = Array.from(rowCheckboxes).filter(cb => cb.checked && cb.closest('tr')?.style.display !== 'none');
  if (selectedCountText) selectedCountText.textContent = String(checked.length);

  if (checked.length > 0) {
    bulkActionBar?.classList.remove('hidden');
    bulkActionBar?.classList.add('flex');
  } else {
    bulkActionBar?.classList.add('hidden');
    bulkActionBar?.classList.remove('flex');
  }
}

selectAllCheckbox?.addEventListener('change', () => {
  const isChecked = selectAllCheckbox.checked;
  rowCheckboxes.forEach((cb) => {
    if (cb.closest('tr')?.style.display !== 'none') {
      cb.checked = isChecked;
    }
  });
  updateBulkActionBar();
});

rowCheckboxes.forEach((cb) => {
  cb.addEventListener('change', () => {
    const visible = Array.from(rowCheckboxes).filter(c => c.closest('tr')?.style.display !== 'none');
    const allChecked = visible.length > 0 && visible.every(c => c.checked);
    if (selectAllCheckbox) selectAllCheckbox.checked = allChecked;
    updateBulkActionBar();
  });
});

// Bulk Verify Action
btnBulkVerifyLunas?.addEventListener('click', async () => {
  const checkedIds = Array.from(rowCheckboxes)
    .filter(cb => cb.checked && cb.closest('tr')?.style.display !== 'none')
    .map(cb => cb.getAttribute('data-id'))
    .filter(Boolean);

  if (checkedIds.length === 0) return;
  if (!confirm(`Verifikasi ${checkedIds.length} transaksi yang dipilih menjadi LUNAS?`)) return;

  btnBulkVerifyLunas.setAttribute('disabled', 'true');
  btnBulkVerifyLunas.textContent = 'Memproses...';

  try {
    for (const id of checkedIds) {
      await fetch('/api/admin/donatur/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationId: Number(id), status: 'lunas' }),
      });
    }
    reloadToDonaturTab();
  } catch (err: any) {
    alert(`Gagal verifikasi masal: ${err.message}`);
    btnBulkVerifyLunas.removeAttribute('disabled');
    btnBulkVerifyLunas.textContent = 'Verifikasi Lunas';
  }
});

// 3. SEARCH & FILTER TABLE REALTIME WITH PAGINATION
const donationsPerPageSelect = document.getElementById('donationsPerPage') as HTMLSelectElement | null;
const donationsTotalCount = document.getElementById('donationsTotalCount');
const donationsRangeText = document.getElementById('donationsRangeText');
const btnDonationsPrevPage = document.getElementById('btnDonationsPrevPage') as HTMLButtonElement | null;
const btnDonationsNextPage = document.getElementById('btnDonationsNextPage') as HTMLButtonElement | null;
const donationsPageNumbers = document.getElementById('donationsPageNumbers');

let donationsCurrentPage = 1;
let donationsMatchedRows: HTMLTableRowElement[] = [];

function getSmartPaginationRange(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function renderDonationsPagination() {
  const rawPageSize = donationsPerPageSelect?.value || '25';
  const isAll = rawPageSize === 'all';
  const pageSize = isAll ? Math.max(1, donationsMatchedRows.length) : parseInt(rawPageSize, 10);
  const totalItems = donationsMatchedRows.length;
  const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalItems / pageSize));

  if (donationsCurrentPage > totalPages) donationsCurrentPage = totalPages;
  if (donationsCurrentPage < 1) donationsCurrentPage = 1;

  // Sembunyikan semua row dahulu
  tableRows.forEach(r => { r.style.display = 'none'; });

  // Tampilkan hanya baris untuk halaman saat ini
  const startIdx = (donationsCurrentPage - 1) * pageSize;
  const endIdx = isAll ? totalItems : Math.min(startIdx + pageSize, totalItems);

  for (let i = startIdx; i < endIdx; i++) {
    if (donationsMatchedRows[i]) {
      donationsMatchedRows[i].style.display = '';
    }
  }

  // Perbarui teks info count & range
  if (donationsTotalCount) donationsTotalCount.textContent = String(totalItems);
  if (donationsRangeText) {
    if (totalItems === 0) {
      donationsRangeText.textContent = '(0 ditampilkan)';
    } else {
      donationsRangeText.textContent = `(Baris ${startIdx + 1} - ${endIdx})`;
    }
  }

  // Tombol Prev / Next
  if (btnDonationsPrevPage) btnDonationsPrevPage.disabled = donationsCurrentPage <= 1;
  if (btnDonationsNextPage) btnDonationsNextPage.disabled = donationsCurrentPage >= totalPages;

  // Render Tombol Nomor Halaman
  if (donationsPageNumbers) {
    donationsPageNumbers.innerHTML = '';
    if (totalPages <= 1) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'h-8 w-8 rounded-md text-xs font-semibold bg-[#0969da] text-white flex items-center justify-center cursor-default';
      btn.textContent = '1';
      donationsPageNumbers.appendChild(btn);
    } else {
      const pages = getSmartPaginationRange(donationsCurrentPage, totalPages);
      pages.forEach((p) => {
        if (p === '...') {
          const span = document.createElement('span');
          span.className = 'px-1 text-slate-400 font-bold select-none';
          span.textContent = '...';
          donationsPageNumbers.appendChild(span);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `h-8 w-8 rounded-md text-xs font-semibold transition-colors shadow-2xs flex items-center justify-center cursor-pointer ${
            Number(p) === donationsCurrentPage
              ? 'bg-[#0969da] text-white font-bold'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
          }`;
          btn.textContent = String(p);
          btn.addEventListener('click', () => {
            donationsCurrentPage = Number(p);
            renderDonationsPagination();
          });
          donationsPageNumbers.appendChild(btn);
        }
      });
    }
  }

  updateBulkActionBar();
}

const filterNominal = document.getElementById('filterNominal') as HTMLSelectElement | null;
const inputNominalMin = document.getElementById('inputNominalMin') as HTMLInputElement | null;
const inputNominalMax = document.getElementById('inputNominalMax') as HTMLInputElement | null;
const filterLabel = document.getElementById('filterLabel') as HTMLSelectElement | null;

function formatRibuanInput(val: string): string {
  const raw = val.replace(/\D/g, '');
  if (!raw) return '';
  return new Intl.NumberFormat('id-ID').format(Number(raw));
}

function toLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getPresetDateRange(period: string): { start: string; end: string } {
  if (!period || period === 'all') return { start: '', end: '' };
  const now = new Date();
  const todayStr = toLocalYmd(now);
  if (period === 'today') return { start: todayStr, end: todayStr };
  if (period === 'week') {
    const day = now.getDay();
    const diffToMon = day === 0 ? 6 : day - 1;
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMon);
    return { start: toLocalYmd(start), end: todayStr };
  }
  if (period === 'month') {
    return { start: toLocalYmd(new Date(now.getFullYear(), now.getMonth(), 1)), end: todayStr };
  }
  if (period === 'year') {
    return { start: toLocalYmd(new Date(now.getFullYear(), 0, 1)), end: todayStr };
  }
  return { start: '', end: '' };
}

function setActivePeriodPill(pills: NodeListOf<HTMLButtonElement>, activePeriod: string) {
  pills.forEach((btn) => {
    const isActive = btn.dataset.period === activePeriod;
    btn.classList.toggle('bg-[#0969da]', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('text-slate-600', !isActive);
    btn.classList.toggle('hover:bg-white', !isActive);
  });
}

function matchesDateRange(isoDateStr: string | null, startYmd: string, endYmd: string): boolean {
  if (!startYmd && !endYmd) return true;
  if (!isoDateStr) return false;
  const dt = new Date(isoDateStr);
  if (Number.isNaN(dt.getTime())) return false;

  if (startYmd) {
    const [sy, sm, sd] = startYmd.split('-').map(Number);
    const startDt = new Date(sy, sm - 1, sd, 0, 0, 0, 0);
    if (dt < startDt) return false;
  }
  if (endYmd) {
    const [ey, em, ed] = endYmd.split('-').map(Number);
    const endDt = new Date(ey, em - 1, ed, 23, 59, 59, 999);
    if (dt > endDt) return false;
  }
  return true;
}

function applyFilters() {
  const q = (searchInput?.value || '').toLowerCase().trim();
  const st = filterStatus?.value || 'all';
  const ld = filterLeads?.value || 'all';
  const pg = filterProgram?.value || 'all';
  const fl = filterLabel?.value || 'all';
  const startYmd = donaturDateStart?.value || '';
  const endYmd = donaturDateEnd?.value || '';

  // Nominal Range Dinamis (Min & Max)
  const rawMin = (inputNominalMin?.value || '').replace(/\D/g, '');
  const rawMax = (inputNominalMax?.value || '').replace(/\D/g, '');
  const minNominal = rawMin ? Number(rawMin) : 0;
  const maxNominal = rawMax ? Number(rawMax) : Infinity;

  donationsMatchedRows = [];

  tableRows.forEach((row) => {
    const searchMatch = !q || (row.getAttribute('data-search') || '').includes(q);
    const statusMatch = st === 'all' || row.getAttribute('data-status') === st;
    const leadMatch = ld === 'all' || row.getAttribute('data-lead') === ld;
    const progMatch = pg === 'all' || row.getAttribute('data-program') === pg;

    // Filter Range Nominal Dinamis
    const rowNominal = Number(row.getAttribute('data-nominal') || 0);
    const nominalMatch = rowNominal >= minNominal && rowNominal <= maxNominal;

    // Filter Label Donatur
    let labelMatch = true;
    if (fl !== 'all') {
      const rowLabels: string[] = JSON.parse(row.getAttribute('data-labels') || '[]');
      labelMatch = rowLabels.includes(fl);
    }

    const periodMatch = matchesDateRange(row.getAttribute('data-created'), startYmd, endYmd);

    if (searchMatch && statusMatch && leadMatch && progMatch && nominalMatch && labelMatch && periodMatch) {
      donationsMatchedRows.push(row);
    } else {
      const cb = row.querySelector('.row-checkbox') as HTMLInputElement | null;
      if (cb) cb.checked = false;
    }
  });

  donationsCurrentPage = 1;
  renderDonationsPagination();
}

btnDonationsPrevPage?.addEventListener('click', () => {
  if (donationsCurrentPage > 1) {
    donationsCurrentPage--;
    renderDonationsPagination();
  }
});

btnDonationsNextPage?.addEventListener('click', () => {
  donationsCurrentPage++;
  renderDonationsPagination();
});

donationsPerPageSelect?.addEventListener('change', () => {
  donationsCurrentPage = 1;
  renderDonationsPagination();
});

searchInput?.addEventListener('input', applyFilters);
filterStatus?.addEventListener('change', applyFilters);
donaturPeriodPills.forEach((btn) => {
  btn.addEventListener('click', () => {
    const period = btn.dataset.period || 'all';
    const range = getPresetDateRange(period);
    if (donaturDateStart) donaturDateStart.value = range.start;
    if (donaturDateEnd) donaturDateEnd.value = range.end;
    setActivePeriodPill(donaturPeriodPills, period);
    applyFilters();
  });
});
[donaturDateStart, donaturDateEnd].forEach((inp) => {
  inp?.addEventListener('change', () => {
    const hasCustom = Boolean(donaturDateStart?.value || donaturDateEnd?.value);
    setActivePeriodPill(donaturPeriodPills, hasCustom ? '' : 'all');
    applyFilters();
  });
});
filterLeads?.addEventListener('change', applyFilters);
filterProgram?.addEventListener('change', applyFilters);
filterLabel?.addEventListener('change', applyFilters);

// Event handler untuk sinkronisasi Dropdown Preset Nominal -> Input Dinamis
filterNominal?.addEventListener('change', () => {
  const nm = filterNominal.value;
  if (nm === 'all') {
    if (inputNominalMin) inputNominalMin.value = '';
    if (inputNominalMax) inputNominalMax.value = '';
  } else if (nm === 'under_100k') {
    if (inputNominalMin) inputNominalMin.value = '';
    if (inputNominalMax) inputNominalMax.value = '100.000';
  } else if (nm === '100k_500k') {
    if (inputNominalMin) inputNominalMin.value = '100.000';
    if (inputNominalMax) inputNominalMax.value = '500.000';
  } else if (nm === '500k_1m') {
    if (inputNominalMin) inputNominalMin.value = '500.000';
    if (inputNominalMax) inputNominalMax.value = '1.000.000';
  } else if (nm === '1m_5m') {
    if (inputNominalMin) inputNominalMin.value = '1.000.000';
    if (inputNominalMax) inputNominalMax.value = '5.000.000';
  } else if (nm === 'above_5m') {
    if (inputNominalMin) inputNominalMin.value = '5.000.000';
    if (inputNominalMax) inputNominalMax.value = '';
  }
  applyFilters();
});

// Event handler untuk Input Dinamis Min/Max -> Auto Format Ribuan & Real-time Filter
[inputNominalMin, inputNominalMax].forEach((inp) => {
  inp?.addEventListener('input', () => {
    const formatted = formatRibuanInput(inp.value);
    if (inp.value !== formatted) {
      inp.value = formatted;
    }
    if (filterNominal && filterNominal.value !== 'custom') {
      filterNominal.value = 'custom';
    }
    applyFilters();
  });
});

btnResetFilters?.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  if (filterStatus) filterStatus.value = 'all';
  if (donaturDateStart) donaturDateStart.value = '';
  if (donaturDateEnd) donaturDateEnd.value = '';
  setActivePeriodPill(donaturPeriodPills, 'all');
  if (filterLeads) filterLeads.value = 'all';
  if (filterProgram) filterProgram.value = 'all';
  if (filterNominal) filterNominal.value = 'all';
  if (filterLabel) filterLabel.value = 'all';
  if (inputNominalMin) inputNominalMin.value = '';
  if (inputNominalMax) inputNominalMax.value = '';
  if (donationsPerPageSelect) donationsPerPageSelect.value = '25';
  applyFilters();
});

// Jalankan inisialisasi pagination awal
applyFilters();

// 4. DROPZONE UPLOAD MINIO S3
dropzoneContainer?.addEventListener('click', (e) => {
  if (e.target === btnRemoveProof) return;
  proofFileInput?.click();
});

dropzoneContainer?.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzoneContainer.classList.add('border-[#0969da]', 'bg-blue-50/30');
});
dropzoneContainer?.addEventListener('dragleave', () => {
  dropzoneContainer.classList.remove('border-[#0969da]', 'bg-blue-50/30');
});
dropzoneContainer?.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzoneContainer.classList.remove('border-[#0969da]', 'bg-blue-50/30');
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    handleProofUpload(e.dataTransfer.files[0]);
  }
});

proofFileInput?.addEventListener('change', () => {
  if (proofFileInput.files && proofFileInput.files[0]) {
    handleProofUpload(proofFileInput.files[0]);
  }
});

btnRemoveProof?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (inputBuktiUrl) inputBuktiUrl.value = '';
  if (proofFileInput) proofFileInput.value = '';
  dropzonePreviewView?.classList.add('hidden');
  dropzonePreviewView?.classList.remove('flex');
  dropzoneEmptyView?.classList.remove('hidden');
  dropzoneEmptyView?.classList.add('flex');
});

async function handleProofUpload(file: File) {
  dropzoneEmptyView?.classList.add('hidden');
  dropzoneEmptyView?.classList.remove('flex');
  dropzonePreviewView?.classList.add('hidden');
  dropzonePreviewView?.classList.remove('flex');
  dropzoneUploadingView?.classList.remove('hidden');
  dropzoneUploadingView?.classList.add('flex');

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/donatur/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Gagal mengunggah bukti ke S3');
    }

    if (inputBuktiUrl) inputBuktiUrl.value = result.url;
    if (uploadedProofPreview) uploadedProofPreview.src = result.url;
    if (uploadedFileName) uploadedFileName.textContent = file.name;

    dropzoneUploadingView?.classList.add('hidden');
    dropzoneUploadingView?.classList.remove('flex');
    dropzonePreviewView?.classList.remove('hidden');
    dropzonePreviewView?.classList.add('flex');
  } catch (err: any) {
    alert(`Gagal upload: ${err.message}`);
    dropzoneUploadingView?.classList.add('hidden');
    dropzoneUploadingView?.classList.remove('flex');
    dropzoneEmptyView?.classList.remove('hidden');
    dropzoneEmptyView?.classList.add('flex');
  }
}

// 5. SUBMIT FORM CATAT DONASI
btnSubmitDonation?.addEventListener('click', async () => {
  const kodeTransaksi = (document.getElementById('inputKodeTransaksi') as HTMLInputElement)?.value.trim();
  const tanggalTransaksi = (document.getElementById('inputTanggalTransaksi') as HTMLInputElement)?.value;
  const namaLengkap = (document.getElementById('inputNamaLengkap') as HTMLInputElement)?.value.trim();
  const namaTampilan = (document.getElementById('inputNamaTampilan') as HTMLInputElement)?.value.trim();
  const tipeDonatur = (document.getElementById('inputTipeDonatur') as HTMLSelectElement)?.value;
  const noWhatsapp = (document.getElementById('inputNoWhatsapp') as HTMLInputElement)?.value.trim();
  const email = (document.getElementById('inputEmail') as HTMLInputElement)?.value.trim();
  const kotaDomisili = (document.getElementById('inputKotaDomisili') as HTMLInputElement)?.value.trim();

  const programTujuan = (document.getElementById('inputProgramTujuan') as HTMLSelectElement)?.value;
  const akadPeruntukan = (document.getElementById('inputAkadPeruntukan') as HTMLSelectElement)?.value;
  const nominal = Number((document.getElementById('inputNominal') as HTMLInputElement)?.value);
  const kodeUnik = Number((document.getElementById('inputKodeUnik') as HTMLInputElement)?.value || 0);
  const atasNamaNiat = (document.getElementById('inputAtasNamaNiat') as HTMLInputElement)?.value.trim();
  const doaDonatur = (document.getElementById('inputDoaDonatur') as HTMLTextAreaElement)?.value.trim();

  const sumberLeads = (document.getElementById('inputSumberLeads') as HTMLSelectElement)?.value;
  const campaignUtm = (document.getElementById('inputCampaignUtm') as HTMLInputElement)?.value.trim();

  const metodePembayaran = (document.getElementById('inputMetodePembayaran') as HTMLSelectElement)?.value;
  const statusPembayaran = (document.getElementById('inputStatusPembayaran') as HTMLSelectElement)?.value;
  const buktiTransferUrl = inputBuktiUrl?.value || undefined;
  const catatanTransaksi = (document.getElementById('inputCatatanTransaksi') as HTMLInputElement)?.value.trim();

  if (!namaLengkap || !noWhatsapp || !programTujuan || !nominal) {
    alert('Mohon lengkapi bidang wajib: Nama Lengkap, Nomor WhatsApp, Program, dan Nominal.');
    return;
  }

  const donationId = (document.getElementById('inputDonationId') as HTMLInputElement)?.value;
  const isEditMode = Boolean(donationId);

  btnSubmitDonation.setAttribute('disabled', 'true');
  btnSubmitDonation.textContent = isEditMode ? 'Memperbarui...' : 'Menyimpan...';

  try {
    const endpoint = isEditMode ? '/api/admin/donatur/update' : '/api/admin/donatur/create';
    const payload: any = {
      kodeTransaksi,
      tanggalTransaksi,
      namaLengkap,
      namaTampilan,
      tipeDonatur,
      noWhatsapp,
      email,
      kotaDomisili,
      programTujuan,
      akadPeruntukan,
      nominal,
      kodeUnik,
      atasNamaNiat,
      doaDonatur,
      sumberLeads,
      campaignUtm,
      metodePembayaran,
      statusPembayaran,
      buktiTransferUrl,
      catatanTransaksi,
      labelIds: Array.from(document.querySelectorAll('.drawer-label-cb:checked')).map((cb) =>
        Number((cb as HTMLInputElement).value)
      ),
    };

    if (isEditMode) {
      payload.donationId = Number(donationId);
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Gagal menyimpan transaksi');
    }

    alert(isEditMode ? 'Alhamdulillah! Data transaksi & donatur berhasil diperbarui.' : 'Alhamdulillah! Donasi dan profil donatur berhasil dicatat.');
    reloadToDonaturTab();
  } catch (err: any) {
    alert(`Terjadi kesalahan: ${err.message}`);
    btnSubmitDonation.removeAttribute('disabled');
    btnSubmitDonation.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span id="btnSubmitText">${isEditMode ? 'Perbarui Data Donasi' : 'Simpan Data Donasi'}</span>
    `;
  }
});

// Custom Modal References
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const deleteTargetKodeDisplay = document.getElementById('deleteTargetKodeDisplay');
const btnCancelDeleteModal = document.getElementById('btnCancelDeleteModal');
const btnExecuteDeleteModal = document.getElementById('btnExecuteDeleteModal');

const verifyConfirmModal = document.getElementById('verifyConfirmModal');
const verifyModalTitle = document.getElementById('verifyModalTitle');
const verifyModalDesc = document.getElementById('verifyModalDesc');
const btnCancelVerifyModal = document.getElementById('btnCancelVerifyModal');
const btnExecuteVerifyModal = document.getElementById('btnExecuteVerifyModal');

let pendingDeleteId: number | null = null;
let pendingDeleteActionEl: HTMLElement | null = null;

let pendingVerifyId: number | null = null;
let pendingVerifyStatus: string = '';
let pendingVerifyActionEl: HTMLElement | null = null;

// 6. ACTIONS: WA, EDIT, VERIFIKASI STATUS & HAPUS
document.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  const actionEl = target.closest('[data-action]') as HTMLElement | null;
  if (!actionEl) return;

  const action = actionEl.getAttribute('data-action');
  const donationId = actionEl.getAttribute('data-id');

  if (action === 'wa') {
    const waUrl = actionEl.getAttribute('data-wa-url');
    if (waUrl) {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  } else if (action === 'edit') {
    const rawJson = actionEl.getAttribute('data-json');
    if (!rawJson) return;
    try {
      const data = JSON.parse(rawJson);
      populateDrawerForEdit(data);
      openDrawer();
    } catch (err: any) {
      alert('Gagal memuat data donasi: ' + err.message);
    }
  } else if (action === 'verify-lunas' || action === 'verify-pending' || action === 'verify-batal') {
    const isLunas = action === 'verify-lunas';
    const isBatal = action === 'verify-batal';
    pendingVerifyId = Number(donationId);
    pendingVerifyStatus = isLunas ? 'lunas' : isBatal ? 'dibatalkan' : 'menunggu_verifikasi';
    pendingVerifyActionEl = actionEl;

    if (verifyModalTitle) {
      verifyModalTitle.textContent = isLunas
        ? 'Approve & Verifikasi Donasi Lunas?'
        : isBatal
          ? 'Tolak / Batalkan Transaksi?'
          : 'Kembalikan ke Status Pending?';
    }
    if (verifyModalDesc) {
      verifyModalDesc.textContent = isLunas
        ? 'Tandai transaksi ini sebagai LUNAS agar otomatis masuk ke Data Donatur dan halaman publik.'
        : isBatal
          ? 'Tandai transaksi ini sebagai DIBATALKAN dan keluarkan dari daftar menunggu verifikasi.'
          : 'Kembalikan status transaksi donasi ini menjadi MENUNGGU VERIFIKASI.';
    }
    verifyConfirmModal?.classList.remove('hidden');
    verifyConfirmModal?.classList.add('flex');
  } else if (action === 'delete') {
    const kode = actionEl.getAttribute('data-kode') || '';
    pendingDeleteId = Number(donationId);
    pendingDeleteActionEl = actionEl;

    if (deleteTargetKodeDisplay) {
      deleteTargetKodeDisplay.textContent = kode;
    }
    deleteConfirmModal?.classList.remove('hidden');
    deleteConfirmModal?.classList.add('flex');
  }
});

// Modal Delete Controls
btnCancelDeleteModal?.addEventListener('click', () => {
  deleteConfirmModal?.classList.add('hidden');
  deleteConfirmModal?.classList.remove('flex');
  pendingDeleteId = null;
  pendingDeleteActionEl = null;
});

btnExecuteDeleteModal?.addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  const targetId = pendingDeleteId;
  const targetEl = pendingDeleteActionEl;

  btnExecuteDeleteModal.setAttribute('disabled', 'true');
  btnExecuteDeleteModal.textContent = 'Menghapus...';

  deleteConfirmModal?.classList.add('hidden');
  deleteConfirmModal?.classList.remove('flex');

  if (targetEl) {
    targetEl.setAttribute('disabled', 'true');
    targetEl.classList.add('opacity-50', 'pointer-events-none');
  }

  await deleteDonation(targetId, targetEl);
  btnExecuteDeleteModal.removeAttribute('disabled');
  btnExecuteDeleteModal.textContent = 'Ya, Hapus Transaksi';
});

// Modal Verify Controls
btnCancelVerifyModal?.addEventListener('click', () => {
  verifyConfirmModal?.classList.add('hidden');
  verifyConfirmModal?.classList.remove('flex');
  pendingVerifyId = null;
  pendingVerifyActionEl = null;
});

btnExecuteVerifyModal?.addEventListener('click', async () => {
  if (!pendingVerifyId || !pendingVerifyStatus) return;
  const targetId = pendingVerifyId;
  const targetStatus = pendingVerifyStatus;
  const targetEl = pendingVerifyActionEl;

  btnExecuteVerifyModal.setAttribute('disabled', 'true');
  btnExecuteVerifyModal.textContent = 'Memproses...';

  verifyConfirmModal?.classList.add('hidden');
  verifyConfirmModal?.classList.remove('flex');

  if (targetEl) {
    targetEl.setAttribute('disabled', 'true');
    targetEl.classList.add('opacity-50', 'pointer-events-none');
  }

  await updateVerificationStatus(targetId, targetStatus, targetEl);
  btnExecuteVerifyModal.removeAttribute('disabled');
  btnExecuteVerifyModal.textContent = 'Ya, Konfirmasi';
});

function resetDonationForm() {
  (document.getElementById('inputDonationId') as HTMLInputElement).value = '';
  (document.getElementById('inputKodeTransaksi') as HTMLInputElement).value = '';
  const todayStr = new Date().toISOString().split('T')[0];
  const tglInput = document.getElementById('inputTanggalTransaksi') as HTMLInputElement | null;
  if (tglInput) tglInput.value = todayStr;

  (document.getElementById('inputNamaLengkap') as HTMLInputElement).value = '';
  (document.getElementById('inputNamaTampilan') as HTMLInputElement).value = '';
  (document.getElementById('inputTipeDonatur') as HTMLSelectElement).value = 'individu';
  (document.getElementById('inputNoWhatsapp') as HTMLInputElement).value = '';
  (document.getElementById('inputEmail') as HTMLInputElement).value = '';
  (document.getElementById('inputKotaDomisili') as HTMLInputElement).value = '';
  (document.getElementById('inputProgramTujuan') as HTMLSelectElement).value = 'wakaf';
  (document.getElementById('inputAkadPeruntukan') as HTMLSelectElement).value = 'Wakaf Muabbad (Abadi)';
  (document.getElementById('inputNominal') as HTMLInputElement).value = '';
  (document.getElementById('inputKodeUnik') as HTMLInputElement).value = '0';
  (document.getElementById('inputAtasNamaNiat') as HTMLInputElement).value = '';
  (document.getElementById('inputDoaDonatur') as HTMLTextAreaElement).value = '';
  (document.getElementById('inputSumberLeads') as HTMLSelectElement).value = 'meta_ads';
  (document.getElementById('inputCampaignUtm') as HTMLInputElement).value = '';
  (document.getElementById('inputMetodePembayaran') as HTMLSelectElement).value = 'BSI Transfer';
  (document.getElementById('inputStatusPembayaran') as HTMLSelectElement).value = 'lunas';
  (document.getElementById('inputCatatanTransaksi') as HTMLInputElement).value = '';

  // Reset pilihan label donatur
  document.querySelectorAll('.drawer-label-cb').forEach((cb) => {
    (cb as HTMLInputElement).checked = false;
  });

  if (inputBuktiUrl) inputBuktiUrl.value = '';
  dropzonePreviewView?.classList.add('hidden');
  dropzonePreviewView?.classList.remove('flex');
  dropzoneEmptyView?.classList.remove('hidden');
  dropzoneEmptyView?.classList.add('flex');

  const drawerTitleText = document.getElementById('drawerTitleText');
  if (drawerTitleText) drawerTitleText.textContent = 'Catat Donasi & Profil Donatur Baru';
  const btnSubmitText = document.getElementById('btnSubmitText');
  if (btnSubmitText) btnSubmitText.textContent = 'Simpan Data Donasi';
}

function populateDrawerForEdit(data: any) {
  (document.getElementById('inputDonationId') as HTMLInputElement).value = String(data.id || '');
  (document.getElementById('inputKodeTransaksi') as HTMLInputElement).value = data.kodeTransaksi || '';
  const dateVal = data.tanggalTransaksi || (data.createdAt ? new Date(data.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const tglInput = document.getElementById('inputTanggalTransaksi') as HTMLInputElement | null;
  if (tglInput) tglInput.value = dateVal;

  (document.getElementById('inputNamaLengkap') as HTMLInputElement).value = data.namaLengkap || '';
  (document.getElementById('inputNamaTampilan') as HTMLInputElement).value = data.namaTampilan || '';
  (document.getElementById('inputTipeDonatur') as HTMLSelectElement).value = data.tipeDonatur || 'individu';
  (document.getElementById('inputNoWhatsapp') as HTMLInputElement).value = data.noWhatsapp || '';
  (document.getElementById('inputEmail') as HTMLInputElement).value = data.email || '';
  (document.getElementById('inputKotaDomisili') as HTMLInputElement).value = data.kotaDomisili || '';
  (document.getElementById('inputProgramTujuan') as HTMLSelectElement).value = data.programTujuan || 'wakaf';
  (document.getElementById('inputAkadPeruntukan') as HTMLSelectElement).value = data.akadPeruntukan || 'Wakaf Muabbad (Abadi)';
  (document.getElementById('inputNominal') as HTMLInputElement).value = String(data.nominal || '');
  (document.getElementById('inputKodeUnik') as HTMLInputElement).value = String(data.kodeUnik || 0);
  (document.getElementById('inputAtasNamaNiat') as HTMLInputElement).value = data.atasNamaNiat || '';
  (document.getElementById('inputDoaDonatur') as HTMLTextAreaElement).value = data.doaDonatur || '';
  (document.getElementById('inputSumberLeads') as HTMLSelectElement).value = data.sumberLeads || 'relasi_langsung';
  (document.getElementById('inputCampaignUtm') as HTMLInputElement).value = data.campaignUtm || '';
  (document.getElementById('inputMetodePembayaran') as HTMLSelectElement).value = data.metodePembayaran || 'BSI Transfer';
  (document.getElementById('inputStatusPembayaran') as HTMLSelectElement).value = data.statusPembayaran || 'menunggu_verifikasi';
  (document.getElementById('inputCatatanTransaksi') as HTMLInputElement).value = data.catatanTransaksi || '';

  if (data.buktiTransferUrl) {
    if (inputBuktiUrl) inputBuktiUrl.value = data.buktiTransferUrl;
    if (uploadedProofPreview) uploadedProofPreview.src = data.buktiTransferUrl;
    if (uploadedFileName) uploadedFileName.textContent = 'Bukti Tersimpan di S3';
    dropzoneEmptyView?.classList.add('hidden');
    dropzoneEmptyView?.classList.remove('flex');
    dropzonePreviewView?.classList.remove('hidden');
    dropzonePreviewView?.classList.add('flex');
  } else {
    if (inputBuktiUrl) inputBuktiUrl.value = '';
    dropzonePreviewView?.classList.add('hidden');
    dropzonePreviewView?.classList.remove('flex');
    dropzoneEmptyView?.classList.remove('hidden');
    dropzoneEmptyView?.classList.add('flex');
  }

  const drawerTitleText = document.getElementById('drawerTitleText');
  if (drawerTitleText) drawerTitleText.textContent = `Edit Data Donasi #${data.id} (${data.namaLengkap})`;
  const btnSubmitText = document.getElementById('btnSubmitText');
  if (btnSubmitText) btnSubmitText.textContent = 'Perbarui Data Donasi';

  // Populate checked label donatur
  const activeLabelIds = (data.labelIds || []).map((id: any) => String(id));
  document.querySelectorAll('.drawer-label-cb').forEach((cb) => {
    const input = cb as HTMLInputElement;
    input.checked = activeLabelIds.includes(input.value);
  });
}

async function updateVerificationStatus(donationId: number, status: string, actionEl?: HTMLElement | null) {
  try {
    const res = await fetch('/api/admin/donatur/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donationId, status }),
    });
    const data = await res.json().catch(() => ({ success: false, error: 'Respon server tidak valid' }));
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Gagal mengubah status di database');
    }
    reloadToDonaturTab();
  } catch (err: any) {
    alert(`Gagal verifikasi: ${err.message}`);
    if (actionEl) {
      actionEl.removeAttribute('disabled');
      actionEl.classList.remove('opacity-50', 'pointer-events-none');
    }
  }
}

async function deleteDonation(donationId: number, actionEl?: HTMLElement | null) {
  try {
    const res = await fetch('/api/admin/donatur/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donationId }),
    });
    const data = await res.json().catch(() => ({ success: false, error: 'Respon server tidak valid' }));
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Gagal menghapus transaksi dari database');
    }
    reloadToDonaturTab();
  } catch (err: any) {
    alert(`Gagal menghapus: ${err.message}`);
    if (actionEl) {
      actionEl.removeAttribute('disabled');
      actionEl.classList.remove('opacity-50', 'pointer-events-none');
    }
  }
}

// 7. PROOF PREVIEW MODAL
document.querySelectorAll('.btn-view-proof').forEach((btn) => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-proof-url');
    const kode = btn.getAttribute('data-kode');
    if (!url) return;

    if (proofImageElement) proofImageElement.src = url;
    if (proofCodeBadge) proofCodeBadge.textContent = kode || '';
    if (proofExternalLink) proofExternalLink.href = url;

    proofModal?.classList.remove('hidden');
    proofModal?.classList.add('flex');
  });
});

function closeProofModal() {
  proofModal?.classList.add('hidden');
  proofModal?.classList.remove('flex');
}
btnCloseProof?.addEventListener('click', closeProofModal);
proofModal?.addEventListener('click', (e) => {
  if (e.target === proofModal) closeProofModal();
});

// ==========================================
// TAB NAVIGATION & SWITCHING
// ==========================================
const tabBtnDonatur = document.getElementById('tabBtnDonatur');
const tabBtnTransaksi = document.getElementById('tabBtnTransaksi');
const tabBtnAlokasi = document.getElementById('tabBtnAlokasi');
const tabContentDonatur = document.getElementById('tabContentDonatur');
const tabContentTransaksi = document.getElementById('tabContentTransaksi');
const tabContentAlokasi = document.getElementById('tabContentAlokasi');
const btnOpenCreateAlokasiHeader = document.getElementById('btnOpenCreateAlokasiHeader');

function switchTab(activeTab: 'donatur' | 'transaksi' | 'alokasi', updateUrl = true) {
  const tabs: Array<{
    key: 'donatur' | 'transaksi' | 'alokasi';
    btn: HTMLElement | null;
    content: HTMLElement | null;
  }> = [
    { key: 'donatur', btn: tabBtnDonatur, content: tabContentDonatur },
    { key: 'transaksi', btn: tabBtnTransaksi, content: tabContentTransaksi },
    { key: 'alokasi', btn: tabBtnAlokasi, content: tabContentAlokasi },
  ];

  tabs.forEach(({ key, btn, content }) => {
    const isActive = key === activeTab;
    content?.classList.toggle('hidden', !isActive);
    if (isActive) {
      btn?.classList.add('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
      btn?.classList.remove('border-transparent', 'text-slate-500');
    } else {
      btn?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
      btn?.classList.add('border-transparent', 'text-slate-500');
    }
  });

  if (updateUrl) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      url.hash = `tab=${activeTab}`;
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {}
  }
  try { localStorage.setItem('gvf_admin_donatur_active_tab', activeTab); } catch (e) {}
}

function reloadToAlokasiTab() {
  try { localStorage.setItem('gvf_admin_donatur_active_tab', 'alokasi'); } catch (e) {}
  const url = new URL(window.location.href);
  url.searchParams.set('tab', 'alokasi');
  url.hash = 'tab=alokasi';
  window.location.href = url.pathname + url.search + url.hash;
}

function reloadToDonaturTab() {
  try { localStorage.setItem('gvf_admin_donatur_active_tab', 'donatur'); } catch (e) {}
  const url = new URL(window.location.href);
  url.searchParams.set('tab', 'donatur');
  url.hash = 'tab=donatur';
  window.location.href = url.pathname + url.search + url.hash;
}

function reloadToTransaksiTab() {
  try { localStorage.setItem('gvf_admin_donatur_active_tab', 'transaksi'); } catch (e) {}
  const url = new URL(window.location.href);
  url.searchParams.set('tab', 'transaksi');
  url.hash = 'tab=transaksi';
  window.location.href = url.pathname + url.search + url.hash;
}

tabBtnDonatur?.addEventListener('click', () => switchTab('donatur'));
tabBtnTransaksi?.addEventListener('click', () => switchTab('transaksi'));
tabBtnAlokasi?.addEventListener('click', () => switchTab('alokasi'));

// Search filter, calendar date range, manual CRUD & bulk selection for Transaksi Masuk tab
const transaksiSearchInput = document.getElementById('transaksiSearchInput') as HTMLInputElement | null;
const transaksiDateStart = document.getElementById('transaksiDateStart') as HTMLInputElement | null;
const transaksiDateEnd = document.getElementById('transaksiDateEnd') as HTMLInputElement | null;
const transaksiPeriodPills = document.querySelectorAll('.transaksi-period-pill') as NodeListOf<HTMLButtonElement>;
const btnOpenCreateTransaksi = document.getElementById('btnOpenCreateTransaksi');
const transaksiVisibleCount = document.getElementById('transaksiVisibleCount');
const transaksiCheckAll = document.getElementById('transaksiCheckAll') as HTMLInputElement | null;
const transaksiBulkBar = document.getElementById('transaksiBulkBar');
const transaksiSelectedCount = document.getElementById('transaksiSelectedCount');
const btnBulkRejectTransaksi = document.getElementById('btnBulkRejectTransaksi') as HTMLButtonElement | null;
const btnBulkDeleteTransaksi = document.getElementById('btnBulkDeleteTransaksi') as HTMLButtonElement | null;

btnOpenCreateTransaksi?.addEventListener('click', () => {
  resetDonationForm();
  const statusSelect = document.getElementById('inputStatusPembayaran') as HTMLSelectElement | null;
  if (statusSelect) statusSelect.value = 'menunggu_verifikasi';
  openDrawer();
});

function syncTransaksiSelection() {
  const checkedBoxes = Array.from(document.querySelectorAll('.transaksi-row-check:checked')) as HTMLInputElement[];
  const visibleBoxes = Array.from(document.querySelectorAll('.transaksi-row:not(.hidden) .transaksi-row-check')) as HTMLInputElement[];
  const count = checkedBoxes.length;

  if (transaksiSelectedCount) transaksiSelectedCount.textContent = String(count);
  if (transaksiBulkBar) {
    transaksiBulkBar.classList.toggle('hidden', count === 0);
    transaksiBulkBar.classList.toggle('flex', count > 0);
  }
  if (transaksiCheckAll) {
    transaksiCheckAll.checked = visibleBoxes.length > 0 && visibleBoxes.every((cb) => cb.checked);
    transaksiCheckAll.indeterminate = count > 0 && !transaksiCheckAll.checked;
  }
}

function applyTransaksiFilters() {
  const q = (transaksiSearchInput?.value || '').trim().toLowerCase();
  const startYmd = transaksiDateStart?.value || '';
  const endYmd = transaksiDateEnd?.value || '';
  let visible = 0;
  document.querySelectorAll('.transaksi-row').forEach((row) => {
    const searchStr = row.getAttribute('data-search') || '';
    const searchMatch = !q || searchStr.includes(q);
    const periodMatch = matchesDateRange(row.getAttribute('data-created'), startYmd, endYmd);
    const match = searchMatch && periodMatch;
    row.classList.toggle('hidden', !match);
    if (!match) {
      const cb = row.querySelector('.transaksi-row-check') as HTMLInputElement | null;
      if (cb) cb.checked = false;
    } else {
      visible += 1;
    }
  });
  if (transaksiVisibleCount) transaksiVisibleCount.textContent = String(visible);
  syncTransaksiSelection();
}

transaksiSearchInput?.addEventListener('input', applyTransaksiFilters);
transaksiPeriodPills.forEach((btn) => {
  btn.addEventListener('click', () => {
    const period = btn.dataset.period || 'all';
    const range = getPresetDateRange(period);
    if (transaksiDateStart) transaksiDateStart.value = range.start;
    if (transaksiDateEnd) transaksiDateEnd.value = range.end;
    setActivePeriodPill(transaksiPeriodPills, period);
    applyTransaksiFilters();
  });
});
[transaksiDateStart, transaksiDateEnd].forEach((inp) => {
  inp?.addEventListener('change', () => {
    const hasCustom = Boolean(transaksiDateStart?.value || transaksiDateEnd?.value);
    setActivePeriodPill(transaksiPeriodPills, hasCustom ? '' : 'all');
    applyTransaksiFilters();
  });
});

transaksiCheckAll?.addEventListener('change', () => {
  const checked = transaksiCheckAll.checked;
  document.querySelectorAll('.transaksi-row:not(.hidden) .transaksi-row-check').forEach((el) => {
    (el as HTMLInputElement).checked = checked;
  });
  syncTransaksiSelection();
});

document.addEventListener('change', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('transaksi-row-check')) {
    syncTransaksiSelection();
  }
});

const bulkTransaksiConfirmModal = document.getElementById('bulkTransaksiConfirmModal');
const bulkTransaksiModalIcon = document.getElementById('bulkTransaksiModalIcon');
const bulkTransaksiModalTitle = document.getElementById('bulkTransaksiModalTitle');
const bulkTransaksiModalDesc = document.getElementById('bulkTransaksiModalDesc');
const btnCancelBulkTransaksiModal = document.getElementById('btnCancelBulkTransaksiModal');
const btnExecuteBulkTransaksiModal = document.getElementById('btnExecuteBulkTransaksiModal') as HTMLButtonElement | null;

let pendingBulkTransaksiAction: 'reject' | 'delete' | null = null;
let pendingBulkTransaksiIds: number[] = [];

function openBulkTransaksiModal(action: 'reject' | 'delete') {
  const ids = Array.from(document.querySelectorAll('.transaksi-row-check:checked'))
    .map((el) => Number((el as HTMLInputElement).value))
    .filter((n) => Number.isInteger(n) && n > 0);
  if (ids.length === 0) return;

  pendingBulkTransaksiAction = action;
  pendingBulkTransaksiIds = ids;

  if (bulkTransaksiModalTitle) {
    bulkTransaksiModalTitle.textContent =
      action === 'reject'
        ? `Tolak ${ids.length} Transaksi Terpilih?`
        : `Hapus Permanen ${ids.length} Transaksi?`;
  }
  if (bulkTransaksiModalDesc) {
    bulkTransaksiModalDesc.textContent =
      action === 'reject'
        ? `${ids.length} transaksi terpilih akan ditandai sebagai DIBATALKAN dan dikeluarkan dari daftar menunggu approve.`
        : `${ids.length} transaksi terpilih akan dihapus permanen dari database. Tindakan ini tidak bisa dibatalkan.`;
  }
  if (bulkTransaksiModalIcon) {
    bulkTransaksiModalIcon.className =
      action === 'reject'
        ? 'w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0'
        : 'w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0';
  }
  if (btnExecuteBulkTransaksiModal) {
    btnExecuteBulkTransaksiModal.className =
      action === 'reject'
        ? 'h-8 px-3 rounded-md bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors cursor-pointer shadow-2xs'
        : 'h-8 px-3 rounded-md bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer shadow-2xs';
    btnExecuteBulkTransaksiModal.textContent = action === 'reject' ? 'Ya, Tolak Terpilih' : 'Ya, Hapus Masal';
  }

  bulkTransaksiConfirmModal?.classList.remove('hidden');
  bulkTransaksiConfirmModal?.classList.add('flex');
}

btnCancelBulkTransaksiModal?.addEventListener('click', () => {
  bulkTransaksiConfirmModal?.classList.add('hidden');
  bulkTransaksiConfirmModal?.classList.remove('flex');
  pendingBulkTransaksiAction = null;
  pendingBulkTransaksiIds = [];
});

btnExecuteBulkTransaksiModal?.addEventListener('click', async () => {
  if (!pendingBulkTransaksiAction || pendingBulkTransaksiIds.length === 0) return;
  const action = pendingBulkTransaksiAction;
  const ids = [...pendingBulkTransaksiIds];

  btnExecuteBulkTransaksiModal.disabled = true;
  btnExecuteBulkTransaksiModal.textContent = 'Memproses...';
  if (btnBulkRejectTransaksi) btnBulkRejectTransaksi.disabled = true;
  if (btnBulkDeleteTransaksi) btnBulkDeleteTransaksi.disabled = true;

  try {
    const res = await fetch('/api/admin/donatur/bulk-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, action }),
    });
    const data = await res.json().catch(() => ({ success: false, error: 'Respon server tidak valid' }));
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Gagal menjalankan aksi masal');
    }
    reloadToTransaksiTab();
  } catch (err: any) {
    alert(`Gagal: ${err.message}`);
    btnExecuteBulkTransaksiModal.disabled = false;
    btnExecuteBulkTransaksiModal.textContent = action === 'reject' ? 'Ya, Tolak Terpilih' : 'Ya, Hapus Masal';
    if (btnBulkRejectTransaksi) btnBulkRejectTransaksi.disabled = false;
    if (btnBulkDeleteTransaksi) btnBulkDeleteTransaksi.disabled = false;
    bulkTransaksiConfirmModal?.classList.add('hidden');
    bulkTransaksiConfirmModal?.classList.remove('flex');
  }
});

btnBulkRejectTransaksi?.addEventListener('click', () => openBulkTransaksiModal('reject'));
btnBulkDeleteTransaksi?.addEventListener('click', () => openBulkTransaksiModal('delete'));

// Header quick button
btnOpenCreateAlokasiHeader?.addEventListener('click', () => {
  switchTab('alokasi');
  resetAlokasiForm('kredit');
  openAlokasiDrawer();
});

// Check initial search param, hash or localStorage on load
let savedDonaturTab = 'donatur';
try {
  savedDonaturTab = localStorage.getItem('gvf_admin_donatur_active_tab') || 'donatur';
} catch (e) {}

const donaturUrlParams = new URLSearchParams(window.location.search);
const donaturHash = window.location.hash;

if (donaturUrlParams.get('tab') === 'alokasi' || donaturHash.includes('alokasi') || (!donaturUrlParams.has('tab') && savedDonaturTab === 'alokasi')) {
  switchTab('alokasi', false);
} else if (donaturUrlParams.get('tab') === 'transaksi' || donaturHash.includes('transaksi') || (!donaturUrlParams.has('tab') && savedDonaturTab === 'transaksi')) {
  switchTab('transaksi', false);
} else {
  switchTab('donatur', false);
}

// ==========================================
// ALOKASI KAS: DRAWER, MODAL & FORM
// ==========================================
const alokasiDrawerBackdrop = document.getElementById('alokasiDrawerBackdrop');
const alokasiDrawerBox = document.getElementById('alokasiDrawerBox');
const btnCloseAlokasiDrawer = document.getElementById('btnCloseAlokasiDrawer');
const btnCancelAlokasiDrawer = document.getElementById('btnCancelAlokasiDrawer');
const btnSubmitAlokasi = document.getElementById('btnSubmitAlokasi');
const alokasiDrawerTitleText = document.getElementById('alokasiDrawerTitleText');

const btnOpenCreateDebitAlokasi = document.getElementById('btnOpenCreateDebitAlokasi');
const btnOpenCreateKreditAlokasi = document.getElementById('btnOpenCreateKreditAlokasi');

const inputAlokasiId = document.getElementById('inputAlokasiId') as HTMLInputElement | null;
const alokasiJenisDebit = document.getElementById('alokasiJenisDebit') as HTMLInputElement | null;
const alokasiJenisKredit = document.getElementById('alokasiJenisKredit') as HTMLInputElement | null;
const inputAlokasiProgram = document.getElementById('inputAlokasiProgram') as HTMLSelectElement | null;
const inputAlokasiTanggal = document.getElementById('inputAlokasiTanggal') as HTMLInputElement | null;
const inputAlokasiPos = document.getElementById('inputAlokasiPos') as HTMLInputElement | null;
const inputAlokasiNominal = document.getElementById('inputAlokasiNominal') as HTMLInputElement | null;
const inputAlokasiUraian = document.getElementById('inputAlokasiUraian') as HTMLTextAreaElement | null;
const inputAlokasiPic = document.getElementById('inputAlokasiPic') as HTMLInputElement | null;
const inputAlokasiNotaUrl = document.getElementById('inputAlokasiNotaUrl') as HTMLInputElement | null;

// Alokasi Dropzone
const alokasiDropzoneContainer = document.getElementById('alokasiDropzoneContainer');
const alokasiNotaFileInput = document.getElementById('alokasiNotaFileInput') as HTMLInputElement | null;
const alokasiDropzoneEmpty = document.getElementById('alokasiDropzoneEmpty');
const alokasiDropzoneUploading = document.getElementById('alokasiDropzoneUploading');
const alokasiDropzonePreview = document.getElementById('alokasiDropzonePreview');
const alokasiUploadedPreview = document.getElementById('alokasiUploadedPreview') as HTMLImageElement | null;
const alokasiUploadedFileName = document.getElementById('alokasiUploadedFileName');
const btnRemoveAlokasiNota = document.getElementById('btnRemoveAlokasiNota');

function openAlokasiDrawer() {
  if (!alokasiDrawerBackdrop || !alokasiDrawerBox) return;
  alokasiDrawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
  alokasiDrawerBox.classList.remove('translate-x-full');
  alokasiDrawerBox.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden';
}

function closeAlokasiDrawer() {
  if (!alokasiDrawerBackdrop || !alokasiDrawerBox) return;
  alokasiDrawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
  alokasiDrawerBox.classList.remove('translate-x-0');
  alokasiDrawerBox.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

function resetAlokasiForm(defaultJenis: 'debit' | 'kredit' = 'kredit') {
  if (inputAlokasiId) inputAlokasiId.value = '';
  if (defaultJenis === 'debit') {
    if (alokasiJenisDebit) alokasiJenisDebit.checked = true;
    if (alokasiDrawerTitleText) alokasiDrawerTitleText.textContent = 'Catat Kas Masuk (Debit)';
  } else {
    if (alokasiJenisKredit) alokasiJenisKredit.checked = true;
    if (alokasiDrawerTitleText) alokasiDrawerTitleText.textContent = 'Catat Realisasi Belanja / Mutasi Kas';
  }

  if (inputAlokasiTanggal) inputAlokasiTanggal.value = new Date().toISOString().split('T')[0];
  if (inputAlokasiPos) inputAlokasiPos.value = '';
  if (inputAlokasiNominal) inputAlokasiNominal.value = '';
  if (inputAlokasiUraian) inputAlokasiUraian.value = '';
  if (inputAlokasiPic) inputAlokasiPic.value = '';
  if (inputAlokasiNotaUrl) inputAlokasiNotaUrl.value = '';

  alokasiDropzonePreview?.classList.add('hidden');
  alokasiDropzonePreview?.classList.remove('flex');
  alokasiDropzoneUploading?.classList.add('hidden');
  alokasiDropzoneUploading?.classList.remove('flex');
  alokasiDropzoneEmpty?.classList.remove('hidden');
  alokasiDropzoneEmpty?.classList.add('flex');

  const btnSubmitAlokasiText = document.getElementById('btnSubmitAlokasiText');
  if (btnSubmitAlokasiText) btnSubmitAlokasiText.textContent = 'Simpan Transaksi Kas';
}

btnCloseAlokasiDrawer?.addEventListener('click', closeAlokasiDrawer);
btnCancelAlokasiDrawer?.addEventListener('click', closeAlokasiDrawer);
alokasiDrawerBackdrop?.addEventListener('click', (e) => {
  if (e.target === alokasiDrawerBackdrop) closeAlokasiDrawer();
});

btnOpenCreateDebitAlokasi?.addEventListener('click', () => {
  resetAlokasiForm('debit');
  openAlokasiDrawer();
});

btnOpenCreateKreditAlokasi?.addEventListener('click', () => {
  resetAlokasiForm('kredit');
  openAlokasiDrawer();
});

// Alokasi Dropzone handlers
alokasiDropzoneContainer?.addEventListener('click', () => {
  alokasiNotaFileInput?.click();
});

alokasiNotaFileInput?.addEventListener('change', (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) handleAlokasiNotaUpload(file);
});

btnRemoveAlokasiNota?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (inputAlokasiNotaUrl) inputAlokasiNotaUrl.value = '';
  if (alokasiNotaFileInput) alokasiNotaFileInput.value = '';
  alokasiDropzonePreview?.classList.add('hidden');
  alokasiDropzonePreview?.classList.remove('flex');
  alokasiDropzoneEmpty?.classList.remove('hidden');
  alokasiDropzoneEmpty?.classList.add('flex');
});

async function handleAlokasiNotaUpload(file: File) {
  alokasiDropzoneEmpty?.classList.add('hidden');
  alokasiDropzoneEmpty?.classList.remove('flex');
  alokasiDropzonePreview?.classList.add('hidden');
  alokasiDropzonePreview?.classList.remove('flex');
  alokasiDropzoneUploading?.classList.remove('hidden');
  alokasiDropzoneUploading?.classList.add('flex');

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/donatur/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.message || 'Gagal mengunggah nota ke S3');
    }

    if (inputAlokasiNotaUrl) inputAlokasiNotaUrl.value = result.url;
    if (alokasiUploadedPreview) alokasiUploadedPreview.src = result.url;
    if (alokasiUploadedFileName) alokasiUploadedFileName.textContent = file.name;

    alokasiDropzoneUploading?.classList.add('hidden');
    alokasiDropzoneUploading?.classList.remove('flex');
    alokasiDropzonePreview?.classList.remove('hidden');
    alokasiDropzonePreview?.classList.add('flex');
  } catch (err: any) {
    alert(`Gagal upload nota: ${err.message}`);
    alokasiDropzoneUploading?.classList.add('hidden');
    alokasiDropzoneUploading?.classList.remove('flex');
    alokasiDropzoneEmpty?.classList.remove('hidden');
    alokasiDropzoneEmpty?.classList.add('flex');
  }
}

// Alokasi Form Submit
btnSubmitAlokasi?.addEventListener('click', async () => {
  const id = inputAlokasiId?.value;
  const isEditMode = Boolean(id);
  const jenisTransaksi = alokasiJenisDebit?.checked ? 'debit' : 'kredit';
  const program = inputAlokasiProgram?.value;
  const tanggalTransaksi = inputAlokasiTanggal?.value;
  const posAnggaran = inputAlokasiPos?.value.trim();
  const nominal = Number(inputAlokasiNominal?.value);
  const uraian = inputAlokasiUraian?.value.trim();
  const pic = inputAlokasiPic?.value.trim();
  const buktiNotaUrl = inputAlokasiNotaUrl?.value || undefined;

  if (!program || !posAnggaran || !nominal || isNaN(nominal) || nominal <= 0 || !uraian) {
    alert('Mohon lengkapi Program, Pos Anggaran, Nominal (>0), dan Uraian belanja.');
    return;
  }

  btnSubmitAlokasi.setAttribute('disabled', 'true');
  const submitTextEl = document.getElementById('btnSubmitAlokasiText');
  if (submitTextEl) submitTextEl.textContent = isEditMode ? 'Memperbarui...' : 'Menyimpan...';

  try {
    const endpoint = isEditMode ? '/api/admin/alokasi/update' : '/api/admin/alokasi/create';
    const payload: any = {
      jenisTransaksi,
      program,
      tanggalTransaksi,
      posAnggaran,
      nominal,
      uraian,
      pic,
      buktiNotaUrl,
    };

    if (isEditMode) {
      payload.id = Number(id);
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Gagal menyimpan transaksi kas');
    }

    reloadToAlokasiTab();
  } catch (err: any) {
    alert(`Terjadi kesalahan: ${err.message}`);
    btnSubmitAlokasi.removeAttribute('disabled');
    if (submitTextEl) submitTextEl.textContent = isEditMode ? 'Perbarui Transaksi Kas' : 'Simpan Transaksi Kas';
  }
});

// Alokasi Realtime Filter with Pagination
const alokasiSearchInput = document.getElementById('alokasiSearchInput') as HTMLInputElement | null;
const alokasiFilterProgram = document.getElementById('alokasiFilterProgram') as HTMLSelectElement | null;
const alokasiFilterJenis = document.getElementById('alokasiFilterJenis') as HTMLSelectElement | null;
const alokasiBtnResetFilters = document.getElementById('alokasiBtnResetFilters');
const alokasiRows = document.querySelectorAll('.alokasi-row') as NodeListOf<HTMLTableRowElement>;
const emptyAlokasiRow = document.getElementById('emptyAlokasiRow');

const alokasiPerPageSelect = document.getElementById('alokasiPerPage') as HTMLSelectElement | null;
const alokasiTotalCount = document.getElementById('alokasiTotalCount');
const alokasiRangeText = document.getElementById('alokasiRangeText');
const btnAlokasiPrevPage = document.getElementById('btnAlokasiPrevPage') as HTMLButtonElement | null;
const btnAlokasiNextPage = document.getElementById('btnAlokasiNextPage') as HTMLButtonElement | null;
const alokasiPageNumbers = document.getElementById('alokasiPageNumbers');

let alokasiCurrentPage = 1;
let alokasiMatchedRows: HTMLTableRowElement[] = [];

function renderAlokasiPagination() {
  const rawPageSize = alokasiPerPageSelect?.value || '25';
  const isAll = rawPageSize === 'all';
  const pageSize = isAll ? Math.max(1, alokasiMatchedRows.length) : parseInt(rawPageSize, 10);
  const totalItems = alokasiMatchedRows.length;
  const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalItems / pageSize));

  if (alokasiCurrentPage > totalPages) alokasiCurrentPage = totalPages;
  if (alokasiCurrentPage < 1) alokasiCurrentPage = 1;

  // Sembunyikan semua row dahulu
  alokasiRows.forEach(r => { r.style.display = 'none'; });

  // Tampilkan hanya baris untuk halaman saat ini
  const startIdx = (alokasiCurrentPage - 1) * pageSize;
  const endIdx = isAll ? totalItems : Math.min(startIdx + pageSize, totalItems);

  for (let i = startIdx; i < endIdx; i++) {
    if (alokasiMatchedRows[i]) {
      alokasiMatchedRows[i].style.display = '';
    }
  }

  if (emptyAlokasiRow) {
    emptyAlokasiRow.style.display = totalItems === 0 ? '' : 'none';
  }

  // Perbarui teks info count & range
  if (alokasiTotalCount) alokasiTotalCount.textContent = String(totalItems);
  if (alokasiRangeText) {
    if (totalItems === 0) {
      alokasiRangeText.textContent = '(0 ditampilkan)';
    } else {
      alokasiRangeText.textContent = `(Baris ${startIdx + 1} - ${endIdx})`;
    }
  }

  // Tombol Prev / Next
  if (btnAlokasiPrevPage) btnAlokasiPrevPage.disabled = alokasiCurrentPage <= 1;
  if (btnAlokasiNextPage) btnAlokasiNextPage.disabled = alokasiCurrentPage >= totalPages;

  // Render Tombol Nomor Halaman
  if (alokasiPageNumbers) {
    alokasiPageNumbers.innerHTML = '';
    if (totalPages <= 1) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'h-8 w-8 rounded-md text-xs font-semibold bg-[#0969da] text-white flex items-center justify-center cursor-default';
      btn.textContent = '1';
      alokasiPageNumbers.appendChild(btn);
    } else {
      const pages = getSmartPaginationRange(alokasiCurrentPage, totalPages);
      pages.forEach((p) => {
        if (p === '...') {
          const span = document.createElement('span');
          span.className = 'px-1 text-slate-400 font-bold select-none';
          span.textContent = '...';
          alokasiPageNumbers.appendChild(span);
        } else {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `h-8 w-8 rounded-md text-xs font-semibold transition-colors shadow-2xs flex items-center justify-center cursor-pointer ${
            Number(p) === alokasiCurrentPage
              ? 'bg-[#0969da] text-white font-bold'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
          }`;
          btn.textContent = String(p);
          btn.addEventListener('click', () => {
            alokasiCurrentPage = Number(p);
            renderAlokasiPagination();
          });
          alokasiPageNumbers.appendChild(btn);
        }
      });
    }
  }
}

function applyAlokasiFilters() {
  const q = (alokasiSearchInput?.value || '').toLowerCase().trim();
  const pg = alokasiFilterProgram?.value || 'all';
  const jn = alokasiFilterJenis?.value || 'all';

  alokasiMatchedRows = [];

  alokasiRows.forEach((row) => {
    const rowSearch = row.getAttribute('data-search') || '';
    const rowProgram = row.getAttribute('data-program') || '';
    const rowJenis = row.getAttribute('data-jenis') || '';

    const matchSearch = !q || rowSearch.includes(q);
    const matchProgram = pg === 'all' || rowProgram === pg;
    const matchJenis = jn === 'all' || rowJenis === jn;

    if (matchSearch && matchProgram && matchJenis) {
      alokasiMatchedRows.push(row);
    }
  });

  alokasiCurrentPage = 1;
  renderAlokasiPagination();
}

btnAlokasiPrevPage?.addEventListener('click', () => {
  if (alokasiCurrentPage > 1) {
    alokasiCurrentPage--;
    renderAlokasiPagination();
  }
});

btnAlokasiNextPage?.addEventListener('click', () => {
  alokasiCurrentPage++;
  renderAlokasiPagination();
});

alokasiPerPageSelect?.addEventListener('change', () => {
  alokasiCurrentPage = 1;
  renderAlokasiPagination();
});

alokasiSearchInput?.addEventListener('input', applyAlokasiFilters);
alokasiFilterProgram?.addEventListener('change', applyAlokasiFilters);
alokasiFilterJenis?.addEventListener('change', applyAlokasiFilters);

alokasiBtnResetFilters?.addEventListener('click', () => {
  if (alokasiSearchInput) alokasiSearchInput.value = '';
  if (alokasiFilterProgram) alokasiFilterProgram.value = 'all';
  if (alokasiFilterJenis) alokasiFilterJenis.value = 'all';
  if (alokasiPerPageSelect) alokasiPerPageSelect.value = '25';
  applyAlokasiFilters();
});

// Inisialisasi awal alokasi pagination
applyAlokasiFilters();

// Alokasi Table Actions (Edit & Delete)
const deleteAlokasiModal = document.getElementById('deleteAlokasiModal');
const deleteTargetAlokasiKode = document.getElementById('deleteTargetAlokasiKode');
const btnCancelDeleteAlokasiModal = document.getElementById('btnCancelDeleteAlokasiModal');
const btnExecuteDeleteAlokasiModal = document.getElementById('btnExecuteDeleteAlokasiModal');

let pendingDeleteAlokasiId: number | null = null;

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest('button');
  if (!btn) return;

  const action = btn.getAttribute('data-action');
  if (action === 'edit-alokasi') {
    const rawJson = btn.getAttribute('data-json');
    if (!rawJson) return;
    try {
      const data = JSON.parse(rawJson);
      if (inputAlokasiId) inputAlokasiId.value = String(data.id);
      if (data.jenisTransaksi === 'debit') {
        if (alokasiJenisDebit) alokasiJenisDebit.checked = true;
      } else {
        if (alokasiJenisKredit) alokasiJenisKredit.checked = true;
      }
      if (inputAlokasiProgram) inputAlokasiProgram.value = data.program.toLowerCase();
      if (inputAlokasiTanggal && data.tanggalTransaksi) inputAlokasiTanggal.value = data.tanggalTransaksi;
      if (inputAlokasiPos) inputAlokasiPos.value = data.posAnggaran;
      if (inputAlokasiNominal) inputAlokasiNominal.value = String(data.nominal);
      if (inputAlokasiUraian) inputAlokasiUraian.value = data.uraian;
      if (inputAlokasiPic) inputAlokasiPic.value = data.pic || '';

      if (data.buktiNotaUrl) {
        if (inputAlokasiNotaUrl) inputAlokasiNotaUrl.value = data.buktiNotaUrl;
        if (alokasiUploadedPreview) alokasiUploadedPreview.src = data.buktiNotaUrl;
        if (alokasiUploadedFileName) alokasiUploadedFileName.textContent = 'Nota Tersimpan di S3';
        alokasiDropzoneEmpty?.classList.add('hidden');
        alokasiDropzoneEmpty?.classList.remove('flex');
        alokasiDropzonePreview?.classList.remove('hidden');
        alokasiDropzonePreview?.classList.add('flex');
      } else {
        if (inputAlokasiNotaUrl) inputAlokasiNotaUrl.value = '';
        alokasiDropzonePreview?.classList.add('hidden');
        alokasiDropzonePreview?.classList.remove('flex');
        alokasiDropzoneEmpty?.classList.remove('hidden');
        alokasiDropzoneEmpty?.classList.add('flex');
      }

      if (alokasiDrawerTitleText) alokasiDrawerTitleText.textContent = `Edit Catatan Kas #${data.id}`;
      const submitTextEl = document.getElementById('btnSubmitAlokasiText');
      if (submitTextEl) submitTextEl.textContent = 'Perbarui Transaksi Kas';

      openAlokasiDrawer();
    } catch (err) {
      console.error('Error parsing alokasi data:', err);
    }
  } else if (action === 'delete-alokasi') {
    const id = btn.getAttribute('data-id');
    const kode = btn.getAttribute('data-kode');
    if (!id) return;
    pendingDeleteAlokasiId = Number(id);
    if (deleteTargetAlokasiKode) deleteTargetAlokasiKode.textContent = kode || `#${id}`;
    deleteAlokasiModal?.classList.remove('hidden');
    deleteAlokasiModal?.classList.add('flex');
  }
});

btnCancelDeleteAlokasiModal?.addEventListener('click', () => {
  deleteAlokasiModal?.classList.add('hidden');
  deleteAlokasiModal?.classList.remove('flex');
  pendingDeleteAlokasiId = null;
});

btnExecuteDeleteAlokasiModal?.addEventListener('click', async () => {
  if (!pendingDeleteAlokasiId) return;
  btnExecuteDeleteAlokasiModal.setAttribute('disabled', 'true');
  btnExecuteDeleteAlokasiModal.textContent = 'Menghapus...';

  try {
    const res = await fetch('/api/admin/alokasi/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: pendingDeleteAlokasiId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Gagal menghapus transaksi');
    }

    reloadToAlokasiTab();
  } catch (err: any) {
    alert(`Gagal menghapus: ${err.message}`);
    btnExecuteDeleteAlokasiModal.removeAttribute('disabled');
    btnExecuteDeleteAlokasiModal.textContent = 'Ya, Hapus Transaksi';
  }
});

// Alokasi Proof Modal View
document.querySelectorAll('.btn-view-alokasi-proof').forEach((btn) => {
  btn.addEventListener('click', () => {
    const url = btn.getAttribute('data-proof-url');
    const kode = btn.getAttribute('data-kode');
    if (!url) return;

    if (proofImageElement) proofImageElement.src = url;
    if (proofCodeBadge) proofCodeBadge.textContent = kode || '';
    if (proofExternalLink) proofExternalLink.href = url;

    proofModal?.classList.remove('hidden');
    proofModal?.classList.add('flex');
  });
});

// ==========================================
// 12. FITUR CRUD LABEL DONATUR (MODAL & REALTIME)
// ==========================================
const btnOpenLabelsModal = document.getElementById('btnOpenLabelsModal');
const labelsCrudModal = document.getElementById('labelsCrudModal');
const btnCloseLabelsModal = document.getElementById('btnCloseLabelsModal');
const btnCloseLabelsModalFooter = document.getElementById('btnCloseLabelsModalFooter');
const labelsTableBody = document.getElementById('labelsTableBody');
const labelsTotalCount = document.getElementById('labelsTotalCount');
const headerLabelsCount = document.getElementById('headerLabelsCount');

const labelFormTitle = document.getElementById('labelFormTitle');
const btnCancelEditLabel = document.getElementById('btnCancelEditLabel');
const inputLabelId = document.getElementById('inputLabelId') as HTMLInputElement | null;
const inputLabelNama = document.getElementById('inputLabelNama') as HTMLInputElement | null;
const selectLabelWarna = document.getElementById('selectLabelWarna') as HTMLSelectElement | null;
const inputLabelDeskripsi = document.getElementById('inputLabelDeskripsi') as HTMLInputElement | null;
const btnSaveLabel = document.getElementById('btnSaveLabel');

const labelBadgeColorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  indigo: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
};

let activeLabelsList: any[] = [];
try {
  const rawInit = labelsCrudModal?.getAttribute('data-initial-labels');
  activeLabelsList = rawInit ? JSON.parse(rawInit) : [];
} catch (err) {
  activeLabelsList = [];
}

function renderLabelsTable() {
  if (!labelsTableBody) return;
  labelsTableBody.innerHTML = '';

  if (labelsTotalCount) labelsTotalCount.textContent = String(activeLabelsList.length);
  if (headerLabelsCount) headerLabelsCount.textContent = String(activeLabelsList.length);

  if (activeLabelsList.length === 0) {
    labelsTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="px-4 py-6 text-center text-slate-400 italic">
          Belum ada label. Silakan tambah label baru di atas.
        </td>
      </tr>
    `;
    return;
  }

  activeLabelsList.forEach((lbl) => {
    const col = labelBadgeColorMap[lbl.warna] || labelBadgeColorMap.blue;
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/70 transition-colors';
    tr.innerHTML = `
      <td class="px-3 py-2.5 whitespace-nowrap">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold border ${col.bg} ${col.text} ${col.border}">
          <span class="w-1.5 h-1.5 rounded-full ${col.bg.replace('-50', '-500')}"></span>
          ${lbl.nama}
        </span>
      </td>
      <td class="px-3 py-2.5 text-slate-600 max-w-[220px] truncate" title="${lbl.deskripsi || '-'}">
        ${lbl.deskripsi || '<span class="text-slate-300">-</span>'}
      </td>
      <td class="px-3 py-2.5 text-center font-mono font-medium text-slate-700">
        ${lbl.donorCount || 0}
      </td>
      <td class="px-3 py-2.5 text-right whitespace-nowrap space-x-1">
        <button
          type="button"
          class="btn-edit-lbl h-7 w-7 rounded border border-slate-200 text-slate-600 hover:text-[#0969da] hover:border-blue-200 hover:bg-blue-50 transition-colors inline-flex items-center justify-center cursor-pointer shadow-2xs"
          title="Edit Label"
          data-id="${lbl.id}"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
        </button>
        <button
          type="button"
          class="btn-delete-lbl h-7 w-7 rounded border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors inline-flex items-center justify-center cursor-pointer shadow-2xs"
          title="Hapus Label"
          data-id="${lbl.id}"
          data-nama="${lbl.nama}"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none">
            <path d="M3 6h18"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </td>
    `;
    labelsTableBody.appendChild(tr);
  });

  // Attach row events
  labelsTableBody.querySelectorAll('.btn-edit-lbl').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      const target = activeLabelsList.find((l) => l.id === id);
      if (!target) return;
      if (inputLabelId) inputLabelId.value = String(target.id);
      if (inputLabelNama) inputLabelNama.value = target.nama;
      if (selectLabelWarna) selectLabelWarna.value = target.warna;
      if (inputLabelDeskripsi) inputLabelDeskripsi.value = target.deskripsi || '';
      if (labelFormTitle) labelFormTitle.textContent = `Edit Label: ${target.nama}`;
      btnCancelEditLabel?.classList.remove('hidden');
      if (btnSaveLabel) btnSaveLabel.textContent = 'Perbarui Label';
      inputLabelNama?.focus();
    });
  });

  labelsTableBody.querySelectorAll('.btn-delete-lbl').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.getAttribute('data-id'));
      const nama = btn.getAttribute('data-nama');
      if (!confirm(`Hapus label "${nama}"? Hubungan donatur dengan label ini akan dihapus.`)) return;

      try {
        const res = await fetch('/api/admin/labels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', id }),
        });
        const result = await res.json();
        if (!res.ok || !result.success) throw new Error(result.error || 'Gagal menghapus label');

        activeLabelsList = result.allLabels || [];
        renderLabelsTable();
        syncLabelsToFilterAndDrawer();
      } catch (err: any) {
        alert(`Gagal: ${err.message}`);
      }
    });
  });
}

function resetLabelForm() {
  if (inputLabelId) inputLabelId.value = '';
  if (inputLabelNama) inputLabelNama.value = '';
  if (selectLabelWarna) selectLabelWarna.value = 'blue';
  if (inputLabelDeskripsi) inputLabelDeskripsi.value = '';
  if (labelFormTitle) labelFormTitle.textContent = 'Tambah Label Baru';
  btnCancelEditLabel?.classList.add('hidden');
  if (btnSaveLabel) btnSaveLabel.textContent = 'Simpan Label';
}

function syncLabelsToFilterAndDrawer() {
  // 1. Sync dropdown filterLabel
  const filterSelect = document.getElementById('filterLabel') as HTMLSelectElement | null;
  if (filterSelect) {
    const curVal = filterSelect.value;
    filterSelect.innerHTML = '<option value="all">Semua Label Donatur</option>';
    activeLabelsList.forEach((lbl) => {
      const opt = document.createElement('option');
      opt.value = String(lbl.id);
      opt.textContent = `Label: ${lbl.nama}`;
      filterSelect.appendChild(opt);
    });
    filterSelect.value = curVal;
  }

  // 2. Sync drawer checkboxes
  const drawerContainer = document.getElementById('drawerLabelsContainer');
  if (drawerContainer) {
    const checkedIds = Array.from(drawerContainer.querySelectorAll('.drawer-label-cb:checked')).map(
      (cb) => (cb as HTMLInputElement).value
    );
    drawerContainer.innerHTML = '';
    if (activeLabelsList.length === 0) {
      drawerContainer.innerHTML = '<span class="text-xs text-slate-400 italic">Belum ada label tersedia.</span>';
    } else {
      activeLabelsList.forEach((lbl) => {
        const col = labelBadgeColorMap[lbl.warna] || labelBadgeColorMap.blue;
        const labelEl = document.createElement('label');
        labelEl.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-[#0969da] cursor-pointer transition-colors shadow-2xs';
        labelEl.innerHTML = `
          <input
            type="checkbox"
            class="drawer-label-cb rounded border-slate-300 text-[#0969da] focus:ring-1 focus:ring-[#0969da] cursor-pointer"
            value="${lbl.id}"
            ${checkedIds.includes(String(lbl.id)) ? 'checked' : ''}
          />
          <span class="w-2 h-2 rounded-full ${col.bg.replace('-50', '-500')}"></span>
          <span>${lbl.nama}</span>
        `;
        drawerContainer.appendChild(labelEl);
      });
    }
  }
}

btnOpenLabelsModal?.addEventListener('click', () => {
  labelsCrudModal?.classList.remove('hidden');
  labelsCrudModal?.classList.add('flex');
  resetLabelForm();
  renderLabelsTable();
});

const closeLabelsModal = () => {
  labelsCrudModal?.classList.add('hidden');
  labelsCrudModal?.classList.remove('flex');
};

btnCloseLabelsModal?.addEventListener('click', closeLabelsModal);
btnCloseLabelsModalFooter?.addEventListener('click', closeLabelsModal);

btnCancelEditLabel?.addEventListener('click', resetLabelForm);

btnSaveLabel?.addEventListener('click', async () => {
  const nama = inputLabelNama?.value.trim();
  if (!nama) {
    alert('Nama label wajib diisi.');
    inputLabelNama?.focus();
    return;
  }

  const id = inputLabelId?.value ? Number(inputLabelId.value) : undefined;
  const warna = selectLabelWarna?.value || 'blue';
  const deskripsi = inputLabelDeskripsi?.value.trim() || undefined;

  btnSaveLabel.setAttribute('disabled', 'true');
  btnSaveLabel.textContent = 'Menyimpan...';

  try {
    const res = await fetch('/api/admin/labels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: id ? 'update' : 'create',
        id,
        nama,
        warna,
        deskripsi,
      }),
    });

    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.error || 'Gagal menyimpan label');

    activeLabelsList = result.allLabels || [];
    renderLabelsTable();
    syncLabelsToFilterAndDrawer();
    resetLabelForm();
  } catch (err: any) {
    alert(`Gagal: ${err.message}`);
  } finally {
    btnSaveLabel.removeAttribute('disabled');
    btnSaveLabel.textContent = id ? 'Perbarui Label' : 'Simpan Label';
  }
});
