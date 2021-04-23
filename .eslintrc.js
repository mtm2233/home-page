/*
 * @Description:
 * @Author: mTm
 * @Date: 2021-04-23 15:29:15
 * @LastEditTime: 2021-04-23 15:34:42
 * @LastEditors: mTm
 */
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {},
}
