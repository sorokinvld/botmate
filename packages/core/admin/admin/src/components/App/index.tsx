import React, { useEffect, useMemo, useState } from 'react';
import { useBotMateApp } from '@botmate/helper-plugin';
import { Route, Routes } from 'react-router-dom';
import { HomePage, SettingsPage } from '../../pages';
import { AppShell, Box } from '@botmate/ui';
import { HomeMenuLink, SettingsMenuLink } from './menu-items';

const LazyCompo = ({ loadComponent }) => {
  const [Compo, setCompo] = useState(null);

  useEffect(() => {
    const loadCompo = async () => {
      try {
        const loadedCompo = await loadComponent();

        setCompo(() => loadedCompo.default);
      } catch (err) {
        console.log(err);
      }
    };

    loadCompo();
  }, [loadComponent]);

  if (Compo) {
    return <Compo />;
  }

  return <Box />;
};

function App() {
  const { menu } = useBotMateApp();

  const routes = useMemo(() => {
    return menu.map(({ to, Component }) => {
      return <Route key={to} path={to} element={<Component />} />;
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
    <AppShell menuItems={[HomeMenuLink, ...menuItems, SettingsMenuLink]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {routes}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </AppShell>
  );
}

export default App;
