import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs({
    filter(id) {
      if (id.includes('node_modules/@pmhieu/react-comments-section')) {
        return true;
      }
    },
  })],
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
    // https://github.com/vitejs/vite/discussions/5912
    global: {},
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  },
  optimizeDeps: {
    include: ["@pmhieu/react-comments-section"],
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
