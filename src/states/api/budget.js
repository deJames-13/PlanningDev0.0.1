import { apiSlice } from './index';

export const budgetApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
    })
});

export const { useGetBudgetMutation } = budgetApiSlice;
