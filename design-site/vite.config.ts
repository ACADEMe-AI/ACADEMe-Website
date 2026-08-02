import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@content": path.resolve(__dirname, "content"),
    },
  },
  server: {
    port: 5174,
    fs: {
      allow: [".."],
    },
  },
});
