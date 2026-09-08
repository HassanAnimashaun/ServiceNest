import PackageEmptyState from '@/components/provider/package/PackageEmptyState'
import PackageModal from '@/components/ui/PackageModal'
import NewPackageForm from '@/components/provider/package/NewPackageForm'
import Toast from '@/components/ui/Toast'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import PackageList from '@/components/provider/package/PackageList'
import type { PackageType } from '@/config/types'
import GoLiveButton from '@/components/ui/GoLiveButton'
import type { DashboardOutletContext } from '@/config/types'
import { useOutletContext } from 'react-router-dom'

const LOAD_ERROR = "Couldn't load your packages. Please refresh and try again."

function PackagePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [packages, setPackages] = useState<PackageType[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [formKey, setFormKey] = useState(0)
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null)
  const { readyToGoLive, refreshGoLive } = useOutletContext<DashboardOutletContext>()

  const { user } = useAuth()

  const openForm = () => {
    setEditingPackage(null)
    setFormKey((key) => key + 1)
    setIsOpen(true)
  }

  const openEditForm = (pkg: PackageType) => {
    setEditingPackage(pkg)
    setFormKey((key) => key + 1)
    setIsOpen(true)
  }

  useEffect(() => {
    const loadPackages = async () => {
      if (!user) {
        return
      }
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*, package_prices(vehicle_size, duration:duration_minutes, price)')
          .eq('provider_id', user.id)
        if (error) {
          console.error(error.message)
          setError(LOAD_ERROR)
          setLoading(false)
          return
        }

        setPackages(data)
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Unknown error')
        setError(LOAD_ERROR)
      } finally {
        setLoading(false)
      }
    }
    void loadPackages()
  }, [user, refreshKey])

  const handleSaved = () => {
    setIsOpen(false)
    setToastMessage(editingPackage ? 'Package updated successfully' : 'Package saved successfully')
    setEditingPackage(null)
    setRefreshKey((key) => key + 1)

    refreshGoLive()
  }

  const handlePackageDelete = async (id: string) => {
    setError('')
    if (!user) {
      return
    }
    try {
      const { error } = await supabase.from('packages').delete().eq('id', id)

      if (error) {
        setError("Couldn't delete this package. Please try again.")
        return
      }

      setPackages(packages.filter((pkgs) => pkgs.id !== id))
      setToastMessage('Package delete successfully')
      // Deleting the last package can also take the provider back out of
      // go-live readiness, so re-check here too.
      refreshGoLive()
    } catch {
      setError("Couldn't delete this package. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full">
      {error && <p className="sn-error mb-2">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : packages.length !== 0 ? (
        <div>
          <PackageList
            packages={packages}
            onOpen={openForm}
            onEdit={openEditForm}
            onDelete={handlePackageDelete}
          />
        </div>
      ) : (
        <PackageEmptyState onOpen={openForm} />
      )}
      <PackageModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NewPackageForm
          key={formKey}
          packageToEdit={editingPackage}
          onClose={() => setIsOpen(false)}
          onSaved={handleSaved}
        />
      </PackageModal>
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      <GoLiveButton goLive={readyToGoLive} />
    </div>
  )
}
export default PackagePage
