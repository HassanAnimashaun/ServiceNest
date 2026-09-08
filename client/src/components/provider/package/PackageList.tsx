import PackageCards from './PackageCards'
import type { PackageType } from '@/config/types'
import { navItems } from '@/config/nav'

interface PackageListProp {
  onOpen: () => void
  onEdit: (pkg: PackageType) => void
  onDelete: (id: string) => void
  packages: PackageType[]
}

function PackageList({ onOpen, packages, onEdit, onDelete }: PackageListProp) {
  const packageNavItem = navItems.find((item) => item.label === 'Package')
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="font-bold">{packageNavItem?.label}</h1>
        <button onClick={onOpen} className="sn-btn-primary">
          Add package
        </button>
      </div>
      <PackageCards packages={packages} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}

export default PackageList
