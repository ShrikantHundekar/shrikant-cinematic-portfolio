/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#03040A',
        obsidian: '#090C15',
        electric: '#4169FF',
        ultraviolet: '#7C3AED',
        cyan: '#42F5E9',
        ice: '#EDF7FF',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
