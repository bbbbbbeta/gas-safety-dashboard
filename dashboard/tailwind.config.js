/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gas-blue': '#3b82f6',
        'gas-blue-light': '#60a5fa',
        'gas-bg-dark': '#0a1628',
        'gas-bg-mid': '#1a2f4a',
      }
    },
  },
  plugins: [],
}
