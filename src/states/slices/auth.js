import { createSlice } from '@reduxjs/toolkit';

const userInfo = window.localStorage.getItem('userInfo');
const accessToken = window.localStorage.getItem('accessToken');
const initialState = {
    userInfo: userInfo ? JSON.parse(userInfo) : null,
    oAuthUser: null,
    accessToken: accessToken || null,
    roles: null,
    isChanging: false,
    showProfile: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsChanging: (state, action) => {
            state.isChanging = action.payload.isChanging;
        },
        setCredentials: (state, action) => {
            const { userInfo, token } = action.payload;
            const { roles, ...info } = userInfo
            state.userInfo = info;
            state.accessToken = token;
            state.roles = roles || action.payload?.roles;
            localStorage.setItem('userInfo', JSON.stringify(info));
            localStorage.setItem('accessToken', token);
        },
        logout: (state) => {
            state.userInfo = null;
            state.accessToken = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('accessToken');
        },
        setShowProfile: (state) => {
            state.showProfile = !state.showProfile;
        },


    },
});

export const { setCredentials, logout, setIsChanging, setShowProfile } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;
export default authSlice.reducer;
