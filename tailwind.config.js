/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#121212", // Define a dark background color
        light: "#ffffff", // Define a light background color
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
