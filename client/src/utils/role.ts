import type { User } from '@supabase/supabase-js'

export type UserRole = 'provider' | 'client'

/**
 * Role is set server-side in app_metadata (never user_metadata, which the
 * user can edit). Returns null when the claim is missing or unrecognised.
 */
export function getUserRole(user: User | null | undefined): UserRole | null {
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  return role === 'provider' || role === 'client' ? role : null
}

export function homePathForRole(role: UserRole | null): string {
  return role === 'provider' ? '/dashboard' : '/home'
}
