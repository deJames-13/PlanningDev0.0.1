import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import budgetReducer from './slices/budget';
import loadingReducer from './slices/loading';
import objectiveReducer from './slices/objective';
import themeReducer from './slices/theme';



const rootReducer = combineReducers({
    theme: themeReducer,
    loading: loadingReducer,
    budget: budgetReducer,
    objective: objectiveReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
