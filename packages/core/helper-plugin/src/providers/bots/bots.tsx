import React, { useEffect, useState } from 'react';
import { botsContext } from '../../contexts/bots';
import { useService } from '../../hooks/useService';

export type BotProviderProps = {
  children?: React.ReactNode;
};
const BotsProvider = (props: BotProviderProps) => {
  const [bots, setBots] = useState([]);

  const botsService = useService('bots');
  const [activeBot, setActiveBot] = useState(null);

  useEffect(() => {
    botsService.runService('bot.find').then((data) => {
      const activeBotId = localStorage.getItem('active-bot-id');
      if (!activeBot) {
        localStorage.setItem('active-bot-id', data[0].id);
      }

      setActiveBot(data.find((bot) => bot.id === activeBotId));
      setBots(data);
    });
  }, []);

  return (
    <botsContext.Provider
      value={{
        bots,
        isLoading: botsService.loading,
        activeBot,
        setActiveBot(bot) {
          localStorage.setItem('active-bot-id', bot.id);
          window.location.reload();
        },
      }}
    >
      {props.children}
    </botsContext.Provider>
  );
};
export { BotsProvider };
