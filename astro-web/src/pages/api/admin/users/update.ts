export const prerender = false;

import type { APIRoute } from 'astro';
import { updateAdminUser } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const sessionCookie = cookies.get('gvf_admin_session')?.value;
    const adminUser = (locals as any).adminUser || (sessionCookie ? verifySessionToken(sessionCookie) : null);

    if (!adminUser || adminUser.role !== 'superadmin') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Hanya Super Administrator yang berwenang mengubah data akun admin.' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { id, username, password, name, role, permissions } = body;

    if (!id || !username || !name) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'ID pengguna, username, dan nama lengkap wajib diisi.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await updateAdminUser({
      id: Number(id),
      username: String(username).trim(),
      password: password ? String(password) : undefined,
      name: String(name).trim(),
      role: String(role).trim(),
      permissions: Array.isArray(permissions) ? permissions : undefined,
    });

    if (!result.success) {
      return new Response(JSON.stringify({ success: false, error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Data akun @${result.user?.username} berhasil diperbarui.`,
      user: result.user,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Terjadi kesalahan sistem.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
