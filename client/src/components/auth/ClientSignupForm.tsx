import { supabase } from '@/lib/supabaseClient'
import { AuthError } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ClientSignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const nameRegex = /^[A-Za-zÀ-ÿ\-']{2,}$/

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const trimmedFirstName = firstName.trim()
      const trimmedLastName = lastName.trim()

      if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
        setError('Please enter a valid first and last name.')
        return
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${trimmedFirstName} ${trimmedLastName}`,
          },
        },
      })
      if (error) {
        setError(handleErrorMessage(error))
        return
      }

      navigate('/login')
    } finally {
      setSubmitting(false)
    }
  }
  const handleErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'email_exists':
      case 'user_already_exists':
        return 'Something went wrong. Please check your details and try again'
        break
      case 'weak_password':
        return 'Password does not meet requirements.'
        break
      default:
        return 'server error'
        break
    }
  }

  return (
    <>
      <div className="flex item-center">
        <h2>Create a client account</h2>
      </div>
      <p className="text-sm text-[#888780] mb-4">Book trusted mobile detailers near you.</p>

      <form onSubmit={handleSignUp}>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {/* FIRST NAME*/}
          <div>
            <label htmlFor="client-first-name" className="sn-label">
              First name
            </label>
            <input
              id="client-first-name"
              type="text"
              className="sn-input"
              placeholder="Steve"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          {/* LAST NAME */}
          <div>
            <label htmlFor="client-last-name" className="sn-label">
              Last name
            </label>
            <input
              id="client-last-name"
              type="text"
              className="sn-input"
              placeholder="Jobs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label htmlFor="client-email" className="sn-label">
            Email
          </label>
          <input
            id="client-email"
            type="email"
            className="sn-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* PASSWORD */}
        <div className="mb-5">
          <label htmlFor="client-password" className="sn-label">
            Password
          </label>
          <input
            id="client-password"
            type="password"
            className="sn-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">{error && <p className="sn-error">{error}</p>}</div>

        {/* SUBMIT */}
        <div className="flex justify-center">
          <button type="submit" disabled={submitting} className="sn-btn-secondary sn-btn-full">
            {submitting ? 'Creating Account... ' : 'Signup'}
          </button>
        </div>
      </form>
    </>
  )
}

export default ClientSignupForm
