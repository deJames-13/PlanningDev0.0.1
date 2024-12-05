import CIcon from '@coreui/icons-react'

import {
    cilChart,
    cilChartLine,
    cilPlus,
    cilSpeedometer,
    cilSpreadsheet,
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
                to: '/budgets/add',
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
                to: '/particulars/add',
                icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
            },
        ]
    },

]