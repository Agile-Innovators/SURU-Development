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
        white: '#F8F8F8',
        primary: '#0A1029',
        secondary: '#003C55',
        'light-blue': '#20B7DD',
        grey: '#6D7585',
        'light-grey': '#C3C8D2'
      }

      
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'h1': { 
          fontSize: '2.625rem',
          color: theme('colors.secondary'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '700', //Bold
        },
        'h2': { 
          fontSize: '1.5rem', //24px
          color: theme('colors.primary'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '600', //Semi-bold
        },
        'h3': { 
          fontSize: '1.25rem', //20px
          color: theme('colors.primary'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '600', //Semi-bold
        },
        'h4': { 
          fontSize: '1.125rem', //18px
          color: theme('colors.primary'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '600', //Semi-bold
        },        
        'h5': { 
          fontSize: '1rem', //16px
          color: theme('colors.primary'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '400', //Regular
        },
        'span': { 
          fontSize: '1rem', //16px
          color: theme('colors.primary'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '400', //Regular
        },                
        'p': { 
          fontSize: '1rem', //16px
          color: theme('colors.light-grey'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '300', //regular
        },  
      })
    }
  ],
}

