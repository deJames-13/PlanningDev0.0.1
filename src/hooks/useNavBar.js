import {
    cilBuilding,
    cilLayers,
    cilSpeedometer,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
    CNavGroup,
    CNavItem,
    CNavTitle
} from '@coreui/react'

import React from 'react'

import { departments } from 'src/views/dashboard/sectors/data'

const mapDepartmentsToNav = (departments) => {
    return departments.map((department) => {
        let name = department.name.length > 20 ? <span className='text-wrap'>
            {department.name}
        </span> : department.name;

        if (department.type === 'title') {
            return {
                component: CNavTitle,
                name: name,
            }
        } else if (department.children) {
            return {
                component: CNavGroup,
                name: <span className='text-bold'>{name}</span>,
                to: `/dashboard/sectors/${department.id || department.name.toLowerCase().replace(/\s+/g, '-')}`,
                icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
                items: mapDepartmentsToNav(department.children),
            }
        } else {
            return {
                component: CNavItem,
                name: name,
                to: `/dashboard/sectors/${department.id}`,
                icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
            }
        }
    })
}

const useNavBar = () => {
    const [navigations, setNavigations] = React.useState([])

    const filterNavigations = (searchChars = '') => {

        const filtered = departments.filter((nav) => {
            if (nav.component === CNavTitle) {
                return true
            } else if (nav.component === CNavGroup) {
                let children = filterNavigations(nav.items, searchChars)
                return children.length > 0
            } else {
                return nav.name.toLowerCase().includes(searchChars.toLowerCase())
            }
        })

        setNavigations([
            {
                component: CNavItem,
                name: 'Dashboard',
                to: '/dashboard',
                icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            },
            {
                component: CNavTitle,
                name: 'Manage Offices',
            },
            ...mapDepartmentsToNav(filtered),
        ])
    }





    React.useEffect(() => {
        setNavigations([
            {
                component: CNavItem,
                name: 'Dashboard',
                to: '/dashboard',
                icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            },
            {
                component: CNavTitle,
                name: 'Manage Offices',
            },
            ...mapDepartmentsToNav(departments),
        ]);
    }, [])

    return {
        navigations,
        filterNavigations,
    }
}

export default useNavBar