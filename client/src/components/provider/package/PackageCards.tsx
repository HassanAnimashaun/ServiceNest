import { useState } from 'react'
import type { PackageType } from '@/config/types'
import { SIZE_FROM_DB } from '@/config/vehicleSizes'

interface PackageCardsProp {
  packages: PackageType[]
  onEdit: (pkg: PackageType) => void
  onDelete: (id: string) => void
}

function PackageCards({ packages, onEdit, onDelete }: PackageCardsProp) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-4 pt-4 w-fu md:grid-cols-4">
      {packages.map((pkgs) => (
        <div className="border-[#d3d1c7] rounded-xl p-6 shadow-lg" key={pkgs.id}>
          <div className="flex justify-between">
            <h1 className="text-lg">{pkgs.package_name}</h1>
            <div className="flex gap-4">
              <button className="sn-btn-ghost sn-btn-sm text-sm" onClick={() => onEdit(pkgs)}>
                Edit
              </button>
              {confirmingId === pkgs.id ? (
                <>
                  <button
                    className="sn-btn-primary sn-btn-sm text-sm"
                    onClick={() => {
                      setConfirmingId(null)
                      onDelete(pkgs.id)
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="sn-btn-danger-ghost sn-btn-sm text-sm"
                    onClick={() => setConfirmingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="sn-btn-danger-ghost sn-btn-sm text-sm"
                  onClick={() => setConfirmingId(pkgs.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          <h1 className="sn-label">{pkgs.description || '-'}</h1>

          {pkgs.package_prices.map((sizeData) => (
            <div key={sizeData.vehicle_size} className="px-2 py-4 w-full border-b border-border">
              <div className="grid grid-cols-3 items-center">
                <ul className="">
                  <li>{SIZE_FROM_DB[sizeData.vehicle_size]}</li>
                </ul>
                <p className="text-center">
                  {sizeData.duration}
                  <span className="font-bold">m</span>
                </p>
                <p className="font-bold text-right">${sizeData.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default PackageCards
