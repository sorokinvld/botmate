import { AppHeader, Box, Container, Text, SimpleGrid, StatsCard } from '@botmate/ui';
import { useBotMateApp, useBots } from '@botmate/helper-plugin';
import { Heading } from '@chakra-ui/react';

function HomePage() {
  const { platforms } = useBotMateApp();
  const { currentBot } = useBots();
  console.log('currentBot', currentBot);

  return (
    <Box flex={1}>
      <AppHeader title="Home" />

      <Container maxW="full" py={4}>
        <Heading size="sm" color="text" mb={5}>
          Welcome back, Monawwar!
        </Heading>

        <SimpleGrid spacing={4} columns={{ base: 1, lg: 4 }} mt={2}></SimpleGrid>
      </Container>
    </Box>
  );
}

export default HomePage;
