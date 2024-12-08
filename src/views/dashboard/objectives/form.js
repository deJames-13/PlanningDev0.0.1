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

import ResourceForm from '../components/ResourceForm'
import * as formSchema from './form-schema'
// CONSTANTS
// ###################################################################
const RESOURCE = 'objectives'
const TITLE = 'Quality Objectives Form'
const SUBTITLE = 'Fill out necessary input for the report'
// ###################################################################
export default function ObjectiveForm() {


    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '80vh',
                marginBottom: '1rem'
            }}
        >
            <CCol>
                <ResourceForm
                    resource={RESOURCE}
                    title={TITLE}
                    subtitle={SUBTITLE}
                    form={formSchema}
                >
                </ResourceForm>
            </CCol>
        </CRow>

    )
}
