/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  plugins: [typography, daisyui],
  daisyui: {
    themes: ["bumblebee", "sunset"],
    darkTheme: "sunset"
  }
}
