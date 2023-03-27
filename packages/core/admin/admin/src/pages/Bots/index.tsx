import {
  AppHeader,
  Box,
  Container,
  SimpleGrid,
  BotCard,
  ButtonGroup,
  Button,
  HStack,
  Badge,
  Spacer,
  IconButton,
  Heading,
  Text,
  AppShell,
  Flex,
  Stack,
} from '@botmate/ui';
import { useBots } from '@botmate/helper-plugin';
import {
  TbBrandDiscord,
  TbBrandTelegram,
  TbEdit,
  TbPencil,
  TbPlayCard,
  TbPlayerPlay,
  TbSettings,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';

function MyBots() {
  const { currentBot } = useBots();

  return (
    <Box flex={1}>
      <AppHeader title="My Bots" />

      <Container maxW="full" py={4}>
        <SimpleGrid spacing={4} columns={{ base: 1, lg: 2, xl: 4 }} mt={2}>
          <Box p={4} bg="surface" borderWidth="1px" rounded="lg">
            <HStack alignItems="flex-start">
              <Box>
                <Heading size="sm">Bot 1</Heading>
                <Text mt={1} fontSize="sm" color="GrayText">
                  Added 2 days ago
                </Text>
              </Box>
              <Spacer />
              <TbBrandTelegram size={24} opacity={0.5} />
            </HStack>

            <HStack mt={4}>
              <ButtonGroup size="sm" variant="outline">
                <Link to="/bots/5casd9123129a9a">
                  <IconButton aria-label="edit" icon={<TbEdit />} />
                </Link>
                <IconButton aria-label="edit" icon={<TbPlayerPlay />} />
              </ButtonGroup>
              <Spacer />
            </HStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default MyBots;
