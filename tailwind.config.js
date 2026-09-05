/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5ebcf',
          300: '#eedda9',
          400: '#e3c162',
          500: '#d4a838',
          600: '#be8c29',
          700: '#9e6d23',
          800: '#815622',
          900: '#6c4720',
        },
        parchment: {
          50: '#faf8f5',
          100: '#f4ede1',
          200: '#e8dcbe',
          300: '#d7c293',
          400: '#c5a769',
          500: '#b48f48',
          600: '#9a753c',
          700: '#7a5a31',
          800: '#654b2d',
          900: '#543f28',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'foil': '0 10px 25px -5px rgba(212, 168, 56, 0.3), 0 8px 10px -6px rgba(212, 168, 56, 0.2)',
        'glow': '0 0 20px rgba(212, 168, 56, 0.5)',
      }
    },
  },
  plugins: [],
}
