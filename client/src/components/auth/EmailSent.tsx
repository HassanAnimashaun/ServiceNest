import { useNavigate } from 'react-router-dom'
interface EmailSentProp {
  email: string
}

function EmailSent({ email }: EmailSentProp) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center px-4">
      <div className="text-center bg-white border border-[#D3D1C7] rounded-xl p-8 w-full max-w-md">
        <h1 className="p-3 text-base font-medium text-[#2C2C2A]">Check your email</h1>
        <p className="text-sm text-[#888780]">We sent a reset link to</p>
        <p className="p-2 text-base text-[#1A6FD4] font-medium">{email}</p>
        <p className="p-4 text-xs text-[#888780]">
          Didn't get it? Check your spam folder, or{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-xs text-[#1A6FD4] hover:underline cursor-pointer"
          >
            try again
          </span>{' '}
          with a different address.
        </p>
        <div className="flex justify-center m-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="sn-btn-secondary sn-btn-full"
          >
            Back to log in
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailSent
