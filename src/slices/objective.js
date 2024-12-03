import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sectorObjectives: {},
    currentSector: null,
    loading: false,
    error: null,
};

const objectiveSlice = createSlice({
    name: "objective",
    initialState,
    reducers: {
        setSector: (state, action) => {
            state.currentSector = action.payload;
        },  
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

export const { 
    getObjectiveStart, 
    getObjectiveSuccess, 
    getObjectiveFailure,
    setSector,
 } = objectiveSlice.actions;
export default objectiveSlice.reducer;