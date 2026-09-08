import Header from '@/components/layout/Header'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import type { DashboardOutletContext } from '@/config/types'

function AdminDashboard() {
  const [goLive, setGoLive] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      return
    }
    let cancelled = false

    const checkGoLiveReadiness = async () => {
      try {
        const [
          { count: packageCount, error: packagesError },
          { data: providerData, error: providerError },
        ] = await Promise.all([
          supabase
            .from('packages')
            .select('*', { count: 'exact', head: true })
            .eq('provider_id', user.id),

          supabase
            .from('providers')
            .select('home_base_lng, home_base_lat')
            .eq('id', user.id)
            .single(),
        ])
        if (cancelled) {
          return
        }
        if (packagesError || providerError) {
          console.error((packagesError || providerError)?.message ?? 'Failed to load data')
          setGoLive(false)
          return
        }
        setGoLive(
          (packageCount ?? 0) >= 1 &&
            providerData?.home_base_lng != null &&
            providerData?.home_base_lat != null
        )
      } catch (error) {
        if (cancelled) {
          return
        }
        console.error(error)
        setGoLive(false)
      }
    }

    void checkGoLiveReadiness()

    return () => {
      cancelled = true
    }
  }, [user, refreshKey])

  const refreshGoLive = useCallback(() => {
    setRefreshKey((key) => key + 1)
  }, [])

  const outletContext: DashboardOutletContext = useMemo(
    () => ({ readyToGoLive: goLive, refreshGoLive }),
    [goLive, refreshGoLive]
  )

  return (
    <div className=" bg-[#F7F8FA] lg:h-screen lg:grid lg:grid-rows-[auto_1fr]">
      <Header />
      <div className="pt-8 px-4 w-full">
        <Outlet context={outletContext} />
      </div>
    </div>
  )
}

export default AdminDashboard
