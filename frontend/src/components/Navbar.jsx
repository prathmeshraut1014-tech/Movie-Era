import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path
        ? 'text-red-400'
        : 'text-gray-400 hover:text-white'
    }`

  return (
    <nav className="bg-gray-950/90 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-red-500 hover:text-red-400 transition tracking-tight"
        >
          🎬 MovieEra
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          <Link to="/" className={linkClass('/')}>
            Home
          </Link>
          <Link to="/library" className={linkClass('/library')}>
            Library
          </Link>
          <Link to="/search" className={linkClass('/search')}>
            Search
          </Link>

          {isAuthenticated && (
            <Link to="/favorites" className={linkClass('/favorites')}>
              ❤️ Favorites
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm hidden sm:inline">
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition border border-gray-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold transition shadow-md shadow-red-900/30"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar