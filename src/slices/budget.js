import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sectorBudgets: {},
    loading: false,                 
    error: null,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
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

export const { getBudgetStart, getBudgetSuccess, getBudgetFailure } = budgetSlice.actions;
export default budgetSlice.reducer;