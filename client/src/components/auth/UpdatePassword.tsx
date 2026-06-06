import type React from 'react'

interface UpdatePasswordProp {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setconfirmPassword: React.Dispatch<React.SetStateAction<string>>
  error?: string
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
}

function UpdatePassword({
  password,
  setPassword,
  confirmPassword,
  setconfirmPassword,
  error,
  onSubmit: _onSubmit,
}: UpdatePasswordProp) {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center px-4">
      <div className="bg-white border border-[#D3D1C7] rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-medium text-[#1A6FD4] tracking-tight">ServiceNest</h1>
          <h2 className="text-sm">Create a client account</h2>
          <p className="text-sm text-[#888780] mt-1">Must be at least 8 characters.</p>
        </div>
        <form onSubmit={_onSubmit}>
          <div className="mb-4">
            <label htmlFor="reset-new-password" className="sn-label">
              New password
            </label>
            <input
              id="reset-new-password"
              type="password"
              className="sn-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reset-confirm-password" className="sn-label">
              Confirm password
            </label>
            <input
              id="reset-confirm-password"
              type="password"
              className="sn-input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">{error && <p className="sn-error">{error}</p>}</div>
          <button type="submit" className="sn-btn-secondary sn-btn-full mt-3">
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
