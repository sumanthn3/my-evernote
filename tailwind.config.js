/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#189BFF",
        secondary: "#d8d8d8",
      },
      spacing: {
        25: "100px",
      },
      keyframes: {
        pulsate: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
      },
      animation: {
        pulsate: "pulsate 1.5s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
