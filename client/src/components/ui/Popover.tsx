import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

interface PopoverProp {
  isOpen: boolean
  onClose: () => void
}

function Popover({ isOpen, onClose }: PopoverProp) {
  const { signOut } = useAuth()

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('click', onClose)
    return () => {
      document.removeEventListener('click', onClose)
    }
  }, [isOpen, onClose])

  const handleSignOut = async () => {
    onClose()
    await signOut()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="absolute right-4 bg-white border border-border rounded-xl p-2 max-w-md">
      <button onClick={handleSignOut} className="sn-btn-danger sn-btn-full">
        SignOut
      </button>
    </div>
  )
}
export default Popover
