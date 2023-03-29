import React from 'react';
import { Flex, Stack, Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import { AppMenuItem, AppMenu } from '../AppMenu';
import { useMenu } from '../../hooks/useMenu';

type AppShellProps = {
  children?: React.ReactNode;
  menuItems: AppMenuItem[];
  iconsOnly?: boolean;
  menuHeader?: React.ReactNode;
};
function AppShell({ children, menuItems, iconsOnly = false, menuHeader }: AppShellProps) {
  const { open, setOpen } = useMenu();

  return (
    <Flex h="100vh" overflow="hidden" bg="background">
      <Stack
        flex={1}
        w="230px"
        maxW="230px"
        flexDirection="column"
        overflowY="auto"
        overflow="auto"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        <AppMenu iconsOnly={iconsOnly} header={menuHeader} items={menuItems} />
      </Stack>

      <Drawer isOpen={open} placement="left" onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <AppMenu iconsOnly={iconsOnly} header={menuHeader} items={menuItems} />
        </DrawerContent>
      </Drawer>

      <Flex flexDirection="column" flex={1} overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
}

export { AppShell };
