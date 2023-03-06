import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/features';
import { apiSlice } from './api';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...[apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
