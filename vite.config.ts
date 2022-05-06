import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "./src/",
    }),
  ],
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
