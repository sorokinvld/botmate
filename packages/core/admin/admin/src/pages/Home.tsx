import React from 'react';
import { FaCog, FaTelegram } from 'react-icons/fa';
import {
  AppHeader,
  Box,
  Container,
  BmCard,
  Text,
  SimpleGrid,
  Button,
  ButtonGroup,
} from '@botmate/ui';
import { useBotMateApp, useBots } from '@botmate/helper-plugin';
import Chart from 'react-apexcharts';

import { Heading, HStack, Spacer } from '@chakra-ui/react';
import { RiChat2Line, RiCheckLine, RiPlayLine } from 'react-icons/ri';

function HomePage() {
  const { platforms } = useBotMateApp();
  const { currentBot } = useBots();

  return (
    <Box flex={1}>
      <AppHeader title="Home" />

      <Container maxW="full" py={4}>
        <Heading size="sm" color="text" mb={5}>
          Welcome back, Monawwar!
        </Heading>

        <SimpleGrid spacing={4} columns={{ base: 1, lg: 4 }} mt={2}>
          <Box p={4} bg="surface" borderWidth="1px">
            <HStack>
              <Box>
                <Heading size="xs" textTransform="uppercase" color="text">
                  Bot Status
                </Heading>
                <Heading mt={1}>{currentBot.status === 'active' ? 'ON' : 'OFF'}</Heading>
                <Text color="text" fontSize="sm" mt={2}>
                  Bot is active and running
                </Text>
              </Box>
              <Spacer />
              <Box color="brand.400" fontSize="5xl">
                <RiCheckLine />
              </Box>
            </HStack>
          </Box>

          <Box p={4} bg="surface" borderWidth="1px">
            <HStack>
              <Box>
                <Heading size="xs" textTransform="uppercase" color="text">
                  User growth
                </Heading>
                <Heading>+253</Heading>
                <Text color="text" fontSize="sm" mt={2}>
                  Last 7 days
                </Text>
              </Box>
              <Spacer />
              <Chart
                width="100px"
                options={{
                  chart: {
                    animations: {
                      enabled: false,
                    },
                    sparkline: {
                      enabled: true,
                    },
                  },
                  tooltip: {
                    enabled: false,
                  },
                  colors: ['#7888f4'],
                }}
                series={[
                  {
                    name: 'users',
                    data: [40, 40, 55, 50, 49, 60, 70, 81],
                  },
                ]}
                type="area"
              />
            </HStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export { HomePage };
