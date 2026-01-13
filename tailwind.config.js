/** @type {import('tailwindcss').Config} */

module.exports = {
  // darkMode: "media",
  content: ["./app/**/*.tsx", "./core/components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#00A6DA",
        },
        secondary: {
          500: "#FFF900",
        },
        success: "#32BA7C",
        error: "#F1190E",
      },
      textColor: {
        secondary: {
          500: "#A8A8A8",
        },
      },
      fontFamily: {
        cairo: ["CairoRegular", "sans-serif"],
        sans: ["CairoRegular", "sans-serif"],
        "bagel-regular": ["BagelRegular", "sans-serif"],
        "cairo-medium": ["CairoMedium", "sans-serif"],
        "cairo-semibold": ["CairoSemiBold", "sans-serif"],
        "cairo-bold": ["CairoBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
