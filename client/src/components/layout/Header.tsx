import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Popover from '@/components/ui/Popover'
import { NavLink } from 'react-router-dom'
import { navItems } from '@/config/nav'
import { IconLock, IconMenu2, IconX } from '@tabler/icons-react'
import { useAuth } from '@/context/AuthContext'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { isOnboarding } = useAuth()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'text-brand-blue bg-gray-100' : 'text-text-primary hover:bg-gray-100'
    }`

  const navList = navItems.map((nav) =>
    nav.isLocked && isOnboarding ? (
      <span
        key={nav.label}
        className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium opacity-38 cursor-not-allowed"
      >
        {nav.label} <IconLock size={14} />
      </span>
    ) : (
      <NavLink
        key={nav.label}
        to={nav.path}
        className={navLinkClass}
        onClick={() => setIsNavOpen(false)}
      >
        {nav.label}
      </NavLink>
    )
  )

  return (
    <div className="grid grid-cols-3 items-center px-6 py-2 w-full border-b border-border">
      <button
        onClick={() => setIsNavOpen(true)}
        className="col-start-1 row-start-1 justify-self-start lg:hidden"
      >
        <IconMenu2 />
      </button>

      <div className="inline-flex col-start-2 row-start-1 lg:col-start-1 justify-self-center">
        <img src="/favicon.png" alt="" width={32} height={32} />
        <span className="text-lg font-medium text-brand-blue">ServiceNest</span>
      </div>
      <nav className="hidden lg:flex col-start-2 row-start-1 justify-self-center gap-8">
        {navList}
      </nav>

      <div className="col-start-3 row-start-1 justify-self-end relative">
        <Avatar onClick={() => setIsOpen(!isOpen)} />
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

      {isNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setIsNavOpen(false)}
            className="absolute inset-0 bg-black/40 cursor-pointer"
          />
          <div className="relative flex flex-col h-full w-64 bg-white border-r border-border p-4 gap-1">
            <button
              onClick={() => setIsNavOpen(false)}
              className="self-end p-2 cursor-pointer"
              aria-label="Close menu"
            >
              <IconX />
            </button>
            {navList}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
