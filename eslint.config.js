// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended, // ESLint recommended rules
  ...tseslint.configs.recommended, // TypeScript rules
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
