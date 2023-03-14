module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: { esmExternals: true },
};
