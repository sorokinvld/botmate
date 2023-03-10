const removeImports = require('next-remove-imports')();

module.exports = removeImports({
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
  experimental: { esmExternals: true },
});
