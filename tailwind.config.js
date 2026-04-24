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
        theme: {
          bg: '#1a1a2e',
          surface: '#16213e',
          text: '#f3f4f6',
          accent: '#ffb703',
          secondary: '#8b5cf6',
          // Light mode specific
          lightBg: '#fdfbf7',
          lightSurface: '#f3f4f6',
          lightText: '#1f2937',
          lightAccent: '#fb8500',
          lightSecondary: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}

