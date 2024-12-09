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
    const [quaters, setQuarters] = useState([])

    const handleChanges = (values) => {
        console.log(values)
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
                                value={data}
                                onSubmit={() => { }}
                                onCancel={() => { }}
                            />
                        </div>
                    </CCardHeader>
                    <CCardBody className='px-4'>
                        {/* TOTAL */}
                        <div>
                            <span className='fw-bold text-uppercase' style={{
                                fontSize: '1rem'
                            }}>
                                Total
                            </span>
                            <div className="d-flex justify-content-between items-align-center flex-wrap">
                                <div className='d-flex flex-column'>
                                    <span className='fw-bold'>Target</span>
                                    <span>{data?.total?.target}</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span className='fw-bold'>Accomplishment</span>
                                    <span>{data?.total?.accomplishment}</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span className='fw-bold'>Percantage</span>
                                    <span className='fst-italic'>{data?.total?.percentage || parseFloat(data?.total?.accomplishment / data?.total?.target * 100 || 0).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* QUARTERS SUMMARY */}
                        {
                            quaters?.length > 0 && quaters.map((quarter, index) => (
                                <div key={index}>
                                    <span className='fw-bold text-uppercase' style={{
                                        fontSize: '1rem'
                                    }}>
                                        Quarter {index + 1}
                                    </span>
                                    <div className="d-flex justify-content-between items-align-center flex-wrap">
                                        <div className='d-flex flex-column'>
                                            {/* <span className='fw-bold'>Target</span> */}
                                            <span>{quarter.target}</span>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            {/* <span className='fw-bold'>Accomplishment</span> */}
                                            <span>{quarter.accomplishment}</span>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            {/* <span className='fw-bold'>Percantage</span> */}
                                            <span className='fst-italic'>{quarter.percentage || parseFloat(quarter.accomplishment / quarter.target * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>


                                    <hr />


                                </div>
                            ))
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )
}
