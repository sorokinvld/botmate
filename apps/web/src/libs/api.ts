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
          body: queryArg.createUserDto,
        }),
        invalidatesTags: ['auth'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as userApi };
export type UsersControllerProfileApiResponse =
  /** status 200 The user profile */ UserProps;
export type UsersControllerProfileApiArg = void;
export type AuthControllerLoginApiResponse =
  /** status 200 Login successful */ LoginApiResponse;
export type AuthControllerLoginApiArg = {
  loginUserDto: LoginUserDto;
};
export type AuthControllerRegisterApiResponse = unknown;
export type AuthControllerRegisterApiArg = {
  createUserDto: CreateUserDto;
};
export type UserProps = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  password: string;
};
export type LoginApiResponse = {
  accessToken: string;
  user: UserProps;
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
};
export const {
  useUsersControllerProfileQuery,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
} = injectedRtkApi;
