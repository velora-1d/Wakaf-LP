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
  const vfGeneralSectionFields = document.getElementById('vfGeneralSectionFields');
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

    if (currentSectionKey === 'hero' && Array.isArray(currentHeroSlides) && currentHeroSlides.length > 0) {
      currentContentObj.slides = currentHeroSlides;
      currentContentObj.heading = currentHeroSlides[0]?.title?.replace(/<br\s*\/?>/gi, ' ') || '';
      currentContentObj.subheading = currentHeroSlides[0]?.lead || '';
      currentContentObj.badge = currentHeroSlides[0]?.badge || '';
      if (currentHeroSlides[0]?.buttons?.[0]?.text) {
        currentContentObj.primaryCtaText = currentHeroSlides[0].buttons[0].text;
      }
      if (currentHeroSlides[0]?.buttons?.[0]?.href) {
        currentContentObj.primaryCtaUrl = currentHeroSlides[0].buttons[0].href;
      }
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

  // Visual Hero Multi-Slide Management (hero)
  const vfHeroSlidesSection = document.getElementById('vfHeroSlidesSection');
  const heroSlidesListContainer = document.getElementById('heroSlidesListContainer');
  const btnAddHeroSlide = document.getElementById('btnAddHeroSlide');
  const vfSlideFileInput = document.getElementById('vfSlideFileInput') as HTMLInputElement;
  let currentHeroSlides: any[] = [];
  let targetSlideImageIndex: number = -1;

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

  // -------------------------------------------------------------------------
  // Visual Hero 4-Slide Management (hero carousel)
  // -------------------------------------------------------------------------
  function renderHeroSlidesEditor(slides: any[]) {
    currentHeroSlides = Array.isArray(slides) ? JSON.parse(JSON.stringify(slides)) : [];
    if (!heroSlidesListContainer) return;

    if (currentHeroSlides.length === 0) {
      heroSlidesListContainer.innerHTML = `
        <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-300">
          Belum ada slide hero. Klik tombol "+ Tambah Slide" di atas untuk menambahkan.
        </div>
      `;
      return;
    }

    heroSlidesListContainer.innerHTML = currentHeroSlides.map((slide: any, sIdx: number) => {
      const buttons = Array.isArray(slide.buttons) ? slide.buttons : [];
      const btn1Text = buttons[0]?.text || '';
      const btn1Href = buttons[0]?.href || '';
      const btn2Text = buttons[1]?.text || '';
      const btn2Href = buttons[1]?.href || '';

      return `
        <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3 relative" data-slide-idx="${sIdx}">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200">${sIdx + 1}</span>
              <span class="text-xs font-bold text-slate-900">${slide.label || 'Slide ' + (sIdx + 1)}</span>
              <span class="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">ID: ${slide.id || 'slide-' + (sIdx + 1)}</span>
            </div>
            ${currentHeroSlides.length > 1 ? `
              <button type="button" class="btn-delete-slide text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer" data-slide-idx="${sIdx}" title="Hapus Slide">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            ` : ''}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Nama / Label Tab</label>
              <input type="text" class="input-slide-label w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" value="${slide.label || ''}" placeholder="Contoh: Wakaf Berkelanjutan" data-slide-idx="${sIdx}" />
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Badge / Tagline Atas</label>
              <input type="text" class="input-slide-badge w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" value="${slide.badge || ''}" placeholder="Contoh: Wakaf yang Menghadirkan Manfaat..." data-slide-idx="${sIdx}" />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Sub-Badge English (Pill Tagline)</label>
              <input type="text" class="input-slide-tagline-en w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none font-mono" value="${slide.taglineEn || ''}" placeholder="BUILDING ASSETS, FOSTERING INDEPENDENCE, CONNECTING IMPACT" data-slide-idx="${sIdx}" />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Judul Utama Slide (&lt;br /&gt; didukung)</label>
              <textarea rows="2" class="input-slide-title w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" placeholder="Tuliskan judul besar slide..." data-slide-idx="${sIdx}">${slide.title || ''}</textarea>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Deskripsi / Narasi Lead Slide</label>
              <textarea rows="3" class="input-slide-lead w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none leading-relaxed" placeholder="Tuliskan narasi penjelasan slide..." data-slide-idx="${sIdx}">${slide.lead || ''}</textarea>
            </div>

            <div class="sm:col-span-2 space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-[11px] font-semibold text-slate-700">Foto Latar Belakang Slide</label>
                <button type="button" class="btn-upload-slide-img inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0969da] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer" data-slide-idx="${sIdx}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                  <span>Unggah Foto S3</span>
                </button>
              </div>
              <div class="flex items-center gap-2">
                <input type="text" class="input-slide-image flex-1 bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none font-mono" value="${slide.image || ''}" placeholder="URL foto S3 atau /images/..." data-slide-idx="${sIdx}" />
                ${slide.image ? `
                  <div class="w-10 h-10 rounded-md bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img src="${slide.image}" class="w-full h-full object-cover" alt="Preview" />
                  </div>
                ` : ''}
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Tombol 1: Teks</label>
              <input type="text" class="input-slide-btn1-text w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" value="${btn1Text}" placeholder="Misal: Jelajahi Program" data-slide-idx="${sIdx}" />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Tombol 1: Link URL</label>
              <input type="text" class="input-slide-btn1-href w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none font-mono" value="${btn1Href}" placeholder="Misal: #program-kebaikan" data-slide-idx="${sIdx}" />
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Tombol 2: Teks (Opsional)</label>
              <input type="text" class="input-slide-btn2-text w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" value="${btn2Text}" placeholder="Misal: Tunaikan Wakaf" data-slide-idx="${sIdx}" />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-700 mb-1">Tombol 2: Link URL</label>
              <input type="text" class="input-slide-btn2-href w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none font-mono" value="${btn2Href}" placeholder="Misal: /program/wakaf" data-slide-idx="${sIdx}" />
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach event listeners for each slide inputs
    heroSlidesListContainer.querySelectorAll('.input-slide-label').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].label = (e.target as HTMLInputElement).value;
        syncVisualToJson();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-badge').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].badge = (e.target as HTMLInputElement).value;
        syncVisualToJson();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-tagline-en').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].taglineEn = (e.target as HTMLInputElement).value;
        syncVisualToJson();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-title').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].title = (e.target as HTMLTextAreaElement).value;
        syncVisualToJson();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-lead').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].lead = (e.target as HTMLTextAreaElement).value;
        syncVisualToJson();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-image').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].image = (e.target as HTMLInputElement).value;
        syncVisualToJson();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn1-text').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[0]) currentHeroSlides[sIdx].buttons[0] = { variant: 'primary' };
          currentHeroSlides[sIdx].buttons[0].text = (e.target as HTMLInputElement).value;
          syncVisualToJson();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn1-href').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[0]) currentHeroSlides[sIdx].buttons[0] = { variant: 'primary' };
          currentHeroSlides[sIdx].buttons[0].href = (e.target as HTMLInputElement).value;
          syncVisualToJson();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn2-text').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[1]) currentHeroSlides[sIdx].buttons[1] = { variant: 'outline' };
          currentHeroSlides[sIdx].buttons[1].text = (e.target as HTMLInputElement).value;
          syncVisualToJson();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn2-href').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[1]) currentHeroSlides[sIdx].buttons[1] = { variant: 'outline' };
          currentHeroSlides[sIdx].buttons[1].href = (e.target as HTMLInputElement).value;
          syncVisualToJson();
        }
      });
    });

    // Upload S3 per slide
    heroSlidesListContainer.querySelectorAll('.btn-upload-slide-img').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const sIdx = Number((e.currentTarget as HTMLElement).dataset.slideIdx);
        targetSlideImageIndex = sIdx;
        vfSlideFileInput?.click();
      });
    });

    // Delete slide
    heroSlidesListContainer.querySelectorAll('.btn-delete-slide').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const sIdx = Number((e.currentTarget as HTMLElement).dataset.slideIdx);
        if (confirm(`Yakin ingin menghapus Slide ${sIdx + 1}?`)) {
          currentHeroSlides.splice(sIdx, 1);
          renderHeroSlidesEditor(currentHeroSlides);
          syncVisualToJson();
        }
      });
    });
  }

  // Handle slide-specific S3 file upload
  vfSlideFileInput?.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file || targetSlideImageIndex < 0) return;

    if (file.size > 25 * 1024 * 1024) {
      (window as any).showToast('Ukuran berkas melebihi 25 MB.', true);
      target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      (window as any).showToast('Mengunggah foto slide ke MinIO S3...');
      const res = await fetch('/api/admin/sections/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (currentHeroSlides[targetSlideImageIndex]) {
          currentHeroSlides[targetSlideImageIndex].image = data.url;
          renderHeroSlidesEditor(currentHeroSlides);
          syncVisualToJson();
          (window as any).showToast('Foto slide berhasil diunggah ke MinIO S3.');
        }
      } else {
        (window as any).showToast(data.error || 'Gagal mengunggah foto slide.', true);
      }
    } catch {
      (window as any).showToast('Terjadi kesalahan jaringan saat mengunggah foto slide.', true);
    } finally {
      target.value = '';
    }
  });

  btnAddHeroSlide?.addEventListener('click', () => {
    const nextIdx = currentHeroSlides.length + 1;
    const newSlide = {
      id: 'slide-' + nextIdx,
      index: String(nextIdx).padStart(2, '0'),
      label: 'Slide Baru ' + nextIdx,
      badge: 'PROGRAM KEBAIKAN GVF',
      taglineEn: 'EMPOWERING COMMUNITIES FOR SOCIAL IMPACT',
      title: 'Judul Slide Baru,<br />Membangun Manfaat Nyata.',
      lead: 'Tuliskan deskripsi narasi lengkap slide ini...',
      image: '',
      buttons: [
        { text: 'Lihat Program', href: '#program-kebaikan', variant: 'primary' }
      ]
    };
    currentHeroSlides.push(newSlide);
    renderHeroSlidesEditor(currentHeroSlides);
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
      if (currentSectionKey === 'hero' && Array.isArray(currentContentObj.slides)) {
        renderHeroSlidesEditor(currentContentObj.slides);
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

      // Show/Hide Packages & Hero Slides Editor based on sectionKey
      if (key === 'hero') {
        vfGeneralSectionFields?.classList.add('hidden');
        vfPackagesSection?.classList.add('hidden');
        vfHeroSlidesSection?.classList.remove('hidden');
        renderHeroSlidesEditor(currentContentObj.slides || []);
      } else if (key === 'prog_pricing') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfHeroSlidesSection?.classList.add('hidden');
        vfPackagesSection?.classList.remove('hidden');
        renderPackagesEditor(currentContentObj.packages || []);
      } else {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfHeroSlidesSection?.classList.add('hidden');
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
