import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  useColorModes,
} from '@coreui/react'



import CIcon from '@coreui/icons-react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import flattenRoutes from 'src/lib/flattenRoutes.js'
import { setTheme } from 'src/states/slices/theme'
import dashboardRoutes from 'src/views/dashboard/routes.js'
import { AppHeaderDropdown } from './header/index'
import { AppBreadcrumb } from './index'
import SearchNavigation from './SearchNavigation'

const AppHeader = () => {
  const routes = flattenRoutes(dashboardRoutes)
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('dashboard-theme')


  const dispatch = useDispatch()
  const { sidebarShow } = useSelector((state) => state.theme)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch(setTheme({ sidebarShow: !sidebarShow }))}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            {/* <CNavLink href="#">Users</CNavLink> */}
          </CNavItem>
          <CNavItem>
            {/* <CNavLink href="#">Settings</CNavLink> */}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              {/* <CIcon icon={cilBell} size="lg" /> */}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              {/* <CIcon icon={cilList} size="lg" /> */}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              {/* <CIcon icon={cilEnvelopeOpen} size="lg" /> */}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>


          <SearchNavigation routes={routes} />

          {/* THEME TOGGLERS */}
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => {
                  setColorMode('light')
                  dispatch(setTheme({ colorMode: 'light' }))
                }}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => {
                  setColorMode('dark')
                  dispatch(setTheme({ colorMode: 'dark' }))
                }}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => {
                  setColorMode('auto')
                  dispatch(setTheme({ colorMode: 'auto' }))
                }}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          {/* USER MENU DROPDOWN */}
          <AppHeaderDropdown />



        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
