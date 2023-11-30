/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lexend: ["Lexend"],
    },
    // backgroundColor: {
    //   "custom-color-1": "#232322",
    //   "custom-color-2": "#A5A5A5",
    // }, ESTO ESTA PISANDO LOS BG-color DE ALGUNOS COMPONENTES.
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Aca no deben haber themes porque pisan clases.
    themes: [],
  },
};
