module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'plugin:prettier/recommended',
  overrides: [],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2022,
    requireConfigFile: false,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [2, {}, { usePrettierrc: true }]
  },
  plugins: ['prettier']
}
