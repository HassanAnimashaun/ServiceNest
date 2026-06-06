import { supabase } from '@/lib/supabaseClient'
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: businessName,
          full_name: `${firstName.trim()} ${lastName.trim()}`,
          role: 'provider',
        },
      },
    })
    if (error) {
      setError(error.message)
      setSubmitting(false)
      console.log(error.message)
      return
    }

    setSubmitting(false)
    navigate('/dashboard')
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
