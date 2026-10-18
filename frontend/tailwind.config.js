/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        osaka: {
          bg: '#070b14',
          surface: '#0d1322',
          card: '#131c31',
          border: '#1f2c4a',
          red: '#E5171F',      // Osaka Metro Midosuji Line
          purple: '#522886',   // Tanimachi Line
          blue: '#0078BA',     // Yotsubashi Line
          green: '#009944',    // Chuo Line
          pink: '#E44D93',     // Sennichimae Line
          orange: '#F15A22',   // JR Osaka Loop Line
          gold: '#FFB300',     // Dotonbori Lantern Gold
          cyan: '#00E5FF',     // Modern Smart Transit Cyan
        }
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Hiragino Sans"', '"Meiryo"', 'sans-serif'],
      },
      boxShadow: {
        'neon-red': '0 0 20px rgba(229, 23, 31, 0.35)',
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.35)',
        'neon-gold': '0 0 20px rgba(255, 179, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
