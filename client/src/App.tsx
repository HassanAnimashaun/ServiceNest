import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/public/AuthPage'
import AdminDashboard from './pages/provider/AdminDashboard'
import HomePage from './pages/public/HomePage'
import ProtectedRoute from './components/gaurd/ProtecedRoute'
import RoleRoute from './components/gaurd/RoleRoute'
import UnauthorizedUser from './pages/public/UnauthorizedUser'
import ResetPassword from './pages/public/ResetPasswordPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="401" element={<UnauthorizedUser />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole={['provider']}>
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
