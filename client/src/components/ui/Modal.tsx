import { useRef, type ReactNode, type MouseEvent } from 'react'

interface ModalProps {
  trigger: ReactNode
  triggerClassName?: string
  children: ReactNode
}

function Modal({ trigger, triggerClassName, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <>
      <button
        className={`sn-btn-secondary ${triggerClassName}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl p-5 shadow-xl backdrop:bg-black/40"
      >
        {children}
        <div className="flex justify-evenly mt-4">
          <p className="text-sm text-[#888780] mb-4">
            Already have an account?{' '}
            <span
              onClick={() => dialogRef.current?.close()}
              className="text-base text-[#1A6FD4] hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
        <button
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
          className="absolute top-2 right-4 border-[#D3D1C7] sn-btn-ghost sn-btn-icon"
        >
          ✕
        </button>
      </dialog>
    </>
  )
}

export default Modal
