import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import Loader from '../components/Loader'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(Boolean(searchParams.get('q')))
  const [error, setError] = useState(null)

  useEffect(() => {
    const initialQuery = searchParams.get('q') || ''
    setQuery(initialQuery)
    if (initialQuery) fetchMovies(initialQuery)
  }, [searchParams])

  const fetchMovies = async (searchQuery) => {
    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
      )
      if (!response.ok) throw new Error('Search is unavailable right now')
      const data = await response.json()
      setMovies(data.results || [])
    } catch (err) {
      setError(err.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const value = query.trim()
    if (!value) {
      setMovies([])
      setSearched(false)
      setSearchParams({})
      return
    }
    setSearchParams({ q: value })
  }

  return (
    <section className="space-y-10 pb-12">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Find your next story
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Search Movies
        </h1>
        <p className="text-gray-400 text-lg">
          Search the TMDB catalogue by title, character, or idea.
        </p>
      </header>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {loading && <Loader />}
      {error && (
        <p className="text-center text-red-400 py-12 text-lg font-medium">
          {error}
        </p>
      )}
      {!loading && !error && searched && movies.length === 0 && (
        <p className="text-center text-gray-400 py-12 text-lg">
          No movies found. Try a different search.
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-1">
                Results
              </p>
              <h2 className="text-2xl font-bold text-white">
                Matches for &ldquo;{searchParams.get('q')}&rdquo;
              </h2>
            </div>
            <span className="text-gray-500 text-sm font-medium">
              {movies.length} titles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Search