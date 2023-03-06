module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  output: 'export',
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/general',
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
