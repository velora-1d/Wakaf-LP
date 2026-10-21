export const prerender = false;

import type { APIRoute } from 'astro';
import { authenticateAdmin, createSessionToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    let username = '';
    let password = '';
    let isJson = false;

    if (contentType.includes('application/json')) {
      isJson = true;
      try {
        const body = await request.json();
        username = body.username || '';
        password = body.password || '';
      } catch (e) {
        // fallback json error
      }
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      try {
        const formData = await request.formData();
        username = (formData.get('username') as string) || '';
        password = (formData.get('password') as string) || '';
      } catch (e) {
        // fallback
      }
    } else {
      try {
        const text = await request.text();
        const body = JSON.parse(text);
        username = body.username || '';
        password = body.password || '';
        isJson = true;
      } catch (e) {
        // fallback
      }
    }

    if (!username || !password) {
      if (isJson) {
        return new Response(JSON.stringify({ success: false, error: 'Username dan password wajib diisi.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return redirect('/admin/login?error=empty_fields');
    }

    const authResult = await authenticateAdmin(username, password);
    if (!authResult.success || !authResult.user) {
      if (isJson) {
        return new Response(JSON.stringify({ success: false, error: authResult.error || 'Autentikasi gagal.' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return redirect('/admin/login?error=invalid_credentials');
    }

    // Set signed cookie
    const token = createSessionToken(authResult.user);
    cookies.set('gvf_admin_session', token, {
      path: '/',
      httpOnly: true,
      secure: false, // Local and prod safe
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (isJson) {
      return new Response(JSON.stringify({ success: true, redirect: '/admin' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return redirect('/admin');
  } catch (error: any) {
    console.error('[API-LOGIN] Error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Terjadi kesalahan sistem internal.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
