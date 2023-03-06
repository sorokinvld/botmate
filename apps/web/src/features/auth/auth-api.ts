import { User } from '@prisma/client';
import { ApiResponse, LoginUserDTO } from 'common';
import { apiSlice } from '@/libs/redux/api';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    isUserFirst: builder.query<boolean, void>({
      query: () => '/users/is-first-user',
    }),
    getProfile: builder.query<User, void>({
      query: () => '/users/profile',
    }),
    login: builder.mutation<ApiResponse<any>, LoginUserDTO>({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useIsUserFirstQuery, useGetProfileQuery, useLoginMutation } =
  authApi;
export { authApi };
