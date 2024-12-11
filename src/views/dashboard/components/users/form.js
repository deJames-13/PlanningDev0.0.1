import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CSpinner
} from '@coreui/react'

import { useParams } from 'react-router-dom'
import ResourceForm from '../ResourceForm'


import useResource from '../../hooks/useResource'
import * as formSchema from './form-schema'
// CONSTANTS
// ###################################################################
const RESOURCE = 'users'
const TITLE = 'User Form'
const SUBTITLE = 'Fill out necessary input for the user information'
// ###################################################################
export default function UserForm() {
    const { id = null } = useParams()

    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '100vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={12} style={{
                height: '100%',
                overflow: 'auto',
                position: 'sticky',
                top: 0,
            }}>
                <ResourceForm
                    id={id}
                    resource={RESOURCE}
                    subtitle={SUBTITLE}
                    title={TITLE}
                    form={formSchema}
                >
                </ResourceForm>
            </CCol>
        </CRow>

    )
}
