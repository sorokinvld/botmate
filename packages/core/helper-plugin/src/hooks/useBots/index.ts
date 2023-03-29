import { useContext } from 'react';
import { botsContext } from '../../contexts/bots';

export const useBots = () => {
  const context = useContext(botsContext);
  return context;
};
