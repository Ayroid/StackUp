/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        books: "10px 10px 10px 0px rgba(0,0,0,0.15)",
      },
      colors: {
        accent: "#1c212d",
        accentLight: "#2c3345",
      },
    },
  },
  plugins: [],
};
