/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B6CFF",
        accent: "#7CFFB2",
        bg: "#0B0C0F",
        surface: "#14161C",
        surface2: "#1C1F28",
        border: "#2A2E38",
        muted: "#8B93A7",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
