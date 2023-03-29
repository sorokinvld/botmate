import React from 'react';
import {
  Flex,
  Stack,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { AppMenuItem, AppMenu } from '../AppMenu';
import { useMenu } from '../../hooks/useMenu';

type AppShellProps = {
  children?: React.ReactNode;
  menuItems: AppMenuItem[];
  iconsOnly?: boolean;
  menuHeader?: React.ReactNode;
};
function AppShell({ children, menuItems, iconsOnly = false, menuHeader }: AppShellProps) {
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });
  const { open, setOpen } = useMenu();

  return (
    <Flex h="100vh" overflow="hidden" bg="background">
      {isDesktop ? (
        <Stack
          flex={1}
          w="230px"
          maxW="230px"
          flexDirection="column"
          overflowY="auto"
          overflow="auto"
        >
          <AppMenu iconsOnly={iconsOnly} header={menuHeader} items={menuItems} />
        </Stack>
      ) : null}

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
