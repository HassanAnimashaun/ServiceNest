import type { SizeData, VehicleSize } from '@/config/types'
import { useState } from 'react'

interface VehicleSizeRowProp {
  size: VehicleSize
  data: SizeData
  onChange: (size: VehicleSize, newData: SizeData) => void
}

function VehicleSizeRow({ size, data, onChange }: VehicleSizeRowProp) {
  const [duration, setDuration] = useState<null | number>(null)

  return (
    <div className="flex flex-col gap-2 border rounded-xl p-2 ">
      <label htmlFor="">{size}</label>
      <label htmlFor="" className="sn-label">
        Duration
      </label>
      <div className="flex gap-4">
        <button
          className={`sn-btn-pill ${duration === 60 ? " active" : ""}`}
          onClick={() => {
            setDuration(duration === 60 ? null : 60)
            onChange(size, { duration: 60, price: data.price })
          }
          }
        >
          60m
        </button>
        <button
          className={`sn-btn-pill ${duration === 90 ? "active" : ""}`}
          onClick={() => {
            setDuration(duration === 90 ? null : 90)
            onChange(size, { duration: 90, price: data.price })
          }}
        >
          90m
        </button>
        <button
          className={`sn-btn-pill ${duration === 120 ? " active" : ""}`}
          onClick={() => {
            setDuration(duration === 120 ? null : 120 )
            onChange(size, { duration: 120, price: data.price })
          }}
        >
          120m
        </button>
        <button
          className={`sn-btn-pill ${duration === 180 ? " active" : ""}`}
          onClick={() => {
            setDuration(duration === 180 ? null : 180 )
            onChange(size, { duration: 180, price: data.price })
          }}
        >
          180m
        </button>
      </div>
      <label htmlFor="" className="sn-label">
        Price
      </label>
        <input
          type="number"
          value={data.price}
          onChange={(e) => {
            onChange(size, { duration: data.duration, price: Number(e.target.value) })
          }}
          className="border rounded"
        />
    </div>
  )
}

export default VehicleSizeRow
