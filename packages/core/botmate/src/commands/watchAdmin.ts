'use strict';

import botmateAdmin from '@botmate/admin';
import { getConfigUrls, getAbsoluteServerUrl } from '@botmate/utils';

import getEnabledPlugins from '../core/loaders/plugins/get-enabled-plugins';
import addSlash from '../utils/add-slash';
import botmate from '../index';
import compile from '../compile';

export default async function ({ browser }) {
	const appContext = await compile();

	const botmateInstance = botmate({
		...appContext,
		autoReload: true,
		serveAdminPanel: false,
	});

	const plugins = await getEnabledPlugins(botmateInstance);

	const { adminPath } = getConfigUrls(botmateInstance.config, true);

	const adminPort = botmateInstance.config.get('admin.port', 8000);
	const adminHost = botmateInstance.config.get('admin.host', 'localhost');

	const backendURL = getAbsoluteServerUrl(botmateInstance.config, true);

	botmateAdmin.watchAdmin({
		appDir: appContext.appDir,
		buildDestDir: appContext.distDir,
		plugins,
		port: adminPort,
		host: adminHost,
		browser,
		options: {
			backend: backendURL,
			adminPath: addSlash(adminPath),
		},
	});
}
