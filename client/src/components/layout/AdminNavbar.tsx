import { NavLink } from 'react-router-dom'
import { navItems } from '@/config/nav'
import { IconLock, IconX } from '@tabler/icons-react'
interface AdminNavbarProp {
  onClose: () => void
  isOpen: boolean
}

function AdminNavbar({ onClose, isOpen }: AdminNavbarProp) {
  const handleNavbarViewport = () => {
    if (window.innerWidth < 1024) onClose()
  }
  const navList = navItems.map((nav) => {
    const Icon = nav.icon
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      isActive ? 'sn-navbar active' : 'sn-navbar'

    return (
      <li key={nav.label}>
        {nav.isLocked ? (
          <span className=" sn-locked sn-navbar">
            <Icon size={18} /> {nav.label} <IconLock size={18} />
          </span>
        ) : (
          <NavLink to={nav.path} className={navLinkClass} onClick={handleNavbarViewport}>
            <Icon size={18} /> {nav.label}
          </NavLink>
        )}
      </li>
    )
  })

  return (
    <div
      className={`bg-white h-full w-full z-50 border-r border-border overflow-y-auto lg:flex lg:flex-col lg:static ${isOpen ? 'flex flex-col fixed' : 'hidden'}`}
    >
      <div className="p-4">
        {isOpen && (
          <button onClick={onClose} className="absolute top-0 right-0 p-4  lg:hidden">
            <IconX />
          </button>
        )}
        <span className="p-[14px] text-left text-lg font-medium text-brand-blue">ServiceNest</span>
      </div>
      <ul className="flex flex-col gap-1 flex-1 justify-center lg:justify-start">{navList}</ul>
    </div>
  )
}

export default AdminNavbar
