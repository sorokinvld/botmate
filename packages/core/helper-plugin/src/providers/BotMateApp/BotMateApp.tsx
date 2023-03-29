import React from 'react';
import { botMateAppContext } from '../../contexts/botMateApp';
import { MenuLink, Platform } from '@botmate/types/admin';

export type BotMateAppProviderProps = {
  children?: React.ReactNode;
  plugins: any[];
  apiBaseUrl: string;
  menu: MenuLink[];
  platforms: {
    [key: string]: Platform;
  };
};
function BotMateAppProvider({
  children,
  plugins,
  menu,
  apiBaseUrl,
  platforms,
}: BotMateAppProviderProps) {
  return (
    <botMateAppContext.Provider
      value={{
        plugins,
        menu,
        apiBaseUrl,
        platforms,
      }}
    >
      {children}
    </botMateAppContext.Provider>
  );
}

export { BotMateAppProvider };
