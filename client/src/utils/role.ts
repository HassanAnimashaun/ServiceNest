import type { User } from '@supabase/supabase-js'

export type UserRole = 'provider' | 'client'

export function getUserRole(user: User | null | undefined): UserRole | null {
  const role = (user?.app_metadata as { role?: string } | undefined)?.role
  return role === 'provider' || role === 'client' ? role : null
}

export function homePathForRole(role: UserRole | null): string {
  return role === 'provider' ? '/dashboard' : '/home'
}
