import tseslint from "typescript-eslint";
import baseConfig from "./index.js";
import solidPlugin from "eslint-plugin-solid";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      solid: solidPlugin,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...solidPlugin.configs.recommended.rules,
    },
  },
);
