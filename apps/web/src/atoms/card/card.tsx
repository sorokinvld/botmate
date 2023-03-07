import {
  BoxProps,
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & BoxProps;
function Card({ title, description, icon, children, ...rest }: CardProps) {
  const bg = useColorModeValue('secondary.light', '#1d1e2b6e');

  return (
    <Box {...rest}>
      <Box mt={2} rounded="lg">
        <HStack alignItems="flex-start" opacity={0.7}>
          {icon && <Box fontSize="4xl">{icon}</Box>}
          <Box>
            <Heading color="white" size="md">
              {title}
            </Heading>
            <Text mt={1}>{description}</Text>
          </Box>
        </HStack>

        <Box mt={4}>{children}</Box>
      </Box>
    </Box>
  );
}

export { Card };
