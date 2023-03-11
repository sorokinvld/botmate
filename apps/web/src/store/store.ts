import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './base-query';
import { mainReducer } from './main-slice';

import { authReducer } from './slices/auth-slice';
import { botReducer } from './slices/bot-slice';
import { chatReducer } from './slices/chat-slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    bot: botReducer,
    chat: chatReducer,
    main: mainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...[apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
