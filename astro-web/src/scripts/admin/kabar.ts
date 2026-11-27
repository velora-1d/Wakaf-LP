// src/scripts/admin/kabar.ts
// Client logic for Kelola Kabar & Warta CMS

export function setupKabarManager() {
  // Referensi Elemen Form Modal
  const formModal = document.getElementById('articleFormModal');
  const formModalBox = document.getElementById('formModalBox');
  const formModalTitle = document.getElementById('formModalTitle');
  const formModalSubtitle = document.getElementById('formModalSubtitle');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtn = document.getElementById('submitArticleFormBtn') as HTMLButtonElement | null;
  const btnOpenCreate = document.getElementById('btnOpenCreateArticle');
  const closeFormModalBtn = document.getElementById('closeFormModalBtn');
  const cancelFormModalBtn = document.getElementById('cancelFormModalBtn');

  // Input fields
  const inputId = document.getElementById('inputArticleId') as HTMLInputElement | null;
  const inputTitle = document.getElementById('inputTitle') as HTMLInputElement | null;
  const inputCategory = document.getElementById('inputCategory') as HTMLInputElement | null;
  const inputSlug = document.getElementById('inputSlug') as HTMLInputElement | null;
  const inputAuthor = document.getElementById('inputAuthor') as HTMLInputElement | null;
  const inputPublishedAt = document.getElementById('inputPublishedAt') as HTMLInputElement | null;
  const inputCoverImage = document.getElementById('inputCoverImage') as HTMLInputElement | null;
  const inputSummary = document.getElementById('inputSummary') as HTMLTextAreaElement | null;
  const inputContent = document.getElementById('inputContent') as HTMLTextAreaElement | null;
  const inputIsPublished = document.getElementById('inputIsPublished') as HTMLInputElement | null;

  // Upload & MinIO Elements
  const modalImagePreview = document.getElementById('modalImagePreview') as HTMLImageElement | null;
  const modalImageEmptyState = document.getElementById('modalImageEmptyState');
  const btnTriggerModalFile = document.getElementById('btnTriggerModalFile');
  const btnTriggerModalFileSec = document.getElementById('btnTriggerModalFileSec');
  const btnRemoveModalImage = document.getElementById('btnRemoveModalImage');
  const btnRemoveModalImageSec = document.getElementById('btnRemoveModalImageSec');
  const modalFileInput = document.getElementById('modalFileInput') as HTMLInputElement | null;
  const modalUploadProgress = document.getElementById('modalUploadProgress');

  function updateKabarImagePreview(url: string) {
    if (url && url.trim()) {
      if (modalImagePreview) {
        modalImagePreview.src = url.trim();
        modalImagePreview.classList.remove('hidden');
      }
      modalImageEmptyState?.classList.add('hidden');
    } else {
      if (modalImagePreview) {
        modalImagePreview.src = '';
        modalImagePreview.classList.add('hidden');
      }
      modalImageEmptyState?.classList.remove('hidden');
    }
  }

  // Quick Change Card Image
  const cardQuickFileInput = document.getElementById('cardQuickFileInput') as HTMLInputElement | null;
  let quickUploadTargetArticleId: number | null = null;

  // Delete Modal
  const deleteModal = document.getElementById('deleteConfirmModal');
  const deleteTitleDisplay = document.getElementById('deleteArticleTitleDisplay');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn') as HTMLButtonElement | null;
  let targetDeleteArticleId: number | null = null;

  // Toast
  const toast = document.getElementById('kabarToast');
  const toastMessage = document.getElementById('kabarToastMessage');

  function showToast(msg: string, isError = false) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.remove('error');
    if (isError) toast.classList.add('error');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Modal Visibility Helpers
  function openModal() {
    if (!formModal || !formModalBox) return;
    formModal.classList.add('active');
  }

  function closeModal() {
    if (!formModal || !formModalBox) return;
    formModal.classList.remove('active');
  }

  // Reset Form for Create
  function resetFormToCreate() {
    if (formModalTitle) formModalTitle.textContent = 'Tulis Artikel Baru';
    if (formModalSubtitle) formModalSubtitle.textContent = 'Lengkapi formulir di bawah ini untuk menerbitkan warta baru';
    if (submitBtnText) submitBtnText.textContent = 'Terbitkan Artikel';

    if (inputId) inputId.value = '';
    if (inputTitle) inputTitle.value = '';
    if (inputCategory) inputCategory.value = 'LITERASI WAKAF';
    if (inputSlug) inputSlug.value = '';
    if (inputAuthor) inputAuthor.value = 'Tim GVF';
    if (inputPublishedAt) inputPublishedAt.value = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
    if (inputCoverImage) inputCoverImage.value = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp';
    updateKabarImagePreview(inputCoverImage ? inputCoverImage.value : '');
    if (inputSummary) inputSummary.value = '';
    if (inputContent) inputContent.value = '';
    if (inputIsPublished) inputIsPublished.checked = true;
  }

  // Open Create Modal
  if (btnOpenCreate) {
    btnOpenCreate.addEventListener('click', () => {
      resetFormToCreate();
      openModal();
    });
  }

  if (closeFormModalBtn) closeFormModalBtn.addEventListener('click', closeModal);
  if (cancelFormModalBtn) cancelFormModalBtn.addEventListener('click', closeModal);
  if (formModal) {
    formModal.addEventListener('click', (e) => {
      if (e.target === formModal) closeModal();
    });
  }

  // Edit Article Button Clicks
  const editBtns = document.querySelectorAll('.edit-article-btn');
  editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const jsonStr = target.getAttribute('data-article-json');
      if (!jsonStr) return;

      try {
        const article = JSON.parse(jsonStr);
        if (formModalTitle) formModalTitle.textContent = `Edit Artikel #${article.id}`;
        if (formModalSubtitle) formModalSubtitle.textContent = 'Perbarui narasi, kategori, atau sampul artikel';
        if (submitBtnText) submitBtnText.textContent = 'Simpan Perubahan';

        if (inputId) inputId.value = String(article.id);
        if (inputTitle) inputTitle.value = article.title || '';
        if (inputCategory) inputCategory.value = article.category || '';
        if (inputSlug) inputSlug.value = article.slug || '';
        if (inputAuthor) inputAuthor.value = article.author || 'Tim GVF';
        if (inputPublishedAt) inputPublishedAt.value = article.publishedAt || '';
        if (inputCoverImage) inputCoverImage.value = article.coverImage || '';
        updateKabarImagePreview(article.coverImage || '');
        if (inputSummary) inputSummary.value = article.summary || '';
        if (inputContent) inputContent.value = article.content || '';
        if (inputIsPublished) inputIsPublished.checked = Boolean(article.isPublished);

        openModal();
      } catch (err) {
        console.error('Error parsing article JSON:', err);
      }
    });
  });

  // MinIO File Upload & Remove Handler (Modal)
  if (modalFileInput) {
    btnTriggerModalFile?.addEventListener('click', () => {
      modalFileInput.click();
    });
    btnTriggerModalFileSec?.addEventListener('click', () => {
      modalFileInput.click();
    });

    const handleRemoveKabarImage = () => {
      if (inputCoverImage) inputCoverImage.value = '';
      updateKabarImagePreview('');
      showToast('Gambar sampul artikel berhasil dihapus.');
    };

    btnRemoveModalImage?.addEventListener('click', handleRemoveKabarImage);
    btnRemoveModalImageSec?.addEventListener('click', handleRemoveKabarImage);

    inputCoverImage?.addEventListener('input', () => {
      updateKabarImagePreview(inputCoverImage.value);
    });

    modalFileInput.addEventListener('change', async () => {
      if (!modalFileInput.files || modalFileInput.files.length === 0) return;
      const file = modalFileInput.files[0];

      const formData = new FormData();
      formData.append('image', file);

      if (modalUploadProgress) modalUploadProgress.style.display = 'flex';
      showToast('Sedang mengunggah gambar ke MinIO S3...');

      try {
        const res = await fetch('/api/admin/news/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          if (inputCoverImage) inputCoverImage.value = data.url;
          updateKabarImagePreview(data.url);
          showToast('Gambar berhasil diunggah ke MinIO S3!');
        } else {
          showToast(data.message || 'Gagal mengunggah gambar.', true);
        }
      } catch (err) {
        console.error('Error uploading to MinIO:', err);
        showToast('Koneksi terputus saat mengunggah gambar.', true);
      } finally {
        if (modalUploadProgress) modalUploadProgress.style.display = 'none';
        modalFileInput.value = '';
      }
    });
  }

  // Quick Change Card Image Handler
  const quickChangeBtns = document.querySelectorAll('.btn-quick-change-img');
  quickChangeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const artId = target.getAttribute('data-article-id');
      if (!artId || !cardQuickFileInput) return;

      quickUploadTargetArticleId = parseInt(artId, 10);
      cardQuickFileInput.click();
    });
  });

  if (cardQuickFileInput) {
    cardQuickFileInput.addEventListener('change', async () => {
      if (!cardQuickFileInput.files || cardQuickFileInput.files.length === 0 || !quickUploadTargetArticleId) return;
      const file = cardQuickFileInput.files[0];
      const articleId = quickUploadTargetArticleId;

      const formData = new FormData();
      formData.append('image', file);

      showToast(`Mengunggah gambar artikel #${articleId} ke MinIO S3...`);

      try {
        // 1. Upload ke MinIO
        const uploadRes = await fetch('/api/admin/news/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
          showToast(uploadData.message || 'Gagal mengunggah gambar ke MinIO.', true);
          return;
        }

        const newImageUrl = uploadData.url;

        // 2. Simpan URL baru ke Database
        const updateRes = await fetch('/api/admin/news/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: articleId,
            imageUrl: newImageUrl,
          }),
        });
        const updateData = await updateRes.json();

        if (updateRes.ok && updateData.success) {
          // Update visual thumbnail kartu secara langsung
          const cardImg = document.getElementById(`card-img-${articleId}`) as HTMLImageElement | null;
          if (cardImg) cardImg.src = newImageUrl;
          showToast('Gambar artikel berhasil diperbarui di MinIO S3!');
        } else {
          showToast(updateData.message || 'Gagal memperbarui URL gambar di database.', true);
        }
      } catch (err) {
        console.error('Quick image change error:', err);
        showToast('Terjadi kesalahan saat memproses gambar.', true);
      } finally {
        cardQuickFileInput.value = '';
        quickUploadTargetArticleId = null;
      }
    });
  }

  // Submit Article Form (Create or Update)
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const idVal = inputId?.value ? parseInt(inputId.value, 10) : null;
      const title = inputTitle?.value?.trim();
      const category = inputCategory?.value?.trim();
      const slug = inputSlug?.value?.trim();
      const author = inputAuthor?.value?.trim() || 'Tim GVF';
      const publishedAt = inputPublishedAt?.value?.trim();
      const coverImage = inputCoverImage?.value?.trim() || 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp';
      const summary = inputSummary?.value?.trim();
      const content = inputContent?.value?.trim();
      const isPublished = inputIsPublished?.checked ?? true;

      if (!title) {
        showToast('Judul artikel wajib diisi.', true);
        inputTitle?.focus();
        return;
      }
      if (!category) {
        showToast('Kategori artikel wajib dipilih/diisi.', true);
        inputCategory?.focus();
        return;
      }
      if (!summary) {
        showToast('Ringkasan cuplikan berita wajib diisi.', true);
        inputSummary?.focus();
        return;
      }
      if (!content) {
        showToast('Isi narasi artikel lengkap wajib diisi.', true);
        inputContent?.focus();
        return;
      }

      submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Menyimpan...';

      const endpoint = idVal ? '/api/admin/news/update' : '/api/admin/news/create';
      const payload: any = {
        title,
        category,
        contentType: 'kabar',
        slug,
        author,
        publishedAt,
        coverImage,
        summary,
        content,
        isPublished,
      };
      if (idVal) payload.id = idVal;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          showToast(data.message || 'Artikel berhasil disimpan!');
          closeModal();
          setTimeout(() => window.location.reload(), 600);
        } else {
          showToast(data.message || 'Gagal menyimpan artikel.', true);
        }
      } catch (err) {
        console.error('Error submitting article:', err);
        showToast('Koneksi terputus ke server.', true);
      } finally {
        submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = idVal ? 'Simpan Perubahan' : 'Terbitkan Artikel';
      }
    });
  }

  // Toggle Tayang / Draf Switch
  const toggleCheckboxes = document.querySelectorAll<HTMLInputElement>('.news-toggle-checkbox');
  toggleCheckboxes.forEach(chk => {
    chk.addEventListener('change', async (e) => {
      const target = e.currentTarget as HTMLInputElement;
      const articleId = parseInt(target.getAttribute('data-article-id') || '0', 10);
      const newState = target.checked;

      const badge = document.getElementById(`status-badge-${articleId}`);
      const statusText = document.getElementById(`status-text-${articleId}`);

      try {
        const res = await fetch('/api/admin/news/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: articleId, isPublished: newState }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          if (badge && statusText) {
            if (newState) {
              badge.className = 'status-pill published';
              statusText.textContent = 'Terbit';
            } else {
              badge.className = 'status-pill draft';
              statusText.textContent = 'Draf';
            }
          }
          showToast(`Artikel #${articleId} kini ${newState ? 'Terbit' : 'Draf'}.`);
        } else {
          target.checked = !newState;
          showToast(data.message || 'Gagal mengubah status publikasi.', true);
        }
      } catch (err) {
        target.checked = !newState;
        showToast('Koneksi terputus saat mengubah status publikasi.', true);
      }
    });
  });

  // Delete Article Confirmation
  const deleteBtns = document.querySelectorAll('.delete-article-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const id = parseInt(target.getAttribute('data-article-id') || '0', 10);
      const title = target.getAttribute('data-article-title') || '';

      targetDeleteArticleId = id;
      if (deleteTitleDisplay) deleteTitleDisplay.textContent = `"${title}"`;
      if (deleteModal) deleteModal.classList.add('active');
    });
  });

  if (cancelDeleteBtn && deleteModal) {
    cancelDeleteBtn.addEventListener('click', () => {
      deleteModal.classList.remove('active');
      targetDeleteArticleId = null;
    });
  }

  if (confirmDeleteBtn && deleteModal) {
    confirmDeleteBtn.addEventListener('click', async () => {
      if (!targetDeleteArticleId) return;

      confirmDeleteBtn.disabled = true;
      confirmDeleteBtn.textContent = 'Menghapus...';

      try {
        const res = await fetch('/api/admin/news/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetDeleteArticleId }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          const cardEl = document.getElementById(`article-card-${targetDeleteArticleId}`);
          if (cardEl) cardEl.remove();
          showToast('Artikel berhasil dihapus dari sistem.');
          deleteModal.classList.remove('active');
        } else {
          showToast(data.message || 'Gagal menghapus artikel.', true);
        }
      } catch (err) {
        showToast('Terjadi kesalahan saat menghapus artikel.', true);
      } finally {
        confirmDeleteBtn.disabled = false;
        confirmDeleteBtn.textContent = 'Ya, Hapus Permanen';
        targetDeleteArticleId = null;
      }
    });
  }

  // --- TAB SWITCHING & TRANSPARENCY REPORTS (PDF) ---
  const tabBtnKabar = document.getElementById('tabBtnKabar');
  const tabBtnLaporan = document.getElementById('tabBtnLaporan');
  const tabContentKabar = document.getElementById('tabContentKabar');
  const tabContentLaporan = document.getElementById('tabContentLaporan');

  function setActiveAdminTab(isLaporan: boolean) {
    if (isLaporan) {
      tabBtnLaporan?.classList.add('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
      tabBtnLaporan?.classList.remove('border-transparent', 'text-slate-500');
      tabBtnKabar?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
      tabBtnKabar?.classList.add('border-transparent', 'text-slate-500');
      tabContentLaporan?.classList.remove('hidden');
      tabContentKabar?.classList.add('hidden');
    } else {
      tabBtnKabar?.classList.add('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
      tabBtnKabar?.classList.remove('border-transparent', 'text-slate-500');
      tabBtnLaporan?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
      tabBtnLaporan?.classList.add('border-transparent', 'text-slate-500');
      tabContentKabar?.classList.remove('hidden');
      tabContentLaporan?.classList.add('hidden');
    }
  }

  tabBtnKabar?.addEventListener('click', () => setActiveAdminTab(false));
  tabBtnLaporan?.addEventListener('click', () => setActiveAdminTab(true));

  const reportModal = document.getElementById('reportFormModal');
  const reportModalTitle = document.getElementById('reportModalTitle');
  const submitReportBtn = document.getElementById('submitReportFormBtn') as HTMLButtonElement | null;
  const submitReportBtnText = document.getElementById('submitReportBtnText');
  const btnOpenCreateReport = document.getElementById('btnOpenCreateReport');
  const closeReportModalBtn = document.getElementById('closeReportModalBtn');
  const cancelReportModalBtn = document.getElementById('cancelReportModalBtn');

  const rInputId = document.getElementById('reportInputId') as HTMLInputElement | null;
  const rInputSize = document.getElementById('reportInputFileSize') as HTMLInputElement | null;
  const rInputTitle = document.getElementById('reportInputTitle') as HTMLInputElement | null;
  const rInputPeriod = document.getElementById('reportInputPeriod') as HTMLInputElement | null;
  const rInputScope = document.getElementById('reportInputScope') as HTMLSelectElement | null;
  const rInputPublishedAt = document.getElementById('reportInputPublishedAt') as HTMLInputElement | null;
  const rInputFileUrl = document.getElementById('reportInputFileUrl') as HTMLInputElement | null;
  const rInputSummary = document.getElementById('reportInputSummary') as HTMLTextAreaElement | null;
  const rInputIsPublished = document.getElementById('reportInputIsPublished') as HTMLInputElement | null;

  const rPdfInput = document.getElementById('reportPdfFileInput') as HTMLInputElement | null;
  const rUploadBtn = document.getElementById('btnTriggerReportPdfUpload') as HTMLButtonElement | null;
  const rUploadStatus = document.getElementById('reportUploadStatus');

  const rGalleryInput = document.getElementById('reportGalleryFileInput') as HTMLInputElement | null;
  const rGalleryBtn = document.getElementById('btnTriggerReportGalleryUpload') as HTMLButtonElement | null;
  const rGalleryStatus = document.getElementById('reportGalleryUploadStatus');
  const rGalleryList = document.getElementById('reportGalleryList');

  type ReportGalleryItem = { url: string; caption?: string };
  let reportGalleryState: ReportGalleryItem[] = [];

  const renderReportGalleryList = () => {
    if (!rGalleryList) return;
    if (reportGalleryState.length === 0) {
      rGalleryList.innerHTML = '<p class="text-xs text-slate-400 col-span-full">Belum ada foto dokumentasi terlampir.</p>';
      return;
    }
    rGalleryList.innerHTML = reportGalleryState
      .map(
        (item, idx) => `
      <div class="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex flex-col gap-2">
        <div class="relative aspect-video rounded-lg overflow-hidden bg-slate-200">
          <img src="${item.url}" alt="Dokumentasi ${idx + 1}" class="w-full h-full object-cover" />
          <button
            type="button"
            data-remove-gallery-idx="${idx}"
            class="absolute top-1.5 right-1.5 px-2 py-1 text-[11px] font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
          >
            Hapus
          </button>
        </div>
        <input
          type="text"
          data-caption-gallery-idx="${idx}"
          value="${(item.caption || '').replace(/"/g, '&quot;')}"
          placeholder="Keterangan foto (opsional)..."
          class="form-input text-xs py-1.5"
        />
      </div>
    `
      )
      .join('');

    rGalleryList.querySelectorAll<HTMLButtonElement>('[data-remove-gallery-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove-gallery-idx'));
        if (!isNaN(idx)) {
          reportGalleryState.splice(idx, 1);
          renderReportGalleryList();
        }
      });
    });

    rGalleryList.querySelectorAll<HTMLInputElement>('[data-caption-gallery-idx]').forEach((input) => {
      input.addEventListener('input', () => {
        const idx = Number(input.getAttribute('data-caption-gallery-idx'));
        if (!isNaN(idx) && reportGalleryState[idx]) {
          reportGalleryState[idx].caption = input.value;
        }
      });
    });
  };

  const openReportModal = () => reportModal?.classList.add('active');
  const closeReportModal = () => reportModal?.classList.remove('active');

  btnOpenCreateReport?.addEventListener('click', () => {
    if (reportModalTitle) reportModalTitle.textContent = 'Unggah Dokumen Laporan Berkala';
    if (submitReportBtnText) submitReportBtnText.textContent = 'Simpan Laporan';
    if (rInputId) rInputId.value = '';
    if (rInputSize) rInputSize.value = '0';
    if (rInputTitle) rInputTitle.value = '';
    if (rInputPeriod) rInputPeriod.value = '';
    if (rInputScope) rInputScope.value = 'all';
    if (rInputPublishedAt) {
      rInputPublishedAt.value = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date());
    }
    if (rInputFileUrl) rInputFileUrl.value = '';
    if (rInputSummary) rInputSummary.value = '';
    if (rInputIsPublished) rInputIsPublished.checked = true;
    reportGalleryState = [];
    renderReportGalleryList();
    openReportModal();
  });

  closeReportModalBtn?.addEventListener('click', closeReportModal);
  cancelReportModalBtn?.addEventListener('click', closeReportModal);
  reportModal?.addEventListener('click', (e) => {
    if (e.target === reportModal) closeReportModal();
  });

  document.querySelectorAll('.edit-report-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const jsonStr = (e.currentTarget as HTMLElement).getAttribute('data-report-json');
      if (!jsonStr) return;
      try {
        const rep = JSON.parse(jsonStr);
        if (reportModalTitle) reportModalTitle.textContent = `Edit Laporan #${rep.id}`;
        if (submitReportBtnText) submitReportBtnText.textContent = 'Simpan Perubahan';
        if (rInputId) rInputId.value = String(rep.id);
        if (rInputSize) rInputSize.value = String(rep.fileSize || 0);
        if (rInputTitle) rInputTitle.value = rep.title || '';
        if (rInputPeriod) rInputPeriod.value = rep.periodLabel || '';
        if (rInputScope) rInputScope.value = rep.programScope || 'all';
        if (rInputPublishedAt) rInputPublishedAt.value = rep.publishedAt || '';
        if (rInputFileUrl) rInputFileUrl.value = rep.fileUrl || '';
        if (rInputSummary) rInputSummary.value = rep.summary || '';
        if (rInputIsPublished) rInputIsPublished.checked = Boolean(rep.isPublished);
        reportGalleryState = Array.isArray(rep.galleryImages)
          ? rep.galleryImages.map((img: any) => ({ url: String(img?.url || ''), caption: String(img?.caption || '') })).filter((img: ReportGalleryItem) => img.url)
          : [];
        renderReportGalleryList();
        openReportModal();
      } catch (err) {
        console.error('Error parsing report JSON:', err);
      }
    });
  });

  rUploadBtn?.addEventListener('click', () => rPdfInput?.click());
  rPdfInput?.addEventListener('change', async () => {
    const file = rPdfInput.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'laporan');
    if (rUploadBtn) {
      rUploadBtn.disabled = true;
      rUploadBtn.textContent = 'Mengunggah...';
    }
    if (rUploadStatus) {
      rUploadStatus.textContent = `Mengunggah ${file.name}...`;
      rUploadStatus.classList.remove('hidden');
    }
    try {
      const res = await fetch('/api/admin/reports/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        if (rInputFileUrl) rInputFileUrl.value = data.url;
        if (rInputSize) rInputSize.value = String(data.fileSize || file.size || 0);
        showToast('Dokumen PDF laporan berhasil diunggah ke S3!');
      } else {
        showToast(data.message || 'Gagal mengunggah PDF.', true);
      }
    } catch {
      showToast('Koneksi terputus saat mengunggah PDF.', true);
    } finally {
      if (rUploadBtn) {
        rUploadBtn.disabled = false;
        rUploadBtn.textContent = 'Unggah PDF (S3)';
      }
      if (rUploadStatus) rUploadStatus.classList.add('hidden');
      rPdfInput.value = '';
    }
  });

  rGalleryBtn?.addEventListener('click', () => rGalleryInput?.click());
  rGalleryInput?.addEventListener('change', async () => {
    const files = Array.from(rGalleryInput.files || []);
    if (files.length === 0) return;

    if (rGalleryBtn) {
      rGalleryBtn.disabled = true;
      rGalleryBtn.textContent = 'Mengunggah...';
    }
    if (rGalleryStatus) {
      rGalleryStatus.textContent = `Mengunggah ${files.length} foto dokumentasi...`;
      rGalleryStatus.classList.remove('hidden');
    }

    let uploadedCount = 0;
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await fetch('/api/admin/news/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (res.ok && data.success && data.url) {
          reportGalleryState.push({ url: data.url, caption: '' });
          uploadedCount++;
        } else {
          showToast(data.message || `Gagal mengunggah ${file.name}.`, true);
        }
      } catch {
        showToast(`Koneksi terputus saat mengunggah ${file.name}.`, true);
      }
    }

    if (uploadedCount > 0) {
      renderReportGalleryList();
      showToast(`${uploadedCount} foto dokumentasi berhasil diunggah ke S3!`);
    }

    if (rGalleryBtn) {
      rGalleryBtn.disabled = false;
      rGalleryBtn.textContent = '+ Unggah Foto Dokumentasi';
    }
    if (rGalleryStatus) rGalleryStatus.classList.add('hidden');
    rGalleryInput.value = '';
  });

  submitReportBtn?.addEventListener('click', async () => {
    const idVal = rInputId?.value ? parseInt(rInputId.value, 10) : null;
    const title = rInputTitle?.value?.trim();
    const periodLabel = rInputPeriod?.value?.trim();
    const fileUrl = rInputFileUrl?.value?.trim();
    const summary = rInputSummary?.value?.trim();

    if (!title || !periodLabel || !fileUrl || !summary) {
      showToast('Judul, periode, tautan PDF, dan ringkasan laporan wajib diisi.', true);
      return;
    }

    submitReportBtn.disabled = true;
    if (submitReportBtnText) submitReportBtnText.textContent = 'Menyimpan...';

    const endpoint = idVal ? '/api/admin/reports/update' : '/api/admin/reports/create';
    const payload: any = {
      title,
      periodLabel,
      programScope: rInputScope?.value || 'all',
      publishedAt: rInputPublishedAt?.value?.trim() || '',
      fileUrl,
      fileSize: Number(rInputSize?.value || 0),
      galleryImages: reportGalleryState,
      summary,
      isPublished: rInputIsPublished?.checked ?? true,
    };
    if (idVal) payload.id = idVal;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Dokumen laporan berhasil disimpan!');
        closeReportModal();
        setTimeout(() => {
          window.location.href = '/admin/kabar?tab=laporan';
        }, 500);
      } else {
        showToast(data.error || 'Gagal menyimpan laporan.', true);
      }
    } catch {
      showToast('Gagal menghubungi server.', true);
    } finally {
      submitReportBtn.disabled = false;
      if (submitReportBtnText) submitReportBtnText.textContent = idVal ? 'Simpan Perubahan' : 'Simpan Laporan';
    }
  });

  document.querySelectorAll<HTMLInputElement>('.report-toggle-checkbox').forEach((chk) => {
    chk.addEventListener('change', async (e) => {
      const target = e.currentTarget as HTMLInputElement;
      const repId = parseInt(target.getAttribute('data-report-id') || '0', 10);
      const newState = target.checked;
      const badge = document.getElementById(`report-status-badge-${repId}`);
      const txt = document.getElementById(`report-status-text-${repId}`);
      try {
        const res = await fetch('/api/admin/reports/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: repId, isPublished: newState }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (badge && txt) {
            badge.className = `status-pill ${newState ? 'published' : 'draft'}`;
            txt.textContent = newState ? 'Terbit' : 'Draf';
          }
          showToast(`Laporan #${repId} kini ${newState ? 'Terbit' : 'Draf'}.`);
        } else {
          target.checked = !newState;
          showToast(data.error || 'Gagal mengubah status laporan.', true);
        }
      } catch {
        target.checked = !newState;
        showToast('Koneksi terputus saat mengubah status.', true);
      }
    });
  });

  document.querySelectorAll('.delete-report-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const el = e.currentTarget as HTMLElement;
      const repId = parseInt(el.getAttribute('data-report-id') || '0', 10);
      const repTitle = el.getAttribute('data-report-title') || '';
      if (!repId || !window.confirm(`Hapus dokumen laporan "${repTitle}" secara permanen?`)) return;
      try {
        const res = await fetch('/api/admin/reports/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: repId }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          document.getElementById(`report-card-${repId}`)?.remove();
          showToast('Dokumen laporan berhasil dihapus.');
        } else {
          showToast(data.error || 'Gagal menghapus laporan.', true);
        }
      } catch {
        showToast('Gagal menghubungi server saat menghapus laporan.', true);
      }
    });
  });

  // Keyboard accessibility: ESC key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeReportModal();
      if (deleteModal) {
        deleteModal.classList.remove('active');
        targetDeleteArticleId = null;
      }
    }
  });
}

// Inisialisasi otomatis
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupKabarManager);
} else {
  setupKabarManager();
}
