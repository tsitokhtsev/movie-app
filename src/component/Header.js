import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMovies } from 'context/MoviesContext'

const Header = () => {
  const navigate = useNavigate()

  const { currentUser, setCurrentGenre, logout } = useMovies()

  const handleLogoClick = () => {
    setCurrentGenre('All')
    navigate('/')
  }

  const handleLogoutClick = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <div className="flex justify-between items-center h-20">
        <span className="text-blue text-2xl font-bold" onClick={handleLogoClick}>
          Movie App
        </span>
        <div className="flex gap-4">
          {currentUser ? (
            <>
              <Link to="/favorites" className="text-blue text-lg">
                Favorites
              </Link>
              <button onClick={handleLogoutClick} className="text-blue text-lg">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue text-lg">
                Login
              </Link>
              <Link to="/register" className="text-blue text-lg">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
