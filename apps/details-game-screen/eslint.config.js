// @ts-check
import tseslint from 'typescript-eslint';
import solidConfig from '../../packages/eslint/solid.js';

export default tseslint.config(...solidConfig, {
  ignores: ['dist/**', '.turbo/**', 'node_modules/**'],
});
