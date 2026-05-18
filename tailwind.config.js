export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A8A",
          secondary: "#10B981",
          accent: "#F59E0B",
          soft: "#D1FAE5",
        },
      },
      backgroundImage: {
        "page-gradient":
          "linear-gradient(135deg, #FAFCFB 0%, #E0F8F0 50%, #C0F0E0 100%)",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
