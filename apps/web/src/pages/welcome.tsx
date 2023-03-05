import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BotMateLogo } from '@/assets/logo';
import { useAuth } from '@/features';
import Head from 'next/head';

// todd: add framer motion animation
function Welcome() {
  const {} = useAuth();

  return (
    <Flex h="100vh" px={{ base: 4, lg: 0 }}>
      <Head>
        <title>Welcome to BotMate</title>
      </Head>

      <Box
        p={6}
        m="auto"
        minW="md"
        shadow="dark-lg"
        rounded="xl"
        bg="secondary.dark"
      >
        <BotMateLogo width="30px" height="30px" color="white" />
        <Heading mt={6} size="md">
          Welcome to BotMate
        </Heading>
        <Text mt={1} opacity={0.8}>
          Please create an account to get started.
        </Text>

        <Stack mt={6} spacing={6}>
          <FormControl>
            <FormLabel> Email</FormLabel>
            <Input placeholder="Email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Email" />
          </FormControl>

          <Button variant="solid">Login</Button>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Welcome;
