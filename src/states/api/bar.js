import { apiSlice } from './index';

export const barApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBAR: builder.mutation({
            query: (name) => {
                let url = '?route=bar1';
                return {
                    url: url,
                    method: 'GET',
                }
            },
        }),
    })
});

export const { useGetBARMutation } = barApiSlice;
