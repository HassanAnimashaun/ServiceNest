import { useRef, type ReactNode, useEffect } from 'react'

interface PackageModalProp {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

function PackageModal({ isOpen, onClose, children }: PackageModalProp) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog === null) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl rounded-2xl p-5 shadow-xl backdrop:bg-black/40"
    >
      {children}
    </dialog>
  )
}

export default PackageModal
