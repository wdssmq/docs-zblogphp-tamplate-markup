import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import datasetPlugin from "./plugins/dataset";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), datasetPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});
