import EmailSent from '@/components/auth/EmailSent'
import RequestReset from '@/components/auth/RequestReset'
import UpdatePassword from '@/components/auth/UpdatePassword'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthError } from '@supabase/supabase-js'

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
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setStep('password-reset')
        }
      })
      return () => subscription.unsubscribe()
    }
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    })
    if (error) {
      setError(handleErrorMessage(error))
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
      setError(handleErrorMessage(error))
      return
    }
    navigate('/login', { state: { passwordReset: true } })
  }

  const handleErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'over_email_send_rate_limit':
        return 'Something went wrong'
        break
      case 'reauthentication_needed':
        return 'Please check email'
        break
      case 'weak_password':
        return 'Password does not meet requirements.'
        break
      default:
        return 'server error'
        break
    }
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
