import { apiSlice } from './index';

const chartApiSlice = apiSlice.injectEndpoints({
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
        getBudget: builder.mutation({
            query: (name) => {
                let url = '?route=budgets';
                if (name && name !== 'all') {
                    url = `?route=budget&name=${name}`;
                }
                return {
                    url: url,
                    method: 'GET',
                }
            },
        }),
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
export const {
    useGetBARMutation,
    useGetBudgetMutation,
    useGetObjMutation
} = chartApiSlice;
export default chartApiSlice;

