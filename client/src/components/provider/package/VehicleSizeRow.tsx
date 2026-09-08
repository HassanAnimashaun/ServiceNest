import type { SizeData, VehicleSize } from '@/config/types'

interface VehicleSizeRowProp {
  size: VehicleSize
  data: SizeData
  onChange: (size: VehicleSize, newData: SizeData) => void
}

const DURATIONS = [60, 90, 120, 180]

function VehicleSizeRow({ size, data, onChange }: VehicleSizeRowProp) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_100px] items-start md:items-center gap-2 md:gap-6 px-2 md:px-6 py-3 md:py-2 border-b border-border">
      <div>
        <label>{size}</label>
      </div>

      <div className="flex flex-nowrap gap-2">
        {DURATIONS.map((duration) => (
          <button
            key={duration}
            type="button"
            className={`sn-btn-pill ${data.duration === duration ? 'active' : ''}`}
            onClick={() => {
              onChange(size, {
                duration: data.duration === duration ? undefined : duration,
                price: data.price,
                vehicle_size: size,
              })
            }}
          >
            {duration}m
          </button>
        ))}
      </div>

      <div className="relative w-24">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
        <input
          type="number"
          min={0}
          max={9999}
          value={data.price ?? ''}
          onChange={(e) => {
            onChange(size, {
              duration: data.duration,
              price: e.target.value === '' ? undefined : Number(e.target.value),
              vehicle_size: size,
            })
          }}
          className="border rounded pl-6 w-full"
        />
      </div>
    </div>
  )
}

export default VehicleSizeRow
