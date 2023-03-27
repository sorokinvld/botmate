import { useMemo } from 'react';
import { AppShell, Spinner } from '@botmate/ui';
import { useBotMateApp } from '@botmate/helper-plugin';
import { Route, Routes } from 'react-router-dom';
import { AppMenuLinks } from './menu-items';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('../../pages/Home'));
const SettingsPage = loadable(() => import('../../pages/Settings'));
const PluginsPage = loadable(() => import('../../pages/Plugins'));

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
        <Route path="/settings" Component={SettingsPage} />
        {routes}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </AppShell>
  );
}

export default App;
