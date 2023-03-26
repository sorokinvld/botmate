import { Box } from '@chakra-ui/react';

type CardProps = {
  children?: React.ReactNode;
};
function BmCard({ children }: CardProps) {
  return <Box>{children}</Box>;
}

export { BmCard };
