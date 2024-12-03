import { CContainer, CSpinner } from '@coreui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppFooter, AppHeader, AppSidebar } from '../components/index'

const DashboardLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer className="px-4" lg>
            <Outlet />
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DashboardLayout
