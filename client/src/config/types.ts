export type SizeData = {
  duration: number | undefined
  price: number | undefined
  vehicle_size: VehicleSize
}
export type VehicleSize = 'Sedan' | 'Suv' | 'Truck' | 'Van' | 'Oversized'

export type VehicleSizeDb = Lowercase<VehicleSize>

export type PackageSizes = Record<VehicleSize, SizeData>

export type PackagePriceRow = {
  vehicle_size: VehicleSizeDb
  duration: number | null
  price: number | null
}

export type PackageType = {
  id: string
  provider_id: string
  package_name: string
  package_prices: PackagePriceRow[]
  description: string | null
  created_at: string
  updated_at: string
}

export type DashboardOutletContext = {
  readyToGoLive: boolean
  refreshGoLive: () => void
}
