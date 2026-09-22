function SearchBar({ query, setQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 px-5 py-3.5 rounded-2xl bg-gray-900 border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                     text-white placeholder-gray-500 transition shadow-inner"
        />
        <button
          type="submit"
          className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-semibold 
                     transition shadow-lg shadow-red-900/30 active:scale-95"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar