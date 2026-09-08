import type { VehicleSize, VehicleSizeDb } from '@/config/types'

export const VEHICLE_SIZES: VehicleSize[] = ['Sedan', 'Suv', 'Truck', 'Van', 'Oversized']

export const SIZE_TO_DB: Record<VehicleSize, VehicleSizeDb> = {
  Sedan: 'sedan',
  Suv: 'suv',
  Truck: 'truck',
  Van: 'van',
  Oversized: 'oversized',
}

export const SIZE_FROM_DB: Record<VehicleSizeDb, VehicleSize> = {
  sedan: 'Sedan',
  suv: 'Suv',
  truck: 'Truck',
  van: 'Van',
  oversized: 'Oversized',
}
