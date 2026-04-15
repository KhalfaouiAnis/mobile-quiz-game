/** @type {import('tailwindcss').Config} */

module.exports = {
  // darkMode: "media",
  content: ["./app/**/*.tsx", "./src/components/**/*.tsx"],
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
        game: {
          bg: "#0F0F13",
          surface: "#1A1A24",
          card: "#22222F",
          border: "#2E2E40",
          purple: "#7C3AED",
          purpleL: "#A78BFA",
          green: "#22C55E",
          red: "#EF4444",
          amber: "#F59E0B",
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
