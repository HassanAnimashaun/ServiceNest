import type React from 'react'

interface UpdatePasswordProp {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  error?: string
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
}

function UpdatePassword({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  onSubmit: _onSubmit,
}: UpdatePasswordProp) {
  return (
    <div className="min-h-screen bg-page-bg flex flex-col justify-center items-center px-4">
      <div className="bg-white border border-border rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-medium text-brand-blue tracking-tight">ServiceNest</h1>
          <h2 className="text-sm">Set a new password</h2>
          <p className="text-sm text-text-secondary mt-1">Must be at least 8 characters.</p>
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
              required
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
