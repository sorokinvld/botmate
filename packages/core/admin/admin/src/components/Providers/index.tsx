import React from 'react';
import { Platform } from '@botmate/types/admin';
import { BotMateAppProvider, BotsProvider } from '@botmate/helper-plugin';
import { BotMateUIProvider } from '@botmate/ui';

const BASE_URL = import.meta.env.VITE_APP_API_URL;

type Props = {
  menu: any[];
  plugins: any;
  platforms: {
    [key: string]: Platform;
  };
  children: React.ReactNode;
};
function Providers({ menu, plugins, children, platforms }: Props) {
  return (
    <BotMateAppProvider apiBaseUrl={BASE_URL} menu={menu} plugins={plugins} platforms={platforms}>
      <BotsProvider>
        <BotMateUIProvider>{children}</BotMateUIProvider>
      </BotsProvider>
    </BotMateAppProvider>
  );
}

export default Providers;
