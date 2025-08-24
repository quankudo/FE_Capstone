/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--color-background))",
        primary: "rgba(var(--color-primary))",
        text: "rgba(var(--color-text))",
      }
    },
  },
  plugins: [],
}