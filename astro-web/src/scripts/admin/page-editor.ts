// src/scripts/admin/page-editor.ts
// Pengelola formulir visual CMS yang ramah pengguna (tanpa tab teknis atau input URL S3 mentah)

interface LinkOption {
  label: string;
  value: string;
}

interface LinkGroup {
  group: string;
  options: LinkOption[];
}

const PAGE_LINK_GROUPS: LinkGroup[] = [
  {
    group: 'Halaman Utama',
    options: [
      { label: 'Beranda', value: '/' },
      { label: 'Bagian Pilar Kebaikan (di Beranda)', value: '#program-kebaikan' },
      { label: 'Bagian Ekosistem (di Beranda)', value: '#ekosistem' },
      { label: 'Tentang Kami', value: '/tentang-kami' },
      { label: 'Kemitraan', value: '/kemitraan' },
      { label: 'Kontak & Konsultasi', value: '/contact' },
      { label: 'Daftar Donatur Terverifikasi', value: '/donatur' },
    ],
  },
  {
    group: 'Program',
    options: [
      { label: 'Semua Program', value: '/program' },
      { label: 'Program Pembangunan Masjid', value: '/program/pembangunan-masjid' },
      { label: 'Program GOTA SSM', value: '/program/gota-ssm' },
    ],
  },
  {
    group: 'Bentuk Kontribusi',
    options: [
      { label: 'Infak (Paket Pilihan)', value: '/kontribusi/infaq#paket-pilihan' },
      { label: 'Sedekah (Paket Pilihan)', value: '/kontribusi/sedekah#paket-pilihan' },
      { label: 'Wakaf', value: '/kontribusi/wakaf' },
      { label: 'Zakat', value: '/kontribusi/zakat' },
    ],
  },
  {
    group: 'Publikasi',
    options: [
      { label: 'Edukasi & Kajian', value: '/edukasi' },
      { label: 'Kabar & Laporan', value: '/kabar' },
      { label: 'Laporan Transparansi', value: '/kabar?tab=laporan' },
    ],
  },
];

const ALL_PRESET_URLS = new Set(
  PAGE_LINK_GROUPS.flatMap((g) => g.options.map((o) => o.value))
);

