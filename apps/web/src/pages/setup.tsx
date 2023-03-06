import React from 'react';
import {
  chakra,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';

function Setup() {
  return (
    <Flex h="100vh">
      <Head>
        <title>Setup BotMate</title>
      </Head>
      <Box w="4xl" m="auto">
        <SimpleGrid columns={10} spacing={8}>
          <GridItem colSpan={6}>
            <Box p={6} bg="secondary.dark" rounded="xl" shadow="dark-lg">
              <Heading size="md">🚀 Setup your first bot</Heading>
              <Text mt={2} opacity={0.8}>
                Before you contiue to the dashboard, you need to setup your
                first bot.
              </Text>

              <HStack mt={6}>
                <Input placeholder="Enter bot token" />
                <Button variant="solid">Contine</Button>
              </HStack>
            </Box>
          </GridItem>
          <GridItem colSpan={4}>
            <Box p={6} bg="secondary.dark" rounded="xl" shadow="dark-lg">
              <Heading size="md">How to get bot token?</Heading>
              <Text mt={2} opacity={0.8}>
                You can get your bot token from{' '}
                <chakra.a
                  fontWeight="bold"
                  href="https://t.me/botfather"
                  target="_blank"
                  _hover={{
                    opacity: 0.8,
                  }}
                >
                  @BotFather
                </chakra.a>{' '}
                on Telegram.
              </Text>

              <Heading mt={8} size="md">
                Need help?
              </Heading>
              <Text mt={2} opacity={0.8}>
                Join our official support group to get any kind of help.
              </Text>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Setup;
