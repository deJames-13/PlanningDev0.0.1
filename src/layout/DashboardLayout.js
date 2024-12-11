import { CContainer } from '@coreui/react'
import { AppFooter, AppHeader, AppSidebar } from '../components/index'
import useCheckAuth from 'src/hooks/useCheckAuth'
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { isAdmin } = useCheckAuth(true);
  return !isAdmin ? <Navigate to="/" /> : (
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
