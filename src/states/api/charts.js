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
            query: (name) => {
                return {
                    url: `${resource}/budgets${name ? `?sector_slug=${name}` : ''}`,
                    method: 'GET',
                }
            },
        }),
        getObj: builder.mutation({
            query: (name) => {
                return {
                    url: `${resource}/objectives${name ? `?sector_slug=${name}` : ''}`,
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

