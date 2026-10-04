export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Indigo taken from the club logo
        ink: {
          DEFAULT: "#2B3268",
          950: "#171B3D",
          900: "#1F2450",
          700: "#3F4A87",
          500: "#666E9E",
          300: "#A9AFCF",
          100: "#E6E8F3",
        },
        // Watercolour mint taken from the club logo
        mint: {
          DEFAULT: "#8FD9C8",
          50: "#F0FAF7",
          100: "#DFF4EE",
          200: "#C2EADF",
          600: "#2F8F7C",
        },
        paper: "#FAF9F5",
      },
      fontFamily: {
        sans: ["Sofia Sans", "system-ui", "sans-serif"],
        display: ["Cormorant", "Georgia", "serif"],
      },
      keyframes: {
        progress: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        progress: "progress 6s linear forwards",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,50,104,0.04), 0 12px 32px -12px rgba(43,50,104,0.18)",
        lift: "0 2px 4px rgba(43,50,104,0.05), 0 28px 56px -20px rgba(43,50,104,0.32)",
      },
    },
  },
  plugins: [],
};
