import { createSlice } from "@reduxjs/toolkit";

// Theme Toggler Reducer
const initialState = {
    sidebarShow: true,
    unfoldable: false,
    name: 'light',
  };
  
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTheme } = themeSlice.actions;
