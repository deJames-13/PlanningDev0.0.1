import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Sector = React.lazy(() => import('./views/dashboard/Sector'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/sectors/:sector', name: 'Sector', element: Sector },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/charts', name: 'Charts', element: Charts },
]

export default routes
