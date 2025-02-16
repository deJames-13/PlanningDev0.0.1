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
import { useSelector } from 'react-redux'
// CONSTANTS
// ###################################################################
const RESOURCE = 'bar-data'
const TITLE = 'BAR Data Form'
const SUBTITLE = 'Fill out necessary input for the BAR1 reports'
// ###################################################################
export default function BarDataForm() {
    const { roles } = useSelector(state => state.auth);
    const isAdmin = roles.includes('admin') || roles.includes('super-admin');
    const { id = null } = useParams()

    // STATES
    const [data, setData] = useState({})
    const [particulars, _setParticulars] = useState([])
    const [current, setCurrent] = useState(null)

    const setParticulars = (particulars) => {
        let sorted = [...particulars].sort((a, b) => a.title.localeCompare(b.title))
        _setParticulars(sorted)
    }

    const saveParticular = (particular) => {
        let newParticulars = particulars?.length ? particulars.filter(p => p.id !== particular.id) : []
        newParticulars.push({
            ...particular,
            id: particular?.id ?? `tempId_${new Date().getTime()}`,
        })
        setData(prev => ({
            ...prev,
            particulars: newParticulars
        }))
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
        let particulars = data?.particulars ?? [];
        setParticulars(particulars);
    }, [data])


    return (
        <CRow
            className='gap-4 gap-md-0'
            style={{
                height: '100vh',
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
                    form={{
                        ...formSchema,
                        fields: formSchema.fields.map(field => {
                            if (field.name === 'status') {
                                return isAdmin ? field : null;
                            }
                            return field
                        }),
                    }}
                    onChanges={handleChanges}
                >
                </ResourceForm>
            </CCol>
            <CCol className='gap-4 d-flex flex-column' style={{
                height: '100%',
                overflow: 'auto'
            }}>
                {/* Particular Lists */}
                <CCard>
                    <CCardHeader>
                        <div className="d-flex justify-content-between items-align-center flex-wrap">
                            <h4>
                                Particulars
                            </h4>
                            <ParticularForm
                                particular={current}
                                onSubmit={saveParticular}
                                onCancel={() => setCurrent(null)}
                            />
                        </div>
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


            </CCol>
        </CRow>

    )
}
