export type SizeData = {
  duration: number | undefined
  price: number | undefined
}
export type VehicleSize = 'Sedan' | 'Suv' | 'Truck' | 'Van' | 'Oversized'

export type PackageSizes = Record<VehicleSize, SizeData>
