import {
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test.setup.ts",
    exclude: [
      "./**/__mocks__",
      "./components/**/index.ts",
      "./*.mjs",
      ...configDefaults.exclude,
    ],
    coverage: {
      provider: "v8",
      exclude: [
        "./**/__mocks__",
        "./components/**/index.ts",
        "./*.mjs",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
