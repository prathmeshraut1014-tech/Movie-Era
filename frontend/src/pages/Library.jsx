import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Library() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        )
        if (!response.ok) throw new Error('Could not load the movie library')
        const data = await response.json()
        setMovies(data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <section className="space-y-10 pb-12">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-2">
          The collection
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Movie Library
        </h1>
        <p className="text-gray-400 text-lg">
          Browse the most watched films and find your next great watch.
        </p>
      </header>

      {loading && <Loader />}
      {error && (
        <p className="text-center text-red-400 py-16 text-lg font-medium">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Library