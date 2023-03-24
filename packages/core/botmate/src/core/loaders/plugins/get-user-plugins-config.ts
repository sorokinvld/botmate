'use strict';

import { join } from 'path';
import fse from 'fs-extra';
import { merge } from 'lodash/fp';
import loadConfigFile from '../../app-configuration/load-config-file';

/**
 * Return user defined plugins' config
 * first load config from `config/plugins.js`
 * and then merge config from `config/env/{env}/plugins.js`
 */
const getUserPluginsConfig = async (): Promise<{}> => {
	const globalUserConfigPath = join(botmate.dirs.dist.config, 'plugins.js');
	const currentEnvUserConfigPath = join(
		botmate.dirs.dist.config,
		'env',
		process.env.NODE_ENV,
		'plugins.js'
	);
	let config = {};

	// assign global user config if exists
	if (await fse.pathExists(globalUserConfigPath)) {
		config = loadConfigFile(globalUserConfigPath);
	}

	// and merge user config by environment if exists
	if (await fse.pathExists(currentEnvUserConfigPath)) {
		config = merge(config, loadConfigFile(currentEnvUserConfigPath));
	}

	return config;
};

export default getUserPluginsConfig;
