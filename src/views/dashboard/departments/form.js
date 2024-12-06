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

export default function DepartmentForm() {


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
                    resource={'departments'}
                    title={'Department Form'}
                    subtitle={'Fill out necessary input for the report'}
                    form={formSchema}
                >
                </ResourceForm>
            </CCol>
        </CRow>

    )
}
