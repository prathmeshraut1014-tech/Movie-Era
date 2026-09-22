import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import api from '../services/api'

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get('/favorites')
      .then((res) => {
        setFavorites(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load favorites')
        setLoading(false)
      })
  }, [])

  const handleRemove = (tmdbId) => {
    setFavorites((prev) => prev.filter((f) => f.tmdbId !== tmdbId))
  }

  if (loading) return <Loader />
  if (error) {
    return (
      <p className="text-center text-red-400 py-20 text-lg font-medium">
        {error}
      </p>
    )
  }

  return (
    <section className="space-y-10 pb-12">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Your collection
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          ❤️ My Favorites
        </h1>
        <p className="text-gray-400 text-lg">
          Movies you have saved for later
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-3xl border border-gray-800">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-gray-400 text-lg mb-6">No favorites yet</p>
          <Link
            to="/library"
            className="inline-block px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition shadow-lg shadow-red-900/30"
          >
            Browse Movie Library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((fav) => (
            <MovieCard
              key={fav.id}
              movie={fav}
              isFavoritePage={true}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites