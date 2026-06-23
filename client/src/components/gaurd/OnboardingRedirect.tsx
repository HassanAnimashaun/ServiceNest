import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

function OnboardingRedirect() {
  const { isOnboarding, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  return isOnboarding ? <Navigate to="/dashboard/profile" /> : <Navigate to="/dashboard/home" />
}

export default OnboardingRedirect
