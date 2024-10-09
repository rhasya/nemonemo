import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
}

