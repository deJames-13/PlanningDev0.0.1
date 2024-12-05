
import React from 'react'
import { ExampleTable } from '../components/examples/Table'
const GuestPage = React.lazy(() => import('../views/public/index'))

const defaultRoutes = [
  {
    element: <GuestPage />,
    path: '/',
    exact: true,
    name: 'TUP-T'
  },
  {
    element: <ExampleTable />,
    path: '/example/table',
    exact: true,
    name: 'TUP-T'
  },
]

export default defaultRoutes
