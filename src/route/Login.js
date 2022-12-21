import { useMovies } from 'context/MoviesContext'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const { users, login } = useMovies()

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [error, setError] = useState()

  const handleInput = (e) => {
    setError(null)

    const { value, name, checked } = e.target
    const isCheckbox = e.target.type === 'checkbox'

    setCredentials((prev) => ({ ...prev, [name]: isCheckbox ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (credentials.email.trim() === '' || credentials.password.trim() === '') {
      setError('Please fill all fields!')
      return
    }

    if (
      users.findIndex(
        (user) => user.email === credentials.email && user.password === credentials.password
      ) === -1
    ) {
      setError('Incorrect user!')
      return
    }

    login(credentials)
    navigate('/')
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])

  return (
    <form className="flex justify-center items-center grow" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col justify-center gap-4 w-full lg:w-1/3 lg:gap-8">
        <h1 className="text-center text-4xl font-bold text-white lg:text-5xl">Sign in</h1>
        <input
          onChange={(e) => handleInput(e)}
          value={credentials.email}
          type="email"
          name="email"
          id="email"
          className="p-4 w-full text-gray-dark rounded-lg bg-white"
          placeholder="Email"
        />
        <input
          onChange={(e) => handleInput(e)}
          value={credentials.password}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="p-4 w-full text-gray-dark rounded-lg bg-white"
        />
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => handleInput(e)}
            value={credentials.rememberMe}
            type="checkbox"
            name="rememberMe"
            id="remember"
            aria-describedby="remember"
            className="w-6 h-6"
          />
          <label id="rememberMe" className="text-white">
            Remember me
          </label>
        </div>
        {error && <p className="p-2 text-center text-red-500 rounded-lg bg-white/50">{error}</p>}
        <button
          type="submit"
          className="p-4 w-full font-bold text-center text-blue bg-white rounded-lg hover:bg-white/90"
        >
          Sign in
        </button>
        <p className="text-center text-white">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}

export default Login
