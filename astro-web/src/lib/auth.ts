import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { adminUsers } from './db/schema';
import { eq } from 'drizzle-orm';

const SESSION_SECRET = 
  process.env.ADMIN_SESSION_SECRET || 
  'gvf-secure-admin-session-secret-key-2026-royal-blue';

export interface AdminSessionUser {
  id: number;
  username: string;
  name: string;
  role: string;
}

/**
 * Creates an HMAC-signed session token containing user info and expiration (7 days)
 */
export function createSessionToken(user: AdminSessionUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const jsonStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(jsonStr)
    .digest('base64url');

  return `${jsonStr}.${signature}`;
}

/**
 * Verifies an HMAC-signed session token
 */
export function verifySessionToken(token: string): AdminSessionUser | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [jsonStr, signature] = token.split('.');
    if (!jsonStr || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(jsonStr)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(jsonStr, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null; // Expired
    }

    return {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      role: payload.role,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Authenticates user with username & password against database
 */
export async function authenticateAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; user?: AdminSessionUser; error?: string }> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const records = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, cleanUsername))
      .limit(1);

    if (records.length === 0) {
      return { success: false, error: 'Nama pengguna atau kata sandi tidak valid.' };
    }

    const user = records[0];
    const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordMatch) {
      return { success: false, error: 'Nama pengguna atau kata sandi tidak valid.' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name || 'Administrator GVF',
        role: user.role,
      },
    };
  } catch (error: any) {
    console.error('[AUTH] Login query error:', error);
    return { success: false, error: 'Terjadi kendala koneksi ke database. Silakan coba kembali.' };
  }
}
