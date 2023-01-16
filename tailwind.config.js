/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#E1E1E6",
          200: "#A9A9B2",
          400: "#7C7C8A",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
        green: {
          500: "#00B37E",
          600: "#00875F",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans"],
      },
    },
  },
  plugins: [],
};
