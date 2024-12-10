import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLoading, stopLoading } from '../slices/loading.js';

const API = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API}/api`,
  credentials: 'include',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;
  //   const XSRF = getState().auth.XSRF;
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   if (XSRF) {
  //     headers.set('X-XSRF-TOKEN', XSRF);
  //   }
  //   return headers;
  // },
});

const _baseQuery = async (args, api, extraOptions) => {
  console.clear()
  api.dispatch(startLoading());
  try {
    const result = await baseQuery(args, api, extraOptions);
    return result;
  } catch (error) {
    console.error('Error in Base Query:', error);
    return { error: { status: 'FETCH_ERROR', data: error.message } };
  } finally {
    api.dispatch(stopLoading());
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: _baseQuery,
  endpoints: (builder) => ({}),
});

