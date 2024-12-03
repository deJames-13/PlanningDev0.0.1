import {
  cibQuantopian,
  cilChartPie,
  cilDrop,
  cilSpeedometer,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

import { sectors } from './views/dashboard/sectors'

const _nav = [
  {
    component: CNavItem,
    name: 'Main',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Sectors',
    to: '/dashboard/sectors',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: sectors.map((sector) => {
      let name = sector.name;
      if (sector.name.length > 15){
        name = sector.id.toUpperCase()
      }
      return {
        component: CNavItem,
        name: name,
        to: `/dashboard/sectors/${sector.id}`,
        icon: <CIcon icon={cibQuantopian} customClassName="nav-icon" />,
      }
    })
    
  },
]

export default _nav
