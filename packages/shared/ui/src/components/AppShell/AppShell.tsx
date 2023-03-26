import React from 'react';
import { Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { AppMenuItem, AppMenu } from '../AppMenu';

type AppShellProps = {
  children?: React.ReactNode;
  menuItems: AppMenuItem[];
};
function AppShell({ children, menuItems }: AppShellProps) {
  const menuWidth = useBreakpointValue({
    base: '50px',
    md: '230px',
  });
  return (
    <Flex h="100vh" overflow="hidden">
      <Stack
        flexDirection="column"
        w={menuWidth}
        bg="surface"
        overflowY="auto"
        overflow="auto"
        py={4}
        borderRightWidth="1px"
      >
        <AppMenu items={menuItems} />
      </Stack>

      <Flex alignItems="flex-start" flex={1} bg="background" overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
}

export { AppShell };
