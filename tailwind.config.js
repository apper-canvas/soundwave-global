/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DB954',
          light: '#1ED760',
          dark: '#169C46'
        },
        secondary: {
          DEFAULT: '#191414',
          light: '#282828',
          dark: '#121212'
        },
        accent: '#FF6B35',
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'neu-light': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neu-dark': '20px 20px 60px #0d0d0d, -20px -20px 60px #1f1f1f'
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}