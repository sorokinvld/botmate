import React from 'react';
import { Box, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export const AppHeader = ({ actions, title, subtitle }: AppHeaderProps) => (
  <Stack flex={1}>
    <HStack pt={4} px={4}>
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
