import { useMemo } from 'react';
import { AppShell, Spinner } from '@botmate/ui';
import { useBotMateApp } from '@botmate/helper-plugin';
import { Route, Routes } from 'react-router-dom';
import { BottomMenuLinks, TopMenuLinks } from './menu-items';
import loadable from '@loadable/component';

const HomePage = loadable(() => import('../../pages/Home'), {
  fallback: <Spinner />,
});
const SettingsPage = loadable(() => import('../../pages/Settings'), {
  fallback: <Spinner />,
});

function App() {
  const { menu } = useBotMateApp();

  const routes = useMemo(() => {
    return menu.map(({ to, Component }) => {
      return <Route key={to} path={to} element={Component} />;
    });
  }, [menu]);

  const menuItems = useMemo(() => {
    return menu.map(({ to, label, icon, match }) => {
      return {
        to,
        label,
        icon,
        match,
      };
    });
  }, [menu]);

  return (
    <AppShell menuItems={[...TopMenuLinks, ...menuItems, ...BottomMenuLinks]}>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/settings" Component={SettingsPage} />
        {routes}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </AppShell>
  );
}

export default App;
