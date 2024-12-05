import { apiSlice } from '../api.js';

export const objectiveApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getObj: builder.mutation({
            query: (name) => {
                let url = `?route=obj&name=${name}`;
                return {
                    url: url,
                    method: 'GET',
                }
            },
        }), 
    })
});

export const { useGetObjMutation } = objectiveApiSlice;
