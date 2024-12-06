import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'src/states/slices/theme';

import {
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
import useNavBar from 'src/hooks/useNavBar';
import AppSidebarSearch from './AppSidebarSearch';

const AppSidebar = () => {
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
            <Link to="/">
              <CImage src={logo}
                style={{
                  height: 32,
                  aspectRatio: 1,
                }}
              />
            </Link>
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
        <CSidebarToggler
          onClick={() => toggleFoldable()}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
