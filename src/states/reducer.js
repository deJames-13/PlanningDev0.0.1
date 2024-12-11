import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api/index';
import barReducer from './slices/bar';
import budgetReducer from './slices/budget';
import loadingReducer from './slices/loading';
import objectiveReducer from './slices/objective';
import resourcesReducer from './slices/resources';
import themeReducer from './slices/theme';
import authReducer from './slices/auth';


const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    loading: loadingReducer,
    budget: budgetReducer,
    bar: barReducer,
    objective: objectiveReducer,
    resources: resourcesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
