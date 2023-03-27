import { AppShell, Avatar, Badge, Box, Heading, HStack, IconButton, Text } from '@botmate/ui';
import { TbArrowLeft } from 'react-icons/tb';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MenuLinks } from './constants/menu';

import ManageBotHomePage from './pages/Home';
import ManageBotScriptsPage from './pages/Scripts';
import ScriptsCreatePage from './pages/Scripts/create';
import ManageBotSettingsPage from './pages/Settings';

function BotManagePage() {
  const nav = useNavigate();

  return (
    <AppShell
      menuItems={MenuLinks}
      menuHeader={
        <Box>
          <HStack pt={4} px={4} onClick={() => nav('/bots')} cursor="pointer">
            <TbArrowLeft />
            <Text fontSize={12}>GO BACK</Text>
          </HStack>
          <HStack p={4}>
            <Avatar rounded="lg" name="Wackzy" bg="gray.700" />
            <Box>
              <Heading size="sm">Wackzy</Heading>
            </Box>
          </HStack>
        </Box>
      }
    >
      <Routes>
        <Route index Component={ManageBotHomePage} />
        <Route path="scripts" Component={ManageBotScriptsPage} />
        <Route path="scripts/create" Component={ScriptsCreatePage} />
        <Route path="settings" Component={ManageBotSettingsPage} />
      </Routes>
    </AppShell>
  );
}

export default BotManagePage;
