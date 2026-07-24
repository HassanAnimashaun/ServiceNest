import React, { useState } from 'react'
import VehicleSizeRow from './VehicleSizeRow'
import type { SizeData, VehicleSize, PackageSizes } from '@/config/types'

interface NewPackageFormProp {
  onClose: () => void
}

function NewPackageForm({ onClose }: NewPackageFormProp) {
  const initialSizes: PackageSizes = {
    Sedan: { duration: undefined, price: undefined },
    Suv: { duration: undefined, price: undefined },
    Truck: { duration: undefined, price: undefined },
    Van: { duration: undefined, price: undefined },
    Oversized: { duration: undefined, price: undefined },
  }

  const [packageName, setPackageName] = useState('')
  const [description, setDescription] = useState('')
  const [sizeData, setSizeData] = useState<PackageSizes>(initialSizes)
  const sizes: VehicleSize[] = ['Sedan', 'Suv', 'Truck', 'Van', 'Oversized']
  function handleSizeChange(size: VehicleSize, newData: SizeData) {
    setSizeData((prev) => ({
      ...prev,
      [size]: newData,
    }))
  }
  const hasCompleteRow = sizes.some((size) => {
    return sizeData[size].duration !== undefined && sizeData[size].price !== undefined
  })

  const packageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('done')
    return
  }
  return (
    <>
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-text-primary">Create package</h2>
      </div>

      <form onSubmit={packageSubmit}>
        <div className="flex flex-col gap-2 pb-4 h-150 overflow-auto">
          <div>
            <label htmlFor="client-first-name" className="sn-label">
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
            <label htmlFor="client-first-name" className="sn-label">
              Description
            </label>
            <textarea
              id="package-desc"
              className="sn-input max-w max-h-80"
              rows={4}
              placeholder="What's included in this package"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {sizes.map((size) => (
            <VehicleSizeRow
              key={size}
              size={size}
              data={sizeData[size]}
              onChange={handleSizeChange}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 ">
          <button className="sn-btn-primary sn-btn-full" type="submit" disabled={!hasCompleteRow}>
            Save package
          </button>

          <button className="sn-btn-secondary sn-btn-full" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
export default NewPackageForm
