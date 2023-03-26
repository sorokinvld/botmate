import React from 'react';
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';

type AppHeaderProps = {
  title: string;
  description?: string;
};

export const AppHeader = ({ title, description }: AppHeaderProps) => (
  <Stack flex={1}>
    <HStack py={6} px={4} bg="surface">
      <Box>
        <Heading size="md">{title}</Heading>
      </Box>
    </HStack>

    {description ? (
      <Text px={4} color="text">
        {description}
      </Text>
    ) : null}
  </Stack>
);
