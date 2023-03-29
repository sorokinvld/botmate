import {
  AppShell,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Center,
  HStack,
  Spacer,
  Text,
  IconButton,
  Button,
  Box,
  Stack,
  BotMateLogo,
} from '@botmate/ui';
import { IBot } from '@botmate/types/server';
import { Route, Routes } from 'react-router-dom';
import { useBots } from '@botmate/helper-plugin';
import { Loader } from '@botmate/ui';
import { AppMenuLinks } from './constants/menu';

import HomePage from '../../pages/Home';
import PluginsPage from '../../pages/Plugins';
import ScriptsPage from '../../pages/Scripts';
import MarketplacePage from '../../pages/Marketplace';
import SettingsPage from '../../pages/Settings';
import { TbMenu2 } from 'react-icons/tb';

type MenuHeaderProps = {
  bots: IBot[];
};
const MenuHeader = ({ bots }: MenuHeaderProps) => {
  const { activeBot, setActiveBot } = useBots();

  return (
    <HStack py={6} px={4}>
      <Box bg="brand.400" p={2} rounded="md">
        <BotMateLogo color="white" height="25px" width="25px" />
      </Box>

      <Spacer />
      <Menu placement="right">
        <MenuButton as={IconButton} aria-label="Options" icon={<TbMenu2 />} variant="outline" />
        <MenuList userSelect="none">
          <Stack spacing={2}>
            {bots.map((bot) => {
              const isActive = activeBot?.id === bot.id;

              return (
                <HStack
                  px={4}
                  key={bot.id}
                  cursor="pointer"
                  borderLeftWidth="4px"
                  borderLeftColor={isActive ? 'brand.400' : 'transparent'}
                  _hover={{
                    color: 'brand.400',
                  }}
                  onClick={() => {
                    setActiveBot(bot);
                  }}
                >
                  <Text>{bot.name}</Text>
                </HStack>
              );
            })}
          </Stack>
          <MenuDivider opacity={0.2} />
          <Box px={2}>
            <a href="/setup">
              <Button variant="brand" size="xs">
                Add new bot
              </Button>
            </a>
          </Box>
        </MenuList>
      </Menu>
    </HStack>
  );
};

function App() {
  const { isLoading, bots } = useBots();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader text="loading bot data..." />
      </Center>
    );
  }

  return (
    <>
      <AppShell menuItems={AppMenuLinks} menuHeader={<MenuHeader bots={bots} />}>
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
