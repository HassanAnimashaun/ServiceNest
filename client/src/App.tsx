import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/public/NotFound'
import AuthPage from './pages/public/AuthPage'
import AdminDashboard from './pages/provider/AdminDashboard'
import HomePage from './pages/public/HomePage'
import ProtectedRoute from './components/guard/ProtectedRoute'
import RoleRoute from './components/guard/RoleRoute'
import UnauthorizedUser from './pages/public/UnauthorizedUser'
import ResetPassword from './pages/public/ResetPasswordPage'
import ProfilePage from './pages/provider/dashboard/ProfilePage'
import PackagePage from './pages/provider/dashboard/PackagePage'
import OnboardingRedirect from './components/guard/OnboardingRedirect'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/401" element={<UnauthorizedUser />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole={['provider']}>
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<OnboardingRedirect />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="package" element={<PackagePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
