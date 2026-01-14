import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-8xl font-bold text-slate-900">404</h1>
        <div className="text-6xl">🔍</div>
      </div>
      
      <div className="flex flex-col items-center gap-2 max-w-md">
        <h2 className="text-2xl font-semibold text-slate-900">Page Not Found</h2>
        <p className="text-slate-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <Link 
          to="/"
          className="px-6 py-3 bg-sky-900 text-white rounded-lg font-medium hover:bg-sky-800 transition-colors"
        >
          Go Home
        </Link>
        <Link 
          to="/products"
          className="px-6 py-3 border border-sky-700 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}

export default NotFound