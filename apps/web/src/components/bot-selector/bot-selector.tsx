import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
  HStack,
  Text,
  Box,
  Heading,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { useActiveBot, useBots } from '@hooks';
import { setActiveBot } from '@store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

type BotSelectorProps = {
  isOpen: boolean;
  onClose: () => void;
};
function BotSelector({ isOpen, onClose }: BotSelectorProps) {
  const { bots } = useBots();
  const activeBot = useActiveBot();
  const r = useRouter();
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Switch Bot</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4} overflow="auto" maxH="400px">
            {bots.map((bot) => {
              return (
                <HStack key={bot.id}>
                  <Box>
                    <Heading size="sm">{bot.first_name}</Heading>
                    <Text opacity={0.7}>@{bot.username}</Text>
                  </Box>
                  <Spacer />
                  <Button
                    variant="link"
                    size="sm"
                    isDisabled={bot.id === activeBot.id}
                    onClick={() => {
                      localStorage.setItem('activeBot', bot.id);
                      dispatch(
                        setActiveBot({
                          bot,
                        }),
                      );
                    }}
                  >
                    set active
                  </Button>
                </HStack>
              );
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button
              variant="solid"
              onClick={() => {
                r.push('/setup');
              }}
            >
              Add new bot
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { BotSelector };
