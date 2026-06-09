import { useAuth } from '@/context/AuthContext'

import { Navigate } from 'react-router-dom'

interface RoleRouteProp {
  allowedRole: string[]
  children: React.ReactNode
}

export default function RoleRoute({ allowedRole, children }: RoleRouteProp) {
  const { loading, user, role } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (!role) return <Navigate to="/login" replace />
  if (!allowedRole.includes(role)) return <Navigate to="/login" replace />
  return <>{children}</>
}
