import {
  BoxProps,
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
} & BoxProps;
function Card({
  title,
  description,
  icon,
  children,
  action,
  ...rest
}: CardProps) {
  return (
    <Box {...rest}>
      <Box mt={2} rounded="lg">
        <HStack alignItems="flex-start">
          {icon ? <Box fontSize="4xl">{icon}</Box> : null}
          <Box opacity={0.7}>
            <Heading color="white" size="md">
              {title}
            </Heading>
            <Text mt={1}>{description}</Text>
          </Box>
          <Spacer />
          {action}
        </HStack>

        <Box mt={4}>{children}</Box>
      </Box>
    </Box>
  );
}

export { Card };
