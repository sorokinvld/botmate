import { apiSlice as api } from './store/base-query';
export const addTagTypes = ['user', 'auth', 'bot'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      usersControllerProfile: build.query<
        UsersControllerProfileApiResponse,
        UsersControllerProfileApiArg
      >({
        query: () => ({ url: `/api/users/profile` }),
        providesTags: ['user'],
      }),
      authControllerLogin: build.mutation<
        AuthControllerLoginApiResponse,
        AuthControllerLoginApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/login`,
          method: 'POST',
          body: queryArg.loginUserDto,
        }),
        invalidatesTags: ['auth'],
      }),
      authControllerRegister: build.mutation<
        AuthControllerRegisterApiResponse,
        AuthControllerRegisterApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/register`,
          method: 'POST',
          body: queryArg.registerUserDto,
        }),
        invalidatesTags: ['auth'],
      }),
      botControllerGetBots: build.query<
        BotControllerGetBotsApiResponse,
        BotControllerGetBotsApiArg
      >({
        query: () => ({ url: `/api/bots` }),
        providesTags: ['bot'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as userApi };
export type UsersControllerProfileApiResponse =
  /** status 200 The user profile */ User;
export type UsersControllerProfileApiArg = void;
export type AuthControllerLoginApiResponse =
  /** status 200 Login successful */ LoginApiResponse;
export type AuthControllerLoginApiArg = {
  loginUserDto: LoginUserDto;
};
export type AuthControllerRegisterApiResponse =
  /** status 200  */ LoginApiResponse;
export type AuthControllerRegisterApiArg = {
  registerUserDto: RegisterUserDto;
};
export type BotControllerGetBotsApiResponse =
  /** status 200 Get all bots */ GetBotsDto[];
export type BotControllerGetBotsApiArg = void;
export type Bot = {
  id: number;
  first_name: string;
  username: string;
  token: string;
  avatar?: string;
  createdAt?: string;
  user: User;
};
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: 'admin' | 'user';
  createdAt?: string;
  bots: Bot[];
};
export type LoginApiResponse = {
  accessToken: string;
  user: User;
};
export type ErrorResponse = {
  message: string;
  statusCode: number;
};
export type LoginUserDto = {
  email: string;
  password: string;
};
export type RegisterUserDto = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: 'admin' | 'user';
  bots: Bot[];
};
export type GetBotsDto = {
  id: number;
  first_name: string;
  username: string;
  token: string;
  avatar?: string;
  createdAt?: string;
};
export const {
  useUsersControllerProfileQuery,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
  useBotControllerGetBotsQuery,
} = injectedRtkApi;
