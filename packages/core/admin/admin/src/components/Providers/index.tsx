import React from 'react';
import { Platform } from '@botmate/types/admin';
import { BotMateAppProvider, BotsProvider } from '@botmate/helper-plugin';
import { BotMateUIProvider } from '@botmate/ui';

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
    <BotMateAppProvider menu={menu} plugins={plugins} platforms={platforms}>
      <BotsProvider
        bots={[
          {
            id: '1',
            name: 'Bot 1',
            platform: 'telegram',
            secret: {},
            status: 'active',
            createdAt: new Date().toString(),
          },
        ]}
      >
        <BotMateUIProvider>{children}</BotMateUIProvider>
      </BotsProvider>
    </BotMateAppProvider>
  );
}

export default Providers;
