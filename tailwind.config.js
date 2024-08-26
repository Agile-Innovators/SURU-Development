/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:
      {
        primary: ['Poppins', 'sans-serif']
      },
      colors:{
        primary: '#0A1029',
        secondary: '#003C55',
        'light-blue': '#20B7DD',
        white: '#F6F6F6',
        grey: '#6D7585',
        'light-grey': '#C3C8D2'
      }
    },
  },
  plugins: [],
}

