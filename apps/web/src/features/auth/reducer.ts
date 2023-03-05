import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@prisma/client';
import { LoginUserDTO } from 'common';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    isUserFirst: builder.query<boolean, void>({
      query: () => '/users/is-first-user',
    }),
    getProfile: builder.query<User, void>({
      query: () => '/users/profile',
    }),
    login: builder.mutation<User, LoginUserDTO>({
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
