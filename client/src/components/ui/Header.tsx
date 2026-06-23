import { useState } from 'react'
import Avatar from './Avatar'
import Popover from './Popover'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex justify-between p-2 w-full border-b border-hr border-[#D3D1C7]">
      <h1>Profile</h1>
      <div className="relative ">
        <Avatar onClick={() => setIsOpen(!isOpen)} />
        <Popover isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  )
}

export default Header
