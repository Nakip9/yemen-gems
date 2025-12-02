/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E76F51', // Terracotta
        secondary: '#2A9D8F', // Turquoise
        accent: '#F4A261', // Golden Sand
        neutral: {
          light: '#FFF8F0', // Cream
          dark: '#264653', // Charcoal
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Inter', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
