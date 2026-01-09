import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    name: "the-julekalender/recommended-rules",
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  {
    name: "the-julekalender/recommended-rules-with-override-appjs",
    files: ["./src/app.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "off",
    },
  },
]);
