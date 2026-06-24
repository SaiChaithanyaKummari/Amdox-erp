/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff7a00",
        secondary: "#1E293B",
        accent: "#a855f7",
        background: "#f0f3f8",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        soft: "0 18px 45px -30px rgba(15, 23, 42, 0.45)",
        panel: "0 12px 32px -24px rgba(15, 23, 42, 0.5)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
