import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IBotMateApp, MenuLink, Platform } from '@botmate/types/admin';
import { lazy } from '@loadable/component';
import { AuthProvider } from '@botmate/helper-plugin';
import Providers from './components/Providers';
import { BotMateUIProvider } from '@botmate/ui';

const App = lazy(() => import('./components/App'));
const SetupPage = lazy(() => import('./pages/Setup'));

class BotMateApp implements IBotMateApp {
  appPlugins: any;
  plugins: any;
  platforms: {
    [key: string]: Platform;
  } = {};
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
    this.platforms[platform.id] = platform;
  }

  render() {
    return (
      <BotMateUIProvider>
        <AuthProvider>
          <BrowserRouter>
            <Providers menu={this.menu} platforms={this.platforms} plugins={[]}>
              <Routes>
                <Route path="/setup" element={<SetupPage />} />
                <Route path="*" element={<App />} />
              </Routes>
            </Providers>
          </BrowserRouter>
        </AuthProvider>
      </BotMateUIProvider>
    );
  }
}

export default BotMateApp;
