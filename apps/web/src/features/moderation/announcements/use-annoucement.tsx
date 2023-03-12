import { useAnnouncementsControllerCreateMutation } from '@api';
import { useActiveBot } from '@hooks';

export const useAnnoucement = () => {
  const activeBot = useActiveBot();
  const [create, { isLoading }] = useAnnouncementsControllerCreateMutation();

  const createAnnouncement = (chatId: string, text: string) => {
    if (!activeBot) {
      return;
    }

    create({
      botId: activeBot.id,
      chatId,
      createAnnouncementDto: {
        text,
      },
    });
  };

  return {
    createAnnouncement,
    isLoading,
  };
};
