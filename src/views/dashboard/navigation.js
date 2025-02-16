import CIcon from '@coreui/icons-react'

import {
    cilBarChart,
    cilChart,
    cilChartLine,
    cilList,
    cilPlus,
    cilSpeedometer,
    cilSpreadsheet,
    cilUser
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
        roles: ['super-admin', 'admin', 'user'],
    },
    {
        component: CNavTitle,
        name: 'Departments and Sectoral Offices',
        roles: ['super-admin', 'admin',],
    },
    {
        roles: ['super-admin', 'admin',],
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
        roles: ['super-admin', 'admin',],
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

    {
        component: CNavTitle,
        name: 'Sector Monitoring',
        roles: ['super-admin', 'admin', 'user'],
    },
    {
        roles: ['super-admin', 'admin', 'user'],
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
        roles: ['super-admin', 'admin', 'user'],
        component: CNavGroup,
        name: 'Manage Objectives',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/objectives/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Append Data',
                to: '/dashboard/objectives/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },
    {
        component: CNavTitle,
        name: 'Budget Accountability Report (BAR) ',
        roles: ['super-admin', 'admin', 'user'],
    },
    {
        roles: ['super-admin', 'admin', 'user'],
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
        roles: ['super-admin', 'admin', 'user'],
        component: CNavGroup,
        name: 'Manage Particulars',
        icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/particular/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Append Data',
                to: '/dashboard/particular/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },
    {
        component: CNavTitle,
        name: 'Account Management ',
        roles: ['super-admin'],
    },
    {
        component: CNavGroup,
        roles: ['super-admin'],
        name: 'Manage Users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'View Table',
                to: '/dashboard/users/table',
                icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
            },
            {
                component: CNavItem,
                name: 'Append Data',
                to: '/dashboard/users/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },

]