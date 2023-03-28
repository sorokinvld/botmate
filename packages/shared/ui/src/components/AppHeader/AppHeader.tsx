import React from 'react';
import { Box, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showBack?: boolean;
};

export const AppHeader = ({ actions, title, showBack }: AppHeaderProps) => {
  const nav = useNavigate();

  return (
    <Stack px={4} bg="surface" borderBottomWidth="1px" position="sticky">
      <HStack h="70px" spacing={4}>
        {showBack && (
          <Box onClick={() => nav(-1)} cursor="pointer">
            <TbArrowLeft size={26} />
          </Box>
        )}
        <Heading size="md">{title}</Heading>
        {actions}
      </HStack>
    </Stack>
  );
};
