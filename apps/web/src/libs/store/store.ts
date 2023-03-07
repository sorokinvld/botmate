import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './base-query';

import { authReducer } from './slices/auth-slice';
import { botReducer } from './slices/bot-slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    bot: botReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...[apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
