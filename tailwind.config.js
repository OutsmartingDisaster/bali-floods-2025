/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['"Libre Baskerville"', 'Georgia', 'serif'],
        'sans': ['"Source Sans Pro"', 'system-ui', 'sans-serif'],
        'heading': ['"Libre Baskerville"', 'Georgia', 'serif'],
        'body': ['"Source Sans Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        'wapo-blue': '#005dc7',
        'wapo-red': '#c41e3a',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}