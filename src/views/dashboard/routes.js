import BarDataForm from './components/bar-data/form.js'
import BudgetForm from './components/budgets/form.js'
import DepartmentForm from './components/departments/form.js'
import ObjectiveForm from './components/objectives/form.js'
import ParticularForm from './components/particulars/form.js'
import SectorForm from './components/sectors/form.js'

import BarDataTable from './components/bar-data/table.js'
import BudgetTable from './components/budgets/table.js'
import DepartmentTable from './components/departments/table.js'
import ObjectiveTable from './components/objectives/table.js'
import ParticularTable from './components/particulars/table.js'
import SectorTable from './components/sectors/table.js'



import Dashboard from './Dashboard.js'
import Sector from './components/sectors'

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
        element: <DepartmentForm />,
        name: 'Edit Department',
        path: '/dashboard/departments/edit/:id',
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
        element: <SectorForm />,
        name: 'Edit Sector',
        path: '/dashboard/sectors/edit/:id',
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
        element: <BudgetForm />,
        name: 'Edit Budget',
        path: '/dashboard/budgets/edit/:id',
    },
    {
        element: <BudgetTable />,
        name: 'Budgets Table',
        path: '/dashboard/budgets/table',
    },


    // Objectives
    {
        element: <ObjectiveForm />,
        name: 'New Quality Objective',
        path: '/dashboard/objectives/add',
    },
    {
        element: <ObjectiveForm />,
        name: 'Edit Quality Objective',
        path: '/dashboard/objectives/edit/:id',
    },
    {
        element: <ObjectiveTable />,
        name: 'Quality Objectives',
        path: '/dashboard/objectives/table',
    },


    // BAR DATA
    {
        element: <BarDataForm />,
        name: 'New Report',
        path: '/dashboard/bar-data/add',
    },
    {
        element: <BarDataForm />,
        name: 'Edit Report',
        path: '/dashboard/bar-data/edit/:id',
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
        path: '/dashboard/particular/add',
    },
    {
        element: <ParticularForm />,
        name: 'Edit Particular',
        path: '/dashboard/particular/edit/:id',
    },
    {
        element: <ParticularTable />,
        name: 'Particulars Table',
        path: '/dashboard/particular/table',
    },

]