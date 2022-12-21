import React, { useContext, createContext, useState, useEffect } from 'react'

export const MoviesContext = createContext()

export const useMovies = () => useContext(MoviesContext)

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [currentGenre, setCurrentGenre] = useState('All')
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState()

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser)
    setUsers((prev) => prev.map((user) => (user.email === updatedUser.email ? updatedUser : user)))

    localStorage.setItem(
      'users',
      JSON.stringify(users.map((user) => (user.email === updatedUser.email ? updatedUser : user)))
    )

    if (localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const addToFavorites = (movieId) => {
    const user = { ...currentUser, favorites: [...currentUser.favorites, movieId] }
    handleUserUpdate(user)
  }

  const removeFromFavorites = (movieId) => {
    const user = { ...currentUser, favorites: currentUser.favorites.filter((id) => id !== movieId) }
    handleUserUpdate(user)
  }

  const removeMovie = (movieId) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  const register = (user) => {
    setUsers((prev) => [...prev, user])
    localStorage.setItem('users', JSON.stringify([...users, user]))
  }

  const login = (credentials) => {
    const { email, rememberMe } = credentials
    const user = users.find((user) => user.email === email)

    setCurrentUser(user)

    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  const getMovies = async () => {
    try {
      const response = await fetch('/data/movies.json')
      const data = await response.json()
      setMovies(data)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('users')) {
      setUsers(JSON.parse(localStorage.getItem('users')))
    }

    if (localStorage.getItem('user')) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }

    getMovies()
  }, [])

  useEffect(() => {
    if (movies.length > 0) {
      const genres = movies.map((movie) => movie.genre)
      setGenres(['All', ...new Set(genres)])
    }
  }, [movies])

  return (
    <MoviesContext.Provider
      value={{
        movies,
        genres,
        currentGenre,
        users,
        currentUser,
        setCurrentGenre,
        addToFavorites,
        removeFromFavorites,
        removeMovie,
        register,
        login,
        logout,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export { MoviesProvider }
