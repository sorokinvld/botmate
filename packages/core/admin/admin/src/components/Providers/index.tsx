import React from 'react';
import { Platform } from '@botmate/types/admin';
import { BotMateAppProvider } from '@botmate/helper-plugin';
import { BotMateUIProvider } from '@botmate/ui';

type Props = {
  menu: any[];
  plugins: any;
  platforms: Map<string, Platform>;
  children: React.ReactNode;
};
function Providers({ menu, plugins, children, platforms }: Props) {
  return (
    <BotMateAppProvider menu={menu} plugins={plugins} platforms={platforms}>
      <BotMateUIProvider>{children}</BotMateUIProvider>
    </BotMateAppProvider>
  );
}

export default Providers;
