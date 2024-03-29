const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  presets: [require("astro-forms/themes/tailwind/tailwind.config.cjs")],
  jit: true,
  content: [
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
    "./node_modules/astro-forms/themes/tailwind/*.astro",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: {
          DEFAULT: "#131313",
          100: "#151515",
          200: "#202020",
          300: "#303030",
          400: "#404040",
          500: "#505050",
          600: "#606060",
          700: "#707070",
          800: "#808080",
          900: "#909090",
        },
        astral: {
          DEFAULT: "#4F4BFE",
          50: "#D5D4FF",
          100: "#C6C5FF",
          200: "#A8A6FF",
          300: "#8B88FE",
          400: "#6D69FE",
          500: "#4F4BFE",
          600: "#312DFE",
          700: "#130EFE",
          800: "#0701EC",
          900: "#0601CD",
        },
        pink: {
          DEFAULT: "#EB0CCA",
          50: "#FBB3F1",
          100: "#FAA0ED",
          200: "#F879E5",
          300: "#F652DE",
          400: "#F42CD7",
          500: "#EB0CCA",
          600: "#B6099C",
          700: "#80076E",
          800: "#4B0440",
          900: "#160112",
        },
        yellow: {
          DEFAULT: "#FFC24A",
          50: "#FFFFFF",
          100: "#FFF9ED",
          200: "#FFEBC4",
          300: "#FFDE9C",
          400: "#FFD073",
          500: "#FFC24A",
          600: "#FFAF12",
          700: "#D99000",
          800: "#A16B00",
          900: "#694500",
        },
        "ocean-green": {
          DEFAULT: "#4CBA7A",
          50: "#D1EDDC",
          100: "#C2E7D2",
          200: "#A4DCBC",
          300: "#87D1A6",
          400: "#69C590",
          500: "#4CBA7A",
          600: "#39955F",
          700: "#2A6C45",
          800: "#1A442B",
          900: "#0A1B11",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
