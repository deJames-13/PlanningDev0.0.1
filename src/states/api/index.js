import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLoading, stopLoading } from '../slices/loading.js';
import { setCredentials, logout } from '../slices/auth.js';

const API = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API}/api`,
  credentials: 'include',
  redirect: 'manual',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    headers.set('Accept', 'application/json');
    headers.set('Referer', window.location.origin);
    // headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Content-Type', 'application/json');



    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const _baseQuery = async (args, api, extraOptions) => {
  api.dispatch(startLoading());
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result === undefined) {
      console.error('API request result is undefined');
      return { error: { status: 'FETCH_ERROR', data: 'API request result is undefined' } };
    }

    if (![401, 403, 419].includes(result?.error?.status)) {
      return result || 'Forbidden';
    }

    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data?.token) {
      const userInfo = api.getState().auth.userInfo;
      const token = refreshResult.data.token;
      api.dispatch(setCredentials({ userInfo, token, role: userInfo?.role }));
      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      return { error: { status: 'UNAUTHORIZED', data: 'Refresh token failed' } };
    }

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
