// src/lib/db/roles.ts
// Manajemen Pengguna Admin & Role-Based Access Control (RBAC)

import { db } from './client';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function getAllRoles(): Promise<schema.RoleDefinition[]> {
  try {
    return await db.select().from(schema.roleDefinitions).orderBy(schema.roleDefinitions.roleKey);
  } catch (error) {
    console.error('[DB] Error fetching roles:', error);
    return [];
  }
}

export async function getAllAdminUsers(): Promise<schema.AdminUser[]> {
  try {
    return await db.select().from(schema.adminUsers).orderBy(schema.adminUsers.id);
  } catch (error) {
    console.error('[DB] Error fetching admin users:', error);
    return [];
  }
}

export async function updateRolePermissions(
  roleKey: string,
  permissions: string[]
): Promise<schema.RoleDefinition | null> {
  try {
    const updated = await db
      .update(schema.roleDefinitions)
      .set({
        permissions,
        updatedAt: new Date(),
      })
      .where(eq(schema.roleDefinitions.roleKey, roleKey))
      .returning();

    // Juga update semua admin users yang memiliki role ini jika user tidak memiliki custom override
    await db
      .update(schema.adminUsers)
      .set({
        permissions,
        updatedAt: new Date(),
      })
      .where(eq(schema.adminUsers.role, roleKey));

    return updated[0] || null;
  } catch (error) {
    console.error(`[DB] Error updating role permissions for ${roleKey}:`, error);
    return null;
  }
}

export async function updateUserPermissions(
  userId: number,
  permissions: string[],
  role?: string
): Promise<schema.AdminUser | null> {
  try {
    const data: Partial<schema.AdminUser> = {
      permissions,
      updatedAt: new Date(),
    };
    if (role) {
      data.role = role;
    }
    const updated = await db
      .update(schema.adminUsers)
      .set(data)
      .where(eq(schema.adminUsers.id, userId))
      .returning();

    return updated[0] || null;
  } catch (error) {
    console.error(`[DB] Error updating user permissions for id ${userId}:`, error);
    return null;
  }
}

export async function createAdminUser(params: {
  username: string;
  password: string;
  name: string;
  role: string;
  permissions?: string[];
}): Promise<{ success: boolean; user?: schema.AdminUser; error?: string }> {
  try {
    const cleanUsername = params.username.trim().toLowerCase();
    if (!cleanUsername) return { success: false, error: 'Username wajib diisi.' };
    if (!params.password || params.password.length < 6) return { success: false, error: 'Password minimal 6 karakter.' };
    if (!params.name.trim()) return { success: false, error: 'Nama lengkap wajib diisi.' };

    const existing = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.username, cleanUsername))
      .limit(1);

    if (existing.length > 0) {
      return { success: false, error: `Username @${cleanUsername} sudah digunakan.` };
    }

    let permissions = params.permissions;
    if (!permissions || permissions.length === 0) {
      const roleDef = await db
        .select()
        .from(schema.roleDefinitions)
        .where(eq(schema.roleDefinitions.roleKey, params.role))
        .limit(1);
      permissions = roleDef[0]?.permissions || ['overview'];
    }

    const passwordHash = bcrypt.hashSync(params.password, 10);
    const inserted = await db
      .insert(schema.adminUsers)
      .values({
        username: cleanUsername,
        passwordHash,
        name: params.name.trim(),
        role: params.role || 'staf_lapangan',
        permissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return { success: true, user: inserted[0] };
  } catch (error: any) {
    console.error('[DB] Error creating admin user:', error);
    return { success: false, error: error.message || 'Gagal menambahkan akun admin.' };
  }
}

export async function updateAdminUser(params: {
  id: number;
  username: string;
  name: string;
  role: string;
  password?: string;
  permissions?: string[];
}): Promise<{ success: boolean; user?: schema.AdminUser; error?: string }> {
  try {
    const cleanUsername = params.username.trim().toLowerCase();
    if (!cleanUsername) return { success: false, error: 'Username wajib diisi.' };
    if (!params.name.trim()) return { success: false, error: 'Nama lengkap wajib diisi.' };

    const targetUser = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.id, params.id))
      .limit(1);

    if (targetUser.length === 0) {
      return { success: false, error: 'Akun pengguna tidak ditemukan.' };
    }

    if (cleanUsername !== targetUser[0].username) {
      const duplicate = await db
        .select()
        .from(schema.adminUsers)
        .where(eq(schema.adminUsers.username, cleanUsername))
        .limit(1);
      if (duplicate.length > 0) {
        return { success: false, error: `Username @${cleanUsername} sudah digunakan oleh akun lain.` };
      }
    }

    const updateData: Partial<schema.AdminUser> = {
      username: cleanUsername,
      name: params.name.trim(),
      role: params.role || targetUser[0].role,
      updatedAt: new Date(),
    };

    if (params.password && params.password.trim() !== '') {
      if (params.password.length < 6) {
        return { success: false, error: 'Password baru minimal 6 karakter.' };
      }
      updateData.passwordHash = bcrypt.hashSync(params.password, 10);
    }

    if (params.permissions && params.permissions.length > 0) {
      updateData.permissions = params.permissions;
    }

    const updated = await db
      .update(schema.adminUsers)
      .set(updateData)
      .where(eq(schema.adminUsers.id, params.id))
      .returning();

    return { success: true, user: updated[0] };
  } catch (error: any) {
    console.error('[DB] Error updating admin user:', error);
    return { success: false, error: error.message || 'Gagal memperbarui akun admin.' };
  }
}

export async function deleteAdminUser(params: {
  userId: number;
  currentUserId: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (params.userId === params.currentUserId) {
      return { success: false, error: 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif digunakan.' };
    }

    const target = await db
      .select()
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.id, params.userId))
      .limit(1);

    if (target.length === 0) {
      return { success: false, error: 'Akun pengguna tidak ditemukan.' };
    }

    if (target[0].username === 'admin') {
      return { success: false, error: 'Akun Administrator Utama (@admin) dilindungi dan tidak dapat dihapus.' };
    }

    await db.delete(schema.adminUsers).where(eq(schema.adminUsers.id, params.userId));
    return { success: true };
  } catch (error: any) {
    console.error('[DB] Error deleting admin user:', error);
    return { success: false, error: error.message || 'Gagal menghapus akun admin.' };
  }
}
