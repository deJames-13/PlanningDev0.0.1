
import React from 'react'
import ExampleForm from '../components/examples/ExampleForm'
const GuestPage = React.lazy(() => import('../views/public/index'))

const defaultRoutes = [
  {
    element: <GuestPage />,
    path: '/',
    exact: true,
    name: 'TUP-T'
  },
  {
    element: <ExampleForm />,
    path: '/example/form',
    exact: true,
    name: 'TUP-T'
  },
]

export default defaultRoutes
