import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  server: { port: 3010, host: true },
  preview: { port: 3010 },
  resolve: {
    dedupe: ["react", "react-dom", "react-router-dom"],
    alias: {
      "@design": fileURLToPath(new URL("./src/design", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "gsap",
      "lenis",
      "lucide-react",
      "react-router-dom",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("@react-three")) {
            return "three";
          }
          if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) {
            return "motion";
          }
        },
      },
    },
  },
});
