import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Popover from '@/components/ui/Popover'
import { navItems } from '@/config/nav'
import { useLocation } from 'react-router-dom'
import { IconMenu2 } from '@tabler/icons-react'

interface NavbarProp {
  sidebarToggle: () => void
}

function Header({ sidebarToggle }: NavbarProp) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const title = navItems.find((item) => item.path === location.pathname)

  return (
    <div className="flex items-center justify-between p-2 w-full border-b border-border">
      <button onClick={sidebarToggle} className="lg:hidden">
        <IconMenu2 />
      </button>

      <h1 className="text-lg font-semibold text-text-primary">{title?.label}</h1>
      <div className="relative ">
        <Avatar onClick={() => setIsOpen(!isOpen)} />
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

export default Header
