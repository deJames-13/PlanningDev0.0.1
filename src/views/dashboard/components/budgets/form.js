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
import useResourceOptions from '../../hooks/useResourceOptions'
import ResourceForm from '../ResourceForm'
import * as formSchema from './form-schema'


// CONSTANTS
// ###################################################################
const RESOURCE = 'budgets'
const TITLE = 'Budget Data Form'
const SUBTITLE = 'Fill out necessary input for the report'
// ###################################################################
export default function BudgetForm() {
    const { id = null } = useParams()
    const { options, loading } = useResourceOptions({ resourceName: 'sectors' })
    console.log(options)
    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '80vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>
            <CCol lg={6}>
                <ResourceForm
                    id={id}
                    resource={RESOURCE}
                    subtitle={SUBTITLE}
                    title={TITLE}
                    form={{
                        ...formSchema,
                        fields: formSchema.fields.map(field => {
                            if (field.name === 'sector_id') {
                                return {
                                    ...field,
                                    options: options ?? [],
                                    loading: loading,
                                }
                            }
                            return field
                        }),
                    }}
                >
                </ResourceForm>
            </CCol>
        </CRow>

    )
}
