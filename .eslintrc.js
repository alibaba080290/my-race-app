// .eslintrc.js
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['expo', 'plugin:react-hooks/recommended', 'prettier'],
  env: { browser: true, es2021: true },
  ignorePatterns: ['dist', 'node_modules'],
};
