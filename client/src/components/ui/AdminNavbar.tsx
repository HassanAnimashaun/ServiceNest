import { NavLink } from 'react-router-dom'
import { navItems } from '@/config/nav'
import { IconLock } from '@tabler/icons-react'

function AdminNavbar() {
  const navList = navItems.map((nav) => {
    const Icon = nav.icon
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      isActive ? 'sn-navbar active ' : 'sn-navbar'

    return (
      <li key={nav.label}>
        {nav.isLocked ? (
          <span className=" sn-locked sn-navbar">
            <Icon size={18} /> {nav.label} <IconLock size={18} />
          </span>
        ) : (
          <NavLink to={nav.path} className={navLinkClass}>
            <Icon size={18} /> {nav.label}
          </NavLink>
        )}
      </li>
    )
  })

  return (
    <div className="h-full w-full border-r border-hr border-[#D3D1C7] flex flex-col">
      <h1 className="text-lg font-medium text-[#1A6FD4] tracking-tight p-7">ServiceNest</h1>
      <ul className=" ">{navList}</ul>
    </div>
  )
}

export default AdminNavbar
