/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  plugins: [daisyui],
  daisyui: {
    themes: ["bumblebee", "sunset"],
    darkTheme: "sunset"
  }
}

