import { CCol, CRow } from '@coreui/react'
import ResourceForm from '../components/ResourceForm'
import ParticularForm from '../particulars/form'
import * as formSchema from './form-schema'

export default function BarDataForm() {

    return (
        <CRow
            className='gap-4'
        >
            <CCol
                lg={5}
            >
                <ResourceForm
                    resource={'bar-data'}
                    title={'BAR Data Form'}
                    subtitle={'Fill out necessary input for the report'}
                    form={formSchema}
                />
            </CCol>
            <CCol>
                <ParticularForm />
            </CCol>
        </CRow>

    )
}
