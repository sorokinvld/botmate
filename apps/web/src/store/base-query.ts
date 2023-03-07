import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorResponse } from '@api';

const { NODE_ENV = 'development' } = process.env;

const simpleBaseQuery = fetchBaseQuery({
  baseUrl: NODE_ENV === 'production' ? '/' : 'http://localhost:8080',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('botmate-token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuery: BaseQueryFn<any, unknown, ErrorResponse, {}, {}> = async (
  args,
  api,
  extraOptions,
) => {
  const response = await simpleBaseQuery(args, api, extraOptions);
  const error = response.error?.data as ErrorResponse;

  if (error) {
    return {
      error,
    };
  }

  return {
    data: response.data,
  };
};

export const apiSlice = createApi({
  baseQuery,
  reducerPath: 'api',
  endpoints: () => ({}),
});

export { baseQuery };
