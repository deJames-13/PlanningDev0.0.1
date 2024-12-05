import BarDataForm from './bar-data/form.js'
import BudgetForm from './budgets/form.js'
import DepartmentForm from './departments/form.js'
import ParticularForm from './particulars/form.js'
import SectorForm from './sectors/form.js'

import BarDataTable from './bar-data/table.js'
import BudgetTable from './budgets/table.js'
import DepartmentTable from './departments/table.js'
import ParticularTable from './particulars/table.js'
import SectorTable from './sectors/table.js'



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
        element: <DepartmentForm />,
        name: 'New Department',
        path: '/dashboard/departments/add',
    },
    {
        element: <DepartmentTable />,
        name: 'Departments Table',
        path: '/dashboard/departments/table',
    },
    // Sectors
    {
        element: <SectorForm />,
        name: 'New Sector',
        path: '/dashboard/sectors/add',
    },
    {
        element: <SectorTable />,
        name: 'Sectors Table',
        path: '/dashboard/sectors/table',
    },

    // Budgets
    {
        element: <BudgetForm />,
        name: 'New Budget',
        path: '/dashboard/budgets/add',
    },
    {
        element: <BudgetTable />,
        name: 'Budgets Table',
        path: '/dashboard/budgets/table',
    },
    // BAR DATA
    {
        element: <BarDataForm />,
        name: 'New Report',
        path: '/dashboard/bar-data/add',
    },
    {
        element: <BarDataTable />,
        name: 'Reports Table',
        path: '/dashboard/bar-data/table',
    },
    // BAR DATA: Particulars
    {
        element: <ParticularForm />,
        name: 'New Particular',
        path: '/dashboard/particulars/add',
    },
    {
        element: <ParticularTable />,
        name: 'Particulars Table',
        path: '/dashboard/particulars/table',
    },

]