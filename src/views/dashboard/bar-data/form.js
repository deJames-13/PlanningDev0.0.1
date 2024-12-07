import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import { useState } from 'react'
import ResourceForm from '../components/ResourceForm'
import ParticularCard from '../particulars/card'
import ParticularForm from '../particulars/modal'
import ChartPreview from './chart-preview'
import * as formSchema from './form-schema'

const resource = 'bar-data'
export default function BarDataForm() {
    const [data, setData] = useState({})
    const [particulars, setParticulars] = useState([])
    const [current, setCurrent] = useState(null)

    const saveParticular = (particular) => {
        const newParticulars = particulars.filter(p => p.id !== particular.id)
        newParticulars.push(particular)
        setParticulars(newParticulars)
        setCurrent(null)
    }


    return (
        <CRow
            className='gap-4 gap-md-0'
            style={
                {
                    height: '80vh',
                    overflow: 'auto',
                    marginBottom: '1rem'
                }
            }
        >
            <CCol
                lg={6}
            >
                <ResourceForm
                    resource={resource}
                    title={'BAR Data Form'}
                    subtitle={'Fill out necessary input for the report'}
                    form={formSchema}
                    logChanges={true}
                >
                </ResourceForm>
            </CCol>
            <CCol className='gap-4 d-flex flex-column' style={
                {
                    height: '100%',
                    overflow: 'auto'
                }
            }>
                {/* Chart Preview */}
                <CCard>
                    <CCardHeader>
                        <h4>
                            Chart Preview
                        </h4>
                    </CCardHeader>
                    <CCardBody>
                        <ChartPreview data={data} />
                    </CCardBody>
                </CCard>

                {/* Particular Lists */}
                <CCard>
                    <CCardHeader>
                        <h4>
                            Particulars
                        </h4>
                        <ParticularForm
                            onSubmit={saveParticular}
                            onRemove={() => setParticulars(prev => prev.filter(p => p.id !== current.id))}
                            onEdit={(particular) => setCurrent(particular)}
                            value={current}
                            open={current !== null}

                        />
                    </CCardHeader>
                    <CCardBody>
                        {
                            particulars?.length > 0 ? particulars.map((particular, index) => <ParticularCard key={index} particular={particular} />)
                                : <h4>No particulars Added.</h4>
                        }
                    </CCardBody>
                </CCard>

            </CCol>
        </CRow>

    )
}
