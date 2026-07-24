import type { SizeData, VehicleSize } from '@/config/types'

interface VehicleSizeRowProp {
  size: VehicleSize
  data: SizeData
  onChange: (size: VehicleSize, newData: SizeData) => void
}

function VehicleSizeRow({ size, data, onChange }: VehicleSizeRowProp) {
  const [sedanDuration, setSedanDuration] = useState(false)
  return (
    <div className="flex flex-col gap-2 border rounded-xl p-2 ">
      <label htmlFor="">{size}</label>
      <label htmlFor="" className="sn-label">
        Duration
      </label>
      <div className="flex gap-2">
        <button
          className="sn-btn-pill"
          onClick={() => onChange(size, { duration: 60, price: data.price })}
        >
          60m
        </button>
        <button
          className="sn-btn-pill"
          onClick={() => onChange(size, { duration: 90, price: data.price })}
        >
          90m
        </button>
        <button
          className="sn-btn-pill"
          onClick={() => onChange(size, { duration: 120, price: data.price })}
        >
          120m
        </button>
        <button
          className="sn-btn-pill"
          onClick={() => onChange(size, { duration: 180, price: data.price })}
        >
          180m
        </button>
      </div>
      <label htmlFor="" className="sn-label">
        Price
      </label>
      <input
        type="number"
        value={data.price ?? ''}
        onChange={(e) => onChange(size, { duration: data.duration, price: Number(e.target.value) })}
        className="border rounded h-"
      />
    </div>
  )
}

export default VehicleSizeRow
