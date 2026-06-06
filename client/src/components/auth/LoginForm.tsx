import { supabase } from '@/lib/supabaseClient'
import '@/index.css'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError(error.message)
      setSubmitting(false)
      return
    }
    setSubmitting(false)

    navigate('/dashboard')
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
          />
          <div className="flex justify-end">
            <Link to="/reset" className="text-sm text-[#1A6FD4] hover:underline">
              Forgot passoword?
            </Link>
          </div>
        </div>

        <div className="mb-3">{error && <p className="sn-error">{error}</p>}</div>

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
