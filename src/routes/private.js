import React from 'react'
import dashboardRoutes from 'src/views/dashboard/routes'
import DashboardLayout from '../layout/DashboardLayout.js'

const privateRoutes = [
  {
    element: <DashboardLayout />,
    path: '/dashboard',
    name: 'Dashboard',
    children: [
      ...dashboardRoutes
    ]
  }
]

export default privateRoutes
