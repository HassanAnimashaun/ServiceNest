import { supabase } from '@/lib/supabaseClient'
import { AuthError } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProviderSignupForm() {
  const [businessName, setBusinessName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
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
            business_name: businessName,
            full_name: `${firstName.trim()} ${lastName.trim()}`,
          },
        },
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
        <h2>Create a provider account</h2>
      </div>
      <p className="text-sm text-[#888780] mb-4">
        Grow your mobile detailing business with ServiceNest.
      </p>

      <form onSubmit={handleSignUp}>
        {/* OWNER NAME */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div>
            <label htmlFor="provider-first-name" className="text-xs text-[#5F5E5A]">
              First Name
            </label>
            <input
              id="provider-first-name"
              type="text"
              className="sn-input"
              placeholder="James"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="provider-last-name" className="text-xs text-[#5F5E5A]">
              Last Name
            </label>
            <input
              id="provider-last-name"
              type="text"
              className="sn-input"
              placeholder="Brown"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* BUSINESS NAME*/}
        <div className="mb-5">
          <label htmlFor="provider-business-name" className="text-xs text-[#5F5E5A]">
            Business name
          </label>
          <input
            id="provider-business-name"
            type="text"
            className="sn-input"
            placeholder="Extreme Detailing"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label htmlFor="provider-email" className="text-xs text-[#5F5E5A]">
            Email
          </label>
          <input
            id="provider-email"
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
          <label htmlFor="provider-password" className="text-xs text-[#5F5E5A]">
            Password
          </label>
          <input
            id="provider-password"
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
            {submitting ? 'Creating account...' : 'Signup'}
          </button>
        </div>
      </form>
    </>
  )
}

export default ProviderSignupForm
