
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CForm,
    CFormInput,
    CInputGroup,
} from '@coreui/react'

import React from 'react'

export default function AppSidebarSearch({ items, onSearch }) {

    const handleNavSearch = (e) => {
        const search = e.target.value;
        onSearch(search);
    }

    return (
        <div className='p-2 d-md-block'>
            <CFormInput
                type="text"
                id="search-input"
                name="search-input"
                placeholder="Search"
                onChange={handleNavSearch}
            />
        </div>
    )
}