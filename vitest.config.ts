import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    exclude: [
      "**/e2e/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*",
    ],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
    },
  },
});
