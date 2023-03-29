import React from 'react';
import { Box, Heading, HStack, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { TbMenu2 } from 'react-icons/tb';
import { useMenu } from '../../hooks/useMenu';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export const AppHeader = ({ actions, title }: AppHeaderProps) => {
  const menu = useMenu();
  const isPhone = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Stack px={4} bg="surface" borderBottomWidth="1px" position="sticky">
      <HStack h="70px" spacing={4}>
        {isPhone && (
          <Box
            cursor="pointer"
            onClick={() => {
              menu.setOpen(true);
            }}
          >
            <TbMenu2 size={26} />
          </Box>
        )}
        <Heading size="md">{title}</Heading>
        {actions}
      </HStack>
    </Stack>
  );
};
