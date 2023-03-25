import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IBotMateApp, MenuLink, Platform } from '@botmate/types/admin';

import App from './components/App';
import Providers from './components/Providers';

class BotMateApp implements IBotMateApp {
  appPlugins: any;
  plugins: any;
  platforms = new Map();
  menu: MenuLink[];

  constructor({ appPlugins = {} }) {
    this.appPlugins = appPlugins;
    this.plugins = {};
    this.menu = [];

    this.init();
  }

  addMenuLink(link: any) {
    this.menu.push(link);
  }

  init() {
    const pluginKeys = Object.keys(this.appPlugins);
    for (let pluginName of pluginKeys) {
      console.debug(`registering plugin ${pluginName}`);

      const plugin = this.appPlugins[pluginName];
      plugin.register(this);
    }
  }

  addPlatform(platform: Platform) {
    this.platforms.set(platform.id, platform);
  }

  render() {
    return (
      <Providers menu={this.menu} platforms={this.platforms} plugins={[]}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Providers>
    );
  }
}

export { BotMateApp };
