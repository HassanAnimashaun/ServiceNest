import PackageEmptyState from '@/components/provider/package/PackageEmptyState'
import PackageModal from '@/components/ui/PackageModal'
import NewPackageForm from '@/components/provider/package/NewPackageForm'
import { useState } from 'react'

function PackagePage() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <PackageEmptyState onOpen={() => setIsOpen(true)} />
      <PackageModal isOpen={isOpen}>
        <NewPackageForm onClose={() => setIsOpen(false)} />
      </PackageModal>
    </>
  )
}
export default PackagePage
