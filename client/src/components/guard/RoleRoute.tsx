import { useAuth } from '@/context/AuthContext'

import { Navigate } from 'react-router-dom'

interface RoleRouteProp {
  allowedRole: string[]
  children: React.ReactNode
}

export default function RoleRoute({ allowedRole, children }: RoleRouteProp) {
  const { loading, user, role } = useAuth()

  if (loading) return <div>Loading...</div>
  // Not signed in at all — send to login so they can authenticate.
  if (!user) return <Navigate to="/login" replace />
  // Signed in but not permitted here. Sending these users to /login loops
  // forever, since they already have a valid session.
  if (!role || !allowedRole.includes(role)) return <Navigate to="/401" replace />
  return <>{children}</>
}
