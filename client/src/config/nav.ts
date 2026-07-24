import {
  IconCalendar,
  IconLayoutDashboard,
  IconClipboardList,
  IconBox,
  IconUser,
  IconSettings,
  type IconProps,
} from '@tabler/icons-react'

import type { ComponentType } from 'react'

export type NavItem = {
  label: string
  path: string
  icon: ComponentType<Partial<IconProps>>
  isLocked: boolean
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/home', icon: IconLayoutDashboard, isLocked: true },
  { label: 'Schedule', path: '/dashboard/schedule', icon: IconCalendar, isLocked: true },
  { label: 'Bookings', path: '/dashboard/bookings', icon: IconClipboardList, isLocked: true },
  { label: 'Package', path: '/dashboard/package', icon: IconBox, isLocked: false },
  { label: 'Profile', path: '/dashboard/profile', icon: IconUser, isLocked: false },
  { label: 'Settings', path: '/dashboard/settings', icon: IconSettings, isLocked: true },
]
