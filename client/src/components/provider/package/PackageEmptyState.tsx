import { IconBox } from '@tabler/icons-react'
interface PackageEmptyStateProp {
  onOpen: () => void
}

function PackageEmptyState({ onOpen }: PackageEmptyStateProp) {
  return (
    <div className="bg-page-bg border border-border rounded-xl mx-auto p-8 w-full max-w-md flex flex-col items-center gap-3 text-center">
      <IconBox size={40} className="text-text-secondary" />
      <h1 className="text-lg font-semibold text-text-primary">No packages yet</h1>
      <p className="text-sm text-text-secondary">Add at least one package to go live</p>
      <button onClick={onOpen} className="sn-btn-primary mt-1">
        Add package
      </button>
    </div>
  )
}

export default PackageEmptyState
