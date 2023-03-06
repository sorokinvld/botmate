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
import { setUser } from '@/features/auth';
import { LoginUserDto, useAuthControllerLoginMutation } from '@/libs/api';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

// todd: add framer motion animation and multi steps
function Welcome() {
  const toast = useToast();
  const [login, { isLoading, error }] = useAuthControllerLoginMutation();
  const form = useForm<LoginUserDto>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
      });
    }
  }, [error]);

  async function loginUser(data: LoginUserDto) {
    try {
      const response = await login({ loginUserDto: data }).unwrap();
      dispatch(setUser(response));
      localStorage.setItem('botmate-token', response.accessToken);
      window.location.href = '/';
    } catch (e) {}
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
