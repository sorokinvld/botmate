import { AppShell, BotMateLogo, Box, Heading, HStack, Text } from '@botmate/ui';
import { Route, Routes } from 'react-router-dom';
import { AppMenuLinks } from './menu-items';

import HomePage from '../../pages/Home';
import MyBots from '../../pages/Bots';
import PluginsPage from '../../pages/Plugins';
import SettingsPage from '../../pages/Settings';
import MarketplacePage from '../../pages/Marketplace';
import BotManagePage from '../../pages/Bots/Manage';

const MenuHeader = () => (
  <HStack px={4} py={4}>
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
    <Routes>
      <Route path="/bots/:botId" Component={BotManagePage} />
      <Route path="/bots/:botId/*" Component={BotManagePage} />

      <Route
        path="*"
        element={
          <AppShell menuItems={AppMenuLinks} menuHeader={<MenuHeader />}>
            <Routes>
              <Route path="/" Component={HomePage} />
              <Route path="/bots" Component={MyBots} />
              <Route path="/plugins" Component={PluginsPage} />
              <Route path="/marketplace" Component={MarketplacePage} />
              <Route path="/settings" Component={SettingsPage} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  );
}

export default App;
