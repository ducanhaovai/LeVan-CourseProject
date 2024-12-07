const animated = require("tailwindcss-animated");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      clipPath: {
        // Define custom clip-path
        circle: "circle(50%)",
      },
    },
  },
  plugins: [animated],
};
