/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lexend: ["Lexend"],
    },
  
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Aca no deben haber themes porque pisan clases.
    themes: [],
  },
};
