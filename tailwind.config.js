
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        isa: {
          navy: '#2C3468',
          gold: '#B8860B',
          slate: '#F9F9F9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'super-wide': '0.5em',
      }
    },
  },
  plugins: [],
}
