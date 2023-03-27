import React from 'react';
import { Box, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

type CardProps = {
  name: string;
  avatar?: any;
  id: string | number;
  onStart?: () => void;
  onStop?: () => void;
};
function BotCard({ id, name, avatar = null, onStart, onStop }: CardProps) {
  return (
    <Box p={4} bg="surface" borderWidth="1px" rounded="lg">
      <HStack alignItems="flex-start">
        {avatar}
        <Box>
          <Heading size="sm">{name}</Heading>
          <Text color="GrayText">{id}</Text>
        </Box>
        <Spacer />
      </HStack>
    </Box>
  );
}

export { BotCard };
