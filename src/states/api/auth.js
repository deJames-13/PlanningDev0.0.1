import { apiSlice } from './index';


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        profile: build.mutation({
            query: (body) => ({
                url: '/me',
                method: 'GET',
                body,
            }),
        }),
        login: build.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        forgotPassword: build.mutation({
            query: (body) => ({
                url: '/forgot-password',
                method: 'POST',
                body,
            }),
        }),
        resetPassword: build.mutation({
            query: (body) => ({
                url: '/reset-password',
                method: 'POST',
                body,
            }),
        }),
        refreshToken: build.mutation({
            query: () => ({
                url: '/refresh-token',
                method: 'POST',
            }),
        }),
    })

});

export default authApiSlice;