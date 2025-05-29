/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // ✅ App Router
    './pages/**/*.{js,ts,jsx,tsx}',      // ✅ If any legacy pages
    './components/**/*.{js,ts,jsx,tsx}', // ✅ UI Components
  ],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        'shimmer-strong': 'shimmer-strong 4s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.66, 0, 0, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'shimmer-strong': {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(255, 210, 143, 0.3)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 10px rgba(255, 210, 143, 0)',
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(255, 210, 143, 0)',
          },
        },
      },
    },
  },
  plugins: [],
}
