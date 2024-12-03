import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API = import.meta.env.VITE_APPSCRIPT_URL;

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
        activeRequests: 0,
    },
    reducers: {
        startLoading: (state) => {
        state.activeRequests++;
        state.isLoading = true;
        },
        stopLoading: (state) => {
        state.activeRequests--;
        if (state.activeRequests === 0) {
            state.isLoading = false;
        }
        },
    },
});


const baseQuery = fetchBaseQuery({
    baseUrl: API,
    // credentials: 'include',
});

const _baseQuery = async (args, api, extraOptions) => {
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

export const { startLoading, stopLoading } = loadingSlice.actions;
