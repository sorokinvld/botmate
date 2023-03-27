import React from 'react';
import { Box, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { AppMenuItem, AppMenu } from '../AppMenu';

type AppShellProps = {
  children?: React.ReactNode;
  menuItems: AppMenuItem[];
};
function AppShell({ children, menuItems }: AppShellProps) {
  const menuWidth = useBreakpointValue({
    base: '50px',
    md: '270px',
  });
  return (
    <Flex h="100vh" overflow="hidden" bg="background">
      <Stack
        p={4}
        flex={1}
        w={menuWidth}
        maxW={menuWidth}
        flexDirection="column"
        overflowY="auto"
        overflow="auto"
        rounded="lg"
      >
        <AppMenu items={menuItems} />
      </Stack>

      <Flex alignItems="flex-start" flex={1} overflow="auto" py={4}>
        {children}
      </Flex>
    </Flex>
  );
}

export { AppShell };
