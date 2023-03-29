import { useMemo, useState } from 'react';
import {
  BotMateLogo,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  Input,
  Stack,
  Button,
} from '@botmate/ui';
import { useForm } from 'react-hook-form';
import { useBotMateApp, useService } from '@botmate/helper-plugin';

function SetupPage() {
  const form = useForm();
  const service = useService();
  const { platforms } = useBotMateApp();
  const keys = useMemo(() => Object.keys(platforms), [platforms]);
  const [activePlatform, setActivePlatform] = useState(keys[0]);

  const submit = (data: any) => {
    const secrets: any = {};

    platforms[activePlatform].bot.fields.forEach((field: any) => {
      secrets[field.name] = data[field.name];
    });

    service.runService('bots', `bot.create`, { platform: activePlatform, secrets }).then((data) => {
      console.log('data', data);
    });
  };

  return (
    <Flex h="100vh" overflow="hidden" bg="background" alignItems="center">
      <Container maxW="lg">
        <form onSubmit={form.handleSubmit(submit)}>
          <Box p={6} bg="surface" borderWidth="1px" rounded="xl">
            <BotMateLogo height="45px" width="45px" color="logo" />

            <HStack mt={4}>
              <Heading size="md">Select your bot platform</Heading>
            </HStack>

            <HStack mt={6} userSelect="none">
              {keys.map((platform) => {
                const isActive = activePlatform === platform;

                return (
                  <HStack
                    p={2}
                    key={platform}
                    rounded="lg"
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
                return (
                  <Input
                    key={field.name}
                    placeholder={field.label}
                    {...form.register(field.name)}
                  />
                );
              })}
            </Stack>

            <Button type="submit" variant="brand" mt={4}>
              Continue
            </Button>
          </Box>
        </form>
      </Container>
    </Flex>
  );
}

export default SetupPage;
