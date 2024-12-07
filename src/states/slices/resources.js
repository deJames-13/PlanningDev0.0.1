import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const resourceSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        setResource: (state, action) => {
            const { resource, data } = action.payload;
            if (!resource || !data) return;
            state[resource] = data;
        },
        deleteResource: (state, action) => {
            const { resource } = action.payload;
            if (!resource) return;
            delete state.resources[resource];
        },
        clear: (state) => {
            state.resources = {};
        }
    },
});

export const {
    setResource,
    deleteResource,
    clear
} = resourceSlice.actions;
export default resourceSlice.reducer;