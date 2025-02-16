import * as changeCase from "change-case";
import resourceBuilder from '../base/resource';
import { apiSlice } from './index';

const resources = [
    'departments',
    'sectors',
    'objectives',
    'budgets',
    'budget-annual',
    'bar-data',
    'particular',
    'users',
];

const customEndpoints = {
    barData: (builder) => ({
        barDataDelByYear: builder.mutation({
            query: ({ year, id }) => ({
                url: `bar-data/del-by-year/${year}${id ? `/${id}` : ''}`,
                method: 'DELETE',
            }),
        }),
        barDataDelByStatus: builder.mutation({
            query: ({ status, id }) => ({
                url: `bar-data/del-by-status/${status}${id ? `/${id}` : ''}`,
                method: 'DELETE',
            }),
        }),

        barDataResByYear: builder.mutation({
            query: ({ year }) => ({
                url: `bar-data/res-by-year/${year}`,
                method: 'PATCH',
            }),
        }),
        barDataResByStatus: builder.mutation({
            query: ({ status }) => ({
                url: `bar-data/res-by-status/${status}`,
                method: 'PATCH',
            }),
        }),

    }),
    budgets: (builder) => ({
        budgetsDelByYear: builder.mutation({
            query: ({ year, id }) => ({
                url: `budgets/del-by-year/${year}${id ? `/${id}` : ''}`,
                method: 'DELETE',
            }),
        }),
        budgetsDelByStatus: builder.mutation({
            query: ({ status, id }) => ({
                url: `budgets/del-by-status/${status}${id ? `/${id}` : ''}`,
                method: 'DELETE',
            }),
        }),

        budgetsResByYear: builder.mutation({
            query: ({ year }) => ({
                url: `budgets/res-by-year/${year}`,
                method: 'PATCH',
            }),
        }),
        budgetsResByStatus: builder.mutation({
            query: ({ status }) => ({
                url: `budgets/res-by-status/${status}`,
                method: 'PATCH',
            }),
        }),
    }),
};

const resourceEndpoints = resources.reduce((acc, resource) => {
    let name = changeCase.camelCase(resource);
    acc = apiSlice.injectEndpoints({
        endpoints: resourceBuilder(resource, customEndpoints[name])
    });
    return acc;
}, {});

export default resourceEndpoints;