import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResourceForm from '../ResourceForm'
import ParticularCard from '../particulars/card'
import ParticularForm from '../particulars/modal'
import ChartPreview from './chart-preview'


import * as formSchema from './form-schema'
// CONSTANTS
// ###################################################################
const RESOURCE = 'bar-data'
const TITLE = 'BAR Data Form'
const SUBTITLE = 'Fill out necessary input for the report'
// ###################################################################
export default function BarDataForm() {
    const { id = null } = useParams()

    // STATES
    const [data, setData] = useState({})
    const [particulars, setParticulars] = useState([])
    const [current, setCurrent] = useState(null)

    const saveParticular = (particular) => {
        const newParticulars = particulars?.length ? particulars.filter(p => p.id !== particular.id) : []
        newParticulars.push({
            ...particular,
            id: particular?.id ?? `tempId_${new Date().getTime()}`,
        })
        newParticulars.reverse();
        setParticulars(newParticulars)
        setData(prev => ({
            ...prev,
            particulars: newParticulars
        }))
        setCurrent(null)
    }

    const handleChanges = (values) => {
        setData(prev => ({
            ...prev,
            ...values,
        }))
    }
    const handleRemove = (particular) => {
        setParticulars(prev => prev.filter(p => p.id !== particular.id))
        setData(prev => ({
            ...prev,
            particulars: prev.particulars.filter(p => p.id !== particular.id)
        }))
    }

    useEffect(() => {
        setParticulars(data?.particulars ?? []);
    }, [data])

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
                    formData={data}
                    form={formSchema}
                    onChanges={handleChanges}
                >
                </ResourceForm>
            </CCol>
            <CCol className='gap-4 d-flex flex-column' style={{
                height: '100%',
                overflow: 'auto'
            }}>
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
                            open={current !== null}
                            particular={current}
                            onSubmit={saveParticular}
                            onCancel={() => setCurrent(null)}
                        />
                    </CCardHeader>
                    <CCardBody>
                        {
                            particulars?.length > 0 ? particulars.map((particular, index) => <ParticularCard key={index}
                                particular={particular}
                                onEdit={(particular) => setCurrent(particular)}
                                onRemove={handleRemove}
                            />)
                                : <h4>No particulars Added.</h4>
                        }
                    </CCardBody>
                </CCard>

            </CCol>
        </CRow>

    )
}
