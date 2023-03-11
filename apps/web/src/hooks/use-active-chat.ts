import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { Chat } from '@api';

export const useActiveChat = () => {
  const chat = useSelector((state: RootState) => state.chat.activeChat);

  return chat as Chat;
};