function escapeAttr(val: any): string {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function htmlToLineBreaks(val: string): string {
  return String(val ?? '').replace(/<br\s*\/?>/gi, '\n');
}

function lineBreaksToHtml(val: string): string {
  return String(val ?? '').replace(/\r?\n/g, '<br />');
}

function stripHtmlForPreview(val: string): string {
  return String(val ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();
}

function buildLinkSelectOptionsHtml(selectedUrl: string, allowEmpty = false): string {
  const cleanUrl = String(selectedUrl || '').trim();
  const isPreset = ALL_PRESET_URLS.has(cleanUrl);
  const isCustom = cleanUrl !== '' && !isPreset;

  let html = '';
  if (allowEmpty) {
    html += `<option value="" ${cleanUrl === '' ? 'selected' : ''}>Tanpa Tombol Kedua</option>`;
  }

  for (const grp of PAGE_LINK_GROUPS) {
    html += `<optgroup label="${escapeAttr(grp.group)}">`;
    for (const opt of grp.options) {
      const sel = cleanUrl === opt.value ? 'selected' : '';
      html += `<option value="${escapeAttr(opt.value)}" ${sel}>${escapeAttr(opt.label)}</option>`;
    }
    html += `</optgroup>`;
  }

  html += `<optgroup label="Lainnya">`;
  html += `<option value="__custom__" ${isCustom ? 'selected' : ''}>Tautan Kustom (WhatsApp / Link Luar)</option>`;
  html += `</optgroup>`;

  return html;
}

function syncSelectWithUrl(
  selectEl: HTMLSelectElement | null,
  customWrapEl: HTMLElement | null,
  customInputEl: HTMLInputElement | null,
  urlValue: string,
  allowEmpty = false
) {
  const cleanUrl = String(urlValue || '').trim();
  if (customInputEl) customInputEl.value = cleanUrl;

  if (!selectEl) return;

  if (allowEmpty && cleanUrl === '') {
    selectEl.value = '';
    customWrapEl?.classList.add('hidden');
  } else if (ALL_PRESET_URLS.has(cleanUrl)) {
    selectEl.value = cleanUrl;
    customWrapEl?.classList.add('hidden');
  } else if (cleanUrl === '' && !allowEmpty) {
    selectEl.value = '/';
    customWrapEl?.classList.add('hidden');
  } else {
    selectEl.value = '__custom__';
    customWrapEl?.classList.remove('hidden');
  }
}

export function initSectionEditor() {
  // 1. Toggle Tampilkan / Sembunyikan Bagian di Halaman Publik
  const toggleCheckboxes = document.querySelectorAll('.section-toggle-checkbox');
  toggleCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', async (e) => {
      const target = e.target as HTMLInputElement;
      const sectionId = target.dataset.sectionId;
      const isEnabled = target.checked;

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
          (window as any).showToast(isEnabled ? 'Bagian ditampilkan di website.' : 'Bagian disembunyikan dari website.');
        } else {
          target.checked = !isEnabled;
          (window as any).showToast(data.error || 'Gagal mengubah tampilan bagian.', true);
        }
      } catch {
        target.checked = !isEnabled;
        (window as any).showToast('Gagal menghubungi server.', true);
      }
    });
  });

  // 2. Elemen Modal & Input Visual
  const editModal = document.getElementById('editModal');
  const modalBox = document.getElementById('modalBox');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const saveSectionBtn = document.getElementById('saveSectionBtn');
  const saveBtnText = document.getElementById('saveBtnText');

  const editSectionId = document.getElementById('editSectionId') as HTMLInputElement;
  const editTitle = document.getElementById('editTitle') as HTMLInputElement;
  const editSortOrder = document.getElementById('editSortOrder') as HTMLInputElement;
  const modalSubtitle = document.getElementById('modalSubtitle');

  const vfGeneralSectionFields = document.getElementById('vfGeneralSectionFields');
  const vfHeading = document.getElementById('vfHeading') as HTMLInputElement;
  const vfBadge = document.getElementById('vfBadge') as HTMLInputElement;
  const vfSubheading = document.getElementById('vfSubheading') as HTMLInputElement;
  const vfDesc = document.getElementById('vfDesc') as HTMLTextAreaElement;
  const vfParagraph2 = document.getElementById('vfParagraph2') as HTMLTextAreaElement;

  const vfPrimaryCtaText = document.getElementById('vfPrimaryCtaText') as HTMLInputElement;
  const vfPrimaryCtaUrlSelect = document.getElementById('vfPrimaryCtaUrlSelect') as HTMLSelectElement;
  const vfPrimaryCtaCustomWrap = document.getElementById('vfPrimaryCtaCustomWrap');
  const vfPrimaryCtaUrl = document.getElementById('vfPrimaryCtaUrl') as HTMLInputElement;

  const vfSecondaryCtaText = document.getElementById('vfSecondaryCtaText') as HTMLInputElement;
  const vfSecondaryCtaUrlSelect = document.getElementById('vfSecondaryCtaUrlSelect') as HTMLSelectElement;
  const vfSecondaryCtaCustomWrap = document.getElementById('vfSecondaryCtaCustomWrap');
  const vfSecondaryCtaUrl = document.getElementById('vfSecondaryCtaUrl') as HTMLInputElement;

  const vfImageUrl = document.getElementById('vfImageUrl') as HTMLInputElement;
  const vfFileInput = document.getElementById('vfFileInput') as HTMLInputElement;
  const vfUploadBtn = document.getElementById('vfUploadBtn') as HTMLButtonElement;
  const vfUploadBtnText = document.getElementById('vfUploadBtnText');
  const vfUploadStatus = document.getElementById('vfUploadStatus');
  const vfClearImageBtn = document.getElementById('vfClearImageBtn') as HTMLButtonElement;
  const vfCardClearBtn = document.getElementById('vfCardClearBtn') as HTMLButtonElement;
  const vfImagePreviewWrapper = document.getElementById('vfImagePreviewWrapper');
  const vfImagePreview = document.getElementById('vfImagePreview') as HTMLImageElement;
  const vfVideoPreview = document.getElementById('vfVideoPreview') as HTMLVideoElement;
  const vfPreviewFallback = document.getElementById('vfPreviewFallback');
  const vfPreviewName = document.getElementById('vfPreviewName');

  // About Masjid Section (about_stats Blok 2)
  const vfAboutMasjidSection = document.getElementById('vfAboutMasjidSection');
  const vfAboutMasjidHeading = document.getElementById('vfAboutMasjidHeading') as HTMLInputElement;
  const vfAboutMasjidPara1 = document.getElementById('vfAboutMasjidPara1') as HTMLTextAreaElement;
  const vfAboutMasjidPara2 = document.getElementById('vfAboutMasjidPara2') as HTMLTextAreaElement;
  const vfAboutMasjidPara3 = document.getElementById('vfAboutMasjidPara3') as HTMLTextAreaElement;
  const vfAboutMasjidImageUrl = document.getElementById('vfAboutMasjidImageUrl') as HTMLInputElement;
  const vfAboutMasjidImgPreview = document.getElementById('vfAboutMasjidImgPreview') as HTMLImageElement;
  const vfAboutMasjidImgEmpty = document.getElementById('vfAboutMasjidImgEmpty');
  const btnUploadAboutMasjidImg = document.getElementById('btnUploadAboutMasjidImg');
  const btnClearAboutMasjidImg = document.getElementById('btnClearAboutMasjidImg');

  // State Section Aktif
  let currentContentObj: any = {};
  let currentSectionKey = '';
  let currentPackages: any[] = [];
  let currentHeroSlides: any[] = [];
  let currentTwinImages: string[] = [];
  let currentShowcaseItems: any[] = [];
  let currentValueBoxes: any[] = [];
  let currentGuarantees: string[] = [];
  let currentFaqs: any[] = [];
  let currentMasjidMilestones: any[] = [];
  let currentGotaSchemes: any[] = [];

  let openSlideIdx = 0;
  let openPkgIdx = 0;
  let openFaqIdx = 0;
  let openMsIdx = 0;
  let openGsIdx = 0;

  let targetSlideImageIndex = -1;
  let targetSubUpload: { type: 'twin' | 'showcase' | 'about_masjid'; index: number } | null = null;

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

    const isVideo = cleanUrl.match(/\.(mp4|webm|ogg)($|\?)/i);
    if (isVideo) {
      if (vfImagePreview) vfImagePreview.classList.add('hidden');
      if (vfVideoPreview) {
        vfVideoPreview.src = cleanUrl;
        vfVideoPreview.classList.remove('hidden');
      }
      if (vfPreviewFallback) vfPreviewFallback.classList.add('hidden');
      if (vfPreviewName) vfPreviewName.textContent = 'Pratinjau Video';
    } else {
      if (vfVideoPreview) vfVideoPreview.classList.add('hidden');
      if (vfImagePreview) {
        vfImagePreview.src = cleanUrl;
        vfImagePreview.classList.remove('hidden');
      }
      if (vfPreviewFallback) vfPreviewFallback.classList.add('hidden');
      if (vfPreviewName) vfPreviewName.textContent = 'Pratinjau Foto';
    }
  }

  function updateAboutMasjidPreview(url: string) {
    const cleanUrl = (url || '').trim();
    if (cleanUrl) {
      if (vfAboutMasjidImgPreview) {
        vfAboutMasjidImgPreview.src = cleanUrl;
        vfAboutMasjidImgPreview.classList.remove('hidden');
      }
      vfAboutMasjidImgEmpty?.classList.add('hidden');
      btnClearAboutMasjidImg?.classList.remove('hidden');
    } else {
      if (vfAboutMasjidImgPreview) {
        vfAboutMasjidImgPreview.src = '';
        vfAboutMasjidImgPreview.classList.add('hidden');
      }
      vfAboutMasjidImgEmpty?.classList.remove('hidden');
      btnClearAboutMasjidImg?.classList.add('hidden');
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

  const clearMainMedia = () => {
    if (vfImageUrl) vfImageUrl.value = '';
    syncVisualToState();
    updateMediaPreview('');
    (window as any).showToast('Foto berhasil dihapus.');
  };

  vfClearImageBtn?.addEventListener('click', clearMainMedia);
  vfCardClearBtn?.addEventListener('click', clearMainMedia);

  vfUploadBtn?.addEventListener('click', () => {
    vfFileInput?.click();
  });

  btnUploadAboutMasjidImg?.addEventListener('click', () => {
    targetSubUpload = { type: 'about_masjid', index: 0 };
    vfGenericSubFileInput?.click();
  });

  btnClearAboutMasjidImg?.addEventListener('click', () => {
    if (vfAboutMasjidImageUrl) vfAboutMasjidImageUrl.value = '';
    updateAboutMasjidPreview('');
    syncVisualToState();
    (window as any).showToast('Foto masjid berhasil dihapus.');
  });

  vfFileInput?.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      (window as any).showToast('Ukuran berkas melebihi batas 25 MB.', true);
      target.value = '';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      (window as any).showToast('Format tidak didukung. Pilih gambar JPG, PNG, WEBP, SVG, atau video MP4.', true);
      target.value = '';
      return;
    }

    if (vfUploadBtnText) vfUploadBtnText.textContent = 'Mengunggah...';
    if (vfUploadBtn) vfUploadBtn.disabled = true;
    if (vfUploadStatus) {
      vfUploadStatus.textContent = `Mengunggah ${file.name}...`;
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
        syncVisualToState();
        updateMediaPreview(data.url);
        (window as any).showToast('Foto berhasil diunggah.');
      } else {
        (window as any).showToast(data.error || 'Gagal mengunggah foto.', true);
      }
    } catch {
      (window as any).showToast('Terjadi kesalahan jaringan saat mengunggah.', true);
    } finally {
      if (vfUploadBtnText) vfUploadBtnText.textContent = 'Pilih / Ganti Foto';
      if (vfUploadBtn) vfUploadBtn.disabled = false;
      if (vfUploadStatus) vfUploadStatus.classList.add('hidden');
      target.value = '';
    }
  });

  // Dropdown Tujuan Tombol Umum
  vfPrimaryCtaUrlSelect?.addEventListener('change', () => {
    const val = vfPrimaryCtaUrlSelect.value;
    if (val === '__custom__') {
      vfPrimaryCtaCustomWrap?.classList.remove('hidden');
      vfPrimaryCtaUrl?.focus();
    } else {
      vfPrimaryCtaCustomWrap?.classList.add('hidden');
      if (vfPrimaryCtaUrl) vfPrimaryCtaUrl.value = val;
    }
    syncVisualToState();
  });

  vfSecondaryCtaUrlSelect?.addEventListener('change', () => {
    const val = vfSecondaryCtaUrlSelect.value;
    if (val === '__custom__') {
      vfSecondaryCtaCustomWrap?.classList.remove('hidden');
      vfSecondaryCtaUrl?.focus();
    } else {
      vfSecondaryCtaCustomWrap?.classList.add('hidden');
      if (vfSecondaryCtaUrl) vfSecondaryCtaUrl.value = val;
      if (val === '' && vfSecondaryCtaText) {
        vfSecondaryCtaText.value = '';
      }
    }
    syncVisualToState();
  });

  function syncVisualToState() {
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

    if (currentSectionKey === 'about_stats') {
      currentContentObj.heading = vfHeading?.value || 'Global Village Fund';
      currentContentObj.title = currentContentObj.heading;
      currentContentObj.paragraph1 = vfDesc?.value || '';
      currentContentObj.paragraph2 = vfParagraph2?.value || '';
      currentContentObj.masjidHeading = vfAboutMasjidHeading?.value || '';
      currentContentObj.masjidParagraph1 = vfAboutMasjidPara1?.value || '';
      currentContentObj.masjidParagraph2 = vfAboutMasjidPara2?.value || '';
      currentContentObj.masjidParagraph3 = vfAboutMasjidPara3?.value || '';
      currentContentObj.masjidImageUrl = vfAboutMasjidImageUrl?.value || '';
    }

    if (currentSectionKey === 'prog_pricing' && Array.isArray(currentPackages) && currentPackages.length > 0) {
      currentContentObj.packages = currentPackages;
    }

    if (currentSectionKey === 'prog_details') {
      currentContentObj.twinImages = currentTwinImages;
      currentContentObj.portfolioShowcaseItems = currentShowcaseItems;
      currentContentObj.valueBoxes = currentValueBoxes;
      currentContentObj.guarantees = currentGuarantees;
    }

    if (currentSectionKey === 'prog_faq' || currentSectionKey === 'masjid_faq' || currentSectionKey === 'gota_faq') {
      currentContentObj.faqs = currentFaqs;
    }

    if (currentSectionKey === 'masjid_progress') {
      currentContentObj.targetAmount = Number(vfMasjidTargetAmount?.value || 1310753350);
      currentContentObj.targetLabel = vfMasjidTarget?.value || '';
      delete currentContentObj.progressPercent;
      delete currentContentObj.collectedLabel;
      currentContentObj.milestones = currentMasjidMilestones;
    }

    if (currentSectionKey === 'gota_schemes') {
      currentContentObj.schemes = currentGotaSchemes;
    }

    if (currentSectionKey === 'hero' && Array.isArray(currentHeroSlides) && currentHeroSlides.length > 0) {
      currentContentObj.slides = currentHeroSlides;
      currentContentObj.heading = stripHtmlForPreview(currentHeroSlides[0]?.title || '');
      currentContentObj.subheading = currentHeroSlides[0]?.lead || '';
      currentContentObj.badge = currentHeroSlides[0]?.badge || '';
      if (currentHeroSlides[0]?.buttons?.[0]?.text) {
        currentContentObj.primaryCtaText = currentHeroSlides[0].buttons[0].text;
      }
      if (currentHeroSlides[0]?.buttons?.[0]?.href) {
        currentContentObj.primaryCtaUrl = currentHeroSlides[0].buttons[0].href;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Editor Paket Kontribusi (Accordion)
  // -------------------------------------------------------------------------
  const vfPackagesSection = document.getElementById('vfPackagesSection');
  const packagesListContainer = document.getElementById('packagesListContainer');
  const btnAddPackage = document.getElementById('btnAddPackage');

  function renderPackagesEditor(packages: any[]) {
    currentPackages = Array.isArray(packages) ? JSON.parse(JSON.stringify(packages)) : [];
    if (!packagesListContainer) return;

    if (currentPackages.length === 0) {
      packagesListContainer.innerHTML = `
        <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-300">
          Belum ada paket. Klik tombol "+ Tambah Paket" di atas untuk menambahkan.
        </div>
      `;
      return;
    }

    packagesListContainer.innerHTML = currentPackages
      .map((pkg: any, pIdx: number) => {
        const deliverables = Array.isArray(pkg.deliverables) ? pkg.deliverables : [];
        const isOpen = pIdx === openPkgIdx;
        return `
        <div class="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden" data-pkg-idx="${pIdx}">
          <div class="accordion-toggle-btn flex items-center justify-between px-4 py-3 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer select-none transition-colors" data-acc-group="pkg" data-acc-idx="${pIdx}">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-6 h-6 rounded-full bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">${pIdx + 1}</span>
              <span class="text-xs font-bold text-slate-900 truncate">${escapeAttr(pkg.title || 'Paket ' + (pIdx + 1))}</span>
              ${pkg.priceAmount ? `<span class="text-[11px] text-slate-500 shrink-0">(${escapeAttr(pkg.pricePrefix || '')}${escapeAttr(pkg.priceAmount)})</span>` : ''}
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button type="button" class="btn-delete-pkg accordion-no-toggle text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer" data-pkg-idx="${pIdx}" title="Hapus Paket">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
              <svg class="accordion-chevron text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div class="accordion-body p-4 space-y-3 border-t border-slate-100 ${isOpen ? '' : 'hidden'}">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              <div class="sm:col-span-2">
                <label class="block text-[11px] font-medium text-slate-600 mb-1">Nama Paket</label>
                <input type="text" class="pkg-field-title w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${escapeAttr(pkg.title)}" data-pkg-idx="${pIdx}" />
              </div>
              <div>
                <label class="block text-[11px] font-medium text-slate-600 mb-1">Keterangan Singkat</label>
                <input type="text" class="pkg-field-subtitle w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${escapeAttr(pkg.subtitle)}" data-pkg-idx="${pIdx}" />
              </div>
              <div>
                <label class="block text-[11px] font-medium text-slate-600 mb-1">Nominal / Harga</label>
                <input type="text" class="pkg-field-price w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${escapeAttr(pkg.priceAmount)}" data-pkg-idx="${pIdx}" placeholder="Contoh: 150.000" />
              </div>
              <div>
                <label class="block text-[11px] font-medium text-slate-600 mb-1">Satuan</label>
                <input type="text" class="pkg-field-unit w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${escapeAttr(pkg.priceUnit)}" data-pkg-idx="${pIdx}" placeholder="Contoh: /paket atau /m²" />
              </div>
              <div>
                <label class="block text-[11px] font-medium text-slate-600 mb-1">Estimasi Waktu</label>
                <input type="text" class="pkg-field-est w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0969da] outline-none" value="${escapeAttr(pkg.estimation)}" data-pkg-idx="${pIdx}" placeholder="Contoh: Estimasi: 30 Hari" />
              </div>
            </div>

            <div class="pt-2 border-t border-slate-100">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[11px] font-bold text-slate-700">Rincian Alokasi &amp; Manfaat Donasi:</span>
                <button type="button" class="btn-add-deliv text-[11px] font-semibold text-[#0969da] hover:underline cursor-pointer flex items-center gap-1" data-pkg-idx="${pIdx}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  <span>Tambah Poin</span>
                </button>
              </div>

              <div class="space-y-2">
                ${deliverables
                  .map(
                    (item: any, dIdx: number) => `
                  <div class="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <input type="text" class="deliv-field-bold w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-semibold focus:border-[#0969da] outline-none" value="${escapeAttr(item.bold)}" data-pkg-idx="${pIdx}" data-deliv-idx="${dIdx}" placeholder="Judul poin" />
                      </div>
                      <div class="sm:col-span-2">
                        <input type="text" class="deliv-field-text w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:border-[#0969da] outline-none" value="${escapeAttr(item.text)}" data-pkg-idx="${pIdx}" data-deliv-idx="${dIdx}" placeholder="Penjelasan manfaat..." />
                      </div>
                    </div>
                    <button type="button" class="btn-delete-deliv text-slate-400 hover:text-rose-600 p-1 rounded transition-colors shrink-0 cursor-pointer" data-pkg-idx="${pIdx}" data-deliv-idx="${dIdx}" title="Hapus Poin">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    bindPackagesEvents();
  }

  function bindPackagesEvents() {
    if (!packagesListContainer) return;

    packagesListContainer.querySelectorAll('.pkg-field-title').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].title = e.target.value;
        syncVisualToState();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-subtitle').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].subtitle = e.target.value;
        syncVisualToState();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-price').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].priceAmount = e.target.value;
        syncVisualToState();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-unit').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].priceUnit = e.target.value;
        syncVisualToState();
      });
    });

    packagesListContainer.querySelectorAll('.pkg-field-est').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        if (currentPackages[pIdx]) currentPackages[pIdx].estimation = e.target.value;
        syncVisualToState();
      });
    });

    packagesListContainer.querySelectorAll('.deliv-field-bold').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        const dIdx = parseInt(e.target.getAttribute('data-deliv-idx') || '0', 10);
        if (currentPackages[pIdx]?.deliverables?.[dIdx]) {
          currentPackages[pIdx].deliverables[dIdx].bold = e.target.value;
        }
        syncVisualToState();
      });
    });

    packagesListContainer.querySelectorAll('.deliv-field-text').forEach((inp) => {
      inp.addEventListener('input', (e: any) => {
        const pIdx = parseInt(e.target.getAttribute('data-pkg-idx') || '0', 10);
        const dIdx = parseInt(e.target.getAttribute('data-deliv-idx') || '0', 10);
        if (currentPackages[pIdx]?.deliverables?.[dIdx]) {
          currentPackages[pIdx].deliverables[dIdx].text = e.target.value;
        }
        syncVisualToState();
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
          openPkgIdx = pIdx;
          renderPackagesEditor(currentPackages);
          syncVisualToState();
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
            bold: 'Poin Manfaat Baru',
            text: 'Keterangan peruntukan donasi.',
          });
          openPkgIdx = pIdx;
          renderPackagesEditor(currentPackages);
          syncVisualToState();
        }
      });
    });

    packagesListContainer.querySelectorAll('.btn-delete-pkg').forEach((btn) => {
      btn.addEventListener('click', (e: any) => {
        e.stopPropagation();
        const targetBtn = (e.target as HTMLElement).closest('.btn-delete-pkg');
        if (!targetBtn) return;
        const pIdx = parseInt(targetBtn.getAttribute('data-pkg-idx') || '0', 10);
        if (confirm(`Yakin ingin menghapus Paket ${pIdx + 1}?`)) {
          currentPackages.splice(pIdx, 1);
          openPkgIdx = Math.max(0, Math.min(openPkgIdx, currentPackages.length - 1));
          renderPackagesEditor(currentPackages);
          syncVisualToState();
        }
      });
    });
  }

  btnAddPackage?.addEventListener('click', () => {
    const newPkg = {
      id: 'pkg-' + Date.now(),
      title: 'Paket Kontribusi Baru',
      subtitle: 'Alokasi Pembangunan & Pembinaan',
      priceAmount: '100.000',
      pricePrefix: 'Rp ',
      priceUnit: '/paket',
      priceDesc: 'Donasi langsung untuk program pilihan',
      estimation: 'Estimasi: 30 Hari Kerja',
      isPopular: false,
      deliverables: [
        { bold: 'Manfaat Program', text: 'Penjelasan alokasi dan dampak donasi.' },
      ],
      ctaText: 'Pilih Paket Ini',
    };
    currentPackages.push(newPkg);
    openPkgIdx = currentPackages.length - 1;
    renderPackagesEditor(currentPackages);
    syncVisualToState();
  });

  // -------------------------------------------------------------------------
  // Editor Slide Banner Utama (Accordion + Dropdown Tujuan Tombol + Enter Linebreak)
  // -------------------------------------------------------------------------
  const vfHeroSlidesSection = document.getElementById('vfHeroSlidesSection');
  const heroSlidesListContainer = document.getElementById('heroSlidesListContainer');
  const btnAddHeroSlide = document.getElementById('btnAddHeroSlide');
  const vfSlideFileInput = document.getElementById('vfSlideFileInput') as HTMLInputElement;

  function renderHeroSlidesEditor(slides: any[]) {
    currentHeroSlides = Array.isArray(slides) ? JSON.parse(JSON.stringify(slides)) : [];
    if (!heroSlidesListContainer) return;

    if (currentHeroSlides.length === 0) {
      heroSlidesListContainer.innerHTML = `
        <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-300">
          Belum ada slide banner. Klik tombol "+ Tambah Slide" di atas untuk menambahkan.
        </div>
      `;
      return;
    }

    heroSlidesListContainer.innerHTML = currentHeroSlides
      .map((slide: any, sIdx: number) => {
        const buttons = Array.isArray(slide.buttons) ? slide.buttons : [];
        const btn1Text = buttons[0]?.text || '';
        const btn1Href = buttons[0]?.href || '/';
        const btn2Text = buttons[1]?.text || '';
        const btn2Href = buttons[1]?.href || '';
        const isOpen = sIdx === openSlideIdx;
        const btn1Custom = btn1Href !== '' && !ALL_PRESET_URLS.has(btn1Href);
        const btn2Custom = btn2Href !== '' && !ALL_PRESET_URLS.has(btn2Href);
        const plainTitle = stripHtmlForPreview(slide.title || '');
        const labelTop = slide.badge || slide.taglineEn || '';

        return `
        <div class="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden" data-slide-idx="${sIdx}">
          <div class="accordion-toggle-btn flex items-center justify-between px-4 py-3 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer select-none transition-colors" data-acc-group="slide" data-acc-idx="${sIdx}">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-6 h-6 rounded-full bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">${sIdx + 1}</span>
              <div class="min-w-0">
                <span class="text-xs font-bold text-slate-900 block truncate">${escapeAttr(slide.label || 'Slide ' + (sIdx + 1))}</span>
                ${plainTitle ? `<span class="text-[11px] text-slate-500 block truncate">${escapeAttr(plainTitle)}</span>` : ''}
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              ${
                currentHeroSlides.length > 1
                  ? `
                <button type="button" class="btn-delete-slide accordion-no-toggle text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer" data-slide-idx="${sIdx}" title="Hapus Slide">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              `
                  : ''
              }
              <svg class="accordion-chevron text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div class="accordion-body p-4 space-y-3 border-t border-slate-100 ${isOpen ? '' : 'hidden'}">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Nama Slide (Penanda Urutan)</label>
                <input type="text" class="input-slide-label w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none" value="${escapeAttr(slide.label)}" placeholder="Contoh: Global Village Fund" data-slide-idx="${sIdx}" />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Label Kecil di Atas Judul</label>
                <input type="text" class="input-slide-badge w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none" value="${escapeAttr(labelTop)}" placeholder="Contoh: GLOBAL VILLAGE FUND" data-slide-idx="${sIdx}" />
              </div>

              <div class="sm:col-span-2">
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-[11px] font-semibold text-slate-700">Judul Utama Slide</label>
                  <span class="text-[10px] text-slate-400">Tekan Enter jika ingin pindah baris</span>
                </div>
                <textarea rows="2" class="input-slide-title w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none" placeholder="Tuliskan judul besar slide..." data-slide-idx="${sIdx}">${escapeAttr(htmlToLineBreaks(slide.title || ''))}</textarea>
              </div>

              <div class="sm:col-span-2">
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-[11px] font-semibold text-slate-700">Isi Teks / Penjelasan Slide</label>
                  <span class="text-[10px] text-slate-400">Tekan Enter 2 kali untuk membuat paragraf baru</span>
                </div>
                <textarea rows="5" class="input-slide-lead w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none leading-relaxed" placeholder="Tuliskan penjelasan lengkap slide..." data-slide-idx="${sIdx}">${escapeAttr(slide.lead)}</textarea>
              </div>

              <div class="sm:col-span-2 space-y-2 pt-1">
                <div class="flex items-center justify-between">
                  <label class="block text-[11px] font-semibold text-slate-700">Foto Latar Belakang Slide</label>
                  <div class="flex items-center gap-1.5">
                    <button type="button" class="btn-upload-slide-img inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0969da] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer" data-slide-idx="${sIdx}">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                      <span>${slide.image ? 'Ganti Foto' : 'Pilih Foto'}</span>
                    </button>
                    <button type="button" class="btn-clear-slide-img inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer ${slide.image ? '' : 'hidden'}" data-slide-idx="${sIdx}">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      <span>Hapus Foto</span>
                    </button>
                  </div>
                </div>
                <div class="w-full aspect-video max-h-48 rounded-lg bg-slate-900/5 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                  ${
                    slide.image
                      ? `<img src="${escapeAttr(slide.image)}" class="w-full h-full object-contain" alt="Pratinjau Slide ${sIdx + 1}" />`
                      : `
                    <div class="text-xs text-slate-400 flex flex-col items-center justify-center gap-1 p-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      <span>Belum ada foto latar slide</span>
                    </div>
                  `
                  }
                </div>
              </div>

              <!-- Tombol 1 -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Teks Tombol Utama</label>
                <input type="text" class="input-slide-btn1-text w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none" value="${escapeAttr(btn1Text)}" placeholder="Contoh: Kenali GVF" data-slide-idx="${sIdx}" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Tujuan Tombol Utama</label>
                <select class="select-slide-btn1-href w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none cursor-pointer" data-slide-idx="${sIdx}">
                  ${buildLinkSelectOptionsHtml(btn1Href, false)}
                </select>
                <div class="slide-btn1-custom-wrap mt-1.5 ${btn1Custom ? '' : 'hidden'}" data-slide-idx="${sIdx}">
                  <input type="text" class="input-slide-btn1-href w-full bg-white border border-slate-300 focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" value="${escapeAttr(btn1Href)}" placeholder="Contoh: https://wa.me/6281226832326" data-slide-idx="${sIdx}" />
                </div>
              </div>

              <!-- Tombol 2 -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Teks Tombol Kedua <span class="text-slate-400 font-normal">(Opsional)</span></label>
                <input type="text" class="input-slide-btn2-text w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none" value="${escapeAttr(btn2Text)}" placeholder="Contoh: Ambil Bagian" data-slide-idx="${sIdx}" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">Tujuan Tombol Kedua</label>
                <select class="select-slide-btn2-href w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-[#0969da] rounded-lg px-2.5 py-2 text-xs text-slate-900 outline-none cursor-pointer" data-slide-idx="${sIdx}">
                  ${buildLinkSelectOptionsHtml(btn2Href, true)}
                </select>
                <div class="slide-btn2-custom-wrap mt-1.5 ${btn2Custom ? '' : 'hidden'}" data-slide-idx="${sIdx}">
                  <input type="text" class="input-slide-btn2-href w-full bg-white border border-slate-300 focus:border-[#0969da] rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none" value="${escapeAttr(btn2Href)}" placeholder="Contoh: https://wa.me/6281226832326" data-slide-idx="${sIdx}" />
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    bindHeroSlideEvents();
  }

  function bindHeroSlideEvents() {
    if (!heroSlidesListContainer) return;

    heroSlidesListContainer.querySelectorAll('.input-slide-label').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].label = (e.target as HTMLInputElement).value;
        syncVisualToState();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-badge').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        const val = (e.target as HTMLInputElement).value;
        if (currentHeroSlides[sIdx]) {
          currentHeroSlides[sIdx].badge = val;
          currentHeroSlides[sIdx].taglineEn = val;
        }
        syncVisualToState();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-title').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          currentHeroSlides[sIdx].title = lineBreaksToHtml((e.target as HTMLTextAreaElement).value);
        }
        syncVisualToState();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-lead').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) currentHeroSlides[sIdx].lead = (e.target as HTMLTextAreaElement).value;
        syncVisualToState();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn1-text').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[0]) currentHeroSlides[sIdx].buttons[0] = { variant: 'primary', href: '/' };
          currentHeroSlides[sIdx].buttons[0].text = (e.target as HTMLInputElement).value;
          syncVisualToState();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.select-slide-btn1-href').forEach((el) => {
      el.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        const sIdx = Number(select.dataset.slideIdx);
        const customWrap = heroSlidesListContainer.querySelector(`.slide-btn1-custom-wrap[data-slide-idx="${sIdx}"]`);
        const customInp = heroSlidesListContainer.querySelector(`.input-slide-btn1-href[data-slide-idx="${sIdx}"]`) as HTMLInputElement | null;
        if (!currentHeroSlides[sIdx]) return;
        if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
        if (!currentHeroSlides[sIdx].buttons[0]) currentHeroSlides[sIdx].buttons[0] = { variant: 'primary', text: 'Lihat Program' };

        if (select.value === '__custom__') {
          customWrap?.classList.remove('hidden');
          customInp?.focus();
        } else {
          customWrap?.classList.add('hidden');
          currentHeroSlides[sIdx].buttons[0].href = select.value;
          if (customInp) customInp.value = select.value;
        }
        syncVisualToState();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn1-href').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[0]) currentHeroSlides[sIdx].buttons[0] = { variant: 'primary', text: 'Lihat Program' };
          currentHeroSlides[sIdx].buttons[0].href = (e.target as HTMLInputElement).value;
          syncVisualToState();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn2-text').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        const val = (e.target as HTMLInputElement).value;
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!val.trim() && !currentHeroSlides[sIdx].buttons[1]?.href) {
            currentHeroSlides[sIdx].buttons = currentHeroSlides[sIdx].buttons.slice(0, 1);
          } else {
            if (!currentHeroSlides[sIdx].buttons[1]) currentHeroSlides[sIdx].buttons[1] = { variant: 'outline', href: '#program-kebaikan' };
            currentHeroSlides[sIdx].buttons[1].text = val;
          }
          syncVisualToState();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.select-slide-btn2-href').forEach((el) => {
      el.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        const sIdx = Number(select.dataset.slideIdx);
        const customWrap = heroSlidesListContainer.querySelector(`.slide-btn2-custom-wrap[data-slide-idx="${sIdx}"]`);
        const customInp = heroSlidesListContainer.querySelector(`.input-slide-btn2-href[data-slide-idx="${sIdx}"]`) as HTMLInputElement | null;
        const textInp = heroSlidesListContainer.querySelector(`.input-slide-btn2-text[data-slide-idx="${sIdx}"]`) as HTMLInputElement | null;
        if (!currentHeroSlides[sIdx]) return;
        if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];

        if (select.value === '') {
          customWrap?.classList.add('hidden');
          currentHeroSlides[sIdx].buttons = currentHeroSlides[sIdx].buttons.slice(0, 1);
          if (textInp) textInp.value = '';
          if (customInp) customInp.value = '';
        } else if (select.value === '__custom__') {
          customWrap?.classList.remove('hidden');
          if (!currentHeroSlides[sIdx].buttons[1]) currentHeroSlides[sIdx].buttons[1] = { variant: 'outline', text: textInp?.value || 'Pelajari Lebih Lanjut' };
          customInp?.focus();
        } else {
          customWrap?.classList.add('hidden');
          if (!currentHeroSlides[sIdx].buttons[1]) currentHeroSlides[sIdx].buttons[1] = { variant: 'outline', text: textInp?.value || 'Ambil Bagian' };
          currentHeroSlides[sIdx].buttons[1].href = select.value;
          if (customInp) customInp.value = select.value;
        }
        syncVisualToState();
      });
    });

    heroSlidesListContainer.querySelectorAll('.input-slide-btn2-href').forEach((el) => {
      el.addEventListener('input', (e) => {
        const sIdx = Number((e.target as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          if (!Array.isArray(currentHeroSlides[sIdx].buttons)) currentHeroSlides[sIdx].buttons = [];
          if (!currentHeroSlides[sIdx].buttons[1]) currentHeroSlides[sIdx].buttons[1] = { variant: 'outline', text: '' };
          currentHeroSlides[sIdx].buttons[1].href = (e.target as HTMLInputElement).value;
          syncVisualToState();
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.btn-upload-slide-img').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        targetSlideImageIndex = Number((e.currentTarget as HTMLElement).dataset.slideIdx);
        vfSlideFileInput?.click();
      });
    });

    heroSlidesListContainer.querySelectorAll('.btn-clear-slide-img').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const sIdx = Number((e.currentTarget as HTMLElement).dataset.slideIdx);
        if (currentHeroSlides[sIdx]) {
          currentHeroSlides[sIdx].image = '';
          openSlideIdx = sIdx;
          renderHeroSlidesEditor(currentHeroSlides);
          syncVisualToState();
          (window as any).showToast(`Foto Slide ${sIdx + 1} berhasil dihapus.`);
        }
      });
    });

    heroSlidesListContainer.querySelectorAll('.btn-delete-slide').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sIdx = Number((e.currentTarget as HTMLElement).dataset.slideIdx);
        if (confirm(`Yakin ingin menghapus Slide ${sIdx + 1}?`)) {
          currentHeroSlides.splice(sIdx, 1);
          openSlideIdx = Math.max(0, Math.min(openSlideIdx, currentHeroSlides.length - 1));
          renderHeroSlidesEditor(currentHeroSlides);
          syncVisualToState();
        }
      });
    });
  }

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
      (window as any).showToast('Mengunggah foto slide...');
      const res = await fetch('/api/admin/sections/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (currentHeroSlides[targetSlideImageIndex]) {
          currentHeroSlides[targetSlideImageIndex].image = data.url;
          openSlideIdx = targetSlideImageIndex;
          renderHeroSlidesEditor(currentHeroSlides);
          syncVisualToState();
          (window as any).showToast('Foto slide berhasil diunggah.');
        }
      } else {
        (window as any).showToast(data.error || 'Gagal mengunggah foto slide.', true);
      }
    } catch {
      (window as any).showToast('Terjadi kesalahan jaringan saat mengunggah foto.', true);
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
      taglineEn: 'PROGRAM KEBAIKAN GVF',
      title: 'Judul Slide Baru<br />Membangun Manfaat Nyata.',
      lead: 'Tuliskan penjelasan lengkap slide ini...',
      image: '',
      buttons: [{ text: 'Lihat Program', href: '#program-kebaikan', variant: 'primary' }],
    };
    currentHeroSlides.push(newSlide);
    openSlideIdx = currentHeroSlides.length - 1;
    renderHeroSlidesEditor(currentHeroSlides);
    syncVisualToState();
  });

  // -------------------------------------------------------------------------
  // Detail Program, Progres Masjid, Skema GOTA, FAQ
  // -------------------------------------------------------------------------
  const vfProgramDetailsSection = document.getElementById('vfProgramDetailsSection');
  const vfTwinImg1 = document.getElementById('vfTwinImg1') as HTMLInputElement;
  const vfTwinImg2 = document.getElementById('vfTwinImg2') as HTMLInputElement;
  const vfTwinImg1Preview = document.getElementById('vfTwinImg1Preview') as HTMLImageElement;
  const vfTwinImg2Preview = document.getElementById('vfTwinImg2Preview') as HTMLImageElement;
  const showcaseListContainer = document.getElementById('showcaseListContainer');
  const valueBoxesListContainer = document.getElementById('valueBoxesListContainer');
  const guaranteesListContainer = document.getElementById('guaranteesListContainer');
  const btnAddGuarantee = document.getElementById('btnAddGuarantee');

  const vfFaqSection = document.getElementById('vfFaqSection');
  const faqListContainer = document.getElementById('faqListContainer');
  const btnAddFaq = document.getElementById('btnAddFaq');

  const vfGenericSubFileInput = document.getElementById('vfGenericSubFileInput') as HTMLInputElement;

  const vfMasjidProgressSection = document.getElementById('vfMasjidProgressSection');
  const vfMasjidTargetAmount = document.getElementById('vfMasjidTargetAmount') as HTMLInputElement;
  const vfMasjidTarget = document.getElementById('vfMasjidTarget') as HTMLInputElement;
  const masjidMilestonesListContainer = document.getElementById('masjidMilestonesListContainer');
  const btnAddMasjidMilestone = document.getElementById('btnAddMasjidMilestone');

  const vfGotaSchemesSection = document.getElementById('vfGotaSchemesSection');
  const gotaSchemesListContainer = document.getElementById('gotaSchemesListContainer');
  const btnAddGotaScheme = document.getElementById('btnAddGotaScheme');

  function updateTwinPreview(index: number, url: string) {
    const previewEl = index === 0 ? vfTwinImg1Preview : vfTwinImg2Preview;
    const emptyEl = document.getElementById(index === 0 ? 'vfTwinImg1Empty' : 'vfTwinImg2Empty');
    if (previewEl) {
      if (url && url.trim()) {
        previewEl.src = url.trim();
        previewEl.classList.remove('hidden');
        emptyEl?.classList.add('hidden');
      } else {
        previewEl.src = '';
        previewEl.classList.add('hidden');
        emptyEl?.classList.remove('hidden');
      }
    }
  }

  function renderProgramDetailsEditor(content: any) {
    currentTwinImages = Array.isArray(content.twinImages) ? JSON.parse(JSON.stringify(content.twinImages)) : ['', ''];
    while (currentTwinImages.length < 2) currentTwinImages.push('');
    currentShowcaseItems = Array.isArray(content.portfolioShowcaseItems) ? JSON.parse(JSON.stringify(content.portfolioShowcaseItems)) : [];
    currentValueBoxes = Array.isArray(content.valueBoxes) ? JSON.parse(JSON.stringify(content.valueBoxes)) : [];
    currentGuarantees = Array.isArray(content.guarantees) ? JSON.parse(JSON.stringify(content.guarantees)) : [];

    if (vfTwinImg1) {
      vfTwinImg1.value = currentTwinImages[0] || '';
      updateTwinPreview(0, vfTwinImg1.value);
    }
    if (vfTwinImg2) {
      vfTwinImg2.value = currentTwinImages[1] || '';
      updateTwinPreview(1, vfTwinImg2.value);
    }

    if (showcaseListContainer) {
      showcaseListContainer.innerHTML = currentShowcaseItems
        .map(
          (item: any, idx: number) => `
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5 relative" data-showcase-idx="${idx}">
          <div class="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <span class="text-[11px] font-bold text-[#0969da]">Kartu ${idx + 1}</span>
            <div class="flex items-center gap-1.5">
              <button type="button" class="btn-upload-showcase text-[11px] px-2 py-0.5 bg-white border border-slate-200 hover:border-[#0969da] text-[#0969da] rounded font-medium cursor-pointer" data-showcase-idx="${idx}">
                Ganti Foto
              </button>
              <button type="button" class="btn-delete-showcase-img text-[11px] px-2 py-0.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 rounded font-medium cursor-pointer ${item.image ? '' : 'hidden'}" data-showcase-idx="${idx}">
                Hapus
              </button>
            </div>
          </div>
          <div class="flex gap-3 items-center">
            <div class="w-28 aspect-[4/3] rounded-lg bg-slate-900/5 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center relative">
              <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" class="w-full h-full object-contain ${item.image ? '' : 'hidden'}" id="showcase-img-preview-${idx}" />
              <div class="text-[10px] text-slate-400 text-center p-1 leading-tight ${item.image ? 'hidden' : ''}">Belum ada foto</div>
            </div>
            <div class="min-w-0 flex-1 space-y-1.5">
              <input type="text" class="showcase-field-tag w-full bg-white border border-slate-200 rounded px-2 py-1 text-[11px] font-semibold text-blue-700 uppercase focus:border-[#0969da] outline-none" value="${escapeAttr(item.tag)}" placeholder="Label singkat" data-showcase-idx="${idx}" />
              <input type="text" class="showcase-field-name w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs font-bold text-slate-800 focus:border-[#0969da] outline-none" value="${escapeAttr(item.name)}" placeholder="Judul Foto" data-showcase-idx="${idx}" />
              <input type="text" class="showcase-field-cat w-full bg-white border border-slate-200 rounded px-2 py-1 text-[11px] text-slate-600 focus:border-[#0969da] outline-none" value="${escapeAttr(item.category)}" placeholder="Kategori" data-showcase-idx="${idx}" />
            </div>
          </div>
        </div>
      `
        )
        .join('');
    }

    if (valueBoxesListContainer) {
      valueBoxesListContainer.innerHTML = currentValueBoxes
        .map(
          (vb: any, idx: number) => `
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5" data-vb-idx="${idx}">
          <span class="text-[10px] font-bold text-slate-500">Keunggulan #${idx + 1}</span>
          <input type="text" class="vb-field-title w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-900 focus:border-[#0969da] outline-none" value="${escapeAttr(vb.title)}" placeholder="Judul Keunggulan" data-vb-idx="${idx}" />
          <textarea rows="2" class="vb-field-desc w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 focus:border-[#0969da] outline-none leading-relaxed" placeholder="Penjelasan singkat" data-vb-idx="${idx}">${escapeAttr(vb.description)}</textarea>
        </div>
      `
        )
        .join('');
    }

    if (guaranteesListContainer) {
      guaranteesListContainer.innerHTML = currentGuarantees
        .map(
          (g: string, idx: number) => `
        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2" data-g-idx="${idx}">
          <span class="w-5 h-5 rounded-full bg-blue-50 text-[#0969da] flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <input type="text" class="g-field-text flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:border-[#0969da] outline-none" value="${escapeAttr(g)}" data-g-idx="${idx}" />
          <button type="button" class="btn-delete-g text-slate-400 hover:text-rose-600 p-1 cursor-pointer" data-g-idx="${idx}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      `
        )
        .join('');
    }
  }

  function renderMasjidProgressEditor(content: any) {
    const parsedTarget = Number(content.targetAmount) || Number(String(content.targetLabel || '').replace(/[^\d]/g, '')) || 1310753350;
    if (vfMasjidTargetAmount) vfMasjidTargetAmount.value = String(parsedTarget);
    if (vfMasjidTarget) vfMasjidTarget.value = content.targetLabel || 'Rp 1.310.753.350';
    currentMasjidMilestones = Array.isArray(content.milestones) ? JSON.parse(JSON.stringify(content.milestones)) : [];
    if (!masjidMilestonesListContainer) return;
    masjidMilestonesListContainer.innerHTML = currentMasjidMilestones
      .map((ms: any, idx: number) => {
        const isOpen = idx === openMsIdx;
        return `
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden" data-ms-idx="${idx}">
        <div class="accordion-toggle-btn flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer select-none" data-acc-group="ms" data-acc-idx="${idx}">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-5 h-5 rounded-md bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">${idx + 1}</span>
            <span class="text-xs font-bold text-slate-800 truncate">${escapeAttr(ms.title || 'Tahapan #' + (idx + 1))}</span>
            ${ms.status ? `<span class="text-[11px] text-[#0969da] font-semibold shrink-0">${escapeAttr(ms.status)}</span>` : ''}
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" class="btn-delete-masjid-ms accordion-no-toggle text-slate-400 hover:text-rose-600 p-1 cursor-pointer" data-ms-idx="${idx}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <svg class="accordion-chevron text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <div class="accordion-body p-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 ${isOpen ? '' : 'hidden'}">
          <input type="text" class="ms-field-title bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#0969da]" value="${escapeAttr(ms.title)}" placeholder="Nama Tahapan" data-ms-idx="${idx}" />
          <input type="text" class="ms-field-status bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-[#0969da]" value="${escapeAttr(ms.status)}" placeholder="Status (Contoh: Selesai 100%)" data-ms-idx="${idx}" />
          <input type="text" class="ms-field-detail sm:col-span-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none focus:border-[#0969da]" value="${escapeAttr(ms.detail)}" placeholder="Keterangan pekerjaan..." data-ms-idx="${idx}" />
        </div>
      </div>
    `;
      })
      .join('');
  }

  function renderGotaSchemesEditor(schemes: any[]) {
    currentGotaSchemes = Array.isArray(schemes) ? JSON.parse(JSON.stringify(schemes)) : [];
    if (!gotaSchemesListContainer) return;
    gotaSchemesListContainer.innerHTML = currentGotaSchemes
      .map((sch: any, idx: number) => {
        const isOpen = idx === openGsIdx;
        return `
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden" data-gs-idx="${idx}">
        <div class="accordion-toggle-btn flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer select-none" data-acc-group="gs" data-acc-idx="${idx}">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-5 h-5 rounded-md bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">${idx + 1}</span>
            <span class="text-xs font-bold text-slate-800 truncate">${escapeAttr(sch.title || 'Skema #' + (idx + 1))}</span>
            ${sch.amount ? `<span class="text-[11px] text-slate-500 shrink-0">(${escapeAttr(sch.amount)})</span>` : ''}
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" class="btn-delete-gota-scheme accordion-no-toggle text-slate-400 hover:text-rose-600 p-1 cursor-pointer" data-gs-idx="${idx}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <svg class="accordion-chevron text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <div class="accordion-body p-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 ${isOpen ? '' : 'hidden'}">
          <input type="text" class="gs-field-title bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#0969da]" value="${escapeAttr(sch.title)}" placeholder="Nama Skema" data-gs-idx="${idx}" />
          <input type="text" class="gs-field-amount bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-[#0969da]" value="${escapeAttr(sch.amount)}" placeholder="Rp 300.000" data-gs-idx="${idx}" />
          <input type="text" class="gs-field-period bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-[#0969da]" value="${escapeAttr(sch.period)}" placeholder="per bulan" data-gs-idx="${idx}" />
          <textarea rows="2" class="gs-field-desc sm:col-span-3 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none focus:border-[#0969da]" placeholder="Manfaat dukungan untuk santri..." data-gs-idx="${idx}">${escapeAttr(sch.desc)}</textarea>
        </div>
      </div>
    `;
      })
      .join('');
  }

  function renderFaqEditor(faqs: any[]) {
    currentFaqs = Array.isArray(faqs) ? JSON.parse(JSON.stringify(faqs)) : [];
    if (!faqListContainer) return;

    if (currentFaqs.length === 0) {
      faqListContainer.innerHTML = `
        <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-xl border border-dashed border-slate-300">
          Belum ada pertanyaan. Klik "+ Tambah Pertanyaan" untuk menambahkan.
        </div>
      `;
      return;
    }

    faqListContainer.innerHTML = currentFaqs
      .map((faq: any, idx: number) => {
        const isOpen = idx === openFaqIdx;
        return `
      <div class="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden" data-faq-idx="${idx}">
        <div class="accordion-toggle-btn flex items-center justify-between px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer select-none" data-acc-group="faq" data-acc-idx="${idx}">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-5 h-5 rounded-md bg-blue-50 text-[#0969da] font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">${idx + 1}</span>
            <span class="text-xs font-bold text-slate-800 truncate">${escapeAttr(faq.question || 'Pertanyaan #' + (idx + 1))}</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button type="button" class="btn-delete-faq accordion-no-toggle text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer" data-faq-idx="${idx}" title="Hapus Pertanyaan">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <svg class="accordion-chevron text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
        <div class="accordion-body p-3.5 space-y-2 border-t border-slate-100 ${isOpen ? '' : 'hidden'}">
          <div>
            <label class="block text-[11px] font-semibold text-slate-700 mb-1">Pertanyaan</label>
            <input type="text" class="faq-field-q w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-semibold focus:bg-white focus:border-[#0969da] outline-none" value="${escapeAttr(faq.question)}" data-faq-idx="${idx}" placeholder="Tuliskan pertanyaan..." />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-700 mb-1">Jawaban</label>
            <textarea rows="3" class="faq-field-a w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 leading-relaxed focus:bg-white focus:border-[#0969da] outline-none" data-faq-idx="${idx}" placeholder="Tuliskan jawaban...">${escapeAttr(faq.answer)}</textarea>
          </div>
        </div>
      </div>
    `;
      })
      .join('');
  }

  // Accordion & Delegated Click Handlers
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const accToggle = target.closest('.accordion-toggle-btn') as HTMLElement;
    if (accToggle && !target.closest('.accordion-no-toggle')) {
      const card = accToggle.parentElement;
      const body = card?.querySelector('.accordion-body');
      const chevron = accToggle.querySelector('.accordion-chevron');
      const group = accToggle.dataset.accGroup;
      const idx = parseInt(accToggle.dataset.accIdx || '0', 10);
      const willOpen = body?.classList.contains('hidden');

      body?.classList.toggle('hidden');
      chevron?.classList.toggle('rotate-180');

      if (willOpen) {
        if (group === 'slide') openSlideIdx = idx;
        else if (group === 'pkg') openPkgIdx = idx;
        else if (group === 'faq') openFaqIdx = idx;
        else if (group === 'ms') openMsIdx = idx;
        else if (group === 'gs') openGsIdx = idx;
      }
      return;
    }

    const btnUploadTwin = target.closest('.btn-upload-twin') as HTMLElement;
    if (btnUploadTwin) {
      const idx = parseInt(btnUploadTwin.dataset.twinIdx || '0', 10);
      targetSubUpload = { type: 'twin', index: idx };
      vfGenericSubFileInput?.click();
      return;
    }

    const btnDeleteTwin = target.closest('.btn-delete-twin') as HTMLElement;
    if (btnDeleteTwin) {
      const idx = parseInt(btnDeleteTwin.dataset.twinIdx || '0', 10);
      currentTwinImages[idx] = '';
      if (idx === 0 && vfTwinImg1) vfTwinImg1.value = '';
      if (idx === 1 && vfTwinImg2) vfTwinImg2.value = '';
      updateTwinPreview(idx, '');
      syncVisualToState();
      (window as any).showToast(`Foto dokumentasi ${idx + 1} berhasil dihapus.`);
      return;
    }

    const btnUploadShowcase = target.closest('.btn-upload-showcase') as HTMLElement;
    if (btnUploadShowcase) {
      const idx = parseInt(btnUploadShowcase.dataset.showcaseIdx || '0', 10);
      targetSubUpload = { type: 'showcase', index: idx };
      vfGenericSubFileInput?.click();
      return;
    }

    const btnDeleteShowcaseImg = target.closest('.btn-delete-showcase-img') as HTMLElement;
    if (btnDeleteShowcaseImg) {
      const idx = parseInt(btnDeleteShowcaseImg.dataset.showcaseIdx || '0', 10);
      if (currentShowcaseItems[idx]) {
        currentShowcaseItems[idx].image = '';
        renderProgramDetailsEditor(currentContentObj);
        syncVisualToState();
        (window as any).showToast(`Foto kartu ${idx + 1} berhasil dihapus.`);
      }
      return;
    }

    const btnDelG = target.closest('.btn-delete-g') as HTMLElement;
    if (btnDelG) {
      const idx = parseInt(btnDelG.dataset.gIdx || '0', 10);
      currentGuarantees.splice(idx, 1);
      renderProgramDetailsEditor(currentContentObj);
      syncVisualToState();
      return;
    }

    const btnDelFaq = target.closest('.btn-delete-faq') as HTMLElement;
    if (btnDelFaq) {
      e.stopPropagation();
      const idx = parseInt(btnDelFaq.dataset.faqIdx || '0', 10);
      currentFaqs.splice(idx, 1);
      openFaqIdx = Math.max(0, Math.min(openFaqIdx, currentFaqs.length - 1));
      renderFaqEditor(currentFaqs);
      syncVisualToState();
      return;
    }

    const btnDelMs = target.closest('.btn-delete-masjid-ms') as HTMLElement;
    if (btnDelMs) {
      e.stopPropagation();
      const idx = parseInt(btnDelMs.dataset.msIdx || '0', 10);
      currentMasjidMilestones.splice(idx, 1);
      openMsIdx = Math.max(0, Math.min(openMsIdx, currentMasjidMilestones.length - 1));
      renderMasjidProgressEditor({ ...currentContentObj, milestones: currentMasjidMilestones });
      syncVisualToState();
      return;
    }

    const btnDelGs = target.closest('.btn-delete-gota-scheme') as HTMLElement;
    if (btnDelGs) {
      e.stopPropagation();
      const idx = parseInt(btnDelGs.dataset.gsIdx || '0', 10);
      currentGotaSchemes.splice(idx, 1);
      openGsIdx = Math.max(0, Math.min(openGsIdx, currentGotaSchemes.length - 1));
      renderGotaSchemesEditor(currentGotaSchemes);
      syncVisualToState();
      return;
    }
  });

  btnAddGuarantee?.addEventListener('click', () => {
    currentGuarantees.push('Poin jaminan transparansi baru');
    renderProgramDetailsEditor(currentContentObj);
    syncVisualToState();
  });

  btnAddFaq?.addEventListener('click', () => {
    currentFaqs.push({ question: 'Pertanyaan baru seputar program?', answer: 'Tuliskan jawaban resmi di sini.' });
    openFaqIdx = currentFaqs.length - 1;
    renderFaqEditor(currentFaqs);
    syncVisualToState();
  });

  btnAddMasjidMilestone?.addEventListener('click', () => {
    currentMasjidMilestones.push({
      title: 'Tahap Pekerjaan Baru',
      status: 'Berjalan',
      detail: 'Deskripsi pekerjaan pembangunan masjid.',
    });
    openMsIdx = currentMasjidMilestones.length - 1;
    renderMasjidProgressEditor({ ...currentContentObj, milestones: currentMasjidMilestones });
    syncVisualToState();
  });

  btnAddGotaScheme?.addEventListener('click', () => {
    currentGotaSchemes.push({
      title: 'Skema Orang Tua Asuh Baru',
      amount: 'Rp 200.000',
      period: 'per bulan',
      desc: 'Cakupan manfaat beasiswa dan pembinaan santri.',
    });
    openGsIdx = currentGotaSchemes.length - 1;
    renderGotaSchemesEditor(currentGotaSchemes);
    syncVisualToState();
  });

  vfGenericSubFileInput?.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file || !targetSubUpload) return;

    if (file.size > 25 * 1024 * 1024) {
      (window as any).showToast('Ukuran berkas melebihi 25 MB.', true);
      target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      (window as any).showToast('Mengunggah foto...');
      const res = await fetch('/api/admin/sections/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (targetSubUpload.type === 'twin') {
          currentTwinImages[targetSubUpload.index] = data.url;
          if (targetSubUpload.index === 0 && vfTwinImg1) vfTwinImg1.value = data.url;
          if (targetSubUpload.index === 1 && vfTwinImg2) vfTwinImg2.value = data.url;
          updateTwinPreview(targetSubUpload.index, data.url);
        } else if (targetSubUpload.type === 'showcase') {
          if (currentShowcaseItems[targetSubUpload.index]) {
            currentShowcaseItems[targetSubUpload.index].image = data.url;
            renderProgramDetailsEditor(currentContentObj);
          }
        } else if (targetSubUpload.type === 'about_masjid') {
          if (vfAboutMasjidImageUrl) vfAboutMasjidImageUrl.value = data.url;
          updateAboutMasjidPreview(data.url);
        }
        syncVisualToState();
        (window as any).showToast('Foto berhasil diunggah.');
      } else {
        (window as any).showToast(data.error || 'Gagal mengunggah foto.', true);
      }
    } catch {
      (window as any).showToast('Terjadi kesalahan jaringan saat mengunggah foto.', true);
    } finally {
      target.value = '';
      targetSubUpload = null;
    }
  });

  // Delegated Input Listeners
  document.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (target.classList.contains('showcase-field-tag')) {
      const idx = parseInt(target.dataset.showcaseIdx || '0', 10);
      if (currentShowcaseItems[idx]) currentShowcaseItems[idx].tag = target.value;
      syncVisualToState();
    } else if (target.classList.contains('showcase-field-name')) {
      const idx = parseInt(target.dataset.showcaseIdx || '0', 10);
      if (currentShowcaseItems[idx]) currentShowcaseItems[idx].name = target.value;
      syncVisualToState();
    } else if (target.classList.contains('showcase-field-cat')) {
      const idx = parseInt(target.dataset.showcaseIdx || '0', 10);
      if (currentShowcaseItems[idx]) currentShowcaseItems[idx].category = target.value;
      syncVisualToState();
    } else if (target.classList.contains('vb-field-title')) {
      const idx = parseInt(target.dataset.vbIdx || '0', 10);
      if (currentValueBoxes[idx]) currentValueBoxes[idx].title = target.value;
      syncVisualToState();
    } else if (target.classList.contains('vb-field-desc')) {
      const idx = parseInt(target.dataset.vbIdx || '0', 10);
      if (currentValueBoxes[idx]) currentValueBoxes[idx].description = target.value;
      syncVisualToState();
    } else if (target.classList.contains('g-field-text')) {
      const idx = parseInt(target.dataset.gIdx || '0', 10);
      currentGuarantees[idx] = target.value;
      syncVisualToState();
    } else if (target.classList.contains('faq-field-q')) {
      const idx = parseInt(target.dataset.faqIdx || '0', 10);
      if (currentFaqs[idx]) currentFaqs[idx].question = target.value;
      syncVisualToState();
    } else if (target.classList.contains('faq-field-a')) {
      const idx = parseInt(target.dataset.faqIdx || '0', 10);
      if (currentFaqs[idx]) currentFaqs[idx].answer = target.value;
      syncVisualToState();
    } else if (target.classList.contains('ms-field-title')) {
      const idx = parseInt(target.dataset.msIdx || '0', 10);
      if (currentMasjidMilestones[idx]) currentMasjidMilestones[idx].title = target.value;
      syncVisualToState();
    } else if (target.classList.contains('ms-field-status')) {
      const idx = parseInt(target.dataset.msIdx || '0', 10);
      if (currentMasjidMilestones[idx]) currentMasjidMilestones[idx].status = target.value;
      syncVisualToState();
    } else if (target.classList.contains('ms-field-detail')) {
      const idx = parseInt(target.dataset.msIdx || '0', 10);
      if (currentMasjidMilestones[idx]) currentMasjidMilestones[idx].detail = target.value;
      syncVisualToState();
    } else if (target.classList.contains('gs-field-title')) {
      const idx = parseInt(target.dataset.gsIdx || '0', 10);
      if (currentGotaSchemes[idx]) currentGotaSchemes[idx].title = target.value;
      syncVisualToState();
    } else if (target.classList.contains('gs-field-amount')) {
      const idx = parseInt(target.dataset.gsIdx || '0', 10);
      if (currentGotaSchemes[idx]) currentGotaSchemes[idx].amount = target.value;
      syncVisualToState();
    } else if (target.classList.contains('gs-field-period')) {
      const idx = parseInt(target.dataset.gsIdx || '0', 10);
      if (currentGotaSchemes[idx]) currentGotaSchemes[idx].period = target.value;
      syncVisualToState();
    } else if (target.classList.contains('gs-field-desc')) {
      const idx = parseInt(target.dataset.gsIdx || '0', 10);
      if (currentGotaSchemes[idx]) currentGotaSchemes[idx].desc = target.value;
      syncVisualToState();
    }
  });

  [
    vfHeading,
    vfBadge,
    vfSubheading,
    vfDesc,
    vfParagraph2,
    vfPrimaryCtaText,
    vfPrimaryCtaUrl,
    vfSecondaryCtaText,
    vfSecondaryCtaUrl,
    vfImageUrl,
    vfMasjidTargetAmount,
    vfMasjidTarget,
    vfAboutMasjidHeading,
    vfAboutMasjidPara1,
    vfAboutMasjidPara2,
    vfAboutMasjidPara3,
  ].forEach((input) => {
    input?.addEventListener('input', syncVisualToState);
  });

  function openModal() {
    if (editModal && modalBox) {
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

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editModal && !editModal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  const editBtns = document.querySelectorAll('.edit-section-btn');
  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-section-id') || '';
      const title = btn.getAttribute('data-section-title') || '';
      const key = btn.getAttribute('data-section-key') || '';
      const order = btn.getAttribute('data-section-order') || '1';
      const contentStr = btn.getAttribute('data-section-content') || '{}';
      currentSectionKey = key;

      openSlideIdx = 0;
      openPkgIdx = 0;
      openFaqIdx = 0;
      openMsIdx = 0;
      openGsIdx = 0;

      try {
        currentContentObj = JSON.parse(contentStr);
      } catch {
        currentContentObj = {};
      }

      if (editSectionId) editSectionId.value = id;
      if (editTitle) editTitle.value = title;
      if (editSortOrder) editSortOrder.value = order;
      if (modalSubtitle) modalSubtitle.textContent = title || 'Ubah teks dan foto bagian ini';

      if (vfHeading) vfHeading.value = currentContentObj.heading || currentContentObj.title || '';
      if (vfBadge) vfBadge.value = currentContentObj.badge || '';
      if (vfSubheading) vfSubheading.value = currentContentObj.subheading || '';
      if (vfDesc) vfDesc.value = currentContentObj.desc || currentContentObj.paragraph1 || currentContentObj.description || '';
      if (vfParagraph2) vfParagraph2.value = currentContentObj.paragraph2 || '';
      if (vfPrimaryCtaText) vfPrimaryCtaText.value = currentContentObj.primaryCtaText || currentContentObj.ctaText || '';
      syncSelectWithUrl(
        vfPrimaryCtaUrlSelect,
        vfPrimaryCtaCustomWrap,
        vfPrimaryCtaUrl,
        currentContentObj.primaryCtaUrl || currentContentObj.ctaUrl || '',
        false
      );
      if (vfSecondaryCtaText) vfSecondaryCtaText.value = currentContentObj.secondaryCtaText || '';
      syncSelectWithUrl(
        vfSecondaryCtaUrlSelect,
        vfSecondaryCtaCustomWrap,
        vfSecondaryCtaUrl,
        currentContentObj.secondaryCtaUrl || '',
        true
      );
      if (vfImageUrl) {
        vfImageUrl.value = currentContentObj.imageUrl || currentContentObj.mediaUrl || currentContentObj.videoUrl || '';
        updateMediaPreview(vfImageUrl.value);
      }

      const hideAllSpecialized = () => {
        vfHeroSlidesSection?.classList.add('hidden');
        vfPackagesSection?.classList.add('hidden');
        vfProgramDetailsSection?.classList.add('hidden');
        vfFaqSection?.classList.add('hidden');
        vfMasjidProgressSection?.classList.add('hidden');
        vfGotaSchemesSection?.classList.add('hidden');
        vfAboutMasjidSection?.classList.add('hidden');
      };

      hideAllSpecialized();
      if (key === 'hero') {
        vfGeneralSectionFields?.classList.add('hidden');
        vfHeroSlidesSection?.classList.remove('hidden');
        renderHeroSlidesEditor(currentContentObj.slides || []);
      } else if (key === 'about_stats') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfAboutMasjidSection?.classList.remove('hidden');
        if (vfAboutMasjidHeading) vfAboutMasjidHeading.value = currentContentObj.masjidHeading || 'Masjid Taman Khairu Ummah Sughro';
        if (vfAboutMasjidPara1) vfAboutMasjidPara1.value = currentContentObj.masjidParagraph1 || '';
        if (vfAboutMasjidPara2) vfAboutMasjidPara2.value = currentContentObj.masjidParagraph2 || '';
        if (vfAboutMasjidPara3) vfAboutMasjidPara3.value = currentContentObj.masjidParagraph3 || '';
        if (vfAboutMasjidImageUrl) vfAboutMasjidImageUrl.value = currentContentObj.masjidImageUrl || '';
        updateAboutMasjidPreview(vfAboutMasjidImageUrl?.value || '');
      } else if (key === 'prog_pricing') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfPackagesSection?.classList.remove('hidden');
        renderPackagesEditor(currentContentObj.packages || []);
      } else if (key === 'prog_details') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfProgramDetailsSection?.classList.remove('hidden');
        renderProgramDetailsEditor(currentContentObj);
      } else if (key === 'prog_faq' || key === 'masjid_faq' || key === 'gota_faq') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfFaqSection?.classList.remove('hidden');
        renderFaqEditor(currentContentObj.faqs || []);
      } else if (key === 'masjid_progress') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfMasjidProgressSection?.classList.remove('hidden');
        renderMasjidProgressEditor(currentContentObj);
      } else if (key === 'gota_schemes') {
        vfGeneralSectionFields?.classList.remove('hidden');
        vfGotaSchemesSection?.classList.remove('hidden');
        renderGotaSchemesEditor(currentContentObj.schemes || []);
      } else {
        vfGeneralSectionFields?.classList.remove('hidden');
      }

      openModal();
    });
  });

  // Simpan Perubahan ke Server
  saveSectionBtn?.addEventListener('click', async () => {
    syncVisualToState();

    if (saveBtnText) saveBtnText.textContent = 'Menyimpan...';
    if (saveSectionBtn) (saveSectionBtn as HTMLButtonElement).disabled = true;

    const payload = {
      sectionId: Number(editSectionId.value),
      title: editTitle.value,
      sortOrder: Number(editSortOrder.value),
      content: currentContentObj,
    };

    try {
      const res = await fetch('/api/admin/sections/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        (window as any).showToast('Perubahan berhasil disimpan.');
        const titleDisplay = document.getElementById(`title-display-${payload.sectionId}`);
        if (titleDisplay) titleDisplay.textContent = payload.title;

        const activeBtn = document.querySelector(`.edit-section-btn[data-section-id="${payload.sectionId}"]`);
        if (activeBtn) {
          activeBtn.setAttribute('data-section-title', payload.title);
          activeBtn.setAttribute('data-section-order', String(payload.sortOrder));
          activeBtn.setAttribute('data-section-content', JSON.stringify(payload.content, null, 2));
        }

        closeModal();
      } else {
        (window as any).showToast(data.error || 'Gagal menyimpan perubahan.', true);
      }
    } catch {
      (window as any).showToast('Terjadi kesalahan jaringan.', true);
    } finally {
      if (saveBtnText) saveBtnText.textContent = 'Simpan Perubahan';
      if (saveSectionBtn) (saveSectionBtn as HTMLButtonElement).disabled = false;
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionEditor);
  } else {
    initSectionEditor();
  }
}
