// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'
import hydrateOnboardingStatus from '@/utils/OnboardingCheck'
import { getUserRole, type UserRole } from '@/utils/role'

interface AuthContextType {
  user: User | null
  role: UserRole | null
  isOnboarding: boolean
  loading: boolean
  refreshOnboarding: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  const [isOnboarding, setIsOnboarding] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)

  const [onboardingLoading, setOnboardingLoading] = useState(true)

  useEffect(() => {
    let active = true

    const applySession = (session: Session | null) => {
      const user = session?.user ?? null
      const role = getUserRole(user)

      setUser(user)
      setRole(role)
      setAuthLoading(false)

      if (!user || role !== 'provider') {
        setOnboardingLoading(false)
        return
      }

      setOnboardingLoading(true)

      setTimeout(() => {
        void hydrateOnboardingStatus(user.id).then((status) => {
          if (!active) return
          if (status !== null) setIsOnboarding(status)
          setOnboardingLoading(false)
        })
      }, 0)
    }

    void supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!active) return
        applySession(session)
      })
      .catch((error) => {
        setOnboardingLoading(false)
        setAuthLoading(false)
        console.log(error)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== 'INITIAL_SESSION') {
        applySession(session)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const refreshOnboarding = async () => {
    if (user && role === 'provider') {
      const status = await hydrateOnboardingStatus(user.id)
      if (status !== null) setIsOnboarding(status)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isOnboarding,
        loading: authLoading || onboardingLoading,
        refreshOnboarding,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
