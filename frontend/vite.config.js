import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5050",
      },
    },
  },
});
