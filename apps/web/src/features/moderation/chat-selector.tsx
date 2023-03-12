import { Avatar } from '@chakra-ui/react';
import { useChats } from 'src/hooks/use-chats';

type ChatSelectorProps = {
  // children: React.ReactNode;
};
function ChatSelector(props: ChatSelectorProps) {
  const { activeChat } = useChats();

  if (!activeChat) return null;

  return (
    <>
      <Avatar
        src={`http://localhost:8080/api/download/photo/${activeChat?.chat_id}.jpg`}
      />
    </>
  );
}

export { ChatSelector };
