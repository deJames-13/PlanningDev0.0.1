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


import { useEffect, useState } from 'react'
import useResourceOptions from '../../hooks/useResourceOptions'
import ChartPreview from './chart-preview'
import * as formSchema from './form-schema'
import QuarterliesModal from './form-values'
import QuarterSummary from './quarter-summary'
// CONSTANTS
// ###################################################################
const RESOURCE = 'objectives'
const TITLE = 'Quality Objectives Form'
const SUBTITLE = 'Fill out necessary input for the report'
// ###################################################################
export default function ObjectiveForm() {
    const { id = null } = useParams()
    const { options, loading } = useResourceOptions({ resourceName: 'sectors' })

    const [data, setData] = useState(null)
    const [quarters, setQuarters] = useState([])

    const handleSaveQuarter = (values) => {
        console.log(values)

    }

    const handleChanges = (values) => {
        setData(values)
    }

    useEffect(() => {
        if (data?.quarters) setQuarters(data.quarters)
    }, [data])


    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '80vh',
                overflow: 'auto',
                marginBottom: '1rem'
            }}>

            {/* FORM PART */}

            <CCol lg={5}>
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
                    onChanges={handleChanges}
                    style={{
                        height: 'auto',
                    }}
                >
                </ResourceForm>
            </CCol>

            {/* FORM PREVIEWS */}
            <CCol lg={7} className='gap-4 d-flex flex-column' style={{
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <CCard>
                    <CCardHeader>
                        <h4>Chart Preview</h4>
                    </CCardHeader>
                    <CCardBody className='p-0 px-lg-4'>
                        <ChartPreview values={data?.quarters} />
                    </CCardBody>
                </CCard>

                <CCard>
                    <CCardHeader>
                        <div className="d-flex items-align-center justify-content-between">
                            <h4>Quarterlies</h4>
                            <QuarterliesModal
                                open={false}
                                value={data}
                                onSubmit={handleSaveQuarter}
                                onCancel={() => { }}
                            />
                        </div>
                    </CCardHeader>
                    <CCardBody className='px-4'>
                        <QuarterSummary quarters={quarters} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )
}
