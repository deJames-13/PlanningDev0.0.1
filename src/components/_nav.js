import {
  cibQuantopian,
  cilChartPie,
  cilDrop,
  cilFeaturedPlaylist,
  cilMonitor,
  cilSpeedometer,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

import { departments } from '../views/dashboard/sectors.js'
import { sectors } from '../views/dashboard/sectors.old'

const mapDepartmentsToNav = (departments) => {
  return departments.map((department) => {
    let name = department.name.length > 20 ? <span className="text-wrap">{department.name}</span> : department.name
    if (department.children) {

      return {
        component: CNavGroup,
        name: name,
        to: `/dashboard/sectors/${department.id || department.name.toLowerCase().replace(/\s+/g, '-')}`,
        icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
        items: mapDepartmentsToNav(department.children),
      }
    } else {
      return {
        component: CNavItem,
        name: name,
        to: `/dashboard/sectors/${department.id}`,
        icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
      }
    }
  })
}
const _nav = [
  {
    component: CNavItem,
    name: 'Main',
    to: '/dashboard',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
  },
]

export default _nav
