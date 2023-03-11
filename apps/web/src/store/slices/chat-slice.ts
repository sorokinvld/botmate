import { Chat } from '@api';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  activeChat: Chat | null;
};
const initialState: InitialState = {
  activeChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat(state, action: { payload: { chat: Chat } }) {
      const { chat } = action.payload;

      state.activeChat = chat;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { setActiveChat } = chatSlice.actions;
