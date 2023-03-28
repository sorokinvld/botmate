import React from 'react';
import { Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { AppMenuItem, AppMenu } from '../AppMenu';

type AppShellProps = {
  children?: React.ReactNode;
  menuItems: AppMenuItem[];
  iconsOnly?: boolean;
  menuHeader?: React.ReactNode;
};
function AppShell({ children, menuItems, iconsOnly = false, menuHeader }: AppShellProps) {
  const menuWidth = useBreakpointValue({
    base: '50px',
    md: '230px',
  });
  return (
    <Flex h="100vh" overflow="hidden" bg="background">
      <Stack
        flex={1}
        w={menuWidth}
        maxW={menuWidth}
        flexDirection="column"
        overflowY="auto"
        overflow="auto"
      >
        <AppMenu iconsOnly={iconsOnly} header={menuHeader} items={menuItems} />
      </Stack>

      <Flex flexDirection="column" flex={1} overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
}

export { AppShell };
