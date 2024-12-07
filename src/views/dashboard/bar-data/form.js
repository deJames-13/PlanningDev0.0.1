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
import ParticularForm from '../particulars/form'
import * as formSchema from './form-schema'

export default function BarDataForm() {

    return (
        <CRow
            className='gap-4 gap-lg-0'
            style={{
                height: '80vh',
                marginBottom: '1rem'
            }}
            xs={1} lg={2}
        >
            <CCol
                lg={6}
            >
                <ResourceForm
                    resource={'bar-data'}
                    title={'BAR Data Form'}
                    subtitle={'Fill out necessary input for the report'}
                    form={formSchema}
                >
                    <CButton className='my-2' color='secondary' variant='outline' style={{
                        width: '100%'
                    }}>
                        Add Particulars
                    </CButton>
                </ResourceForm>
            </CCol>
            <CCol className='gap-4 d-flex flex-column'>
                {/* Chart Preview */}
                <CCard>
                    <CCardHeader>
                        <h4>
                            Chart Preview
                        </h4>
                    </CCardHeader>
                    <CCardBody>
                        <CSpinner />
                    </CCardBody>
                </CCard>

                {/* Particular Lists */}
                <CCard>
                    <CCardHeader>
                        <h4>
                            Particulars
                        </h4>
                    </CCardHeader>
                    <CCardBody>
                        <CSpinner />
                    </CCardBody>
                </CCard>

            </CCol>
        </CRow>

    )
}
