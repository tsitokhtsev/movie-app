import React, { useState } from 'react'

import MovieFilter from 'component/MovieFilter'
import MovieCard from 'component/MovieCard'
import PaginationControls from 'component/PaginationControls'
import { useMovies } from 'context/MoviesContext'

const MovieList = () => {
  const { movies, currentGenre } = useMovies()

  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage, setMoviesPerPage] = useState(5)
  const [moviesPerPageOptions] = useState([5, 10, 20, 30])

  const filterMovies = () => {
    return movies.filter((movie) => (currentGenre === 'All' ? true : movie.genre === currentGenre))
  }

  const paginateMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage
    return filterMovies().slice(startIndex, startIndex + moviesPerPage)
  }

  const handleMoviesPerPageChange = (e) => {
    setMoviesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const renderPaginationSelector = () => {
    return (
      <div className='flex items-center'>
        <select
          className="py-2 pr-2 pl-4 appearance-none text-white rounded-xl bg-white/50"
          value={moviesPerPage}
          onChange={handleMoviesPerPageChange}
        >
          {moviesPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span class="text-white material-symbols-rounded">expand_more</span>
      </div>
    )
  }

  return (
    <>
      <MovieFilter setCurrentPage={setCurrentPage} />
      <div className="flex justify-between items-center">
        <span className="text-4xl text-white">{filterMovies().length} movies</span>
        {renderPaginationSelector()}
      </div>
      <div className="flex flex-col gap-8">
        {paginateMovies().map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <PaginationControls
        totalMovies={filterMovies().length}
        currentPage={currentPage}
        moviesPerPage={moviesPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default MovieList
