import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/apps/home/dist" : "/",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [vue()],
});
