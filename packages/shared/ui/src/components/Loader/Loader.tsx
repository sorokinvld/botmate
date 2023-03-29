import { Center, HStack, Spinner, Text } from '@chakra-ui/react';

type LoaderProps = {
  text?: string;
};
function Loader({ text }: LoaderProps) {
  return (
    <Center>
      <HStack>
        <Spinner />
        <Text>{text}</Text>
      </HStack>
    </Center>
  );
}

export { Loader };
