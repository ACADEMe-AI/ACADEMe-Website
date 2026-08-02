/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B6CFF",
        accent: "#7CFFB2",
        bg: "#07080c",
        surface: "#13151d",
        surface2: "#1a1d28",
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
