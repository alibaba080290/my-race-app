/**
 * ESLint config minimaliste pour Expo/React Native Web + TS
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: ['expo'], // nécessite eslint-config-expo (déjà installé)
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',

    // 🔥 Mode "passe-partout" temporaire :
    'no-unused-vars': 'off',
    'no-irregular-whitespace': 'off',
    'no-undef': 'off',
  },
};
