import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLoading, stopLoading } from '../slices/loading.js';
const API = import.meta.env.VITE_APPSCRIPT_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  // credentials: 'include',
});

const _baseQuery = async (args, api, extraOptions) => {
  api.dispatch(startLoading());
  try {
    const result = await baseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());
    return result;
  } catch (error) {
    api.dispatch(stopLoading());
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

