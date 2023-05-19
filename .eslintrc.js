module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: 'plugin:prettier/recommended',
  overrides: [],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    parser: 'babel-eslint'
  },
  rules: {
    'prettier/prettier': [2, {}, { usePrettierrc: true }]
  },
  plugins: ['prettier']
}
