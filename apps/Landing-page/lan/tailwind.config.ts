/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Example primary color
        'primary-dark': '#4338CA',
        secondary: '#10B981',
        'secondary-dark': '#059669',
      },
    },
  },
  plugins: [],
}
