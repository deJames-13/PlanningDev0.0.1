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
].map(resource => {
    return {
        [resource]: apiSlice.injectEndpoints({
            endpoints: resourceBuilder(resource)
        })
    }
});

export default resources;