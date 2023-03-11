import { Bot, Chat } from '@api';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type InitialState = {
  activeChat: Chat | null;
  activeBot: Bot | null;
  version: string;
};
const initialState: InitialState = {
  activeChat: null,
  activeBot: null,
  version: '0.0.0',
};

// TODO: use main slice to store active chat, bot and other active things
const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setActiveChat(state, action: { payload: { chat: Chat } }) {
      const { chat } = action.payload;

      state.activeChat = chat;
    },
    setActiveBot(state, action: { payload: { bot: Bot } }) {
      const { bot } = action.payload;

      state.activeBot = bot;
    },
    setVersion(state, action: { payload: { version: string } }) {
      const { version } = action.payload;

      state.version = version;
    },
  },
});

export const mainReducer = mainSlice.reducer;
export const { setActiveChat } = mainSlice.actions;

export const selectVersion = (state: RootState) => state.main.version;
