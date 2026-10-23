export const prerender = false;

import type { APIRoute } from 'astro';
import { updateRolePermissions, updateUserPermissions } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const adminUser = (locals as any).adminUser;
    if (!adminUser || adminUser.role !== 'superadmin') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Hanya Super Administrator yang berwenang mengubah konfigurasi hak akses.' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { targetType, roleKey, userId, permissions, role } = body;

    if (!Array.isArray(permissions)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Format hak akses tidak valid (wajib array permission).' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (targetType === 'role' && roleKey) {
      const updated = await updateRolePermissions(roleKey, permissions);
      if (!updated) {
        return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui hak akses role.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Hak akses role ${roleKey} berhasil diperbarui.`,
        data: updated 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (targetType === 'user' && userId) {
      const updated = await updateUserPermissions(Number(userId), permissions, role);
      if (!updated) {
        return new Response(JSON.stringify({ success: false, error: 'Gagal memperbarui hak akses pengguna.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Hak akses pengguna ID ${userId} berhasil diperbarui.`,
        data: updated 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Target type tidak valid.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API-ROLES-SAVE] Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Terjadi kesalahan server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
