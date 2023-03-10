const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: true,
  transpilePackages: ['ui'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: { esmExternals: true },
});
