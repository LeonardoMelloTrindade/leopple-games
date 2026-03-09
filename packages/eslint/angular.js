import tseslint from "typescript-eslint";
import baseConfig from "./index.js";
import angular from "angular-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  {
    files: ["**/*.ts"],
    extends: [
      ...angular.configs.tsRecommended,
    ],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
