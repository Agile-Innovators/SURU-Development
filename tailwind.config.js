/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'appointment-bg': "url('/src/assets/backgrounds/Background.png')",
      },
      fontFamily:
      {
        primary: ['Poppins', 'sans-serif']
      },
      colors:{
        white: '#F8F8F8',
        primary: '#0A1029',
        secondary: '#003C55',
        
        'light-blue': '#20B7DD',
        'translucid-blue': 'rgba(0, 201, 247, 0.25)',
        grey: '#6D7585',
        'light-grey': '#C3C8D2'
      },
      gridTemplateColumns: {
        'auto-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'auto-150': 'repeat(auto-fit, minmax(150px, 1fr))',
        'auto-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-350': 'repeat(auto-fit, minmax(350px, 1fr))',
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
          color: theme('colors.grey'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: '300', //regular
        },  
      })
    }
  ],
}

