import React from 'react'
import DashboardLayout from '../layout/DashboardLayout.js'
import Dashboard from '../views/dashboard/Dashboard.js'
import Sector from '../views/dashboard/sectors'

const privateRoutes = [
  {
    element: <DashboardLayout />,
    path: '/',
    name: 'Dashboard',
    children: [
      {
        element: <Dashboard />,
        name: 'Dashboard',
        path: '/dashboard',
      },
      {
        element: <Sector />,
        name: 'Sectors',
        path: '/dashboard/sectors/:sector',
      },
    ]
  }
]

export default privateRoutes
