/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#232323',
        secondary: '#9FFF9E',
        light: {
          100: '#FFF6F6'
        }

      }
    },
  },
  plugins: [],
}