import tseslint from 'typescript-eslint';
import reactConfig from '../../packages/eslint/react.js';

export default tseslint.config(...reactConfig, {
  ignores: ['dist/**', '.turbo/**', 'node_modules/**'],
});
