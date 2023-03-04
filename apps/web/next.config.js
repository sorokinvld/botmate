module.exports = {
	reactStrictMode: true,
	transpilePackages: ['ui'],
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
