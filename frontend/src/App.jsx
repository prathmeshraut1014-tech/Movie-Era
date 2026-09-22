import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Library from './pages/Library'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetails'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import { useAuth } from './context/AuthContext'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-gray-900 mt-auto py-8 text-center text-gray-600 text-sm">
        <p>🎬 MovieEra — Discover & save your favourite films</p>
      </footer>
    </div>
  )
}

export default App