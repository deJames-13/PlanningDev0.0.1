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

    const filterNavigations = (searchChars = null) => {
        let filtered;
        if (searchChars) {
            filtered = departments.map((department) => {
                if (department.children) {
                    let children = department.children.filter((child) => {
                        return child.name.toLowerCase().includes(searchChars.toLowerCase())
                    })

                    if (children.length > 0) {
                        return {
                            ...department,
                            children: children
                        }
                    } else {
                        return null
                    }
                } else {
                    if (department.name.toLowerCase().includes(searchChars.toLowerCase())) {
                        return department
                    } else {
                        return null
                    }
                }
            })
        } else {
            filtered = departments
        }

        filtered = filtered.filter((department) => department !== null)


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