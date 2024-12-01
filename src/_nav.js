import {
  cibQuantopian,
  cilChartPie,
  cilCursor,
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
  // DASHBOARD
  {
    component: CNavGroup,
    name: 'Sectors',
    to: '/sectors',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: sectors.map((sector) => {
      // if name is longer than 15 use the uppercase id
      let name = sector.name;
      if (sector.name.length > 15){
        name = sector.id.toUpperCase()
      }

      return {
        component: CNavItem,
        name: name,
        to: `/sectors/${sector.id}`,
        icon: <CIcon icon={cibQuantopian} customClassName="nav-icon" />,
      }
    })
    
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },

]

export default _nav
