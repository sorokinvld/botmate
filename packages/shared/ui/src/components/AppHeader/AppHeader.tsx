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

export const AppHeader = ({ actions, title, subtitle, showBack }: AppHeaderProps) => {
  const nav = useNavigate();

  return (
    <Stack flex={1} pt={2}>
      <HStack pt={4} px={4} h="70px">
        {showBack && (
          <Box onClick={() => nav(-1)} cursor="pointer">
            <TbArrowLeft size={26} />
          </Box>
        )}
        <Box>
          <Heading size="md">{title}</Heading>
          {subtitle ? (
            <Text mt={1} color="text">
              {subtitle}
            </Text>
          ) : null}
        </Box>
        <Spacer />
        {actions}
      </HStack>
    </Stack>
  );
};
