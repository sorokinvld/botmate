import React, { useMemo, useState } from 'react';
import {
  BotMateLogo,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  Input,
  Stack,
  Button,
} from '@botmate/ui';
import { useBotMateApp } from '@botmate/helper-plugin';

function SetupPage() {
  const { platforms } = useBotMateApp();
  const keys = useMemo(() => Object.keys(platforms), [platforms]);
  const [activePlatform, setActivePlatform] = useState(keys[0]);

  return (
    <Flex h="100vh" overflow="hidden" bg="background" alignItems="center">
      <Container maxW="xl">
        <Box p={6} bg="surface" borderWidth="1px">
          <BotMateLogo height="45px" width="45px" color="white" />

          <HStack mt={4}>
            <Heading size="md">Select your bot platform</Heading>
          </HStack>

          <HStack mt={6} userSelect="none">
            {keys.map((platform) => {
              const isActive = activePlatform === platform;

              return (
                <HStack
                  p={2}
                  rounded="md"
                  bg={isActive ? 'secondary' : 'surface'}
                  color={isActive ? 'brand.400' : 'text'}
                  fontWeight={isActive ? 'bold' : 'normal'}
                  onClick={() => {
                    setActivePlatform(platform);
                  }}
                >
                  <Box>{platforms[platform].icon}</Box>
                  <Text>{platforms[platform].label}</Text>
                </HStack>
              );
            })}
          </HStack>

          <Stack mt={3}>
            {platforms[activePlatform].bot.fields.map((field) => {
              return <Input key={field.name} placeholder={field.label} />;
            })}
          </Stack>

          <Button mt={4}>Continue</Button>
        </Box>
      </Container>
    </Flex>
  );
}

export default SetupPage;
