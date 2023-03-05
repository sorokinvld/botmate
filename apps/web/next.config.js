module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/general',
        permanent: true,
      },
    ];
  },
};
