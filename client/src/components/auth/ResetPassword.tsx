import EmailSent from '@/components/auth/EmailSent'
import RequestReset from '@/components/auth/RequestReset'
import UpdatePassword from '@/components/auth/UpdatePassword'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState<'email-veri' | 'email-sent' | 'password-reset'>('email-veri')
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash
    const isRecovery = hash.includes('type=recovery')
    if (isRecovery) {
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setStep('password-reset')
        }
      })
    }
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    })
    if (error) {
      setError(error.message)
      return
    }
    setStep('email-sent')
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      return
    }
    navigate('/login', { state: { passwordReset: true } })
  }

  if (step === 'email-sent') return <EmailSent email={email} />

  if (step === 'password-reset') {
    return (
      <UpdatePassword
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setconfirmPassword={setconfirmPassword}
        error={error}
        onSubmit={handleUpdate}
      />
    )
  }
  return <RequestReset email={email} setEmail={setEmail} onSubmit={handleReset} error={error} />
}

export default ResetPassword
