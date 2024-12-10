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
import { ValuesCard } from './card'
import ChartPreview from './chart-preview'
import FormValues from './form-values'

import useResourceOptions from '../../hooks/useResourceOptions'
import * as formSchema from './form-schema'
// CONSTANTS
// #############################################################################################
const RESOURCE = 'particular'
const TITLE = 'Particular Information Form'
const SUBTITLE = 'Fill out necessary input for the particular information'
// #############################################################################################
export default function ParticularForm({
    isModal = false,
    onChanges = () => { },
    onErrors = () => { },
    particular = {},
}) {
    const { id = null } = useParams()
    const { options, loading } = useResourceOptions({ resourceName: 'bar_data' })

    const [data, setData] = useState(null)
    const [values, setValues] = useState([])
    const [currentValue, setCurrentValue] = useState(null)


    const saveValue = (value) => {
        const newValues = values.filter(v => v.year !== value.year)
        newValues.push(value)
        setData(prev => ({ ...prev, values: newValues }))
        setCurrentValue(null)
    }

    const handleChanges = (data, errors) => {
        setData(data)
        onErrors(errors)
    }

    useEffect(() => {
        if (isModal && particular) {
            setData(particular)
            setValues(particular?.values || [])
        }
    }, [particular, isModal])

    useEffect(() => {
        setValues(data?.values || []);
        onChanges(data);
    }, [data])



    return (
        <CRow
            className={isModal ? 'container-fluid' : 'gap-4 gap-md-0'}
            style={isModal ? {} : {
                height: '100vh',
                marginBottom: '1rem',
                overflow: 'auto',
            }}
        >
            <CCol
                className='container-fluid'
                lg={isModal ? 12 : 5}
                style={{
                    height: '100%',
                    overflow: 'auto',
                    position: 'sticky',
                    top: 0,
                }}
            >
                <ResourceForm
                    id={!isModal ? id : null}
                    formData={data}
                    resource={RESOURCE}
                    subtitle={SUBTITLE}
                    title={TITLE}
                    onChanges={handleChanges}
                    form={{
                        ...formSchema,
                        fields: formSchema.fields.map(field => {
                            if (field.name === 'bar_data_id') {
                                return !isModal ? {
                                    ...field,
                                    options: options?.length > 0 ? options : [],
                                    loading: loading,
                                } : { custom: true }
                            }
                            return field
                        }),
                        initialValues: formSchema.fields.reduce((acc, field) => {
                            acc[field.name] = data && data[`${field?.name}`] || field?.initialValue || '';
                            return acc;
                        }, {})
                    }}
                    noSubmit={isModal}
                >
                </ResourceForm>
            </CCol>

            <CCol className='gap-4 d-flex flex-column-reverse flex-md-column'
                lg={isModal ? 12 : 7}
            >
                {
                    !isModal &&
                    <CCard>
                        <CCardHeader>
                            <h4>
                                Chart
                            </h4>
                        </CCardHeader>
                        <CCardBody>
                            <ChartPreview values={values} />
                        </CCardBody>
                    </CCard>
                }

                {/* Values Lists */}

                <CCard>
                    <CCardHeader>
                        <div className="d-flex justify-content-between items-align-center">
                            <h4>
                                Current Values
                            </h4>
                            <FormValues
                                onSubmit={saveValue}
                                value={currentValue}
                                open={currentValue !== null}
                                onCancel={() => setCurrentValue(null)}
                            />
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        {
                            values.length > 0 ?
                                <ValuesCard
                                    values={values}
                                    editValue={(value) => setCurrentValue(value)}
                                    removeValue={(value) => setValues(values.filter(v => v.year !== value.year))}
                                />
                                : <h4>No values Added.</h4>
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
