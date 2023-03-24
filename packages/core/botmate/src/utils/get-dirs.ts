'use strict';

import { join, resolve } from 'path';

// todo: remove unnecessary folders
const getDirs = ({ app: appDir, dist: distDir }, { botmate }) => {
	return {
		dist: {
			root: distDir,
			src: join(distDir, 'src'),
			services: join(distDir, 'src', 'services'),
			config: join(distDir, 'config'),
		},
		app: {
			root: appDir,
			src: join(appDir, 'src'),
			services: join(appDir, 'src', 'services'),
			config: join(appDir, 'config'),
		},
		static: {
			public: resolve(appDir, botmate.config.get('server.dirs.public')),
		},
	};
};

export default getDirs;
