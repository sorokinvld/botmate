'use strict';

import path from 'path';
import _ from 'lodash';
import fs from 'fs-extra';
import getCustomAppConfigFile from './get-custom-app-config-file';
import tsUtils from '@botmate/typescript-utils';

async function createPluginsJs(plugins, dest: string) {
	const pluginsArray = plugins.map(({ pathToPlugin, name }) => {
		const shortName = _.camelCase(name);

		const realPath = path
			.join(
				path.relative(path.resolve(dest, 'admin', 'src'), pathToPlugin),
				'botmate-admin.js'
			)
			.replace(/\\/g, '/');

		return {
			name,
			pathToPlugin: realPath,
			shortName,
		};
	});

	const content = `
${pluginsArray
	.map(({ pathToPlugin, shortName }) => {
		const req = `'${pathToPlugin}'`;

		return `import ${shortName} from ${req};`;
	})
	.join('\n')}


const plugins = {
${[...pluginsArray]
	.map(({ name, shortName }) => {
		return `  '${name}': ${shortName},`;
	})
	.join('\n')}
};

export default plugins;
`;

	return fs.writeFile(
		path.resolve(dest, 'admin', 'src', 'plugins.js'),
		content
	);
}

async function copyAdmin(dest: string) {
	const adminPath = path.join(__dirname, '..', '..');

	// TODO copy ee folders for plugins
	// await fs.copy(
	// 	path.resolve(adminPath, 'ee', 'admin'),
	// 	path.resolve(dest, 'ee', 'admin')
	// );

	await fs.ensureDir(path.resolve(dest, 'config'));
	await fs.copy(path.resolve(adminPath, 'admin'), path.resolve(dest, 'admin'));
	console.log('here.');
	// Copy package.json
	await fs.copy(
		path.resolve(adminPath, 'package.json'),
		path.resolve(dest, 'package.json')
	);
}

async function createCacheDir({ appDir, plugins }) {
	const cacheDir = path.resolve(appDir, '.cache');

	const useTypeScript = await tsUtils.isUsingTypeScript(
		path.join(appDir, 'src', 'admin'),
		'tsconfig.json'
	);

	const pluginsWithFront = Object.keys(plugins)
		.filter((pluginName) => {
			const pluginInfo = plugins[pluginName];
			return fs.existsSync(
				path.resolve(pluginInfo.pathToPlugin, 'botmate-admin.js')
			);
		})
		.map((name) => ({ name, ...plugins[name] }));

	// create .cache dir
	await fs.emptyDir(cacheDir);

	// copy admin core code
	await copyAdmin(cacheDir);

	// Retrieve the custom config file extension
	const customAdminAppConfigFile = await getCustomAppConfigFile(appDir);

	if (customAdminAppConfigFile) {
		const defaultAdminConfigFilePath = path.resolve(
			cacheDir,
			'admin',
			'src',
			'app.js'
		);
		const customAdminAppConfigFilePath = path.join(
			appDir,
			'src',
			'admin',
			customAdminAppConfigFile
		);
		const dest = path.resolve(
			cacheDir,
			'admin',
			'src',
			customAdminAppConfigFile
		);

		if (useTypeScript) {
			// Remove the default config file
			await fs.remove(defaultAdminConfigFilePath);
			// Copy the custom one
			await fs.copy(customAdminAppConfigFilePath, dest);
		} else {
			await fs.copy(customAdminAppConfigFilePath, dest);
		}
	}

	// Copy admin extensions folder
	const adminExtensionFolder = path.join(appDir, 'src', 'admin', 'extensions');

	if (fs.existsSync(adminExtensionFolder)) {
		await fs.copy(
			adminExtensionFolder,
			path.resolve(cacheDir, 'admin', 'src', 'extensions')
		);
	}

	// create plugins.js with plugins requires
	await createPluginsJs(pluginsWithFront, cacheDir);

	// create the tsconfig.json file so we can develop plugins in ts while being in a JS project
	// if (!useTypeScript) {
	// 	await tsUtils.admin.createTSConfigFile(cacheDir);
	// }
}

export default createCacheDir;
