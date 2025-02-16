import { apiSlice } from './index';
let resource = 'charts';
const chartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBAR: builder.mutation({
            query: (qStr) => {
                return {
                    url: `${resource}/bar1${qStr ? `?${qStr}` : ''}`,
                    method: 'GET',
                }
            },
        }),
        getBudget: builder.mutation({
            query: (name, isId = true) => {
                return {
                    url: `${resource}/budgets${name ? `?sector_slug=${name}&isId=${true}` : ''}`,
                    method: 'GET',
                }
            },
        }),
        getObj: builder.mutation({
            query: (name) => {
                return {
                    url: `${resource}/objectives${name ? `?sector_slug=${name}&isId=${true}` : ''}`,
                    method: 'GET',
                }
            },
        }),
        getDeps: builder.mutation({
            query: (name) => {
                return {
                    url: `public/departments`,
                    method: 'GET',
                }
            },
        }),
        getSects: builder.mutation({
            query: (name) => {
                return {
                    url: `public/sectors`,
                    method: 'GET',
                }
            },
        }),
    })
});
export const {
    useGetBARMutation,
    useGetBudgetMutation,
    useGetObjMutation,
    useGetDepsMutation,
    useGetSectsMutation,
} = chartApiSlice;
export default chartApiSlice;

