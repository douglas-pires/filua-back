module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier',
  ],
  plugins: ['prettier', 'babel'],
  // add your custom rules here
  rules: {},
};
