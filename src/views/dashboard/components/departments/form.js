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
const RESOURCE = 'departments'
const TITLE = 'Department Form'
const SUBTITLE = 'Fill out necessary input for the department information'
// ###################################################################
export default function DepartmentForm() {
    const { id = null } = useParams()

    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '100vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={12}>
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
