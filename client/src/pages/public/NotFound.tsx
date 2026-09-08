import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center px-4">
      <div className="text-center bg-white border border-border rounded-2xl p-10 w-full max-w-md shadow-sm">
        <p className="text-6xl font-extrabold text-brand-blue leading-none mb-3">404</p>
        <h1 className="text-2xl font-bold text-text-primary mb-3">Page not found</h1>
        <p className="text-base text-text-secondary leading-relaxed mb-6">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/home" className="text-brand-blue hover:underline">
          Go to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
