
import React from 'react'
import ExamplePage from 'src/components/examples/page'
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
