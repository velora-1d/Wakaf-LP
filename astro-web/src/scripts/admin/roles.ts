// src/scripts/admin/roles.ts
// Interactive Client Script for Admin Roles & Users Management

// Tab Switching with Persistence (Query Param, Hash & LocalStorage)
const tabBtnRoles = document.getElementById('tabBtnRoles');
const tabBtnUsers = document.getElementById('tabBtnUsers');
const tabContentRoles = document.getElementById('tabContentRoles');
const tabContentUsers = document.getElementById('tabContentUsers');

export function switchRolesTab(activeTab: 'roles' | 'users', updateUrl = true) {
  if (activeTab === 'roles') {
    tabBtnRoles?.classList.add('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
    tabBtnRoles?.classList.remove('border-transparent', 'text-slate-500');
    tabBtnUsers?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
    tabBtnUsers?.classList.add('border-transparent', 'text-slate-500');
    tabContentRoles?.classList.remove('hidden');
    tabContentUsers?.classList.add('hidden');

    if (updateUrl) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', 'roles');
        url.hash = 'tab=roles';
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (e) {}
    }
    try { localStorage.setItem('gvf_admin_roles_active_tab', 'roles'); } catch (e) {}
  } else {
    tabBtnUsers?.classList.add('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
    tabBtnUsers?.classList.remove('border-transparent', 'text-slate-500');
    tabBtnRoles?.classList.remove('border-[#0969da]', 'text-[#0969da]', 'bg-blue-50/50');
    tabBtnRoles?.classList.add('border-transparent', 'text-slate-500');
    tabContentUsers?.classList.remove('hidden');
    tabContentRoles?.classList.add('hidden');

    if (updateUrl) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', 'users');
        url.hash = 'tab=users';
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (e) {}
    }
    try { localStorage.setItem('gvf_admin_roles_active_tab', 'users'); } catch (e) {}
  }
}

export function reloadToUsersTab() {
  try { localStorage.setItem('gvf_admin_roles_active_tab', 'users'); } catch (e) {}
  const url = new URL(window.location.href);
  url.searchParams.set('tab', 'users');
  url.hash = 'tab=users';
  window.location.href = url.pathname + url.search + url.hash;
}

tabBtnRoles?.addEventListener('click', () => switchRolesTab('roles'));
tabBtnUsers?.addEventListener('click', () => switchRolesTab('users'));

// Initial tab restoration on load
let savedRolesTab = 'roles';
try {
  savedRolesTab = localStorage.getItem('gvf_admin_roles_active_tab') || 'roles';
} catch (e) {}

const urlParams = new URLSearchParams(window.location.search);
const hash = window.location.hash;

if (urlParams.get('tab') === 'users' || hash.includes('users') || (!urlParams.has('tab') && savedRolesTab === 'users')) {
  switchRolesTab('users', false);
} else {
  switchRolesTab('roles', false);
}

// Role Select All & Deselect All
document.querySelectorAll('.btn-select-all').forEach((btn) => {
  btn.addEventListener('click', () => {
    const roleKey = btn.getAttribute('data-target-role');
    document.querySelectorAll(`.role-menu-checkbox[data-role="${roleKey}"]`).forEach((cb) => {
      (cb as HTMLInputElement).checked = true;
    });
  });
});

document.querySelectorAll('.btn-deselect-all').forEach((btn) => {
  btn.addEventListener('click', () => {
    const roleKey = btn.getAttribute('data-target-role');
    document.querySelectorAll(`.role-menu-checkbox[data-role="${roleKey}"]`).forEach((cb) => {
      (cb as HTMLInputElement).checked = false;
    });
  });
});

