import React, { useEffect } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { BotMateLogo } from '@/assets/logo';
import { setCredentials, useLoginMutation } from '@/features/auth';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { ApiResponse, CreateUserDTO } from 'common';
import { useDispatch } from 'react-redux';

// todd: add framer motion animation and multi steps
function Welcome() {
  const toast = useToast();
  const [login, { isLoading, error }] = useLoginMutation();
  const form = useForm<CreateUserDTO>();
  const dispatch = useDispatch();

  useEffect(() => {
    const err = error as ApiResponse<any>;
    if (err) {
      const message = err.data?.message;
      toast({
        title: 'An error occurred.',
        description: message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
      });
    }
  }, [error]);

  async function loginUser(data: CreateUserDTO) {
    const response = await login(data).unwrap();
    dispatch(setCredentials(response));
    localStorage.setItem('botmate-token', response.accessToken);
  }

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

        <form onSubmit={form.handleSubmit(loginUser)}>
          <Stack mt={6} spacing={6}>
            <FormControl>
              <FormLabel> Email</FormLabel>
              <Input {...form.register('email')} placeholder="Email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input {...form.register('password')} placeholder="Password" />
            </FormControl>

            <Button type="submit" variant="solid" isLoading={isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default Welcome;
