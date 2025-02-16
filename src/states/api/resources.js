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
    }),
    budgets: (builder) => ({
        budgetsDelByYear: builder.mutation({
            query: (year) => ({
                url: `budgets/del-by-year/${year}${id ? `/${id}` : ''}`,
                method: 'DELETE',
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