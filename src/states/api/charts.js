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
            query: (qStr) => {
                return {
                    url: `${resource}/budgets${qStr ? `?${qStr}` : ''}`,
                    method: 'GET',
                }
            },
        }),
        getObj: builder.mutation({
            query: (qStr) => {
                return {
                    url: `${resource}/obj${qStr ? `?${qStr}` : ''}`,
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

