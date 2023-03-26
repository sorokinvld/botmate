import { Box } from '@chakra-ui/react';

type CardProps = {
  children?: React.ReactNode;
};
function Card({ children }: CardProps) {
  return <Box>{children}</Box>;
}

export { Card };
