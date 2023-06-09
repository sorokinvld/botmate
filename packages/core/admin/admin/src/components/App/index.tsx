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
  useBreakpointValue,
  PlacementWithLogical,
} from '@botmate/ui';
import { IBot } from '@botmate/types/server';
import { Link, Route, Routes } from 'react-router-dom';
import { useBots } from '@botmate/helper-plugin';
import { Loader } from '@botmate/ui';
import { AppMenuLinks } from './constants/menu';

import HomePage from '../../pages/Home';
import PluginsPage from '../../pages/Plugins';
import ScriptsPage from '../../pages/Scripts';
import MarketplacePage from '../../pages/Marketplace';
import SettingsPage from '../../pages/Settings';
import { TbMenu2 } from 'react-icons/tb';
import CreateScriptPage from '../../pages/Scripts/CreateScript';

type MenuHeaderProps = {
  bots: IBot[];
};
const MenuHeader = ({ bots }: MenuHeaderProps) => {
  const { activeBot, setActiveBot } = useBots();
  const position = useBreakpointValue({
    base: 'bottom',
    md: 'right',
  });

  return (
    <HStack py={4} px={4}>
      <Box bg="brand.400" p={2} rounded="md">
        <BotMateLogo color="white" height="25px" width="25px" />
      </Box>

      <Spacer />
      <Menu placement={position as PlacementWithLogical}>
        <MenuButton as={IconButton} aria-label="Options" icon={<TbMenu2 />} variant="outline" />
        <MenuList
          userSelect="none"
          shadow="lg"
          _dark={{
            shadow: 'dark-lg',
          }}
        >
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
          <MenuDivider opacity={0.1} />
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
  const { activeBot, isLoading, bots } = useBots();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader text="loading bot data..." />
      </Center>
    );
  }

  if (!activeBot) {
    return (
      <Center h="100vh">
        <a href="/setup">
          <Button variant="brand">Add new bot</Button>
        </a>
      </Center>
    );
  }

  return (
    <>
      <AppShell menuItems={AppMenuLinks} menuHeader={<MenuHeader bots={bots} />}>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/scripts" Component={ScriptsPage} />
          <Route path="/scripts/create" Component={CreateScriptPage} />
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
