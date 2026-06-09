import { supabase } from '@/lib/supabaseClient'
import { AuthError } from '@supabase/supabase-js'
import '@/index.css'
import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const ResetPassword = location.state?.passwordReset

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(handleErrorMessage(error))
        return
      }

      navigate('/dashboard')
    } finally {
      setSubmitting(false)
    }
  }
  const handleErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'invalid_credentials':
        return 'Something went wrong. Please check your details and try again'
        break
      default:
        return 'server error'
        break
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        {/* EMAIL */}
        <div className="mb-4">
          <label htmlFor="login-email" className="sn-label">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="sn-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* PASSWORD */}
        <div className="mb-4">
          <label htmlFor="login-password" className="sn-label">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="sn-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Link to="/reset" className="text-sm text-[#1A6FD4] hover:underline">
              Forgot passoword?
            </Link>
          </div>
        </div>

        <div className="mb-3">
          {error && <p className="sn-error">{error}</p>}
          {ResetPassword && <p className="sn-noti">Password reset succesful</p>}
        </div>

        {/* LOGIN */}
        <div className="flex justify-center">
          <button type="submit" disabled={submitting} className="sn-btn-primary sn-btn-full">
            {submitting ? 'Logging In...' : 'Login'}
          </button>
        </div>
      </form>
    </>
  )
}
export default LoginForm
