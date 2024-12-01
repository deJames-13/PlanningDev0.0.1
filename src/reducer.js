import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { themeSlice } from './slices/theme';



const rootReducer = combineReducers({
    theme: themeSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
