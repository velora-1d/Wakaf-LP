// src/scripts/admin/edukasi.ts
// Client logic for Kelola Edukasi & Kajian CMS

export function setupEdukasiManager() {
  const formModal = document.getElementById('edukasiFormModal');
  const formModalTitle = document.getElementById('eduFormModalTitle');
  const formModalSubtitle = document.getElementById('eduFormModalSubtitle');
  const submitBtnText = document.getElementById('submitEduBtnText');
  const submitBtn = document.getElementById('submitEduFormBtn') as HTMLButtonElement | null;
  const btnOpenCreate = document.getElementById('btnOpenCreateEdukasi');
  const closeBtn = document.getElementById('closeEduFormModalBtn');
  const cancelBtn = document.getElementById('cancelEduFormModalBtn');

  const inputId = document.getElementById('eduInputId') as HTMLInputElement | null;
  const inputTitle = document.getElementById('eduInputTitle') as HTMLInputElement | null;
  const inputCategory = document.getElementById('eduInputCategory') as HTMLInputElement | null;
  const inputSlug = document.getElementById('eduInputSlug') as HTMLInputElement | null;
  const inputAuthor = document.getElementById('eduInputAuthor') as HTMLInputElement | null;
  const inputPublishedAt = document.getElementById('eduInputPublishedAt') as HTMLInputElement | null;
  const inputCoverImage = document.getElementById('eduInputCoverImage') as HTMLInputElement | null;
  const inputVideoUrl = document.getElementById('eduInputVideoUrl') as HTMLInputElement | null;
  const inputAttachmentUrl = document.getElementById('eduInputAttachmentUrl') as HTMLInputElement | null;
  const inputSummary = document.getElementById('eduInputSummary') as HTMLTextAreaElement | null;
  const inputContent = document.getElementById('eduInputContent') as HTMLTextAreaElement | null;
  const inputIsPublished = document.getElementById('eduInputIsPublished') as HTMLInputElement | null;

  const modalImagePreview = document.getElementById('eduModalImagePreview') as HTMLImageElement | null;
  const modalImageEmptyState = document.getElementById('eduModalImageEmptyState');
  const imageFileInput = document.getElementById('eduImageFileInput') as HTMLInputElement | null;
  const imageUploadProgress = document.getElementById('eduImageUploadProgress');
  const btnTriggerImage = document.getElementById('btnTriggerEduImageFile');
  const btnRemoveImage = document.getElementById('btnRemoveEduImage');

  const pdfFileInput = document.getElementById('eduPdfFileInput') as HTMLInputElement | null;
  const btnTriggerPdf = document.getElementById('btnTriggerEduPdfUpload') as HTMLButtonElement | null;

  const deleteModal = document.getElementById('deleteConfirmModal');
  const deleteTitleDisplay = document.getElementById('deleteArticleTitleDisplay');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn') as HTMLButtonElement | null;
  let targetDeleteId: number | null = null;

  const toast = document.getElementById('eduToast');
  const toastMessage = document.getElementById('eduToastMessage');

  function showToast(msg: string, isError = false) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.remove('error');
    if (isError) toast.classList.add('error');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function updateImagePreview(url: string) {
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

  function openModal() {
    formModal?.classList.add('active');
  }

  function closeModal() {
    formModal?.classList.remove('active');
  }

  function resetFormToCreate() {
    if (formModalTitle) formModalTitle.textContent = 'Tulis Materi Edukasi & Kajian';
    if (formModalSubtitle) formModalSubtitle.textContent = 'Lengkapi formulir literasi fiqih, kajian, video, atau lampiran PDF';
    if (submitBtnText) submitBtnText.textContent = 'Terbitkan Materi';
    if (inputId) inputId.value = '';
    if (inputTitle) inputTitle.value = '';
    if (inputCategory) inputCategory.value = 'FIQIH WAKAF';
    if (inputSlug) inputSlug.value = '';
    if (inputAuthor) inputAuthor.value = 'Dewan Pengawas Syariah GVF';
    if (inputPublishedAt) {
      inputPublishedAt.value = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date());
    }
    const defaultImg = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-landscape.webp';
    if (inputCoverImage) inputCoverImage.value = defaultImg;
    updateImagePreview(defaultImg);
    if (inputVideoUrl) inputVideoUrl.value = '';
    if (inputAttachmentUrl) inputAttachmentUrl.value = '';
    if (inputSummary) inputSummary.value = '';
    if (inputContent) inputContent.value = '';
    if (inputIsPublished) inputIsPublished.checked = true;
  }

  btnOpenCreate?.addEventListener('click', () => {
    resetFormToCreate();
    openModal();
  });

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  formModal?.addEventListener('click', (e) => {
    if (e.target === formModal) closeModal();
  });

  document.querySelectorAll('.edit-edu-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const jsonStr = (e.currentTarget as HTMLElement).getAttribute('data-article-json');
      if (!jsonStr) return;
      try {
        const art = JSON.parse(jsonStr);
        if (formModalTitle) formModalTitle.textContent = `Edit Materi #${art.id}`;
        if (formModalSubtitle) formModalSubtitle.textContent = 'Perbarui konten kajian, tautan video, atau lampiran PDF';
        if (submitBtnText) submitBtnText.textContent = 'Simpan Perubahan';

        if (inputId) inputId.value = String(art.id);
        if (inputTitle) inputTitle.value = art.title || '';
        if (inputCategory) inputCategory.value = art.category || '';
        if (inputSlug) inputSlug.value = art.slug || '';
        if (inputAuthor) inputAuthor.value = art.author || 'Tim GVF';
        if (inputPublishedAt) inputPublishedAt.value = art.publishedAt || '';
        if (inputCoverImage) inputCoverImage.value = art.coverImage || '';
        updateImagePreview(art.coverImage || '');
        if (inputVideoUrl) inputVideoUrl.value = art.videoUrl || '';
        if (inputAttachmentUrl) inputAttachmentUrl.value = art.attachmentUrl || '';
        if (inputSummary) inputSummary.value = art.summary || '';
        if (inputContent) inputContent.value = art.content || '';
        if (inputIsPublished) inputIsPublished.checked = Boolean(art.isPublished);
        openModal();
      } catch (err) {
        console.error('Error parsing edukasi JSON:', err);
      }
    });
  });

  btnTriggerImage?.addEventListener('click', () => imageFileInput?.click());
  btnRemoveImage?.addEventListener('click', () => {
    if (inputCoverImage) inputCoverImage.value = '';
    updateImagePreview('');
  });
  inputCoverImage?.addEventListener('input', () => updateImagePreview(inputCoverImage.value));

  imageFileInput?.addEventListener('change', async () => {
    const file = imageFileInput.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    if (imageUploadProgress) imageUploadProgress.style.display = 'flex';
    showToast('Mengunggah gambar ke MinIO S3...');
    try {
      const res = await fetch('/api/admin/news/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        if (inputCoverImage) inputCoverImage.value = data.url;
        updateImagePreview(data.url);
        showToast('Gambar sampul berhasil diunggah!');
      } else {
        showToast(data.message || 'Gagal mengunggah gambar.', true);
      }
    } catch {
      showToast('Koneksi terputus saat mengunggah gambar.', true);
    } finally {
      if (imageUploadProgress) imageUploadProgress.style.display = 'none';
      imageFileInput.value = '';
    }
  });

  btnTriggerPdf?.addEventListener('click', () => pdfFileInput?.click());
  pdfFileInput?.addEventListener('change', async () => {
    const file = pdfFileInput.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'edukasi');
    if (btnTriggerPdf) {
      btnTriggerPdf.disabled = true;
      btnTriggerPdf.textContent = 'Mengunggah...';
    }
    showToast('Mengunggah materi PDF ke MinIO S3...');
    try {
      const res = await fetch('/api/admin/reports/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        if (inputAttachmentUrl) inputAttachmentUrl.value = data.url;
        showToast('Dokumen PDF materi berhasil diunggah!');
      } else {
        showToast(data.message || 'Gagal mengunggah dokumen PDF.', true);
      }
    } catch {
      showToast('Gagal menghubungi server saat mengunggah PDF.', true);
    } finally {
      if (btnTriggerPdf) {
        btnTriggerPdf.disabled = false;
        btnTriggerPdf.textContent = 'Unggah PDF';
      }
      pdfFileInput.value = '';
    }
  });

  submitBtn?.addEventListener('click', async () => {
    const idVal = inputId?.value ? parseInt(inputId.value, 10) : null;
    const title = inputTitle?.value?.trim();
    const category = inputCategory?.value?.trim();
    const summary = inputSummary?.value?.trim();
    const content = inputContent?.value?.trim();

    if (!title || !category || !summary || !content) {
      showToast('Judul, kategori, ringkasan, dan isi materi wajib diisi.', true);
      return;
    }

    submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = 'Menyimpan...';

    const endpoint = idVal ? '/api/admin/news/update' : '/api/admin/news/create';
    const payload: any = {
      title,
      category,
      contentType: 'edukasi',
      slug: inputSlug?.value?.trim() || '',
      author: inputAuthor?.value?.trim() || 'Tim GVF',
      publishedAt: inputPublishedAt?.value?.trim() || '',
      coverImage: inputCoverImage?.value?.trim() || 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/tampak-luar-gedung-pesantren-landscape.webp',
      videoUrl: inputVideoUrl?.value?.trim() || '',
      attachmentUrl: inputAttachmentUrl?.value?.trim() || '',
      summary,
      content,
      isPublished: inputIsPublished?.checked ?? true,
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
        showToast('Materi edukasi berhasil disimpan!');
        closeModal();
        setTimeout(() => window.location.reload(), 500);
      } else {
        showToast(data.error || 'Gagal menyimpan materi.', true);
      }
    } catch {
      showToast('Koneksi terputus ke server.', true);
    } finally {
      submitBtn.disabled = false;
      if (submitBtnText) submitBtnText.textContent = idVal ? 'Simpan Perubahan' : 'Terbitkan Materi';
    }
  });

  document.querySelectorAll<HTMLInputElement>('.edu-toggle-checkbox').forEach((chk) => {
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
            badge.className = `status-pill ${newState ? 'published' : 'draft'}`;
            statusText.textContent = newState ? 'Terbit' : 'Draf';
          }
          showToast(`Materi #${articleId} kini ${newState ? 'Terbit' : 'Draf'}.`);
        } else {
          target.checked = !newState;
          showToast(data.error || 'Gagal mengubah status.', true);
        }
      } catch {
        target.checked = !newState;
        showToast('Koneksi terputus saat mengubah status.', true);
      }
    });
  });

  document.querySelectorAll('.delete-edu-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget as HTMLElement;
      targetDeleteId = parseInt(el.getAttribute('data-article-id') || '0', 10);
      const title = el.getAttribute('data-article-title') || '';
      if (deleteTitleDisplay) deleteTitleDisplay.textContent = `"${title}"`;
      deleteModal?.classList.add('active');
    });
  });

  cancelDeleteBtn?.addEventListener('click', () => {
    deleteModal?.classList.remove('active');
    targetDeleteId = null;
  });

  confirmDeleteBtn?.addEventListener('click', async () => {
    if (!targetDeleteId) return;
    confirmDeleteBtn.disabled = true;
    confirmDeleteBtn.textContent = 'Menghapus...';
    try {
      const res = await fetch('/api/admin/news/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetDeleteId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        document.getElementById(`article-card-${targetDeleteId}`)?.remove();
        showToast('Materi edukasi berhasil dihapus.');
        deleteModal?.classList.remove('active');
      } else {
        showToast(data.error || 'Gagal menghapus materi.', true);
      }
    } catch {
      showToast('Terjadi kesalahan saat menghapus materi.', true);
    } finally {
      confirmDeleteBtn.disabled = false;
      confirmDeleteBtn.textContent = 'Ya, Hapus Permanen';
      targetDeleteId = null;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupEdukasiManager);
} else {
  setupEdukasiManager();
}
