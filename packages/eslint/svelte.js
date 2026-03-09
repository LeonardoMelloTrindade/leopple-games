import tseslint from 'typescript-eslint';
import baseConfig from './index.js';
import sveltePlugin from 'eslint-plugin-svelte';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...baseConfig,
  ...sveltePlugin.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    rules: {
      'prettier/prettier': [
        'error',
        { 'singleQuote': true, 'parser': 'svelte', 'plugins': ['prettier-plugin-svelte'] },
      ],
    },
  },
);
