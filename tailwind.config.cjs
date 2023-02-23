const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      width: {
        "3/2": "150%",
        "2/1": "200%",
        "4/2": "200%",
        double: "200%",
        "5/2": "250%",
      },
      fontFamily: {
        "logo-cursive": ['"Great Vibes"', "cursive"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      animation: {
        "waving-hand": "waving-hand 2.5s infinite",
        "bubble-expand": "bubble-expand 0.7s cubic-bezier(0.33, 1, 0.68, 1)",
      },
      keyframes: {
        "waving-hand": {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(20deg)" },
          "20%": { transform: "rotate(-10deg)" },
          "30%": { transform: "rotate(10deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(0.0deg)" },
        },
        "bubble-expand": {
          "0%": {
            width: "2rem",
            "border-width": "2rem",
            opacity: "1",
          },
          "70%": {
            opacity: "1",
          },
          "100%": {
            width: "10rem",
            "border-width": "0",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
