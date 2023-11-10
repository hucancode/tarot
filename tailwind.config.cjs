const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      animation: {
        "bubble-expand": "bubble-expand 0.7s cubic-bezier(0.33, 1, 0.68, 1)",
      },
      keyframes: {
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
