import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

//const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_URL = import.meta.env.VITE_API_URL;
fetch(`${API_URL}/api/movies`);

const BASE_URL = 'https://api.themoviedb.org/3'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
        )
        if (!response.ok) throw new Error('Could not load trending movies')
        const data = await response.json()
        setMovies(data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  const featured = movies[0]
  const backdrop = featured?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
    : null

  if (loading) return <Loader />
  if (error) {
    return (
      <p className="text-center text-red-400 py-20 text-lg font-medium">
        {error}
      </p>
    )
  }

  return (
    <div className="space-y-16 pb-12">
      {featured && (
        <section
          className="relative overflow-hidden rounded-3xl min-h-[420px] md:min-h-[520px] flex items-end"
          style={{
            backgroundImage: backdrop
              ? `linear-gradient(to top, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.6) 40%, rgba(3,7,18,0.3) 100%), url(${backdrop})`
              : 'linear-gradient(135deg, #1a0505 0%, #0f0f1a 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 w-full p-8 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-3">
                Your weekly watchlist
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-4">
                Stories worth
                <br />
                <em className="text-red-500 not-italic">staying up for.</em>
              </h1>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                Discover the films everyone is talking about, from timeless
                classics to this week&apos;s rising favourites.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/movie/${featured.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition shadow-lg shadow-red-900/40"
                >
                  Explore featured film <span>↗</span>
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition border border-white/20"
                >
                  Search the catalogue
                </Link>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 self-start md:self-end">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Featured tonight
              </p>
              <p className="text-white font-bold text-lg">{featured.title}</p>
              <p className="text-yellow-400 text-sm mt-1">
                ⭐ {featured.vote_average?.toFixed(1)} / 10
              </p>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-1">
              What people are watching
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Trending this week
            </h2>
          </div>
          <Link
            to="/library"
            className="text-gray-400 hover:text-red-400 transition font-medium text-sm"
          >
            View movie library →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {movies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home