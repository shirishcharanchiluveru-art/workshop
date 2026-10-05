/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          500: '#84cc16',
          600: '#65A30D',
          700: '#4d7c0f',
        },
        emerald: {
          600: '#16a34a',
          700: '#15803D',
          800: '#166534',
        },
        amber: {
          500: '#f59e0b',
          600: '#D97706',
          700: '#b45309',
        },
        slate: {
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        produce: {
          lime: '#65A30D',
          emerald: '#15803D',
          amber: '#D97706',
          slate: '#334155',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(101, 163, 13, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(21, 128, 61, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(217, 119, 6, 0.35)',
      }
    },
  },
  plugins: [],
}