// Save Role Permissions
document.querySelectorAll('.btn-save-role').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const roleKey = btn.getAttribute('data-target-role');
    if (!roleKey) return;

    const checkedMenus: string[] = [];
    document.querySelectorAll(`.role-menu-checkbox[data-role="${roleKey}"]:checked`).forEach((cb) => {
      const m = cb.getAttribute('data-menu');
      if (m) checkedMenus.push(m);
    });

    btn.setAttribute('disabled', 'true');
    const originalText = btn.innerHTML;
    btn.textContent = 'Menyimpan...';

    try {
      const res = await fetch('/api/admin/roles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType: 'role',
          roleKey,
          permissions: checkedMenus,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Gagal menyimpan perubahan.');
      }

      if ((window as any).showToast) {
        (window as any).showToast(result.message || 'Hak akses role berhasil disimpan!');
      } else {
        alert('Hak akses role berhasil disimpan!');
      }
    } catch (err: any) {
      alert(`Gagal: ${err.message}`);
    } finally {
      btn.removeAttribute('disabled');
      btn.innerHTML = originalText;
    }
  });
});

// User Drawer Controls
const userDrawerBackdrop = document.getElementById('userDrawerBackdrop');
const userDrawerBox = document.getElementById('userDrawerBox');
const btnCloseUserDrawer = document.getElementById('btnCloseUserDrawer');
const btnCancelUserDrawer = document.getElementById('btnCancelUserDrawer');
const editUserId = document.getElementById('editUserId') as HTMLInputElement | null;
const editUserRole = document.getElementById('editUserRole') as HTMLSelectElement | null;
const userDrawerTitle = document.getElementById('userDrawerTitle');
const btnSaveUserPermissions = document.getElementById('btnSaveUserPermissions');
const btnSaveUserText = document.getElementById('btnSaveUserText');

export function openUserDrawer() {
  if (!userDrawerBackdrop || !userDrawerBox) return;
  userDrawerBackdrop.classList.remove('opacity-0', 'pointer-events-none');
  userDrawerBox.classList.remove('translate-x-full');
  userDrawerBox.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden';
}

export function closeUserDrawer() {
  if (!userDrawerBackdrop || !userDrawerBox) return;
  userDrawerBackdrop.classList.add('opacity-0', 'pointer-events-none');
  userDrawerBox.classList.remove('translate-x-0');
  userDrawerBox.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

btnCloseUserDrawer?.addEventListener('click', closeUserDrawer);
btnCancelUserDrawer?.addEventListener('click', closeUserDrawer);
userDrawerBackdrop?.addEventListener('click', (e) => {
  if (e.target === userDrawerBackdrop) closeUserDrawer();
});

// Edit User Button Handlers
document.querySelectorAll('.btn-edit-user-perms').forEach((btn) => {
  btn.addEventListener('click', () => {
    const uId = btn.getAttribute('data-user-id') || '';
    const uName = btn.getAttribute('data-user-name') || '';
    const uRole = btn.getAttribute('data-user-role') || 'superadmin';
    let uPerms: string[] = [];
    try {
      uPerms = JSON.parse(btn.getAttribute('data-user-perms') || '[]');
    } catch (e) {}

    if (editUserId) editUserId.value = uId;
    if (editUserRole) editUserRole.value = uRole;
    if (userDrawerTitle) userDrawerTitle.textContent = `Atur Menu: ${uName}`;

    document.querySelectorAll('.user-menu-checkbox').forEach((cb) => {
      const input = cb as HTMLInputElement;
      input.checked = uPerms.includes(input.value);
    });

    openUserDrawer();
  });
});

document.getElementById('btnUserSelectAll')?.addEventListener('click', () => {
  document.querySelectorAll('.user-menu-checkbox').forEach((cb) => {
    (cb as HTMLInputElement).checked = true;
  });
});

document.getElementById('btnUserDeselectAll')?.addEventListener('click', () => {
  document.querySelectorAll('.user-menu-checkbox').forEach((cb) => {
    (cb as HTMLInputElement).checked = false;
  });
});

btnSaveUserPermissions?.addEventListener('click', async () => {
  const userId = editUserId?.value;
  const role = editUserRole?.value;
  if (!userId) return;

  const checkedMenus: string[] = [];
  document.querySelectorAll('.user-menu-checkbox:checked').forEach((cb) => {
    checkedMenus.push((cb as HTMLInputElement).value);
  });

  btnSaveUserPermissions.setAttribute('disabled', 'true');
  if (btnSaveUserText) btnSaveUserText.textContent = 'Menyimpan...';

  try {
    const res = await fetch('/api/admin/roles/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetType: 'user',
        userId: Number(userId),
        role,
        permissions: checkedMenus,
      }),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Gagal menyimpan.');
    }

    closeUserDrawer();
    if ((window as any).showToast) {
      (window as any).showToast('Hak akses pengguna berhasil diperbarui!');
    }
    setTimeout(() => reloadToUsersTab(), 600);
  } catch (err: any) {
    alert(`Gagal: ${err.message}`);
    btnSaveUserPermissions.removeAttribute('disabled');
    if (btnSaveUserText) btnSaveUserText.textContent = 'Simpan Hak Akses';
  }
});

