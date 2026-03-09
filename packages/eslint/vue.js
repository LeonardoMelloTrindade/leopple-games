import tseslint from 'typescript-eslint';
import baseConfig from './index.js';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  ...vuePlugin.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'prettier/prettier': [
        'error',
        { 'singleQuote': true, 'parser': 'vue', 'plugins': ['prettier-plugin-vue'] },
      ],
    },
  },
);
