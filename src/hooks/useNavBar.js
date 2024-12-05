import {
    cilBuilding,
    cilLayers,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
    CNavGroup,
    CNavItem,
    CNavTitle
} from '@coreui/react'

import React from 'react'
import { useSelector } from 'react-redux'
import AppSidebarSearch from 'src/components/AppSidebarSearch'
import dashboardNav from 'src/views/dashboard/navigation'
import { departments } from 'src/views/dashboard/sectors/data'



const useNavBar = () => {
    const [navigations, setNavigations] = React.useState([])
    const { sidebarShow, unfoldable } = useSelector((state) => state.theme)


    const mapDepartmentsToNav = (departments) => {
        return departments.map((department) => {
            let name = department.name.length > 20 ? <span className='text-wrap'>
                {department.name}
            </span> : department.name;

            if (department.type === 'title') {
                return {
                    component: CNavTitle,
                    name: name,
                    icon: <></>,
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
    const defaultNavs = ({ departments, onFilter = () => { }, ...props }) => {
        return [
            ...dashboardNav,
            {
                component: AppSidebarSearch,
                onSearch: onFilter,
                type: 'custom',
                shown: sidebarShow && !unfoldable,
            },
            {
                component: CNavGroup,
                name: 'View Offices',
                items: mapDepartmentsToNav(departments),
                icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
            },
        ]
    }
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
                    } else if (department.name.toLowerCase().includes(searchChars.toLowerCase())) {
                        return department
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


        setNavigations(defaultNavs({
            departments: filtered,
            onFilter: filterNavigations
        }))
    }

    React.useEffect(() => {
        setNavigations(defaultNavs({
            departments: departments,
            onFilter: filterNavigations
        }));
    }, [unfoldable, sidebarShow])



    return {
        navigations,
        filterNavigations,
    }
}

export default useNavBar