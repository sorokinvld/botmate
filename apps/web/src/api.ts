import { apiSlice as api } from '@store';
export const addTagTypes = ['user', 'auth', 'bot', 'command'] as const;
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
      commandControllerGetCommands: build.query<
        CommandControllerGetCommandsApiResponse,
        CommandControllerGetCommandsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/commands`,
          params: { botId: queryArg.botId },
        }),
        providesTags: ['command'],
      }),
      commandControllerCreateCommand: build.mutation<
        CommandControllerCreateCommandApiResponse,
        CommandControllerCreateCommandApiArg
      >({
        query: (queryArg) => ({
          url: `/api/commands`,
          method: 'POST',
          body: queryArg.createCommandDto,
        }),
        invalidatesTags: ['command'],
      }),
      commandControllerGetCommandById: build.query<
        CommandControllerGetCommandByIdApiResponse,
        CommandControllerGetCommandByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/commands/${queryArg.id}` }),
        providesTags: ['command'],
      }),
      commandControllerUpdateCommand: build.mutation<
        CommandControllerUpdateCommandApiResponse,
        CommandControllerUpdateCommandApiArg
      >({
        query: (queryArg) => ({
          url: `/api/commands/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.updateCommandDto,
        }),
        invalidatesTags: ['command'],
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
export type CommandControllerGetCommandsApiResponse =
  /** status 200  */ CommandGetApiResponse[];
export type CommandControllerGetCommandsApiArg = {
  botId: string;
};
export type CommandControllerCreateCommandApiResponse = unknown;
export type CommandControllerCreateCommandApiArg = {
  createCommandDto: CreateCommandDto;
};
export type CommandControllerGetCommandByIdApiResponse = unknown;
export type CommandControllerGetCommandByIdApiArg = {
  id: number;
};
export type CommandControllerUpdateCommandApiResponse = unknown;
export type CommandControllerUpdateCommandApiArg = {
  id: number;
  updateCommandDto: UpdateCommandDto;
};
export type CommandProp = {};
export type Command = {
  id: number;
  name: string;
  command: string;
  script: string;
  enabled: boolean;
  privateCommand: boolean;
  props: CommandProp[];
  bot: string;
  createdAt: string;
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
  commands: Command[];
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
  commands: Command[];
};
export type CreateBotDto = {
  token: string;
};
export type BotStartStopResponse = {};
export type CommandGetApiResponse = {
  id: number;
  name: string;
  command: string;
  script: string;
  enabled: boolean;
  privateCommand: boolean;
  props: CommandProp[];
  createdAt: string;
};
export type CreateCommandDto = {
  name: string;
  command: string;
  script: string;
  enabled: boolean;
  privateCommand: boolean;
  props: CommandProp[];
  bot: string;
};
export type UpdateCommandDto = {
  name: string;
  command: string;
  script: string;
  enabled: boolean;
  privateCommand: boolean;
  props: CommandProp[];
};
export const {
  useUsersControllerProfileQuery,
  useLazyUsersControllerProfileQuery,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
  useBotControllerGetBotsQuery,
  useLazyBotControllerGetBotsQuery,
  useBotControllerCreateBotMutation,
  useBotControllerStartBotMutation,
  useBotControllerStopBotMutation,
  useCommandControllerGetCommandsQuery,
  useLazyCommandControllerGetCommandsQuery,
  useCommandControllerCreateCommandMutation,
  useCommandControllerGetCommandByIdQuery,
  useLazyCommandControllerGetCommandByIdQuery,
  useCommandControllerUpdateCommandMutation,
} = injectedRtkApi;
