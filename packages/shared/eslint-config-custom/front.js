module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['@botmate/eslint-config/front'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    mocha: true,
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  globals: {
    botmate: false,
    window: false,
    cy: false,
    Cypress: false,
    expect: false,
    assert: false,
    chai: false,
    ENABLED_EE_FEATURES: false,
    ADMIN_PATH: true,
    BACKEND_URL: true,
    PUBLIC_PATH: true,
    NODE_ENV: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'off',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/no-unstable-nested-components': 'warn',
  },
};