// ==========================================
// USER ACCOUNT MODAL (CREATE & EDIT)
// ==========================================
const userAccountModal = document.getElementById('userAccountModal');
const userAccountModalBox = document.getElementById('userAccountModalBox');
const userAccountModalTitle = document.getElementById('userAccountModalTitle');
const btnCloseUserAccountModal = document.getElementById('btnCloseUserAccountModal');
const btnCancelUserAccountModal = document.getElementById('btnCancelUserAccountModal');
const userAccountForm = document.getElementById('userAccountForm') as HTMLFormElement | null;
const inputUserId = document.getElementById('inputUserId') as HTMLInputElement | null;
const inputUserName = document.getElementById('inputUserName') as HTMLInputElement | null;
const inputUserUsername = document.getElementById('inputUserUsername') as HTMLInputElement | null;
const inputUserPassword = document.getElementById('inputUserPassword') as HTMLInputElement | null;
const inputUserPasswordRequiredStar = document.getElementById('inputUserPasswordRequiredStar');
const inputUserPasswordHint = document.getElementById('inputUserPasswordHint');
const inputUserRoleSelect = document.getElementById('inputUserRoleSelect') as HTMLSelectElement | null;
const btnSubmitUserAccount = document.getElementById('btnSubmitUserAccount') as HTMLButtonElement | null;
const btnSubmitUserAccountText = document.getElementById('btnSubmitUserAccountText');
const btnOpenCreateUser = document.getElementById('btnOpenCreateUser');

// Password Visibility Toggle (Fitur Mata)
const btnToggleUserPassword = document.getElementById('btnToggleUserPassword');
const iconUserEyeOpen = document.getElementById('iconUserEyeOpen');
const iconUserEyeClosed = document.getElementById('iconUserEyeClosed');

export function resetPasswordVisibility() {
  if (inputUserPassword) inputUserPassword.type = 'password';
  iconUserEyeOpen?.classList.remove('hidden');
  iconUserEyeClosed?.classList.add('hidden');
}

btnToggleUserPassword?.addEventListener('click', () => {
  if (!inputUserPassword) return;
  const isPass = inputUserPassword.type === 'password';
  inputUserPassword.type = isPass ? 'text' : 'password';
  if (isPass) {
    iconUserEyeOpen?.classList.add('hidden');
    iconUserEyeClosed?.classList.remove('hidden');
  } else {
    iconUserEyeOpen?.classList.remove('hidden');
    iconUserEyeClosed?.classList.add('hidden');
  }
});

export function openUserAccountModal() {
  resetPasswordVisibility();
  if (!userAccountModal || !userAccountModalBox) return;
  userAccountModal.classList.remove('opacity-0', 'pointer-events-none');
  userAccountModalBox.classList.remove('scale-95');
  userAccountModalBox.classList.add('scale-100');
  document.body.style.overflow = 'hidden';
}

