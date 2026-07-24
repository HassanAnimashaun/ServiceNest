function UnauthorizedUser() {
  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center px-4">
      <div className="text-center bg-white border border-border rounded-2xl p-10 w-full max-w-md shadow-sm">
        <p className="text-6xl font-extrabold text-red-500 leading-none mb-3">401</p>
        <h1 className="text-2xl font-bold text-text-primary mb-3">Unauthorized</h1>
        <p className="text-base text-text-secondary leading-relaxed">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  )
}

export default UnauthorizedUser
