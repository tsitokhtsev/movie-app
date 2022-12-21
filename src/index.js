import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from 'App'
import { MoviesProvider } from 'context/MoviesContext'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <MoviesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoviesProvider>
)
