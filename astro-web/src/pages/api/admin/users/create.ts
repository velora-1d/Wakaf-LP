export const prerender = false;

import type { APIRoute } from 'astro';
import { createAdminUser } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const sessionCookie = cookies.get('gvf_admin_session')?.value;
    const adminUser = (locals as any).adminUser || (sessionCookie ? verifySessionToken(sessionCookie) : null);

    if (!adminUser || adminUser.role !== 'superadmin') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Hanya Super Administrator yang berwenang menambahkan akun admin baru.' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { username, password, name, role, permissions } = body;

    if (!username || !password || !name) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Nama lengkap, username, dan kata sandi wajib diisi.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await createAdminUser({
      username: String(username).trim(),
      password: String(password),
      name: String(name).trim(),
      role: role ? String(role).trim() : 'staf_lapangan',
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
      message: `Akun pengguna @${result.user?.username} berhasil dibuat.`,
      user: result.user,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Terjadi kesalahan sistem.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
