import React from 'react'
import { Link } from 'react-router-dom'

import { useMovies } from 'context/MoviesContext'
import AddToFavorites from './AddToFavorites'

const MovieCard = ({ movie }) => {
  const { removeMovie } = useMovies()

  const { id, title, genre, stock, rating, poster } = movie

  return (
    <div className="flex rounded-2xl bg-blue-light">
      <div className="p-2 w-1/3 rounded-2xl bg-white/80 lg:p-4 lg:w-1/6">
        <img src={poster} alt={title} className="rounded-xl " />
      </div>
      <div className="flex flex-col justify-between p-4 w-2/3 lg:p-8 lg:w-5/6">
        <Link
          to={`/movies/${id}`}
          className="font-bold text-xl text-white whitespace-nowrap text-ellipsis overflow-hidden lg:text-5xl"
        >
          {title}
        </Link>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2 lg:gap-4">
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
          <div className="flex gap-2 self-end lg:gap-4">
            <AddToFavorites movieId={id} />
            <button onClick={() => removeMovie(id)}>
              <span className="py-1 px-2 text-base text-white rounded-full bg-red-400 lg:py-2 lg:px-3 material-symbols-rounded">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
