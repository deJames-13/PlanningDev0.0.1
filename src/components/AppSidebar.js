import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'src/states/slices/theme';

import {
  CButton,
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';


import logo from 'src/assets/images/logo.png';
import { AppSidebarNav } from './AppSidebarNav';

import { Link } from 'react-router-dom';
import useNavBar from 'src/views/dashboard/hooks/useNavBar';
import AppSidebarSearch from './AppSidebarSearch';
import { useLogoutAction } from 'src/hooks/useLogout.js';
import Swal from 'sweetalert2';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';

const AppSidebar = () => {
  const logout = useLogoutAction();

  const {
    navigations: navBar,
    filterNavigations,
  } = useNavBar();

  const dispatch = useDispatch()
  const { sidebarShow, unfoldable } = useSelector((state) => state.theme)

  const toggleSidebar = (visible) => {
    dispatch(setTheme({ sidebarShow: visible }));
  };

  const toggleFoldable = () => {
    dispatch(setTheme({ unfoldable: !unfoldable }));
  };

  const handleNavSearch = (search) => {
    return filterNavigations(search);
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  }


  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={toggleSidebar}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className='text-decoration-none'>
          <div className="d-flex flex align-items-center gap-2 sidebar-brand-full">
            <CImage src={logo}
              style={{
                height: 32,
                aspectRatio: 1,
              }}
            />
            <span className="fw-bold text-wrap sidebar-brand-full">
              Dashboard
            </span>
          </div>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => toggleSidebar(false)}
        />
      </CSidebarHeader>


      <AppSidebarNav items={navBar} />


      <CSidebarFooter className="border-top d-none d-lg-flex">

        {/* Logout */}
        <CButton color='danger' variant='ghost' onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} />
        </CButton>

        <CSidebarToggler
          onClick={() => toggleFoldable()}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
