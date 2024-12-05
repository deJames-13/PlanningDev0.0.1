import CIcon from '@coreui/icons-react'

import {
    cilBarChart,
    cilChart,
    cilChartLine,
    cilList,
    cilPlus,
    cilSpeedometer,
    cilSpreadsheet
} from '@coreui/icons'
import {
    CNavGroup,
    CNavItem,
    CNavTitle
} from '@coreui/react'


export default [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
        component: CNavGroup,
        name: 'Manage Budgets',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/budgets/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Append Data',
                to: '/dashboard/budgets/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },
    {
        component: CNavTitle,
        name: 'Budget Accountability Report (BAR) ',
    },
    {
        component: CNavGroup,
        name: 'Manage Reports',
        to: '/dashboard/bar',
        icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/bar-data/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Append Data',
                to: '/dashboard/bar-data/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },
    {
        component: CNavGroup,
        name: 'Manage Particulars',
        icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/particulars/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Append Data',
                to: '/dashboard/particulars/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },
    {
        component: CNavTitle,
        name: 'Departments and Sectoral Offices',
    },
    {
        component: CNavGroup,
        name: 'Manage Departments',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/departments/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Create Departments',
                to: '/dashboard/departments/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },
    {
        component: CNavGroup,
        name: 'Manage Offices',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/sectors/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Create Office',
                to: '/dashboard/sectors/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },

]