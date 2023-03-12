import { useEffect } from 'react';
import { Chat, useChatControllerGetBotChatsQuery } from '@api';
import { useActiveBot } from './use-active-bot';
import { useDispatch } from 'react-redux';
import { setActiveChat } from '@store';

export const useChats = () => {
  const activeBot = useActiveBot();
  const dispatch = useDispatch();

  const { data: chats = [], isLoading } = useChatControllerGetBotChatsQuery({
    botId: activeBot.id,
    type: 'supergroup',
  });

  useEffect(() => {
    if (chats.length > 0) {
      dispatch(setActiveChat({ chat: chats[0] }));
    }
  }, [chats]);

  return {
    isLoading: isLoading,
    chats,
    activeChat: chats[0],
  } as {
    isLoading: boolean;
    chats: Chat[];
    activeChat: Chat;
  };
};
