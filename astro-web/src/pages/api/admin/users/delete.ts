export const prerender = false;

import type { APIRoute } from 'astro';
import { deleteAdminUser } from '../../../../lib/db';
import { verifySessionToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const sessionCookie = cookies.get('gvf_admin_session')?.value;
    const adminUser = (locals as any).adminUser || (sessionCookie ? verifySessionToken(sessionCookie) : null);

    if (!adminUser || adminUser.role !== 'superadmin') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Hanya Super Administrator yang berwenang menghapus akun admin.' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: 'ID pengguna wajib disertakan.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await deleteAdminUser({
      userId: Number(userId),
      currentUserId: Number(adminUser.id),
    });

    if (!result.success) {
      return new Response(JSON.stringify({ success: false, error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Akun pengguna berhasil dihapus dari sistem.' 
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
