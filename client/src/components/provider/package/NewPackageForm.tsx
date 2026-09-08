import React, { useState } from 'react'
import VehicleSizeRow from './VehicleSizeRow'
import type { SizeData, VehicleSize, PackageSizes, PackageType } from '@/config/types'
import { VEHICLE_SIZES, SIZE_TO_DB, SIZE_FROM_DB } from '@/config/vehicleSizes'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'

interface NewPackageFormProp {
  onClose: () => void
  onSaved: () => void
  packageToEdit?: PackageType | null
}

const SAVE_ERROR = "Couldn't save this package. Please try again."

const emptySizes = (): PackageSizes => ({
  Sedan: { vehicle_size: 'Sedan', duration: undefined, price: undefined },
  Suv: { vehicle_size: 'Suv', duration: undefined, price: undefined },
  Truck: { vehicle_size: 'Truck', duration: undefined, price: undefined },
  Van: { vehicle_size: 'Van', duration: undefined, price: undefined },
  Oversized: { vehicle_size: 'Oversized', duration: undefined, price: undefined },
})

const sizesFromPackage = (pkg: PackageType): PackageSizes => {
  const sizes = emptySizes()
  for (const row of pkg.package_prices) {
    const size = SIZE_FROM_DB[row.vehicle_size]
    if (!size) continue
    sizes[size] = {
      vehicle_size: size,
      duration: row.duration ?? undefined,
      price: row.price ?? undefined,
    }
  }
  return sizes
}

function NewPackageForm({ onClose, onSaved, packageToEdit }: NewPackageFormProp) {
  const [packageName, setPackageName] = useState(packageToEdit?.package_name ?? '')
  const [description, setDescription] = useState(packageToEdit?.description ?? '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sizeData, setSizeData] = useState<PackageSizes>(
    packageToEdit ? sizesFromPackage(packageToEdit) : emptySizes()
  )
  const { user } = useAuth()

  function handleSizeChange(size: VehicleSize, newData: SizeData) {
    setSizeData((prev) => ({
      ...prev,
      [size]: newData,
    }))
  }
  const hasCompleteRow = VEHICLE_SIZES.some((size) => {
    return sizeData[size].duration !== undefined && sizeData[size].price !== undefined
  })

  const packageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!user) {
      setError(SAVE_ERROR)
      return
    }

    setSubmitting(true)

    const pricedSizes = VEHICLE_SIZES.flatMap((size) => {
      const { duration, price } = sizeData[size]
      if (duration === undefined || price === undefined) return []
      return [{ vehicle_size: SIZE_TO_DB[size], price, duration_minutes: duration }]
    })

    try {
      if (packageToEdit) {
        const { error: updateError } = await supabase
          .from('packages')
          .update({ package_name: packageName, description })
          .eq('id', packageToEdit.id)

        if (updateError) {
          console.error(updateError.message)
          setError(SAVE_ERROR)
          return
        }

        const { error: priceError } = await supabase.from('package_prices').upsert(
          pricedSizes.map((size) => ({ ...size, package_id: packageToEdit.id })),
          { onConflict: 'package_id,vehicle_size' }
        )

        if (priceError) {
          console.error(priceError.message)
          setError(SAVE_ERROR)
          return
        }

        const keptSizes = pricedSizes.map((size) => size.vehicle_size).join(',')
        const { error: cleanupError } = await supabase
          .from('package_prices')
          .delete()
          .eq('package_id', packageToEdit.id)
          .not('vehicle_size', 'in', `(${keptSizes})`)

        if (cleanupError) {
          console.error(cleanupError.message)
          setError(SAVE_ERROR)
          return
        }
      } else {
        const { data, error } = await supabase
          .from('packages')
          .insert({ provider_id: user.id, package_name: packageName, description })
          .select()
          .single()

        if (error) {
          console.error(error.message)
          setError(SAVE_ERROR)
          return
        }

        const { error: priceError } = await supabase
          .from('package_prices')
          .insert(pricedSizes.map((size) => ({ ...size, package_id: data.id })))

        if (priceError) {
          console.error(priceError.message)
          const { error: rollbackError } = await supabase
            .from('packages')
            .delete()
            .eq('id', data.id)

          if (rollbackError) {
            console.error(
              `Rollback failed, package ${data.id} has no prices`,
              rollbackError.message
            )
          }
          setError(SAVE_ERROR)
          return
        }
      }

      onSaved()
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
      setError(SAVE_ERROR)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <h2 className="text-xl font-semibold text-text-primary">
        {packageToEdit ? 'Edit package' : 'Create package'}
      </h2>

      <form onSubmit={packageSubmit}>
        <div className="flex flex-col gap-2 pb-4 w-full ">
          <div>
            <label htmlFor="package-name" className="sn-label">
              Package name
            </label>
            <input
              id="package-name"
              type="text"
              className="sn-input"
              placeholder="e.g. Full interior detail"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="package-desc" className="sn-label">
              Description
            </label>
            <textarea
              id="package-desc"
              className="sn-input max-h-80"
              rows={4}
              placeholder="What's included in this package"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {VEHICLE_SIZES.map((size) => (
            <VehicleSizeRow
              key={size}
              size={size}
              data={sizeData[size]}
              onChange={handleSizeChange}
            />
          ))}
        </div>
        <div className="mb-3">{error && <p className="sn-error">{error}</p>}</div>
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            className="sn-btn-primary sn-btn-full"
            type="submit"
            disabled={!hasCompleteRow || submitting}
          >
            {submitting ? 'Saving...' : packageToEdit ? 'Update package' : 'Save package'}
          </button>

          <button className="sn-btn-secondary sn-btn-full" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
export default NewPackageForm
