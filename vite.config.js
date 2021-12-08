import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
const resolve = function (dir) {
  return path.resolve(__dirname, dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("src"),
      pages: resolve("src/pages"),
    },
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    https: false,
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => {
          path.replace(/^\/api/, "");
        },
      },
    },
  },
  build: {
    outDir: "lv-app",
  },
});
