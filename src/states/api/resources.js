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
    'particular-value',
];

const resourceEndpoints = resources.reduce((acc, resource) => {
    let name = changeCase.camelCase(resource);
    const endpoints = resourceBuilder(resource);
    return {
        ...acc,
        [name]: apiSlice.injectEndpoints({
            endpoints,
        }),
    };
}, {});

export default resourceEndpoints;