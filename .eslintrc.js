module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    'ecmaFeatures': {
      'globalReturn': true,
      'impliedStrict': true,
      'modules': true,
    },
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'off',
    'no-debugger': 'off',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 1,
        'flatTernaryExpressions': true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-extra-semi': 'error',
    'no-unused-vars': ['error', { 'vars': 'local', 'args': 'none', 'ignoreRestSiblings': false }],
    'space-before-blocks': ['error', 'always'],
    'no-undef': [1],
  },
}
