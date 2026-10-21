import { defineMiddleware } from 'astro:middleware';
import { verifySessionToken } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = context.cookies.get('gvf_admin_session')?.value;
    const user = sessionCookie ? verifySessionToken(sessionCookie) : null;

    // If accessing login page
    if (pathname === '/admin/login') {
      if (user) {
        // Already logged in, redirect to dashboard
        return context.redirect('/admin');
      }
      return next();
    }

    // Accessing protected admin pages
    if (!user) {
      return context.redirect(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
    }

    // Attach user to locals
    (context.locals as any).adminUser = user;
  }

  return next();
});
