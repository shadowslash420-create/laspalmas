/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8e9',
          100: '#f9edc4',
          200: '#f4de8a',
          300: '#edc850',
          400: '#e5b324',
          500: '#d4a012',
          600: '#b87f0c',
          700: '#935d0d',
          800: '#7a4a12',
          900: '#673d14',
        },
        bronze: {
          400: '#cd7f32',
          500: '#b87333',
          600: '#a56529',
        },
        sand: {
          100: '#f5f0e1',
          200: '#e8dfc8',
          300: '#d4c4a0',
        },
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#242424',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
