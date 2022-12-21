const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fefefe',
      red: colors.red,
      green: colors.green,
      black: '#1c1c1e',
      blue: '#5a5dfe',
      'blue-dark': '#7671f0',
      'blue-light': '#918cf0',
      'gray-dark': '#333333',
    },
  },
  plugins: [],
}
