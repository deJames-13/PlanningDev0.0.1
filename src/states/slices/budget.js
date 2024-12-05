import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sectorBudgets: {},
    currentSector: null,
    loading: false,                 
    error: null,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        setSector: (state, action) => {
            state.currentSector = action.payload;
        },
        getBudgetStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getBudgetSuccess: (state, action) => {
            state.loading = false;
            state.sectorBudgets = {
                ...state.sectorBudgets,
                ...(action.payload || {}),
            };
        },
        getBudgetFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    getBudgetStart, 
    getBudgetSuccess, 
    getBudgetFailure,
    setSector,
} = budgetSlice.actions;
export default budgetSlice.reducer;