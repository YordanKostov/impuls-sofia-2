export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A8A", // richer, deep blue
          secondary: "#10B981", // vibrant green/teal
          accent: "#F59E0B", // warm yellow/orange
          soft: "#D1FAE5", // soft background, still light but not too white
        },
      },
    },
    backgroundImage: {
      "page-gradient":
        "linear-gradient(135deg, #FAFCFB 0%, #E0F8F0 50%, #C0F0E0 100%)",
    },
  },

  plugins: [],
};
