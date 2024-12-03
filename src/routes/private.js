import React from 'react'
import DashboardLayout from '../layout/DashboardLayout.js'
import Dashboard from '../views/dashboard/Dashboard.js'

const privateRoutes = [
  {
    element: <DashboardLayout />,
    path: '/',
    children: [
      {
        element: <Dashboard />,
        path: '/dashboard',
      },
    ]
  }
]

export default privateRoutes
