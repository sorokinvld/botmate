'use strict';

module.exports = () => {
	return {
		myplugin: {
			enabled: true,
			resolve: `./src/plugins/my-plugin`, // From the root of the project
			config: {
				testConf: 3,
			},
		},
	};
};
