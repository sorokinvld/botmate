import { useBotControllerGetBotsQuery } from '@api';

export const useBots = () => {
  const { data: bots } = useBotControllerGetBotsQuery();

  return {
    bots: bots ?? [],
  };
};
