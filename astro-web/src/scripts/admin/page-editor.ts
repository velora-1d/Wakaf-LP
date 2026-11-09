// src/scripts/admin/page-editor.ts
// Interactive Client Script for Pages CMS Section Editor

export function initSectionEditor() {
  // 1. Checkbox Toggle Visibility Logic
  const toggleCheckboxes = document.querySelectorAll('.section-toggle-checkbox');
  toggleCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', async (e) => {
      const target = e.target as HTMLInputElement;
      const sectionId = target.dataset.sectionId;
      const isEnabled = target.checked;

      // UI Optimistic Feedback
      const statusBadge = document.getElementById(`status-badge-${sectionId}`);
      const statusText = document.getElementById(`status-text-${sectionId}`);
      if (statusBadge && statusText) {
        if (isEnabled) {
          statusBadge.className = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200';
          statusText.textContent = 'Aktif (Tampil)';
        } else {
          statusBadge.className = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200';
          statusText.textContent = 'Nonaktif (Sembunyi)';
        }
      }

      try {
        const res = await fetch('/api/admin/sections/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionId, isEnabled }),
        });
        const data = await res.json();
        if (data.success) {
          (window as any).showToast(isEnabled ? 'Bagian diaktifkan di web publik.' : 'Bagian disembunyikan dari web publik.');
        } else {
          target.checked = !isEnabled; // Revert
          (window as any).showToast(data.error || 'Gagal mengubah visibilitas bagian.', true);
        }
      } catch (err) {
        target.checked = !isEnabled; // Revert
        (window as any).showToast('Gagal menghubungi server.', true);
      }
    });
  });

  // 2. Edit Modal Logic (Visual Form + Bidirectional JSON Sync)
  const editModal = document.getElementById('editModal');
  const modalBox = document.getElementById('modalBox');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const saveSectionBtn = document.getElementById('saveSectionBtn');
  const saveBtnText = document.getElementById('saveBtnText');
  const jsonError = document.getElementById('jsonError');

  const editSectionId = document.getElementById('editSectionId') as HTMLInputElement;
  const editTitle = document.getElementById('editTitle') as HTMLInputElement;
  const editSortOrder = document.getElementById('editSortOrder') as HTMLInputElement;
  const editJsonContent = document.getElementById('editJsonContent') as HTMLTextAreaElement;
  const modalSubtitle = document.getElementById('modalSubtitle');

  // Visual Form Inputs
  const vfHeading = document.getElementById('vfHeading') as HTMLInputElement;
  const vfBadge = document.getElementById('vfBadge') as HTMLInputElement;
  const vfSubheading = document.getElementById('vfSubheading') as HTMLInputElement;
  const vfDesc = document.getElementById('vfDesc') as HTMLTextAreaElement;
  const vfParagraph2 = document.getElementById('vfParagraph2') as HTMLTextAreaElement;
  const vfPrimaryCtaText = document.getElementById('vfPrimaryCtaText') as HTMLInputElement;
  const vfPrimaryCtaUrl = document.getElementById('vfPrimaryCtaUrl') as HTMLInputElement;
  const vfSecondaryCtaText = document.getElementById('vfSecondaryCtaText') as HTMLInputElement;
  const vfSecondaryCtaUrl = document.getElementById('vfSecondaryCtaUrl') as HTMLInputElement;
  const vfImageUrl = document.getElementById('vfImageUrl') as HTMLInputElement;

  // MinIO S3 Upload & Preview Controls
  const vfFileInput = document.getElementById('vfFileInput') as HTMLInputElement;
  const vfUploadBtn = document.getElementById('vfUploadBtn') as HTMLButtonElement;
  const vfUploadBtnText = document.getElementById('vfUploadBtnText');
  const vfUploadStatus = document.getElementById('vfUploadStatus');
  const vfClearImageBtn = document.getElementById('vfClearImageBtn') as HTMLButtonElement;
  const vfImagePreviewWrapper = document.getElementById('vfImagePreviewWrapper');
  const vfImagePreview = document.getElementById('vfImagePreview') as HTMLImageElement;
  const vfVideoPreview = document.getElementById('vfVideoPreview') as HTMLVideoElement;
  const vfPreviewFallback = document.getElementById('vfPreviewFallback');
  const vfPreviewName = document.getElementById('vfPreviewName');
  const vfPreviewUrl = document.getElementById('vfPreviewUrl');

  function updateMediaPreview(url: string) {
    if (!url || !url.trim()) {
      vfImagePreviewWrapper?.classList.add('hidden');
      vfClearImageBtn?.classList.add('hidden');
      if (vfImagePreview) vfImagePreview.src = '';
      if (vfVideoPreview) vfVideoPreview.src = '';
      return;
    }

    const cleanUrl = url.trim();
    vfImagePreviewWrapper?.classList.remove('hidden');
    vfClearImageBtn?.classList.remove('hidden');
    if (vfPreviewUrl) vfPreviewUrl.textContent = cleanUrl;

    const isVideo = cleanUrl.match(/\.(mp4|webm|ogg)($|\?)/i);
    if (isVideo) {
      if (vfImagePreview) vfImagePreview.classList.add('hidden');
      if (vfVideoPreview) {
        vfVideoPreview.src = cleanUrl;
        vfVideoPreview.classList.remove('hidden');
      }
      if (vfPreviewFallback) vfPreviewFallback.classList.add('hidden');
      if (vfPreviewName) vfPreviewName.textContent = 'Berkas Video';
    } else {
      if (vfVideoPreview) vfVideoPreview.classList.add('hidden');
      if (vfImagePreview) {
        vfImagePreview.src = cleanUrl;
        vfImagePreview.classList.remove('hidden');
      }
      if (vfPreviewFallback) vfPreviewFallback.classList.add('hidden');
      if (vfPreviewName) vfPreviewName.textContent = 'Berkas Gambar';
    }
  }

  vfImagePreview?.addEventListener('error', () => {
    vfImagePreview.classList.add('hidden');
    vfPreviewFallback?.classList.remove('hidden');
  });

  vfVideoPreview?.addEventListener('error', () => {
    vfVideoPreview.classList.add('hidden');
    vfPreviewFallback?.classList.remove('hidden');
  });

  vfImageUrl?.addEventListener('input', () => {
    updateMediaPreview(vfImageUrl.value);
  });

  vfClearImageBtn?.addEventListener('click', () => {
    if (vfImageUrl) vfImageUrl.value = '';
    syncVisualToJson();
    updateMediaPreview('');
  });

  vfUploadBtn?.addEventListener('click', () => {
    vfFileInput?.click();
  });

  vfFileInput?.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    // Validasi ukuran client-side (25MB)
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      (window as any).showToast('Ukuran berkas melebihi batas 25 MB.', true);
      target.value = '';
      return;
    }

    // Validasi tipe format
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      (window as any).showToast('Format berkas tidak didukung. Harap pilih gambar JPG, PNG, WEBP, SVG, atau video MP4.', true);
      target.value = '';
      return;
    }

    if (vfUploadBtnText) vfUploadBtnText.textContent = 'Mengunggah ke S3...';
    if (vfUploadBtn) vfUploadBtn.disabled = true;
    if (vfUploadStatus) {
      vfUploadStatus.textContent = `Mengunggah ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`;
      vfUploadStatus.classList.remove('hidden');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/sections/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (vfImageUrl) vfImageUrl.value = data.url;
        syncVisualToJson();
        updateMediaPreview(data.url);
        (window as any).showToast('Berkas berhasil diunggah ke MinIO S3.');
      } else {
        (window as any).showToast(data.error || 'Gagal mengunggah berkas ke MinIO.', true);
      }
    } catch (err: any) {
      (window as any).showToast('Terjadi kesalahan jaringan saat mengunggah.', true);
    } finally {
      if (vfUploadBtnText) vfUploadBtnText.textContent = 'Unggah ke MinIO S3';
      if (vfUploadBtn) vfUploadBtn.disabled = false;
      if (vfUploadStatus) vfUploadStatus.classList.add('hidden');
      target.value = '';
    }
  });

  // Tabs
  const tabVisualBtn = document.getElementById('tabVisualBtn');
  const tabJsonBtn = document.getElementById('tabJsonBtn');
  const visualFormContainer = document.getElementById('visualFormContainer');
  const jsonFormContainer = document.getElementById('jsonFormContainer');

  let currentContentObj: any = {};

  function switchTab(toVisual: boolean) {
    if (toVisual) {
      tabVisualBtn?.classList.add('border-[#0969da]', 'text-[#0969da]', 'font-semibold');
      tabVisualBtn?.classList.remove('border-transparent', 'text-slate-500', 'font-medium');
      tabJsonBtn?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'font-semibold');
      tabJsonBtn?.classList.add('border-transparent', 'text-slate-500', 'font-medium');
      visualFormContainer?.classList.remove('hidden');
      jsonFormContainer?.classList.add('hidden');
    } else {
      syncVisualToJson();
      tabJsonBtn?.classList.add('border-[#0969da]', 'text-[#0969da]', 'font-semibold');
      tabJsonBtn?.classList.remove('border-transparent', 'text-slate-500', 'font-medium');
      tabVisualBtn?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'font-semibold');
      tabVisualBtn?.classList.add('border-transparent', 'text-slate-500', 'font-medium');
      jsonFormContainer?.classList.remove('hidden');
      visualFormContainer?.classList.add('hidden');
    }
  }

  tabVisualBtn?.addEventListener('click', () => switchTab(true));
  tabJsonBtn?.addEventListener('click', () => switchTab(false));

  function syncVisualToJson() {
    if (!currentContentObj || typeof currentContentObj !== 'object') currentContentObj = {};

    if (vfHeading?.value !== undefined) {
      if ('heading' in currentContentObj || !('title' in currentContentObj)) {
        currentContentObj.heading = vfHeading.value;
      } else {
        currentContentObj.title = vfHeading.value;
      }
    }
    if (vfBadge?.value !== undefined) currentContentObj.badge = vfBadge.value;
    if (vfSubheading?.value !== undefined) currentContentObj.subheading = vfSubheading.value;
    if (vfDesc?.value !== undefined) {
      if ('paragraph1' in currentContentObj) currentContentObj.paragraph1 = vfDesc.value;
      else if ('desc' in currentContentObj) currentContentObj.desc = vfDesc.value;
      else currentContentObj.description = vfDesc.value;
    }
    if (vfParagraph2?.value !== undefined && ('paragraph2' in currentContentObj || vfParagraph2.value)) {
      currentContentObj.paragraph2 = vfParagraph2.value;
    }
    if (vfPrimaryCtaText?.value !== undefined) {
      if ('ctaText' in currentContentObj) currentContentObj.ctaText = vfPrimaryCtaText.value;
      else currentContentObj.primaryCtaText = vfPrimaryCtaText.value;
    }
    if (vfPrimaryCtaUrl?.value !== undefined) {
      if ('ctaUrl' in currentContentObj) currentContentObj.ctaUrl = vfPrimaryCtaUrl.value;
      else currentContentObj.primaryCtaUrl = vfPrimaryCtaUrl.value;
    }
    if (vfSecondaryCtaText?.value !== undefined) currentContentObj.secondaryCtaText = vfSecondaryCtaText.value;
    if (vfSecondaryCtaUrl?.value !== undefined) currentContentObj.secondaryCtaUrl = vfSecondaryCtaUrl.value;
    if (vfImageUrl?.value !== undefined) {
      if ('videoUrl' in currentContentObj) currentContentObj.videoUrl = vfImageUrl.value;
      else currentContentObj.imageUrl = vfImageUrl.value;
    }

    if (currentSectionKey === 'prog_pricing' && Array.isArray(currentPackages) && currentPackages.length > 0) {
      currentContentObj.packages = currentPackages;
    }

    if (editJsonContent) {
      editJsonContent.value = JSON.stringify(currentContentObj, null, 2);
    }
  }

  // Visual Packages & Deliverables Management (prog_pricing)
  const vfPackagesSection = document.getElementById('vfPackagesSection');
  const packagesListContainer = document.getElementById('packagesListContainer');
  const btnAddPackage = document.getElementById('btnAddPackage');
  let currentSectionKey = '';
  let currentPackages: any[] = [];

  function renderPackagesEditor(packages: any[]) {
    currentPackages = Array.isArray(packages) ? JSON.parse(JSON.stringify(packages)) : [];
    if (!packagesListContainer) return;

    if (currentPackages.length === 0) {
      packagesListContainer.innerHTML = `
        <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-300">
          Belum ada paket kustom. Klik tombol "+ Tambah Paket" di atas untuk menambahkan.
        </div>
      `;
      return;
    }

    packagesListContainer.innerHTML = currentPackages.map((pkg: any, pIdx: number) => {
      const deliverables = Array.isArray(pkg.deliverables) ? pkg.deliverables : [];
      return `
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3 relative" data-pkg-idx="${pIdx}">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200">${pIdx + 1}</span>
              <span class="text-xs font-bold text-slate-900">${pkg.title || 'Paket ' + (pIdx + 1)}</span>
              ${pkg.isPopular ? '<span class="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">Rekomendasi</span>' : ''}
            </div>
            <button type="button" class="btn-delete-pkg text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer" data-pkg-idx="${pIdx}" title="Hapus Paket">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            <div class="sm:col-span-2">
              <label class="block text-[11px] font-medium text-slate-600 mb-1">Nama Paket</label>
              <input type="text" class="pkg-field-title w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${pkg.title || ''}" data-pkg-idx="${pIdx}" />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-slate-600 mb-1">Sub-judul / Peruntukan</label>
              <input type="text" class="pkg-field-subtitle w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${pkg.subtitle || ''}" data-pkg-idx="${pIdx}" />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-slate-600 mb-1">Nominal / Harga</label>
              <input type="text" class="pkg-field-price w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0969da] outline-none" value="${pkg.priceAmount || ''}" data-pkg-idx="${pIdx}" placeholder="Contoh: 150.000" />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-slate-600 mb-1">Satuan Harga</label>
              <input type="text" class="pkg-field-unit w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${pkg.priceUnit || ''}" data-pkg-idx="${pIdx}" placeholder="Contoh: /paket atau /m²" />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-slate-600 mb-1">Estimasi Pengerjaan</label>
              <input type="text" class="pkg-field-est w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${pkg.estimation || ''}" data-pkg-idx="${pIdx}" placeholder="Contoh: Estimasi: 30 Hari Kerja" />
            </div>
          </div>

          <!-- Deliverables Checklist Items -->
          <div class="pt-2 border-t border-slate-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Poin Checklist Material (Rincian Alokasi):</span>
              <button type="button" class="btn-add-deliv text-[11px] font-semibold text-[#0969da] hover:underline cursor-pointer flex items-center gap-1" data-pkg-idx="${pIdx}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>Tambah Poin Material</span>
              </button>
            </div>

            <div class="space-y-2">
              ${deliverables.map((item: any, dIdx: number) => `
                <div class="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <input type="text" class="deliv-field-bold w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-semibold focus:border-[#0969da] outline-none" value="${item.bold || ''}" data-pkg-idx="${pIdx}" data-deliv-idx="${dIdx}" placeholder="Teks Tebal (cth: 1 Sak Semen SNI)" />
                    </div>
                    <div class="sm:col-span-2">
                      <input type="text" class="deliv-field-text w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:border-[#0969da] outline-none" value="${item.text || ''}" data-pkg-idx="${pIdx}" data-deliv-idx="${dIdx}" placeholder="Keterangan alokasi material..." />
                    </div>
                  </div>
                  <button type="button" class="btn-delete-deliv text-slate-400 hover:text-rose-600 p-1 rounded transition-colors shrink-0 cursor-pointer" data-pkg-idx="${pIdx}" data-deliv-idx="${dIdx}" title="Hapus Poin">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    bindPackagesEvents();
  }

  function bindPackagesEvents() {
    if (!packagesListContainer) return;

    packagesListContainer.querySelectorAll('.pkg-field-title').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].title = e.target.value;
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-subtitle').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].subtitle = e.target.value;
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-price').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].priceAmount = e.target.value;
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-unit').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].priceUnit = e.target.value;
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-est').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].estimation = e.target.value;
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.deliv-field-bold').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        const dIdx = parseInt(e.target.getAttribute('data-deliv-idx') || '0', 10);
        if (currentPackages[pIdx]?.deliverables?.[dIdx]) {
          currentPackages[pIdx].deliverables[dIdx].bold = e.target.value;
        }
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.deliv-field-text').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        const dIdx = parseInt(e.target.getAttribute('data-deliv-idx') || '0', 10);
        if (currentPackages[pIdx]?.deliverables?.[dIdx]) {
          currentPackages[pIdx].deliverables[dIdx].text = e.target.value;
        }
        syncVisualToJson();
      });
    });

    packagesListContainer.querySelectorAll('.btn-delete-deliv').forEach((btn) => {
      btn.addEventListener('click', (e: any) => {
        const targetBtn = (e.target as HTMLElement).closest('.btn-delete-deliv');
        if (!targetBtn) return;
        const pIdx = parseInt(targetBtn.getAttribute('data-pkg-idx') || '0', 10);
        const dIdx = parseInt(targetBtn.getAttribute('data-deliv-idx') || '0', 10);
        if (currentPackages[pIdx]?.deliverables) {
          currentPackages[pIdx].deliverables.splice(dIdx, 1);
          renderPackagesEditor(currentPackages);
          syncVisualToJson();
        }
      });
    });

    packagesListContainer.querySelectorAll('.btn-add-deliv').forEach((btn) => {
      btn.addEventListener('click', (e: any) => {
        const targetBtn = (e.target as HTMLElement).closest('.btn-add-deliv');
        if (!targetBtn) return;
        const pIdx = parseInt(targetBtn.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) {
          if (!Array.isArray(currentPackages[pIdx].deliverables)) {
            currentPackages[pIdx].deliverables = [];
          }
          currentPackages[pIdx].deliverables.push({
            bold: 'Item Material Baru',
            text: 'Keterangan spesifikasi dan alokasi material lapangan.'
          });
          renderPackagesEditor(currentPackages);
          syncVisualToJson();
        }
      });
    });

    packagesListContainer.querySelectorAll('.btn-delete-pkg').forEach((btn) => {
      btn.addEventListener('click', (e: any) => {
        const targetBtn = (e.target as HTMLElement).closest('.btn-delete-pkg');
        if (!targetBtn) return;
        const pIdx = parseInt(targetBtn.getAttribute('data-pkg-idx') || '0', 10);
        if (confirm(`Yakin ingin menghapus Paket ${pIdx + 1}?`)) {
          currentPackages.splice(pIdx, 1);
          renderPackagesEditor(currentPackages);
          syncVisualToJson();
        }
      });
    });
  }

  btnAddPackage?.addEventListener('click', () => {
    const newPkg = {
      id: 'pkg-' + Date.now(),
      title: 'Paket Kontribusi Baru',
      subtitle: 'Alokasi Pembangunan Fasilitas',
      priceAmount: '100.000',
      pricePrefix: 'Rp ',
      priceUnit: '/paket',
      priceDesc: 'Donasi material langsung ke lapangan',
      estimation: 'Estimasi: 30 Hari Kerja',
      isPopular: false,
      deliverables: [
        { bold: 'Material SNI', text: 'Pengadaan material berkualitas standar industri' }
      ],
      ctaText: 'Pilih Paket Ini'
    };
    currentPackages.push(newPkg);
    renderPackagesEditor(currentPackages);
    syncVisualToJson();
  });

  // Attach sync listener to all visual inputs
  [vfHeading, vfBadge, vfSubheading, vfDesc, vfParagraph2, vfPrimaryCtaText, vfPrimaryCtaUrl, vfSecondaryCtaText, vfSecondaryCtaUrl, vfImageUrl].forEach((input) => {
    input?.addEventListener('input', syncVisualToJson);
  });

  // When editing raw JSON, sync back to visual
  editJsonContent?.addEventListener('input', () => {
    try {
      currentContentObj = JSON.parse(editJsonContent.value);
      if (vfHeading) vfHeading.value = currentContentObj.heading || currentContentObj.title || '';
      if (vfBadge) vfBadge.value = currentContentObj.badge || '';
      if (vfSubheading) vfSubheading.value = currentContentObj.subheading || '';
      if (vfDesc) vfDesc.value = currentContentObj.desc || currentContentObj.paragraph1 || currentContentObj.description || '';
      if (vfParagraph2) vfParagraph2.value = currentContentObj.paragraph2 || '';
      if (vfPrimaryCtaText) vfPrimaryCtaText.value = currentContentObj.primaryCtaText || currentContentObj.ctaText || '';
      if (vfPrimaryCtaUrl) vfPrimaryCtaUrl.value = currentContentObj.primaryCtaUrl || currentContentObj.ctaUrl || '';
      if (vfSecondaryCtaText) vfSecondaryCtaText.value = currentContentObj.secondaryCtaText || '';
      if (vfSecondaryCtaUrl) vfSecondaryCtaUrl.value = currentContentObj.secondaryCtaUrl || '';
      if (vfImageUrl) {
        vfImageUrl.value = currentContentObj.imageUrl || currentContentObj.mediaUrl || currentContentObj.videoUrl || '';
        updateMediaPreview(vfImageUrl.value);
      }
      if (currentSectionKey === 'prog_pricing' && Array.isArray(currentContentObj.packages)) {
        renderPackagesEditor(currentContentObj.packages);
      }
      if (jsonError) {
        jsonError.textContent = '';
        jsonError.classList.add('hidden');
      }
    } catch (err: any) {
      if (jsonError) {
        jsonError.textContent = `Peringatan format JSON: ${err.message}`;
        jsonError.classList.remove('hidden');
      }
    }
  });

  function openModal() {
    if (editModal && modalBox) {
      switchTab(true); // Always default to Visual Form!
      editModal.classList.remove('opacity-0', 'pointer-events-none');
      modalBox.classList.remove('translate-x-full');
      modalBox.classList.add('translate-x-0');
    }
  }

  function closeModal() {
    if (editModal && modalBox) {
      modalBox.classList.remove('translate-x-0');
      modalBox.classList.add('translate-x-full');
      setTimeout(() => {
        editModal.classList.add('opacity-0', 'pointer-events-none');
      }, 200);
    }
  }

  closeModalBtn?.addEventListener('click', closeModal);
  cancelModalBtn?.addEventListener('click', closeModal);
  editModal?.addEventListener('click', (e) => {
    if (e.target === editModal) closeModal();
  });

  // Close modal on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editModal && !editModal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  // Open Edit Modal on Button Click
  const editBtns = document.querySelectorAll('.edit-section-btn');
  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-section-id') || '';
      const title = btn.getAttribute('data-section-title') || '';
      const key = btn.getAttribute('data-section-key') || '';
      const order = btn.getAttribute('data-section-order') || '1';
      const contentStr = btn.getAttribute('data-section-content') || '{}';
      currentSectionKey = key;

      try {
        currentContentObj = JSON.parse(contentStr);
      } catch {
        currentContentObj = {};
      }

      if (editSectionId) editSectionId.value = id;
      if (editTitle) editTitle.value = title;
      if (editSortOrder) editSortOrder.value = order;
      if (modalSubtitle) modalSubtitle.textContent = `Kunci Bagian: ${key} (ID #${id})`;

      // Populate Visual Inputs
      if (vfHeading) vfHeading.value = currentContentObj.heading || currentContentObj.title || '';
      if (vfBadge) vfBadge.value = currentContentObj.badge || '';
      if (vfSubheading) vfSubheading.value = currentContentObj.subheading || '';
      if (vfDesc) vfDesc.value = currentContentObj.desc || currentContentObj.paragraph1 || currentContentObj.description || '';
      if (vfParagraph2) vfParagraph2.value = currentContentObj.paragraph2 || '';
      if (vfPrimaryCtaText) vfPrimaryCtaText.value = currentContentObj.primaryCtaText || currentContentObj.ctaText || '';
      if (vfPrimaryCtaUrl) vfPrimaryCtaUrl.value = currentContentObj.primaryCtaUrl || currentContentObj.ctaUrl || '';
      if (vfSecondaryCtaText) vfSecondaryCtaText.value = currentContentObj.secondaryCtaText || '';
      if (vfSecondaryCtaUrl) vfSecondaryCtaUrl.value = currentContentObj.secondaryCtaUrl || '';
      if (vfImageUrl) {
        vfImageUrl.value = currentContentObj.imageUrl || currentContentObj.mediaUrl || currentContentObj.videoUrl || '';
        updateMediaPreview(vfImageUrl.value);
      }

      // Show/Hide Packages Editor based on sectionKey
      if (key === 'prog_pricing') {
        vfPackagesSection?.classList.remove('hidden');
        renderPackagesEditor(currentContentObj.packages || []);
      } else {
        vfPackagesSection?.classList.add('hidden');
      }

      // Populate JSON textarea
      if (editJsonContent) editJsonContent.value = JSON.stringify(currentContentObj, null, 2);

      if (jsonError) {
        jsonError.textContent = '';
        jsonError.classList.add('hidden');
      }

      openModal();
    });
  });

  // Save Section Content
  saveSectionBtn?.addEventListener('click', async () => {
    // Sync latest visual inputs to content object
    syncVisualToJson();

    let parsedContent: any = currentContentObj;
    try {
      parsedContent = JSON.parse(editJsonContent.value);
    } catch (e: any) {
      if (jsonError) {
        jsonError.textContent = `Format JSON tidak valid: ${e.message}`;
        jsonError.classList.remove('hidden');
      }
      switchTab(false); // Switch to JSON tab to see error
      return;
    }

    if (saveBtnText) saveBtnText.textContent = 'Menyimpan...';
    if (saveSectionBtn) (saveSectionBtn as HTMLButtonElement).disabled = true;

    const payload = {
      sectionId: Number(editSectionId.value),
      title: editTitle.value,
      sortOrder: Number(editSortOrder.value),
      content: parsedContent,
    };

    try {
      const res = await fetch('/api/admin/sections/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        (window as any).showToast('Perubahan teks & konten berhasil disimpan ke PostgreSQL.');
        // Update display title on card
        const titleDisplay = document.getElementById(`title-display-${payload.sectionId}`);
        if (titleDisplay) titleDisplay.textContent = payload.title;

        // Update trigger data attributes
        const activeBtn = document.querySelector(`.edit-section-btn[data-section-id="${payload.sectionId}"]`);
        if (activeBtn) {
          activeBtn.setAttribute('data-section-title', payload.title);
          activeBtn.setAttribute('data-section-order', String(payload.sortOrder));
          activeBtn.setAttribute('data-section-content', JSON.stringify(payload.content, null, 2));
        }

        closeModal();
      } else {
        (window as any).showToast(data.error || 'Gagal menyimpan ke database.', true);
      }
    } catch (err) {
      (window as any).showToast('Terjadi kesalahan jaringan.', true);
    } finally {
      if (saveBtnText) saveBtnText.textContent = 'Simpan Perubahan';
      if (saveSectionBtn) (saveSectionBtn as HTMLButtonElement).disabled = false;
    }
  });
}

// Auto-initialize on client
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionEditor);
  } else {
    initSectionEditor();
  }
}
