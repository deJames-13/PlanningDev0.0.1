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
    let name = resource.split('-').map((word, idx) => {
        if (idx === 0) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
    const endpoints = resourceBuilder(resource);



    return {
        ...acc,
        [name]: apiSlice.injectEndpoints({
            endpoints,
        }),
    };
}, {});

export default resourceEndpoints;