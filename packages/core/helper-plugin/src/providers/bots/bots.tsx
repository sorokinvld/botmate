import React from 'react';
import { IBot } from '@botmate/types/server';
import { botsContext } from '../../contexts/bots';

export type BotProviderProps = {
  bots: IBot[];
  children?: React.ReactNode;
};
const BotsProvider = (props: BotProviderProps) => {
  return (
    <botsContext.Provider
      value={{
        bots: props.bots,
      }}
    >
      {props.children}
    </botsContext.Provider>
  );
};
export { BotsProvider };
