import { useMemo } from 'react';
import { AppShell, Spinner } from '@botmate/ui';
import { useBotMateApp } from '@botmate/helper-plugin';
import { Route, Routes } from 'react-router-dom';
import { AppMenuLinks } from './menu-items';

import HomePage from '../../pages/Home';
import PluginsPage from '../../pages/Plugins';
import SettingsPage from '../../pages/Settings';
import MarketplacePage from '../../pages/Marketplace';

function App() {
  const { menu } = useBotMateApp();

  const routes = useMemo(() => {
    return menu.map(({ to, Component }) => {
      return <Route key={to} path={to} element={Component} />;
    });
  }, [menu]);

  return (
    <AppShell menuItems={AppMenuLinks}>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/plugins" Component={PluginsPage} />
        <Route path="/marketplace" Component={MarketplacePage} />
        <Route path="/settings" Component={SettingsPage} />
        {routes}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </AppShell>
  );
}

export default App;
