/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FC458A",
        secondary: "#4599fc",
        accent: "#D1D5DB",
      },
    },
  },
  plugins: [],
};
