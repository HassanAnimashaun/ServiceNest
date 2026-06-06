import { useNavigate } from 'react-router-dom'
interface requestResetProp {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error?: string
}

function RequestReset({ email, setEmail, onSubmit: _onSubmit, error }: requestResetProp) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center px-4">
      <div className="bg-white border border-[#D3D1C7] rounded-xl p-8 w-full max-w-md">
        <button className="sn-btn-ghost mb-2" onClick={() => navigate('/login')}>
          &larr; Back to log in
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-medium text-[#1A6FD4] tracking-tight">ServiceNest</h1>
          <p>Forgot your password?</p>
          <p className="text-sm text-[#888780] mt-1">
            Enter your email and we'll send you a link to reset it.
          </p>
        </div>

        <form onSubmit={_onSubmit}>
          <div>
            <label
              htmlFor="login-email"
              className="block text-base pb-2 font-medium text-[#5F5E5A]"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="w-full h-10 px-3 rounded-lg border border-[#D3D1C7] text-base text-[#2C2C2A] bg-white outline-none focus:border-[#1A6FD4] focus:ring-2 focus:ring-[#B5D4F4]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
