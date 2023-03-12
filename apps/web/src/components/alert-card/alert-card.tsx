import { Box, Center, Heading, Text } from '@chakra-ui/react';

type InfoCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
function AlertCard({ icon, title, description }: InfoCardProps) {
  return (
    <Center h="full">
      <Box textAlign="center">
        <Center fontSize={54} opacity={0.6}>
          {icon}
        </Center>
        <Heading mt={2}>{title}</Heading>
        <Text mt={1} opacity={0.8}>
          {description}
        </Text>
      </Box>
    </Center>
  );
}

export { AlertCard };
