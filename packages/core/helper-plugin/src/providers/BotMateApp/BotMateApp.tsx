import React from 'react';
import { botMateAppContext } from '../../contexts/BotMateApp';
import { MenuLink, Platform } from '@botmate/types/admin';

export type BotMateAppProviderProps = {
  children?: React.ReactNode;
  plugins: any[];
  menu: MenuLink[];
  platforms: {
    [key: string]: Platform;
  };
};
function BotMateAppProvider({ children, plugins, menu, platforms }: BotMateAppProviderProps) {
  return (
    <botMateAppContext.Provider
      value={{
        plugins,
        menu,
        platforms,
      }}
    >
      {children}
    </botMateAppContext.Provider>
  );
}

export { BotMateAppProvider };
