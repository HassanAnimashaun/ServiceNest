import { useNavigate } from 'react-router-dom'
interface EmailSentProp {
  email: string
}

function EmailSent({ email }: EmailSentProp) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-page-bg flex flex-col justify-center items-center px-4">
      <div className="text-center bg-white border border-border rounded-xl p-8 w-full max-w-md">
        <h1 className="p-3 text-base font-medium text-text-primary">Check your email</h1>
        <p className="text-sm text-text-secondary">We sent a reset link to</p>
        <p className="p-2 text-base text-brand-blue font-medium">{email}</p>
        <p className="p-4 text-xs text-text-secondary">
          Didn't get it? Check your spam folder, or{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-xs text-brand-blue hover:underline cursor-pointer"
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
