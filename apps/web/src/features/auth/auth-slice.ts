import { RootState } from '@/libs/redux/store';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isUserFirst: false,
    accessToken: null,
  },
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
