/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand (Scheme D — Soft Day, light only for now)
        primary: "#5b6cff",
        secondary: "#00d2d3",
        coral: "#ff6e6e",
        success: "#0d9f6e",
        warning: "#c98a12",
        error: "#e03e4d",
        accent: "#0d9f6e",
        bg: "#f6f7fa",
        surface: "#ffffff",
        surface2: "#eef0f5",
        border: "#d8dce6",
        muted: "#5c6578",
        ink: "#12141a",
        "text-primary": "#12141a",
        "text-secondary": "#5c6578",
      },
      fontFamily: {
        sans: ["Inter", "Archivo", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
