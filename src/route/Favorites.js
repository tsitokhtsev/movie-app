import React from 'react'

import MovieCard from 'component/MovieCard'
import { useMovies } from 'context/MoviesContext'

const Favorites = () => {
  const { movies, currentUser } = useMovies()

  const renderFavorites = () => {
    if (currentUser.favorites.length === 0) {
      return <div className='text-white'>You have no favorites</div>
    } else {
      return currentUser.favorites
        .map((movieId) => movies.find((movie) => movie.id === movieId))
        .map((movie) => {
          return movie && <MovieCard key={movie.id} movie={movie} />
        })
    }
  }

  if (!movies.length || !currentUser) {
    return <div className='text-white'>You must be logged in to view your favorites</div>
  }

  return (
    <>
      <h1 className='text-4xl text-white'>Favorites</h1>
      {renderFavorites()}
    </>
  )
}

export default Favorites
