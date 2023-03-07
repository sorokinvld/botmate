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
          body: queryArg.createUserDto,
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
      botControllerCreateBot: build.mutation<
        BotControllerCreateBotApiResponse,
        BotControllerCreateBotApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bots`,
          method: 'POST',
          body: queryArg.createBotDto,
        }),
        invalidatesTags: ['bot'],
      }),
      botControllerStartBot: build.mutation<
        BotControllerStartBotApiResponse,
        BotControllerStartBotApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bots/${queryArg.id}/start`,
          method: 'POST',
        }),
        invalidatesTags: ['bot'],
      }),
      botControllerStopBot: build.mutation<
        BotControllerStopBotApiResponse,
        BotControllerStopBotApiArg
      >({
        query: (queryArg) => ({
          url: `/api/bots/${queryArg.id}/stop`,
          method: 'POST',
        }),
        invalidatesTags: ['bot'],
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
  createUserDto: CreateUserDto;
};
export type BotControllerGetBotsApiResponse =
  /** status 200 Get all bots */ Bot[];
export type BotControllerGetBotsApiArg = void;
export type BotControllerCreateBotApiResponse =
  /** status 200  */ OmitTypeClass;
export type BotControllerCreateBotApiArg = {
  createBotDto: CreateBotDto;
};
export type BotControllerStartBotApiResponse =
  /** status 200 Start bot */ BotStartStopResponse;
export type BotControllerStartBotApiArg = {
  /** Bot ID to start */
  id: string;
};
export type BotControllerStopBotApiResponse =
  /** status 200 Stop bot */ BotStartStopResponse;
export type BotControllerStopBotApiArg = {
  /** Bot ID to stop */
  id: string;
};
export type Bot = {
  id: string;
  first_name: string;
  username: string;
  token: string;
  avatar?: string;
  status?: 'active' | 'inactive' | 'error';
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
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};
export type OmitTypeClass = {
  id: string;
  first_name: string;
  username: string;
  token: string;
  avatar?: string;
  status?: 'active' | 'inactive' | 'error';
  createdAt?: string;
};
export type CreateBotDto = {
  token: string;
};
export type BotStartStopResponse = {};
export const {
  useUsersControllerProfileQuery,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
  useBotControllerGetBotsQuery,
  useBotControllerCreateBotMutation,
  useBotControllerStartBotMutation,
  useBotControllerStopBotMutation,
} = injectedRtkApi;
