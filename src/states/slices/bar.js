import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
};

const barSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        setBarData: (state, action) => {
            state.data = action.payload
        }
    },
});

export const { 
    setBarData
} = barSlice.actions;
export default barSlice.reducer;