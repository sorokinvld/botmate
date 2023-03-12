import {
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useActiveChat } from '@hooks';
import { useRef } from 'react';
import { useAnnoucement } from './use-annoucement';

type AnnoutcementsProps = {};
function CreateAnnouncement({}: AnnoutcementsProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { createAnnouncement } = useAnnoucement();
  const activeChat = useActiveChat();

  return (
    <Stack spacing={4}>
      <Heading size="sm">New Announcement</Heading>
      <Textarea
        ref={inputRef}
        variant="brand"
        placeholder="Enter text"
        resize="none"
        rows={6}
      />

      <ButtonGroup>
        <Button
          variant="solid"
          onClick={() => {
            createAnnouncement(
              activeChat.chat_id,
              inputRef.current?.value || '',
            );
          }}
        >
          Send
        </Button>
        <Button>Multiple groups</Button>
      </ButtonGroup>
    </Stack>
  );
}

export { CreateAnnouncement };
