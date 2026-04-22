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
          bg: '#0B0B0F',
          surface: '#13131A',
          text: '#EAEAEA',
          accent: '#D4AF37',
          secondary: '#CFC6B8',
          // Light mode specific (optional, can use tailwind classes)
          lightBg: '#F9FAFB',
          lightText: '#111111',
          lightAccent: '#2563EB',
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

