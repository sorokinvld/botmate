'use strict';

import { join } from 'path';
import fse from 'fs-extra';
import { defaultsDeep, getOr, get } from 'lodash/fp';
import { env } from '@botmate/utils';
import loadConfigFile from '../../app-configuration/load-config-file';
import loadFiles from '../../../load/load-files';
import getEnabledPlugins from './get-enabled-plugins';
import getUserPluginsConfig from './get-user-plugins-config';

const defaultPlugin = {
	bootstrap() {},
	destroy() {},
	register() {},
	config: {
		default: {},
		validator() {},
	},
};

const applyUserExtension = async (plugins) => {
	const extensionsDir = botmate.dirs.dist.extensions;
	if (!(await fse.pathExists(extensionsDir))) {
		return;
	}

	const botmateServers = await loadFiles(extensionsDir, '**/botmate-server.js');

	for (const pluginName of Object.keys(plugins)) {
		const plugin = plugins[pluginName];
		// execute botmate-server extension
		const botmateServer = get([pluginName, 'botmate-server'], botmateServers);
		if (botmateServer) {
			plugins[pluginName] = await botmateServer(plugin);
		}
	}
};

const applyUserConfig = async (plugins) => {
	const userPluginsConfig = await getUserPluginsConfig();

	for (const pluginName of Object.keys(plugins)) {
		const plugin = plugins[pluginName];
		const userPluginConfig = getOr(
			{},
			`${pluginName}.config`,
			userPluginsConfig
		);
		const defaultConfig =
			typeof plugin.config.default === 'function'
				? plugin.config.default({ env })
				: plugin.config.default;

		const config = defaultsDeep(defaultConfig, userPluginConfig);
		try {
			plugin.config.validator(config);
		} catch (e) {
			throw new Error(`Error regarding ${pluginName} config: ${e.message}`);
		}
		plugin.config = config;
	}
};

const loadPlugins = async (botmate: BotMate.BotMateInstance) => {
	const plugins = {};

	const enabledPlugins = await getEnabledPlugins(botmate);

	botmate.config.set('enabledPlugins', enabledPlugins);

	for (const pluginName of Object.keys(enabledPlugins)) {
		const enabledPlugin = enabledPlugins[pluginName];

		let serverEntrypointPath;

		try {
			serverEntrypointPath = join(
				enabledPlugin.pathToPlugin,
				'botmate-server.js'
			);
		} catch (e) {
			throw new Error(
				`Error loading the plugin ${pluginName} because ${pluginName} is not installed. Please either install the plugin or remove it's configuration.`
			);
		}

		// only load plugins with a server entrypoint
		if (!(await fse.pathExists(serverEntrypointPath))) {
			continue;
		}

		const pluginServer = loadConfigFile(serverEntrypointPath);
		plugins[pluginName] = defaultsDeep(defaultPlugin, pluginServer);
	}

	// TODO: validate plugin format
	await applyUserConfig(plugins);
	await applyUserExtension(plugins);

	for (const pluginName of Object.keys(plugins)) {
		botmate.container.get('plugins').add(pluginName, plugins[pluginName]);
	}
};

export default loadPlugins;
