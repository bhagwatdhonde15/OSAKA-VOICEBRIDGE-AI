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
        bridge: {
          bg: '#080B16',
          card: '#11162A',
          cardHover: '#161D36',
          surface: '#0D1224',
          border: '#1E2640',
          borderLight: '#2A3656',
          violet: '#8B5CF6',
          violetHover: '#7C3AED',
          cyan: '#67E8F9',
          cyanDark: '#0891B2',
          text: '#F8FAFC',
          muted: '#94A3B8',
          subtle: '#64748B',
          osakaRed: '#E11D48',
          osakaGold: '#F59E0B',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Hiragino Sans"', '"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'orb-idle': '0 0 40px rgba(139, 92, 246, 0.25)',
        'orb-listening': '0 0 60px rgba(103, 232, 249, 0.45)',
        'orb-speaking': '0 0 60px rgba(139, 92, 246, 0.5), 0 0 30px rgba(103, 232, 249, 0.3)',
        'card-glow': '0 0 20px rgba(139, 92, 246, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orb-breathe': 'orb-breathe 4s ease-in-out infinite',
      },
      keyframes: {
        'orb-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
