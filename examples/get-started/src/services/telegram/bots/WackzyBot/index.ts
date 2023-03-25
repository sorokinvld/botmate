module.exports = {
  composers: [
    {
      name: 'common',
      description: 'Common commands such as start, help, etc.',
      handler: 'global.common',
      enabled: true,
    },
  ],
};
