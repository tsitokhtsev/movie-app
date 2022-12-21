import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMovies } from 'context/MoviesContext'

const Register = () => {
  const navigate = useNavigate()

  const { users, register } = useMovies()

  const [credentials, setCredentials] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState()

  const handleInput = (e) => {
    setError(null)
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const userExists = (email) => {
    return users.some((user) => user.email === email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (userExists(credentials.email)) {
      setError('User with this email already exists!')
      return
    }

    if (
      credentials.fullname.trim() === '' ||
      credentials.email.trim() === '' ||
      credentials.password.trim() === '' ||
      credentials.confirmPassword.trim() === ''
    ) {
      setError('Please fill all fields!')
      return
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords must match!')
      return
    }

    register({ ...credentials, favorites: [] })

    setCredentials({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    navigate('/login')
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])

  return (
    <form className='flex justify-center items-center grow' onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col justify-center gap-4 w-full lg:w-1/3 lg:gap-8">
        <h1 className="text-center text-4xl font-bold text-white lg:text-5xl">Sign up</h1>
        <input
          onChange={(e) => handleInput(e)}
          value={credentials.fullname}
          type="text"
          name="fullname"
          className="p-4 w-full text-gray-dark rounded-lg bg-white"
          placeholder="Full Name"
        />
        <input
          onChange={(e) => handleInput(e)}
          value={credentials.email}
          type="text"
          name="email"
          className="p-4 w-full text-gray-dark rounded-lg bg-white"
          placeholder="Email"
        />
        <input
          onChange={(e) => handleInput(e)}
          value={credentials.password}
          type="password"
          className="p-4 w-full text-gray-dark rounded-lg bg-white"
          name="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => handleInput(e)}
          value={credentials.confirmPassword}
          type="password"
          className="p-4 w-full text-gray-dark rounded-lg bg-white"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        {error && <p className="p-2 text-center text-red-500 rounded-lg bg-white/50">{error}</p>}
        <button
          type="submit"
          className="p-4 w-full font-bold text-center text-blue bg-white rounded-lg hover:bg-white/90"
        >
          Create Account
        </button>
        <p className="text-center text-white">
        Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  )
}

export default Register
