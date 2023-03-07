import { User } from '@/libs/api';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  user: null as User | null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: { payload: { user: User } }) {
      const { user } = action.payload;

      state.user = user;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;
