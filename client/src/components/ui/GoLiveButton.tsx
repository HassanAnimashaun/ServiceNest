import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

interface GoLiveButtonProps {
  goLive: boolean
}

const GO_LIVE_ERROR = "Couldn't go live. Please try again."

function GoLiveButton({ goLive }: GoLiveButtonProps) {
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user, refreshOnboarding, isOnboarding } = useAuth()

  const switchIsOnboarding = async () => {
    if (!user) {
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const { error } = await supabase.functions.invoke('complete-provider-onboarding')
      if (error) {
        console.error(error.message)
        setError(GO_LIVE_ERROR)
        return
      }
      void refreshOnboarding()
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
      setError(GO_LIVE_ERROR)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOnboarding || !goLive) {
    return null
  }

  return (
    <div className="flex justify-center mt-4">
      {error && <p className="sn-error mb-2">{error}</p>}
      <button className="sn-btn-primary " disabled={submitting} onClick={switchIsOnboarding}>
        {submitting ? 'Going live...' : 'Go Live'}
      </button>
    </div>
  )
}

export default GoLiveButton
