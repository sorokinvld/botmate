import React from 'react';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { TbMenu2 } from 'react-icons/tb';
import { useMenu } from '../../hooks/useMenu';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export const AppHeader = ({ actions, title }: AppHeaderProps) => {
  const menu = useMenu();

  return (
    <Stack px={4} bg="surface" borderBottomWidth="1px" position="sticky">
      <Flex h="70px" gap={4} alignItems="center">
        <Box
          cursor="pointer"
          onClick={() => {
            menu.setOpen(true);
          }}
          display={{
            base: 'block',
            md: 'none',
          }}
        >
          <TbMenu2 size={26} />
        </Box>
        <Heading size="md">{title}</Heading>
        {actions}
      </Flex>
    </Stack>
  );
};
