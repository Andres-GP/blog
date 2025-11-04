// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,

  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: globals.node,
    },
  },

  {
    files: ["**/*.{js,cjs,mjs}"],
    ignores: ["public/**/*"],
  },

  {
    files: ["public/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
  },

  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  {
    rules: {
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["warn", "double"],
      "no-console": "off",
    },
  },
]);
