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

        <hr />
        <div className='m-5'>
          <h3>Quick Links</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            <div>
              <h4>Dashboard</h4>
              <ul>
                <li><a href="/dashboard">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4>Sectors</h4>
              <ul>
                <li><a href="/dashboard/sectors/:sector">Sectors</a></li>
                <li><a href="/dashboard/sectors/add">New Sector</a></li>
                <li><a href="/dashboard/sectors/edit/:id">Edit Sector</a></li>
                <li><a href="/dashboard/sectors/table">Sectors Table</a></li>
              </ul>
            </div>
            <div>
              <h4>Users</h4>
              <ul>
                <li><a href="/dashboard/users/add">New User</a></li>
                <li><a href="/dashboard/users/edit/:id">Edit User</a></li>
                <li><a href="/dashboard/users/table">Users Table</a></li>
              </ul>
            </div>
            <div>
              <h4>Departments</h4>
              <ul>
                <li><a href="/dashboard/departments/add">New Department</a></li>
                <li><a href="/dashboard/departments/edit/:id">Edit Department</a></li>
                <li><a href="/dashboard/departments/table">Departments Table</a></li>
              </ul>
            </div>
            <div>
              <h4>Budgets</h4>
              <ul>
                <li><a href="/dashboard/budgets/add">New Budget</a></li>
                <li><a href="/dashboard/budgets/edit/:id">Edit Budget</a></li>
                <li><a href="/dashboard/budgets/table">Budgets Table</a></li>
              </ul>
            </div>
            <div>
              <h4>Quality Objectives</h4>
              <ul>
                <li><a href="/dashboard/objectives/add">New Quality Objective</a></li>
                <li><a href="/dashboard/objectives/edit/:id">Edit Quality Objective</a></li>
                <li><a href="/dashboard/objectives/table">Quality Objectives</a></li>
              </ul>
            </div>
            <div>
              <h4>Reports</h4>
              <ul>
                <li><a href="/dashboard/bar-data/add">New Report</a></li>
                <li><a href="/dashboard/bar-data/edit/:id">Edit Report</a></li>
                <li><a href="/dashboard/bar-data/table">Reports Table</a></li>
              </ul>
            </div>
            <div>
              <h4>Particulars</h4>
              <ul>
                <li><a href="/dashboard/particular/add">New Particular</a></li>
                <li><a href="/dashboard/particular/edit/:id">Edit Particular</a></li>
                <li><a href="/dashboard/particular/table">Particulars Table</a></li>
              </ul>
            </div>
          </div>

        </div>

        <AppFooter />
      </div>
    </div>
  )
}

export default DashboardLayout
