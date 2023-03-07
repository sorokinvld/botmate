import Head from 'next/head';
import { Center, HStack, Spinner, Text } from '@chakra-ui/react';

type LoaderProps = {
  text: string;
};
function Loader({ text }: LoaderProps) {
  return (
    <Center h="100vh" opacity={0.7}>
      <Head>
        <title>Loading...</title>
      </Head>
      <HStack spacing={4}>
        <Spinner />
        <Text>{text}</Text>
      </HStack>
    </Center>
  );
}

export { Loader };
