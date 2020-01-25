module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2019,
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
};
