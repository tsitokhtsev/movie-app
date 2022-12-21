import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AddToFavorites from 'component/AddToFavorites'
import { useMovies } from 'context/MoviesContext'

const MovieDetails = () => {
  const { movies, removeMovie } = useMovies()

  const { movieId } = useParams()

  const [movie, setMovie] = useState()

  useEffect(() => {
    const movie = movies.find((movie) => movie.id === Number(movieId))
    setMovie(movie)
  }, [movies, movieId])

  if (!movie) return null

  const { id, title, genre, stock, rating, poster } = movie

  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-8">
      <div className="p-2 rounded-2xl bg-white/80 lg:p-4 lg:w-1/2">
        <img src={poster} alt={title} className="rounded-xl " />
      </div>
      <div className="flex flex-col items-center gap-4 lg:items-start lg:gap-4 lg:p-8 lg:w-1/2">
        <h1 className="font-bold text-xl text-white whitespace-nowrap text-ellipsis overflow-hidden lg:text-5xl">
          {title}
        </h1>
        <div className="flex gap-4 lg:flex-col">
          <p className="flex items-center gap-2 text-white">
            <span className="material-symbols-rounded">theater_comedy</span>
            <span className="hidden font-bold lg:block">Genre: </span>
            {genre}
          </p>
          <p className="flex items-center gap-2 text-white">
            <span className="material-symbols-rounded">inventory_2</span>
            <span className="hidden font-bold lg:block">Stock: </span>
            {stock}
          </p>
          <p className="flex items-center gap-2 text-white">
            <span className="material-symbols-rounded">star</span>
            <span className="hidden font-bold lg:block">Rating: </span>
            {rating}
          </p>
        </div>
        <div className="flex gap-2 lg:gap-4">
          <AddToFavorites movieId={id} />
          <button
            className="flex items-center gap-2 py-1 px-2 text-base text-white rounded-full bg-red-400 lg:py-2 lg:px-3"
            onClick={() => removeMovie(id)}
          >
            <span className="material-symbols-rounded">delete</span>
            <span>Remove Movie</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
