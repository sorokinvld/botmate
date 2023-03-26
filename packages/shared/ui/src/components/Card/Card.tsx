import React from 'react';
import { Box, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

type CardProps = {
  title?: string;
  subtitle?: string;
  shadow?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};
function BmCard({ children, actions, title, subtitle, shadow }: CardProps) {
  return (
    <Box p={4} bg="surface" shadow={shadow ? 'md' : 'none'}>
      <HStack>
        <Heading size="md">{title}</Heading>
        <Spacer />
        {actions}
      </HStack>
      {subtitle ? <Text color="text">{subtitle}</Text> : null}
      <Stack mt={4}>{children}</Stack>
    </Box>
  );
}

export { BmCard };
