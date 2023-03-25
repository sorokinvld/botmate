import { Heading, HStack } from '@chakra-ui/react';

type AppHeaderProps = {
  title: string;
};

export const AppHeader = ({ title }: AppHeaderProps) => (
  <HStack py={6} px={4} bg="surface" flex={1}>
    <Heading size="md">{title}</Heading>
  </HStack>
);
