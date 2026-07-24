import Header from '@/components/layout/Header'
import AdminNavbar from '@/components/layout/AdminNavbar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:h-screen lg:grid lg:grid-cols-[176px_1fr] lg:grid-rows-[auto_1fr]">
      <div className="lg:row-span-2">
        <AdminNavbar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

      <div className="">
        <Header sidebarToggle={() => setIsOpen(!isOpen)} />
      </div>
      <div className="flex flex-col justify-center items-center pt-8 px-4 w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
