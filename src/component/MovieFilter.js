import React from 'react'

import { useMovies } from 'context/MoviesContext'

const MovieFilter = ({setCurrentPage}) => {
  const { genres, currentGenre, setCurrentGenre } = useMovies()

  const handleGenreChange = (genre) => {
    setCurrentGenre(genre)
    setCurrentPage(1)
  }

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`px-4 py-1 rounded-full text-white hover:bg-white/40 ${
            currentGenre === genre ? 'bg-white/50' : 'bg-white/20'
          }`}
          onClick={() => handleGenreChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default MovieFilter
