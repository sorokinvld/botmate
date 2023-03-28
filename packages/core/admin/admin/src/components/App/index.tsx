import { AppShell, BotMateLogo, Box, Heading, HStack, Text } from '@botmate/ui';
import { Route, Routes } from 'react-router-dom';
import { AppMenuLinks } from './constants/menu';

import HomePage from '../../pages/Home';
import PluginsPage from '../../pages/Plugins';
import ScriptsPage from '../../pages/Scripts';
import MarketplacePage from '../../pages/Marketplace';
import SettingsPage from '../../pages/Settings';

const MenuHeader = () => (
  <HStack px={4} py={6}>
    <Box bg="brand.400" p={2} rounded="md">
      <BotMateLogo color="white" height="25px" width="25px" />
    </Box>

    <Box>
      <Heading size="sm">BotMate</Heading>
      <Text color="GrayText">v0.0.1-prerelease.24</Text>
    </Box>
  </HStack>
);

function App() {
  return (
    <>
      <AppShell menuItems={AppMenuLinks} menuHeader={<MenuHeader />}>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/scripts" Component={ScriptsPage} />
          <Route path="/plugins" Component={PluginsPage} />
          <Route path="/marketplace" Component={MarketplacePage} />
          <Route path="/settings" Component={SettingsPage} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </AppShell>
    </>
  );
}

export default App;
