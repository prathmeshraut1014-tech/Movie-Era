import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original'

function MovieDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFav, setIsFav] = useState(false)
  const [favLoading, setFavLoading] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
        if (!res.ok) throw new Error('Movie not found')
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  useEffect(() => {
    if (isAuthenticated && id) {
      api
        .get(`/favorites/check/${id}`)
        .then((res) => setIsFav(res.data.isFavorite))
        .catch(() => {})
    }
  }, [isAuthenticated, id])

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Please login to save favorites')
      return
    }
    setFavLoading(true)
    try {
      if (isFav) {
        await api.delete(`/favorites/${id}`)
        setIsFav(false)
      } else {
        await api.post('/favorites', {
          tmdbId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        })
        setIsFav(true)
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed'
      if (msg.includes('Already')) setIsFav(true)
      else alert(msg)
    } finally {
      setFavLoading(false)
    }
  }

  if (loading) return <Loader />
  if (error) {
    return (
      <p className="text-center text-red-400 py-20 text-lg font-medium">
        {error}
      </p>
    )
  }
  if (!movie) return null

  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE}${movie.backdrop_path}`
    : null

  return (
    <div className="pb-12">
      <Link
        to="/library"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition text-sm font-medium"
      >
        ← Back to Library
      </Link>

      {backdrop && (
        <div className="relative h-56 md:h-80 rounded-3xl overflow-hidden mb-10">
          <img
            src={backdrop}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={poster}
            alt={movie.title}
            className="w-56 md:w-64 rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-gray-400 italic text-lg mb-5">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <span className="bg-red-600/20 text-red-400 px-3.5 py-1.5 rounded-full font-medium border border-red-500/20">
              ⭐ {movie.vote_average?.toFixed(1)} / 10
            </span>
            <span className="bg-gray-800 text-gray-300 px-3.5 py-1.5 rounded-full border border-gray-700">
              {movie.release_date}
            </span>
            <span className="bg-gray-800 text-gray-300 px-3.5 py-1.5 rounded-full border border-gray-700">
              {movie.runtime} min
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-800/80 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl">
            {movie.overview || 'No overview available.'}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={toggleFavorite}
              disabled={favLoading}
              className={`px-6 py-3 rounded-xl font-semibold transition shadow-lg active:scale-95 disabled:opacity-60 ${
                isFav
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/40'
                  : 'bg-gray-800 hover:bg-red-600 text-white border border-gray-700'
              }`}
            >
              {favLoading
                ? '…'
                : isFav
                  ? '❤️ Remove Favorite'
                  : '🤍 Add to Favorites'}
            </button>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition border border-gray-700"
              >
                Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail