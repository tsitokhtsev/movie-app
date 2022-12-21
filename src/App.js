import React, { Routes, Route } from 'react-router-dom'

import Header from 'component/Header'
import MovieList from 'route/MovieList'
import MovieDetails from 'route/MovieDetails'
import Favorites from 'route/Favorites'
import Login from 'route/Login'
import Register from 'route/Register'

function App() {
  return (
    <div className="max-w-screen-xl mx-auto mb-8 px-4 bg-white text-black leading-tight tracking-tight lg:px-8">
      <Header />
      <div className="flex flex-col gap-8 p-4 rounded-3xl bg-blue-dark lg:p-8">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
