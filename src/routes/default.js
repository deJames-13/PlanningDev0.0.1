
import React from 'react'
const BARPage = React.lazy(() => import('../views/public/components/bar-page'))

const defaultRoutes = [
  {
    element: <BARPage />,
    path: '/',
    exact: true,
    name: 'TUP-T'
  },
]

export default defaultRoutes
