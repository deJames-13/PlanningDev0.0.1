import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sectorObjectives: {},
    loading: false,
    error: null,
};

const objectiveSlice = createSlice({
    name: "objective",
    initialState,
    reducers: {
        getObjectiveStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getObjectiveSuccess: (state, action) => {
            state.loading = false;
            state.sectorObjectives = {
                ...state.sectorObjectives,
                ...action.payload
            };
        },
        getObjectiveFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getObjectiveStart, getObjectiveSuccess, getObjectiveFailure } = objectiveSlice.actions;
export default objectiveSlice.reducer;