import { supabase } from '@/lib/supabaseClient'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { US_STATES } from '@/config/states'
import Toast from '@/components/ui/Toast'
import GoLiveButton from '@/components/ui/GoLiveButton'
import { useOutletContext } from 'react-router-dom'
import type { DashboardOutletContext } from '@/config/types'

const LOAD_ERROR = "Couldn't load your business info. Please refresh and try again."
const SAVE_ERROR = "Couldn't save your business info. Please try again."
const ADDRESS_ERROR = "We couldn't find that address. Please check it and try again."
const GEOCODE_ERROR = "Couldn't verify your address right now. Please try again."

type MapboxResponse = {
  features?: {
    properties?: {
      coordinates?: { latitude?: number; longitude?: number }
    }
  }[]
}

type GeoResult =
  | { ok: true; home_base_lat: number; home_base_lng: number }
  | { ok: false; reason: 'not_found' | 'request_failed' }

function ProfilePage() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    serviceRadius: '',
  })
  const [error, setError] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const { readyToGoLive, refreshGoLive } = useOutletContext<DashboardOutletContext>()

  const { user } = useAuth()
  useEffect(() => {
    const loadProviderInfo = async () => {
      if (!user) {
        return
      }
      try {
        const { data, error } = await supabase
          .from('providers')
          .select(
            'address, city, state, zipCode:zip , phoneNumber:phone , serviceRadius:service_radius_miles'
          )
          .eq('id', user?.id)
          .single()

        if (error) {
          console.error(error.message)
          setError(LOAD_ERROR)
          return
        }
        setFormData({
          address: data?.address ?? '',
          city: data?.city ?? '',
          state: data?.state ?? '',
          zipCode: data?.zipCode ?? '',
          phoneNumber: data?.phoneNumber ?? '',
          serviceRadius: data?.serviceRadius != null ? String(data.serviceRadius) : '',
        })
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Unknown error')
        setError(LOAD_ERROR)
      }
    }
    void loadProviderInfo()
  }, [user])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const nextValue = name === 'phoneNumber' ? value.replace(/\D/g, '').slice(0, 10) : value
    setFormData((prev) => ({ ...prev, [name]: nextValue }))
  }

  function formatPhoneDisplay(value: string = '') {
    const digits = value.replace(/\D/g, '').slice(0, 10) // strip non-digits, cap at 10

    if (digits.length < 4) return digits
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  const handleSaved = () => {
    setToastMessage('Information saved successfully')
    refreshGoLive()
  }

  async function searchToGeo(): Promise<GeoResult> {
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
    const token = import.meta.env.VITE_MAPBOX_TOKEN
    const encode = encodeURIComponent(fullAddress)
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encode}&access_token=${token}`
      )
      if (!response.ok) {
        console.error(`Mapbox geocoding failed with status ${response.status}`)
        return { ok: false, reason: 'request_failed' }
      }

      const data: MapboxResponse = await response.json()
      const coordinates = data.features?.[0]?.properties?.coordinates

      if (coordinates?.latitude == null || coordinates?.longitude == null) {
        return { ok: false, reason: 'not_found' }
      }

      return {
        ok: true,
        home_base_lat: coordinates.latitude,
        home_base_lng: coordinates.longitude,
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
      return { ok: false, reason: 'request_failed' }
    }
  }

  async function submitLocation(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!user) {
      return
    }

    try {
      const geo = await searchToGeo()
      if (!geo.ok) {
        setError(geo.reason === 'not_found' ? ADDRESS_ERROR : GEOCODE_ERROR)
        return
      }
      const { error } = await supabase
        .from('providers')
        .update({
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zipCode,
          phone: formData.phoneNumber,
          service_radius_miles: Number(formData.serviceRadius),
          home_base_lat: geo.home_base_lat,
          home_base_lng: geo.home_base_lng,
        })
        .eq('id', user?.id)

      if (error) {
        console.error(error.message)
        setError(SAVE_ERROR)
        return
      }
      handleSaved()
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
      setError(SAVE_ERROR)
    }
  }

  return (
    <div>
      <div className="bg-page-bg border border-border mx-auto rounded-xl p-4 sm:p-8 w-full max-w-md flex flex-col justify-center items-center">
        <form className="w-full space-y-5" onSubmit={submitLocation}>
          <h1 className="text-xl font-semibold text-text-primary">Business info</h1>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3 ">
              <label htmlFor="provider-address" className="sn-label">
                Home Base Address
              </label>
              <input
                id="provider-address"
                type="text"
                className="sn-input"
                placeholder="123 Main st"
                value={formData.address}
                name="address"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="provider-city" className="sn-label">
                City
              </label>
              <input
                id="provider-city"
                type="text"
                className="sn-input"
                placeholder="Fayetteville"
                value={formData.city}
                name="city"
                onChange={handleOnChange}
                required
              />
            </div>

            <div>
              <label htmlFor="provider-state" className="sn-label">
                State
              </label>
              <select
                id="provider-state"
                className="sn-input"
                value={formData.state}
                name="state"
                onChange={handleOnChange}
                required
              >
                <option value="" disabled>
                  --
                </option>
                {US_STATES.map((us) => (
                  <option value={us.value} key={us.value}>
                    {us.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label htmlFor="provider-zip" className="sn-label">
                Zip
              </label>
              <input
                id="provider-zip"
                type="text"
                className="sn-input"
                placeholder="28303"
                maxLength={5}
                minLength={5}
                value={formData.zipCode}
                name="zipCode"
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="col-span-3">
              <label htmlFor="provider-number" className="sn-label">
                Phone Number
              </label>
              <input
                id="provider-number"
                type="tel"
                inputMode="numeric"
                maxLength={14}
                className="sn-input"
                placeholder="(910) 555-0100"
                value={formatPhoneDisplay(formData.phoneNumber)}
                name="phoneNumber"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="provider-radius" className="sn-label">
                Service Radius
              </label>
              <input
                id="provider-radius"
                type="number"
                min={0}
                max={999}
                className="sn-input"
                placeholder="15"
                value={formData.serviceRadius}
                name="serviceRadius"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          {error && <p className="sn-error mb-2">{error}</p>}

          <div className="flex justify-start pt-2">
            <button type="submit" className="sn-btn-secondary">
              Save Profile
            </button>
          </div>
        </form>

        <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      </div>
      <GoLiveButton goLive={readyToGoLive} />
    </div>
  )
}
export default ProfilePage
