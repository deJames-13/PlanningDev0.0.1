import { apiSlice } from '../api.js';

export const budgetApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    fetchBudget: builder.mutation({
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

export const { useFetchBudgetMutation } = budgetApiSlice;
