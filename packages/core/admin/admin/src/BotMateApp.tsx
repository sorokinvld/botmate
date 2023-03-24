import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IBotMateApp, MenuLink } from '@botmate/types/admin';

import App from './components/App';
import Providers from './components/Providers';

class BotMateApp implements IBotMateApp {
	appPlugins: any;
	plugins: any;
	platforms: {
		[name: string]: any;
	};
	menu: MenuLink[];

	constructor({ appPlugins = {} }) {
		this.appPlugins = appPlugins;
		this.plugins = {};
		this.platforms = {};
		this.menu = [];

		this.init();
	}

	addMenuLink(link: any) {
		this.menu.push(link);
	}

	init() {
		const pluginKeys = Object.keys(this.appPlugins);
		for (let pluginName of pluginKeys) {
			console.debug(`Registering plugin ${pluginName}`);

			const plugin = this.appPlugins[pluginName];
			plugin.register(this);
		}
	}

	addPlatform(platform: any) {
		if (platform in this.platforms) {
			console.error(`Platform ${platform.name} already exists`);
		} else this.platforms[platform.name] = platform;
	}

	render() {
		return (
			<Providers menu={this.menu}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Providers>
		);
	}
}

export { BotMateApp };
