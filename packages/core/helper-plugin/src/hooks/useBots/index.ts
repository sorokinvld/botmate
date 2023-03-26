import { useContext } from 'react';
import { botsContext } from '../../contexts/bots';

export const useBots = () => {
  const { bots } = useContext(botsContext);
  const currentBot = bots[0];

  return {
    bots,
    currentBot,
  };
};
