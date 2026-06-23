import Header from '@/components/ui/Header'
import AdminNavbar from '@/components/ui/AdminNavbar'
import { Outlet } from 'react-router-dom'
function AdminDashboard() {
  return (
    <div className="h-screen grid grid-cols-[176px_1fr] grid-rows-[auto_1fr]">
      <div className="row-span-2 h-full">
        <AdminNavbar />
      </div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
