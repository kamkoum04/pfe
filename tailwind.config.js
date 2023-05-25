/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-blue-green': '#01959a',
        'my-new-gris':'#ecf8f6',
        'my-new-green':'#06668c'
      },
    },
  },
  plugins: [],
}

