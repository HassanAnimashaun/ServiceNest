import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

interface PopoverProp {
  isOpen: boolean
  onClose: () => void
}

function Popover({ isOpen, onClose }: PopoverProp) {
  const { signOut } = useAuth()
  useEffect(() => {
    document.addEventListener('click', onClose)
    return () => {
      document.removeEventListener('click', onClose)
    }
  }, [])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="absolute right-4 bg-white border border-[#D3D1C7] rounded-xl p-2 max-w-md">
        <button
          onClick={() => {
            onClose()
            signOut()
          }}
          className="sn-btn-danger sn-btn-full"
        >
          SignOut
        </button>
      </div>
    </>
  )
}
export default Popover
