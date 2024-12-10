/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    theme: {
      screens: {
        sm: { min: "320px", max: "767px" },
        md: { min: "768px", max: "1023px" },
        lg: { min: "1024px", max: "1279px" },
        xl: { min: "1280px" }
      },
      extend: {
        fontFamily: {
          sans: ["Roboto", "sans-serif"]
        },
        gridTemplateColumns: {
          "70/30": "70% 28%"
        }
      }
    },
    plugins: []
  }
};
