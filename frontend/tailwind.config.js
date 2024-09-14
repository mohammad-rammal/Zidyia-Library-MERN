/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700_7e: "#ffffff7e", A700: "#ffffff" },
        blue_gray: {
          600: "#576371",
          800: "#2f3b48",
          900: "#2d3741",
          "800_01": "#384450",
          "600_99": "#57637199",
          "900_01": "#1f2731",
        },
        green: { A200: "#5dd3b3" },
        black: { 900: "#000000" },
      },
      boxShadow: { xs: "0px 3px  6px 0px #00000026", sm: "0px 4px  20px 0px #0000003f" },
      fontFamily: {
        corerhinoregular: "Core Rhino 45 Regular",
        firasans: "Fira Sans",
        corerhinobold: "Core Rhino 65 Bold",
        corerhinolight: "Core Rhino 35 Light",
        corerhinomedium: "Core Rhino 55 Medium",
      },
      backgroundImage: { gradient: "linear-gradient(180deg, #2d3741,#576371)" },
    },
  },
  plugins: [],
}