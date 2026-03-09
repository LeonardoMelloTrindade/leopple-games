// @ts-check
import tseslint from 'typescript-eslint';
import svelteConfig from '../../packages/eslint/svelte.js';

export default tseslint.config(...svelteConfig, {
  ignores: ['dist/**', '.turbo/**', 'node_modules/**', '.svelte-kit/**'],
});
