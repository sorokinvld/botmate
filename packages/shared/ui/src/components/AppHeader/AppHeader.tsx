import React from 'react';
import { Box, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

type AppHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export const AppHeader = ({ actions, title, description }: AppHeaderProps) => (
  <Stack flex={1} borderBottomWidth="1px">
    <HStack h="70px" px={4} bg="surface">
      <Box>
        <Heading size="md">{title}</Heading>
      </Box>
      <Spacer />
      {actions}
    </HStack>

    {description ? (
      <Text px={4} color="text">
        {description}
      </Text>
    ) : null}
  </Stack>
);
