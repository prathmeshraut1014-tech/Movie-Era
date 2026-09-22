import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await register(email, password, name)
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-800">
          <div className="text-center mb-6">
            <span className="text-5xl">🎬</span>
          </div>

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-center text-gray-400 mb-8">
            {isRegister
              ? 'Join MovieEra to save your favorites'
              : 'Login to access your favorites'}
          </p>

          {error && (
            <div className="bg-red-600/15 text-red-400 px-4 py-3 rounded-xl mb-6 text-center text-sm border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                             text-white placeholder-gray-500 transition"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           text-white placeholder-gray-500 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                           text-white placeholder-gray-500 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold 
                         transition shadow-lg shadow-red-900/30 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-7 text-sm">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
              className="text-red-400 hover:text-red-300 font-semibold transition"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>

          <p className="text-center mt-5">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-300 text-sm transition"
            >
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login