import React from 'react'

import { useMovies } from 'context/MoviesContext'

const AddToFavorites = ({ movieId }) => {
  const { currentUser, addToFavorites, removeFromFavorites } = useMovies()

  if (!currentUser) return null

  if (currentUser.favorites.includes(movieId)) {
    return (
      <button onClick={() => removeFromFavorites(movieId)}>
        <span className="py-1 px-2 text-base text-white rounded-full  bg-red-400 lg:py-2 lg:px-3 material-symbols-rounded">
          heart_broken
        </span>
      </button>
    )
  }

  return (
    <button onClick={() => addToFavorites(movieId)}>
      <span className="py-1 px-2 text-base text-white rounded-full bg-green-400 lg:py-2 lg:px-3 material-symbols-rounded">
        favorite
      </span>
    </button>
  )
}

export default AddToFavorites
