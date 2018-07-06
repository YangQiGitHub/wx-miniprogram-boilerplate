module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2015
  },
  rules: {
    indent: ['warn', 2],
    quotes: ['error', 'single'],
    semi: ['warn', 'always'],
    'no-console': 1
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false
  }
};
