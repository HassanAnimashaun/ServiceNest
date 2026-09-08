import { useNavigate } from 'react-router-dom'
interface RequestResetProp {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error?: string
}

function RequestReset({ email, setEmail, onSubmit, error }: RequestResetProp) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-page-bg flex flex-col justify-center items-center px-4">
      <div className="bg-white border border-border rounded-xl p-8 w-full max-w-md">
        <button className="sn-btn-ghost mb-2" onClick={() => navigate('/login')}>
          &larr; Back to log in
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-medium text-brand-blue tracking-tight">ServiceNest</h1>
          <p>Forgot your password?</p>
          <p className="text-sm text-text-secondary mt-1">
            Enter your email and we'll send you a link to reset it.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="login-email" className="sn-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="sn-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">{error && <p className="sn-error">{error}</p>}</div>

          <button type="submit" className="sn-btn-secondary sn-btn-full mt-5">
            Send reset link
          </button>
        </form>
      </div>
    </div>
  )
}
export default RequestReset
