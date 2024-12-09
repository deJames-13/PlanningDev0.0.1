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


import useResourceOptions from '../../hooks/useResourceOptions'
import * as formSchema from './form-schema'
// CONSTANTS
// ###################################################################
const RESOURCE = 'sectors'
const TITLE = 'Sectoral Offices Form'
const SUBTITLE = 'Fill out necessary input for the report'
// ###################################################################
export default function SectorForm() {
    const { id = null } = useParams()
    const options = useResourceOptions({ resourceName: 'departments' })

    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '100vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={6} style={{
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
