import { useEffect } from 'react'
import { IconCircleCheck } from '@tabler/icons-react'

interface ToastProps {
  message: string | null
  onDismiss: () => void
  duration?: number
}

function Toast({ message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [message, onDismiss, duration])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 right-4 z-[60] flex items-center gap-2 bg-white border border-border rounded-lg shadow-lg px-4 py-3 sn-noti"
    >
      <IconCircleCheck size={20} className="shrink-0" />
      {message}
    </div>
  )
}

export default Toast
