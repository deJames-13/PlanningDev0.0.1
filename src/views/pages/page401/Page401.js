import { cilMagnifyingGlass } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Page401 = () => {
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <div className="clearfix">
                            <h1 className="float-start display-3 me-4">401</h1>
                            <h4 className="pt-3">Unauthorized.</h4>
                            <p className="text-body-secondary float-start">
                                Only logged in users are allowed.&nbsp;
                            </p>
                            <Link to={'/log'}>
                                Log in
                            </Link>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Page404
