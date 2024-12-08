import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResourceForm from '../components/ResourceForm'
import ParticularCard from '../particulars/card'
import ParticularForm from '../particulars/modal'
import ChartPreview from './chart-preview'
import * as formSchema from './form-schema'

const resource = 'bar-data'
export default function BarDataForm() {
    const { id = null } = useParams()

    // STATES
    const [data, setData] = useState({})
    const [particulars, setParticulars] = useState([])
    const [current, setCurrent] = useState(null)

    const saveParticular = (particular) => {
        const newParticulars = particulars?.legnth ? particulars.filter(p => p.id !== particular.id) : []
        newParticulars.push({
            id: `tempId_${new Date().getTime()}`,
            ...particular,
        })
        newParticulars.reverse();
        setParticulars(newParticulars)
        setCurrent(null)
    }

    useEffect(() => {
        setData(prev => ({
            ...prev,
            particulars: particulars
        }))
    }, [particulars])

    const handleChanges = (values) => {
        setParticulars(values.particulars)
    }


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
                    form={formSchema}
                    formData={data}
                    resource={resource}
                    title={'BAR Data Form'}
                    subtitle={'Fill out necessary input for the report'}
                    onChanges={handleChanges}
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
                            open={current !== null}
                            particular={current}
                            onSubmit={saveParticular}
                            onCancel={() => setCurrent(null)}
                            onRemove={() => setParticulars(prev => prev.filter(p => p.id !== current.id))}
                        />
                    </CCardHeader>
                    <CCardBody>
                        {
                            particulars?.length > 0 ? particulars.map((particular, index) => <ParticularCard key={index}
                                particular={particular}
                                onEdit={(particular) => setCurrent(particular)}
                                onRemove={() => setParticulars(prev => prev.filter(p => p.id !== particular.id))}
                            />)
                                : <h4>No particulars Added.</h4>
                        }
                    </CCardBody>
                </CCard>

            </CCol>
        </CRow>

    )
}
