import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
