// Pages
import React from 'react'
const Login = React.lazy(() => import('../views/auth/Login'))
const Register = React.lazy(() => import('../views/auth/Register'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page403 = React.lazy(() => import('../views/pages/page403/Page403'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))
const GuestPage = React.lazy(() => import('../views/public/index'))



const guestRoutes = [
    {
        element: <GuestPage />,
        path: '/',
        exact: true,
        name: 'TUP-T'
    },
    {
        element: <GuestPage />,
        path: '/bar',
        exact: true,
        name: 'TUP-T'
    },
    {
        element: <Login />,
        path: '/login',
        exact: true,
        name: 'Login'
    },
    {
        element: <Page403 />,
        path: '/page403',
        exact: true,
        name: 'TUP-T'
    },
    // {
    //     element: <Register />,
    //     path: '/register',
    //     exact: true,
    //     name: 'Register'
    // },
    {
        element: <Page404 />,
        path: '*', // This means that this route will match any route that is not matched by the previous routes
    }
]

export default guestRoutes
