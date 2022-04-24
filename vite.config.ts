import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@metamask/jazzicon"],
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src"),
      fileName: (format) => `vcw.${format}.js`,
      name: "vcw",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
