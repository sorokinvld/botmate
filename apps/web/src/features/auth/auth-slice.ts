import { UserProps } from '@/libs/api';
import { RootState } from '@/libs/redux/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null as UserProps | null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: { payload: { user: UserProps } }) {
      const { user } = action.payload;

      state.user = user;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;
