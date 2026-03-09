import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import htmlPlugin from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue,svelte,angular.ts}'],
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    plugins: { '@html-eslint': htmlPlugin },
    languageOptions: { parser: htmlParser },
    rules: {
      ...htmlPlugin.configs.recommended.rules,
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/element-newline': 'off',
      '@html-eslint/require-closing-tags': 'off',
      '@html-eslint/no-extra-spacing-attrs': 'off',
    },
  },
  {
    files: ['**/*.{js,ts,angular.ts}'],
    rules: {
      'prettier/prettier': ['error', { 'singleQuote': true }],
    },
  },
  prettierConfig,
);
