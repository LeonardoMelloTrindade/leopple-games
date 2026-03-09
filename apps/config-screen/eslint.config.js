// @ts-check
import tseslint from 'typescript-eslint';
import angularConfig from '../../packages/eslint/angular.js';

export default tseslint.config(...angularConfig, {
  ignores: ['dist/**', '.turbo/**', 'node_modules/**', '.angular/**'],
});
