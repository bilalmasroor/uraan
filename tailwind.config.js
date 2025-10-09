export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#FC4C00",
        "charcoal": "#5B5B5B",
      },
      fontFamily: {
        homenaje: ["Homenaje", "sans-serif"],
        "roboto-condensed": ['"Roboto Condensed"', "sans-serif"],
        urbanist: ['"Urbanist"', "sans-serif"], // <-- added
      },
      keyframes: {
        "marquee-rtl": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-ltr": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "marquee-rtl": "marquee-rtl 29s linear infinite",
        "marquee-ltr": "marquee-ltr 29s linear infinite",
      },
    },
  },
  plugins: [],
};
