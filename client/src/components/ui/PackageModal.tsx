import { useRef, type ReactNode, useEffect } from 'react'

interface PackageModalProp {
  isOpen: boolean
  children: ReactNode
}

function PackageModal({ isOpen, children }: PackageModalProp) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (isOpen && dialog !== null) {
      dialog.showModal()
    } else if (dialog !== null) {
      dialog.close()
    }
  }, [isOpen])
  return (
    <>
      <dialog
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl p-5 shadow-xl backdrop:bg-black/40"
      >
        {children}
      </dialog>
    </>
  )
}

export default PackageModal
