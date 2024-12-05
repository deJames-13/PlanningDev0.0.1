import resourceBuilder from '../base/resource';
import { apiSlice } from './index';

const resources = [
    'departments',
    'sectors',
    'objectives',
    'budgets',
    'budget-annual',
    'particular',
    'particular-value',
];

const resourceEndpoints = resources.reduce((acc, resource) => {
    const endpoints = resourceBuilder(resource);
    return {
        ...acc,
        [resource]: apiSlice.injectEndpoints({
            endpoints,
        }),
    };
}, {});

export default resourceEndpoints;