import { Bot } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type InitialState = {
  activeBot: Bot | null;
};
const initialState: InitialState = {
  activeBot: null,
};

const botSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveBot(state, action: { payload: { bot: Bot } }) {
      const { bot } = action.payload;

      state.activeBot = bot;
    },
  },
});

export const botReducer = botSlice.reducer;
export const { setActiveBot } = botSlice.actions;

export const useActiveBot = () => {
  const bot = useSelector((state: RootState) => state.bot.activeBot);
  return bot as Bot;
};