export function closeUserAccountModal() {
  if (!userAccountModal || !userAccountModalBox) return;
  userAccountModal.classList.add('opacity-0', 'pointer-events-none');
  userAccountModalBox.classList.remove('scale-100');
  userAccountModalBox.classList.add('scale-95');
  document.body.style.overflow = '';
}

btnCloseUserAccountModal?.addEventListener('click', closeUserAccountModal);
btnCancelUserAccountModal?.addEventListener('click', closeUserAccountModal);
userAccountModal?.addEventListener('click', (e) => {
  if (e.target === userAccountModal) closeUserAccountModal();
});

// Open Create User Modal
btnOpenCreateUser?.addEventListener('click', () => {
  if (userAccountForm) userAccountForm.reset();
  if (inputUserId) inputUserId.value = '';
  if (userAccountModalTitle) userAccountModalTitle.textContent = 'Tambah Pengguna Baru';
  if (inputUserPassword) {
    inputUserPassword.required = true;
    inputUserPassword.placeholder = 'Minimal 6 karakter';
  }
  if (inputUserPasswordRequiredStar) inputUserPasswordRequiredStar.classList.remove('hidden');
  if (inputUserPasswordHint) {
    inputUserPasswordHint.textContent = 'Minimal 6 karakter. Kata sandi dienkripsi aman dengan bcryptjs.';
  }
  if (btnSubmitUserAccountText) btnSubmitUserAccountText.textContent = 'Buat Akun Pengguna';
  openUserAccountModal();
});

// Open Edit User Modal
document.querySelectorAll('.btn-edit-user-account').forEach((btn) => {
  btn.addEventListener('click', () => {
    const uId = btn.getAttribute('data-user-id') || '';
    const uUsername = btn.getAttribute('data-user-username') || '';
    const uName = btn.getAttribute('data-user-name') || '';
    const uRole = btn.getAttribute('data-user-role') || 'staf_lapangan';

    if (inputUserId) inputUserId.value = uId;
    if (inputUserName) inputUserName.value = uName;
    if (inputUserUsername) inputUserUsername.value = uUsername;
    if (inputUserRoleSelect) inputUserRoleSelect.value = uRole;

    if (inputUserPassword) {
      inputUserPassword.value = '';
      inputUserPassword.required = false;
      inputUserPassword.placeholder = 'Kosongkan jika tidak ingin mengubah kata sandi';
    }
    if (inputUserPasswordRequiredStar) inputUserPasswordRequiredStar.classList.add('hidden');
    if (inputUserPasswordHint) {
      inputUserPasswordHint.textContent = 'Biarkan kosong untuk mempertahankan kata sandi lama.';
    }

    if (userAccountModalTitle) userAccountModalTitle.textContent = `Edit Akun: @${uUsername}`;
    if (btnSubmitUserAccountText) btnSubmitUserAccountText.textContent = 'Perbarui Akun';

    openUserAccountModal();
  });
});

