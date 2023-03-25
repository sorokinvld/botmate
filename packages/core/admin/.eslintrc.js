module.exports = {
  root: true,
  overrides: [
    {
      files: ['admin/**/*'],
      extends: ['@botmate/eslint-config/front'],
    },
    {
      files: ['src/**/*'],
      excludedFiles: ['admin/**/*'],
      extends: ['@botmate/eslint-config/back'],
    },
  ],
};
