/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {spacing: {
      '112': '28rem', // Tamaño personalizado (112 equivale a 28 rem)
      '128': '32rem', // Tamaño personalizado (128 equivale a 32 rem)
      '144': '36rem', // Tamaño personalizado (144 equivale a 36 rem)
    },
    colors: {
      beige: '#F8EDE3',
      red: '#C5705D',
      darkerbeige: '#D0B8A8',
      brown: '#785f4f'
    },},
  },
  plugins: [],
}