// Submit User Account (Create or Update)
userAccountForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = inputUserId?.value;
  const isEdit = Boolean(id);
  const name = inputUserName?.value.trim();
  const username = inputUserUsername?.value.trim();
  const password = inputUserPassword?.value;
  const role = inputUserRoleSelect?.value;

  if (!name || !username || !role) {
    alert('Nama lengkap, username, dan role jabatan wajib diisi.');
    return;
  }

  if (!isEdit && (!password || password.length < 6)) {
    alert('Kata sandi untuk pengguna baru minimal 6 karakter.');
    return;
  }

  if (isEdit && password && password.length < 6) {
    alert('Kata sandi baru minimal 6 karakter.');
    return;
  }

  if (btnSubmitUserAccount) {
    btnSubmitUserAccount.setAttribute('disabled', 'true');
    if (btnSubmitUserAccountText) btnSubmitUserAccountText.textContent = isEdit ? 'Menyimpan...' : 'Membuat...';
  }

  try {
    const endpoint = isEdit ? '/api/admin/users/update' : '/api/admin/users/create';
    const payload: any = {
      name,
      username,
      role,
    };

    if (isEdit) {
      payload.id = Number(id);
      if (password) payload.password = password;
    } else {
      payload.password = password;
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Gagal memproses data akun pengguna.');
    }

    closeUserAccountModal();
    alert(result.message || (isEdit ? 'Akun berhasil diperbarui!' : 'Akun berhasil dibuat!'));
    reloadToUsersTab();
  } catch (err: any) {
    alert(`Gagal: ${err.message}`);
    if (btnSubmitUserAccount) {
      btnSubmitUserAccount.removeAttribute('disabled');
      if (btnSubmitUserAccountText) btnSubmitUserAccountText.textContent = isEdit ? 'Perbarui Akun' : 'Buat Akun Pengguna';
    }
  }
});

// ==========================================
// DELETE USER MODAL
// ==========================================
const deleteUserModal = document.getElementById('deleteUserModal');
const deleteUserModalBox = document.getElementById('deleteUserModalBox');
const deleteUserDisplay = document.getElementById('deleteUserDisplay');
const btnCancelDeleteUserModal = document.getElementById('btnCancelDeleteUserModal');
const btnExecuteDeleteUserModal = document.getElementById('btnExecuteDeleteUserModal');
let pendingDeleteUserId: number | null = null;

export function openDeleteUserModal(userId: number, username: string) {
  pendingDeleteUserId = userId;
  if (deleteUserDisplay) deleteUserDisplay.textContent = `@${username}`;
  if (!deleteUserModal || !deleteUserModalBox) return;
  deleteUserModal.classList.remove('opacity-0', 'pointer-events-none');
  deleteUserModalBox.classList.remove('scale-95');
  deleteUserModalBox.classList.add('scale-100');
  document.body.style.overflow = 'hidden';
}

export function closeDeleteUserModal() {
  pendingDeleteUserId = null;
  if (!deleteUserModal || !deleteUserModalBox) return;
  deleteUserModal.classList.add('opacity-0', 'pointer-events-none');
  deleteUserModalBox.classList.remove('scale-100');
  deleteUserModalBox.classList.add('scale-95');
  document.body.style.overflow = '';
}

btnCancelDeleteUserModal?.addEventListener('click', closeDeleteUserModal);
deleteUserModal?.addEventListener('click', (e) => {
  if (e.target === deleteUserModal) closeDeleteUserModal();
});

document.querySelectorAll('.btn-delete-user').forEach((btn) => {
  btn.addEventListener('click', () => {
    const uId = Number(btn.getAttribute('data-user-id'));
    const uUsername = btn.getAttribute('data-user-username') || '';
    if (!uId) return;
    openDeleteUserModal(uId, uUsername);
  });
});

btnExecuteDeleteUserModal?.addEventListener('click', async () => {
  if (!pendingDeleteUserId) return;

  btnExecuteDeleteUserModal.setAttribute('disabled', 'true');
  btnExecuteDeleteUserModal.textContent = 'Menghapus...';

  try {
    const res = await fetch('/api/admin/users/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: pendingDeleteUserId }),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      throw new Error(result.error || 'Gagal menghapus akun pengguna.');
    }

    closeDeleteUserModal();
    alert('Akun pengguna berhasil dihapus.');
    reloadToUsersTab();
  } catch (err: any) {
    alert(`Gagal: ${err.message}`);
    btnExecuteDeleteUserModal.removeAttribute('disabled');
    btnExecuteDeleteUserModal.textContent = 'Ya, Hapus';
  }
});

// Global ESC Key Listener
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeUserDrawer();
    closeUserAccountModal();
    closeDeleteUserModal();
  }
});
