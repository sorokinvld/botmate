import { apiSlice as api } from './redux/base-query';
export const addTagTypes = ['user', 'auth'] as const;
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
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
  createdAt?: string;
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
  isAdmin?: boolean;
};
export const {
  useUsersControllerProfileQuery,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
} = injectedRtkApi;
