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
  const btnTriggerModalFile = document.getElementById('btnTriggerModalFile');
  const modalFileInput = document.getElementById('modalFileInput') as HTMLInputElement | null;
  const modalUploadProgress = document.getElementById('modalUploadProgress');

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
    if (modalImagePreview) modalImagePreview.src = 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp';
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
        if (modalImagePreview) modalImagePreview.src = article.coverImage || 'https://br-billowing-mountain-aomqpcdy.storage.c-2.ap-southeast-1.aws.neon.tech/gvf-website/gvf/assets/bahan-konten/fasilitas-dan-infrastruktur/progres-konstruksi-gedung-dan-wudhu.webp';
        if (inputSummary) inputSummary.value = article.summary || '';
        if (inputContent) inputContent.value = article.content || '';
        if (inputIsPublished) inputIsPublished.checked = Boolean(article.isPublished);

        openModal();
      } catch (err) {
        console.error('Error parsing article JSON:', err);
      }
    });
  });

  // MinIO File Upload Handler (Modal)
  if (btnTriggerModalFile && modalFileInput) {
    btnTriggerModalFile.addEventListener('click', () => {
      modalFileInput.click();
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
          if (modalImagePreview) modalImagePreview.src = data.url;
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

  // Keyboard accessibility: ESC key to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
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
