import { Box, HStack, Heading, Spacer, Text } from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  value: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg?: string;
}

function StatsCard({ bg, title, value, desc, icon, color }: StatsCardProps) {
  return (
    <Box p={4} bg={bg || 'surface'} borderWidth="1px" rounded="xl">
      <HStack>
        <Box>
          <Heading size="xs" textTransform="uppercase" color="text">
            {title}
          </Heading>
          <Heading mt={1}>{value}</Heading>
          <Text color="text" fontSize="sm" mt={2}>
            {desc}
          </Text>
        </Box>
        <Spacer />
        <Box color={color} fontSize="5xl">
          {icon}
        </Box>
      </HStack>
    </Box>
  );
}

export { StatsCard };
