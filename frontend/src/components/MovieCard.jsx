import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie, isFavoritePage = false, onRemove }) {
  const { isAuthenticated } = useAuth()
  const [favLoading, setFavLoading] = useState(false)
  const [isFav, setIsFav] = useState(isFavoritePage)

  const posterPath = movie.poster_path || movie.posterPath
  const poster = posterPath
    ? `${IMAGE_BASE}${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  const title = movie.title
  const year = (movie.release_date || movie.releaseDate)?.slice(0, 4) || 'N/A'
  const rating = movie.vote_average ?? movie.voteAverage
  const tmdbId = movie.id || movie.tmdbId

  const toggleFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      alert('Please login to save favorites')
      return
    }
    setFavLoading(true)
    try {
      if (isFav || isFavoritePage) {
        await api.delete(`/favorites/${tmdbId}`)
        setIsFav(false)
        if (onRemove) onRemove(tmdbId)
      } else {
        await api.post('/favorites', {
          tmdbId,
          title,
          posterPath: movie.poster_path || movie.posterPath,
          releaseDate: movie.release_date || movie.releaseDate,
          voteAverage: rating,
        })
        setIsFav(true)
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update favorite'
      if (msg.includes('Already')) setIsFav(true)
      else alert(msg)
    } finally {
      setFavLoading(false)
    }
  }

  return (
    <div className="group relative">
      <Link to={`/movie/${tmdbId}`}>
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800
                        hover:shadow-red-500/15 hover:-translate-y-1.5 hover:border-red-500/30
                        transition-all duration-300">
          <div className="aspect-[2/3] overflow-hidden relative">
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
          </div>

          <div className="p-3.5">
            <h3 className="font-semibold text-white text-[15px] line-clamp-1 group-hover:text-red-400 transition">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-1.5 text-xs text-gray-400">
              <span>{year}</span>
              <span className="flex items-center gap-1 text-yellow-400/90">
                ⭐ {rating != null ? Number(rating).toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={toggleFavorite}
        disabled={favLoading}
        className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center
                    shadow-lg transition active:scale-90 text-sm
                    ${
                      isFav || isFavoritePage
                        ? 'bg-red-600 text-white'
                        : 'bg-black/70 text-white hover:bg-red-600 backdrop-blur-sm'
                    }`}
        title={isFav || isFavoritePage ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favLoading ? '…' : isFav || isFavoritePage ? '❤️' : '🤍'}
      </button>
    </div>
  )
}

export default MovieCard