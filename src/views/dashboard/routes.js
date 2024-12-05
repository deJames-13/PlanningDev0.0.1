import BarDataForm from './bar/form.js'
import BarDataTable from './bar/table.js'
import Dashboard from './Dashboard.js'
import Sector from './sectors'

export default [
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
    // Departments
    {
        element: <BarDataForm />,
        name: 'New Department',
        path: '/dashboard/departments/add',
    },
    {
        element: <BarDataTable />,
        name: 'Departments Table',
        path: '/dashboard/departments/table',
    },
    // Sectors
    {
        element: <BarDataForm />,
        name: 'New Department',
        path: '/dashboard/departments/add',
    },
    {
        element: <BarDataTable />,
        name: 'Departments Table',
        path: '/dashboard/departments/table',
    },
    // Sectors
    {
        element: <BarDataForm />,
        name: 'New Sector',
        path: '/dashboard/sectors/add',
    },
    {
        element: <BarDataTable />,
        name: 'Sectors Table',
        path: '/dashboard/sectors/table',
    },

    // Budgets
    {
        element: <BarDataForm />,
        name: 'New Budget',
        path: '/dashboard/budgets/add',
    },
    {
        element: <BarDataTable />,
        name: 'Budgets Table',
        path: '/dashboard/budgets/table',
    },
    // BAR DATA
    {
        element: <BarDataForm />,
        name: 'New Report',
        path: '/dashboard/bar/add',
    },
    {
        element: <BarDataTable />,
        name: 'Reports Table',
        path: '/dashboard/bar/table',
    },
    // BAR DATA: Particulars
    {
        element: <BarDataForm />,
        name: 'New Particular',
        path: '/dashboard/particulars/add',
    },
    {
        element: <BarDataTable />,
        name: 'Particulars Table',
        path: '/dashboard/particulars/table',
    },

]