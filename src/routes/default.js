
import React from 'react'
const GuestPage = React.lazy(() => import('../views/public/index'))

const defaultRoutes = [
  {
    element: <GuestPage />,
    path: '/',
    exact: true,
    name: 'TUP-T'
  },
]

export default defaultRoutes
