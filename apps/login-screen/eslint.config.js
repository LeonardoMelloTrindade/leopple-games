// @ts-check
import tseslint from 'typescript-eslint';
import vueConfig from '../../packages/eslint/vue.js';

export default tseslint.config(...vueConfig, {
  ignores: ['dist/**', '.turbo/**', 'node_modules/**'],
});
